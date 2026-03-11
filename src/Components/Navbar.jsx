import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";          // dark logo
import whiteLogo from "../assets/l-white.png"; // white logo for dark background
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  // Dropdown states
  const [openProjects, setOpenProjects] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  // State to track if hero section is under navbar
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  // Observe hero section for logo color
  useEffect(() => {
    const hero = document.querySelector(".ca-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkBackground(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  // Smooth scroll functions
  const scrollToSection = (id) => {
    navigate("/services");
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const scrollToProjectsSection = (id) => {
    navigate("/projects");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <nav className="navbar">
      {/* Mobile Hamburger */}
      <div className="mobile-hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <FaTimes /> : <FaBars />}
      </div>

      {/* Logo */}
      <div className="logo-wrapper">
        <img
          src={isDarkBackground ? whiteLogo : logo}
          alt="Company Logo"
          className="logo-img"
        />
  
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${mobileMenu ? "active" : ""}`}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/about")}>About Us</button>

        {/* Projects Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setOpenProjects(true)}
          onMouseLeave={() => setOpenProjects(false)}
        >
          <button className="dropdown-btn">Projects ▾</button>
          {openProjects && (
            <div className="dropdown-menu">
              <button onClick={() => scrollToProjectsSection("proj")}>Projects</button>
              <button onClick={() => scrollToProjectsSection("gall")}>Gallery</button>
            </div>
          )}
        </div>

        {/* Services Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setOpenServices(true)}
          onMouseLeave={() => setOpenServices(false)}
        >
          <button className="dropdown-btn">Services ▾</button>
          {openServices && (
            <div className="dropdown-menu">
              <button onClick={() => scrollToSection("all")}>All Services</button>
              <button onClick={() => scrollToSection("civil")}>Civil Telecom/OSP Services</button>
              <button onClick={() => scrollToSection("elv")}>ELV Systems</button>
              <button onClick={() => scrollToSection("fttx")}>FTTx</button>
              <button onClick={() => scrollToSection("it")}>IT Networking</button>
            </div>
          )}
        </div>

        <button onClick={() => navigate("/news")}>News</button>
        <button onClick={() => navigate("/careers")}>Careers</button>
        <button onClick={() => navigate("/contact")}>Contact Us</button>
      </div>
    </nav>
  );
};

export default Navbar;