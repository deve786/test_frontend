import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Slides
import slide1 from "../assets/car1.png";
import slide2 from "../assets/car2.png";
import slide3 from "../assets/car3.png";

// Client logos
import c1 from "../assets/P1.jpg";
import c2 from "../assets/P2.png";
import c3 from "../assets/P3.png";
import c4 from "../assets/P4.png";
import c5 from "../assets/P5.png";
import c6 from "../assets/P6.png";
import c7 from "../assets/P7.jpg";
import c8 from "../assets/P8.png";
import c9 from "../assets/P9.png";
import c10 from "../assets/P10.png";
import c11 from "../assets/P11.jpg";
import c12 from "../assets/P12.png";

// Certificates
import cert1 from "../assets/l1.jpg";
import cert2 from "../assets/l2.png";
import cert3 from "../assets/l3.png";
import cert4 from "../assets/l4.png";
import cert5 from "../assets/l5.png";
import cert6 from "../assets/l6.png";
import cert7 from "../assets/l7.png";
import cert8 from "../assets/l8.png";
import cert9 from "../assets/l9.png";
import cert10 from "../assets/l10.png";
import cert11 from "../assets/l11.png";

const slides = [
  {
    image: slide1,
    title: "Trusted Telecom & OSP Solutions",
    description:
      "Over 20 years delivering top-tier Telecom, ELV, and IT Networking services in Qatar.",
  },
  {
    image: slide2,
    title: "Certified & Approved Contractor",
    description:
      "Proudly partnered with OOREDOO, QNBN, KAHRAMAA, and Qatar Petroleum, ensuring industry-standard excellence.",
  },
  {
    image: slide3,
    title: "Innovation & Excellence",
    description:
      "Constantly improving, providing unique solutions, and leading with professional expertise.",
  },
];

const clientLogos = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12];

const certificates = [
  cert1, cert2, cert3, cert4, cert5, cert6, cert7, cert8, cert9, cert10, cert11,
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="home-wrapper">
      {/* NAVBAR SPACER */}
      <div className="navbar-spacer" />

      {/* ===== HERO CAROUSEL ===== */}
      <section className="hero-carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          
        ))}

        {/* CONTENT OVERLAY */}
        <div className="carousel-overlay">
          <div className="carousel-content" key={currentSlide}>
            <h1 className="carousel-title">{slides[currentSlide].title}</h1>
            <p className="carousel-description">{slides[currentSlide].description}</p>
            <Link to="/About" className="explore-btn">
              Explore More
            </Link>
          </div>
        </div>
        
        {/* 3. LEFT ARROW */}
             <button className="carousel-arrow left" onClick={prevSlide} />

              

            {/* 4. RIGHT ARROW */}
            <button className="carousel-arrow right" onClick={nextSlide} />
             

            {/* 5. Dots */}
            <div className="carousel-dots">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>

          </section>
        
      

{/* ======================== OUR SERVICES (CORPORATE) ======================== */}
<section className="corp-services">
  <div className="corp-services-header">
    <h2>Our Services</h2>
    <p>
      Delivering reliable telecom, networking, and infrastructure solutions
      tailored to modern business needs.
    </p>
  </div>

  <div className="corp-services-grid">
    <div className="corp-service-card">
      <h3>Civil Telecom / OSP Services</h3>
      <p>
        End-to-end outside plant solutions including trenching, ducting,
        and infrastructure deployment.
      </p>
    </div>

    <div className="corp-service-card">
      <h3>ELV Systems</h3>
      <p>
        Advanced extra-low voltage systems including CCTV, access control,
        and security integration.
      </p>
    </div>

    <div className="corp-service-card">
      <h3>FTTx Solutions</h3>
      <p>
        High-speed fiber-to-the-x solutions ensuring reliable and scalable
        connectivity.
      </p>
    </div>

    <div className="corp-service-card">
      <h3>IT Networking</h3>
      <p>
        Robust IT networking, structured cabling, and enterprise-grade
        network design.
      </p>
    </div>
  </div>

  {/* CTA */}
  <div className="corp-services-cta">
    <a href="/services" className="corp-services-btn">
      Know More →
    </a>
  </div>
</section>


     {/* ================= WHY CHOOSE US ================= */}
