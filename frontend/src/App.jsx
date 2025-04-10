import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from '../src/Pages/Homepage';
import Home from './Componets/Home';
import About from './Componets/About';
import Services from './Componets/service';
import Contact from './Componets/Contact';
import Certificate from './Componets/certificate';
import Client from './Componets/Client';
import CertificateDesign from './Componets/Certiificatedesign';
import Dashboard from './Pages/Dashboard';
import Login from './Componets/Login';
import ProtectedRoute from './Componets/ProtectedRoute';
import AllCertificates from './Componets/AllCertificates';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/client" element={<Client />} />
      <Route path="/green" element={<CertificateDesign />} />
      <Route path="/login" element={<Login />} />
      <Route path="/all-certificates" element={<AllCertificates />} />
      
      {/* Protected Dashboard Route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
