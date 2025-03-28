const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://anjum:anjum@cluster0.wth4c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String // 'admin' or 'client'
});

const dataSchema = new mongoose.Schema({
  rollNo: String,
  session: String,
  name: String,
  father: String,
  registeredNo: String,
  course: String,
  proficiency: String,
  character: String,
  startDate: Date,
  endDate: Date
});

const User = mongoose.model('User', userSchema);
const Data = mongoose.model('Data', dataSchema);

// Admin Registration (Only for first-time use, then disable it)
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.send({ message: 'User registered successfully' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send({ message: 'User not found' });
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });
  
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.send({ token });
});

// Middleware to protect admin routes
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send({ message: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
    if (decoded.role !== 'admin') return res.status(403).send({ message: 'Unauthorized' });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send({ message: 'Invalid token' });
  }
};

// Public Route (Client can access this)
app.get('/data', async (req, res) => {
  const data = await Data.find();
  res.send(data);
});

// Admin CRUD Routes (Protected)
app.post('/data', adminAuth, async (req, res) => {
  const newData = new Data(req.body);
  await newData.save();
  res.send({ message: 'Data added successfully' });
});

app.put('/data/:id', adminAuth, async (req, res) => {
  await Data.findByIdAndUpdate(req.params.id, req.body);
  res.send({ message: 'Data updated successfully' });
});

app.delete('/data/:id', adminAuth, async (req, res) => {
  await Data.findByIdAndDelete(req.params.id);
  res.send({ message: 'Data deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