<section className="why-choose">
  <div className="why-overlay">

    {/* LEFT CONTENT */}
    <div className="why-content-left">
      <h2>Why Choose Us</h2>
      <Link to="/about" className="explore-btn">
        Discover More
      </Link>
    </div>

    {/* RIGHT GLASS CARD */}
    <div className="why-box">
      <ul>
        <li>Proven Industry Expertise</li>
        <li>End-to-End Solution Delivery</li>
        <li>Quality, Reliability & Compliance</li>
      </ul>
    </div>

  </div>
</section>

{/* ======================== PROJECTS SECTION ======================== */}
<section className="projects-section">
  <div className="projects-header">
    <h2>Our Featured Projects</h2>
    <p>
      Delivering innovative telecom, networking, and infrastructure solutions
      that create real impact.
    </p>
  </div>

  <div className="projects-grid">
    {/* Project 1 */}
    <div className="project-card">
      <img
        src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f"

        alt="Telecom Project"
      />
      <div className="project-overlay">
        <h3>Telecom Infrastructure Deployment</h3>
        <p>
          Large-scale civil and OSP telecom project with end-to-end execution.
        </p>
        <a href="/projects" className="project-btn">
          View Project →
        </a>
      </div>
    </div>

    {/* Project 2 */}
    <div className="project-card">
      <img
        src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f"
        alt="FTTx Project"
      />
      <div className="project-overlay">
        <h3>FTTx Network Rollout</h3>
        <p>
          High-speed fiber deployment connecting residential and enterprise
          customers.
        </p>
        <a href="/projects" className="project-btn">
          View Project →
        </a>
      </div>
    </div>

    {/* Project 3 (optional) */}
    <div className="project-card">
      <img
        src="https://images.unsplash.com/photo-1556155092-490a1ba16284"
        alt="IT Networking"
      />
      <div className="project-overlay">
        <h3>Enterprise IT Networking</h3>
        <p>
          Secure, scalable LAN and WAN solutions for business environments.
        </p>
        <a href="/projects" className="project-btn">
          View Project →
        </a>
      </div>
    </div>
  </div>

  <div className="projects-cta">
    <a href="/projects">Explore All Projects</a>
  </div>
</section>

{/* ======================== LATEST NEWS SECTION (DARK) ======================== */}
<section className="news-section dark">
  <div className="news-header">
    <h2>Latest News & Updates</h2>
    <p>
      Insights, achievements, and announcements from our team
      shaping the future of technology.
    </p>
  </div>

  <div className="news-grid">
    {/* News 1 */}
    <div className="news-card">
      <div className="news-image">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="News 1"
        />
      </div>
      <div className="news-content">
        <span className="news-date">Jan 10, 2026</span>
        <h3>Major Telecom Infrastructure Project Awarded</h3>
        <p>
          We are proud to announce the award of a large-scale telecom
          infrastructure project in Qatar.
        </p>
        <a href="/news" className="news-link">
          Read More →
        </a>
      </div>
    </div>

    {/* News 2 */}
    <div className="news-card">
      <div className="news-image">
        <img
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
          alt="News 2"
        />
      </div>
      <div className="news-content">
        <span className="news-date">Dec 22, 2025</span>
        <h3>FTTx Network Expansion Completed</h3>
        <p>
          Our team has successfully completed a high-speed fiber
          expansion across multiple regions.
        </p>
        <a href="/news" className="news-link">
          Read More →
        </a>
      </div>
    </div>
  </div>

  <div className="news-cta">
    <a href="/news">View All News</a>
  </div>
</section>


      {/* ================= MAJOR CLIENTS ================= */}
      <section className="clients-section">
        <h2>Our Major Clients</h2>
  
  <div className="clients-track">
  {clientLogos.concat(clientLogos).map((logo, index) => (
    <img
      key={index}
      src={logo}
      alt={`Client Logo ${index + 1}`}
    />
  ))}
</div>

</section>


      {/* ================= CERTIFICATES ================= */}
      <section className="certificates-section">
  <div className="cert-overlay">
    <h2 className="cert-title">Technology Partners</h2>

    <div className="cert-tube">
      <div className="cert-track">
        {certificates.concat(certificates).map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Certificate ${index + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;
