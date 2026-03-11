// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Components/Home";
import About from "./Components/About";
import Services from "./Components/Services";
import Projects from "./Components/Projects";

import Contact from "./Components/Contact";
import Careers from "./Components/Careers";
import News from "./Components/News";


function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/news" element={<News />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />

        

      </Routes>
      <Footer />  {/* Global footer across all pages */}
    </Router>
  );
}

export default App;


