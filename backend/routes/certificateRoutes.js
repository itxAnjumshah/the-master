const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Create a new certificate
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const certificateData = {
      ...req.body,
      image: req.file ? req.file.path : null
    };

    const certificate = new Certificate(certificateData);
    await certificate.save();
    
    res.status(201).json({
      message: 'Certificate created successfully',
      data: certificate
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
    }
    next(error);
  }
});

// Get all certificates with pagination and search
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { rollNo: { $regex: search, $options: 'i' } },
        { machineName: { $regex: search, $options: 'i' } },
        { fatherName: { $regex: search, $options: 'i' } },
        { grade: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const [certificates, total] = await Promise.all([
      Certificate.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Certificate.countDocuments(query)
    ]);

    // Convert image paths to URLs
    const certificatesWithUrls = certificates.map(cert => ({
      ...cert,
      image: cert.image ? `${req.protocol}://${req.get('host')}/${cert.image}` : null
    }));

    res.json({
      data: certificatesWithUrls,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get a single certificate by roll number
router.get('/:rollNo', async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({ rollNo: req.params.rollNo }).lean();
    
    if (!certificate) {
      const error = new Error('Certificate not found');
      error.statusCode = 404;
      throw error;
    }

    // Convert image path to URL
    const certificateWithUrl = {
      ...certificate,
      image: certificate.image ? `${req.protocol}://${req.get('host')}/${certificate.image}` : null
    };

    res.json(certificateWithUrl);
  } catch (error) {
    next(error);
  }
});

// Update a certificate
router.put('/:rollNo', upload.single('image'), async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const certificate = await Certificate.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      updateData,
      { new: true, runValidators: true }
    );

    if (!certificate) {
      const error = new Error('Certificate not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      message: 'Certificate updated successfully',
      data: certificate
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
    }
    next(error);
  }
});

// Delete a certificate
router.delete('/:rollNo', async (req, res, next) => {
  try {
    const certificate = await Certificate.findOneAndDelete({ rollNo: req.params.rollNo });
    
    if (!certificate) {
      const error = new Error('Certificate not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      message: 'Certificate deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 