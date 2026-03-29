import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { client, urlFor } from "../sanityClient";

// Client logos (still local)
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

// Certificates (still local)
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

const clientLogos = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12];
const certificates = [cert1, cert2, cert3, cert4, cert5, cert6, cert7, cert8, cert9, cert10, cert11];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slidesData, projectsData, newsData] = await Promise.all([
          client.fetch(`*[_type == "carousal"] | order(order asc)`),
          client.fetch(`*[_type == "featuredProject"] | order(order asc)`),
          client.fetch(`*[_type == "news"] | order(date desc)[0...2]`),
        ]);
        setSlides(slidesData);
        setFeaturedProjects(projectsData);
        setNews(newsData);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-slide every 5s
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>;

  return (
    <div className="home-wrapper">
      {/* NAVBAR SPACER */}
      <div className="navbar-spacer" />

      {/* ===== HERO CAROUSEL ===== */}
      <section className="hero-carousel">
        {slides.length > 0 ? (
          <>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                style={{ backgroundImage: `url(${urlFor(slide.image).url()})` }}
              />
            ))}

            <div className="carousel-overlay">
              <div className="carousel-content" key={currentSlide}>
                <h1 className="carousel-title">{slides[currentSlide].title}</h1>
                <p className="carousel-description">{slides[currentSlide].description}</p>
                <Link to="/About" className="explore-btn">Explore More</Link>
              </div>
            </div>

            <button className="carousel-arrow left" onClick={prevSlide} />
            <button className="carousel-arrow right" onClick={nextSlide} />

            <div className="carousel-dots">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </>
        ) : (
          <div style={{ padding: "200px", textAlign: "center", color: "white" }}>
            No carousel slides found. Please add slides in Sanity Studio.
          </div>
        )}
      </section>

      {/* ======================== OUR SERVICES ======================== */}
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

        <div className="corp-services-cta">
          <a href="/services" className="corp-services-btn">Know More →</a>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-choose">
        <div className="why-overlay">
          <div className="why-content-left">
            <h2>Why Choose Us</h2>
            <Link to="/about" className="explore-btn">Discover More</Link>
          </div>
          <div className="why-box">
            <ul>
              <li>Proven Industry Expertise</li>
              <li>End-to-End Solution Delivery</li>
              <li>Quality, Reliability & Compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ======================== FEATURED PROJECTS ======================== */}
      <section className="projects-section">
        <div className="projects-header">
          <h2>Our Featured Projects</h2>
          <p>
            Delivering innovative telecom, networking, and infrastructure solutions
            that create real impact.
          </p>
        </div>

        <div className="projects-grid">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((proj, index) => (
              <div className="project-card" key={index}>
                <img
                  src={urlFor(proj.image).width(800).url()}
                  alt={proj.title}
                />
                <div className="project-overlay">
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <a href="/projects" className="project-btn">View Project →</a>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No featured projects yet.</p>
          )}
        </div>

        <div className="projects-cta">
          <a href="/projects">Explore All Projects</a>
        </div>
      </section>

      {/* ======================== LATEST NEWS ======================== */}
      <section className="news-section dark">
        <div className="news-header">
          <h2>Latest News & Updates</h2>
          <p>
            Insights, achievements, and announcements from our team
            shaping the future of technology.
          </p>
        </div>

        <div className="news-grid">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div className="news-card" key={index}>
                <div className="news-image">
                  <img
                    src={urlFor(item.image).width(600).url()}
                    alt={item.title}
                  />
                </div>
                <div className="news-content">
                  <span className="news-date">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.content.substring(0, 120)}...</p>
                  <a href="/news" className="news-link">Read More →</a>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "white" }}>No news yet.</p>
          )}
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
            <img key={index} src={logo} alt={`Client Logo ${index + 1}`} />
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
                <img key={index} src={logo} alt={`Certificate ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;