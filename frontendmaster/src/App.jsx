import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Home from './Componets/Home';
import About from './Componets/About';
import Services from './Componets/service';
import Contact from './Componets/Contact';
import Certificate from './Componets/certificate';
import Client from './Componets/Client';
import Navbar from './Componets/Navbar';
import Certiificatedesign from './Componets/Certiificatedesign'
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/client" element={<Client />} />
        <Route path="/green" element={<Certiificatedesign/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </>
  );
}

export default App;
