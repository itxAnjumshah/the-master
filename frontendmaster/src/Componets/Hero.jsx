import React from 'react'
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import Service from './service';
import Client from './Client';
import contact from './Contact';
import Contact from './Contact';

export default function Hero() {
  return (
    <>
    {/* <Navbar/> */}
    <Home/>
    <About/>
    <Service/>
    <Client/>
    <Contact/>
    
    <Footer/>
    </>
  )
}

