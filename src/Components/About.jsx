import React, { useEffect, useState } from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import { client } from "../sanityClient";

// Import images
import heroImage from "../assets/j.png";
import ceoImage from "../assets/ceo.png";

import bgVision from "../assets/j.png";

const About = () => {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    awards: 0,
  });

  useEffect(() => {
    const targets = {
      experience: 20,
      projects: 350,
      clients: 120,
      awards: 15,
    };

    const interval = setInterval(() => {
      setCounts((prev) => ({
        experience: prev.experience < targets.experience ? prev.experience + 1 : prev.experience,
        projects: prev.projects < targets.projects ? prev.projects + 5 : prev.projects,
        clients: prev.clients < targets.clients ? prev.clients + 2 : prev.clients,
        awards: prev.awards < targets.awards ? prev.awards + 1 : prev.awards,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);
  const [testimonials, setTestimonials] = useState([]);

useEffect(() => {
  client
    .fetch(`*[_type == "testimonial"]`)
    .then((data) => setTestimonials(data))
    .catch((err) => console.error("Sanity fetch error:", err));
}, []);
  return (
    <div className="about-wrapper">

      {/* NAVBAR SPACER */}
      <div className="navbar-spacer"></div>

      {/* HERO */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="overlay"></div>
        <h1 className="hero-title">About Us</h1>
      </section>

      

      {/* Who We Are */}
<section className="who-we-are-ultra">
  <div className="who-we-are-wrapper">

    <div className="who-we-are-title">
      <span className="section-tag">ABOUT US</span>

      <h1 style={{ backgroundImage: `url(${heroImage})` }}>
        Who <br /> We <br /> Are
      </h1>

      <div className="title-glow"></div>
      <span className="giant-text">ORBIT</span>
    </div>

    <div className="who-we-are-card">
      <p>
        With over <strong>20 years of proven industry excellence</strong>,
        Orbit Electronic and Telecommunication is a trusted leader in
        Telecom, ELV, and IT Networking services across Qatar.
      </p>

      <p>
        Recognized as an <strong>approved Specialist Contractor</strong> for
        OOREDOO, QNBN, KAHRAMAA, and Qatar Petroleum, we deliver
        future-ready infrastructure aligned with global standards.
      </p>

      <p>
        Our success is driven by innovation, elite technical teams,
        and strong partnerships with major service providers
        and contracting organizations.
      </p>
    </div>

  </div>
</section>

      {/* KPI COUNTERS */}
      <section className="about-stats">
        <div className="stat-box">
          <h3>{counts.experience}+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-box">
          <h3>{counts.projects}+</h3>
          <p>Projects Delivered</p>
        </div>
        <div className="stat-box">
          <h3>{counts.clients}+</h3>
          <p>Clients Served</p>
        </div>
        <div className="stat-box">
          <h3>{counts.awards}+</h3>
          <p>Industry Awards</p>
        </div>
      </section>

    

{/* CEO Message */}
<section className="ceo-section">
  <div className="ceo-card">

    {/* LEFT: TEXT */}
    <div className="ceo-text">
      <span className="ceo-tag">Leadership Message</span>
      <h2>From Our CEO</h2>

      <blockquote>
        “As one of the top reliable IT & telecom system integrators in Qatar,
        our client value reflects our reputation. Their satisfaction is our
        priority and the key behind our success.”
      </blockquote>

      <p>
        As we expand our operations and build new partnerships, we continuously
        enhance the scope and quality of our services. Our core values are rooted
        in integrity, respect, friendliness, and trust.
      </p>

      <p>
        We deliver end-to-end telecom implementation, network optimization,
        operational support, and cost-effective data communication solutions
        designed to support future technologies and scalable growth.
      </p>

      <h4>— H.E Dahlan Al Hamad</h4>
      <span className="ceo-role">Chief Executive Officer</span>
    </div>

    {/* RIGHT: IMAGE */}
    <div className="ceo-image">
      <img src={ceoImage} alt="CEO" />
      <div className="image-overlay"></div>
    </div>

  </div>
</section>
      
      {/* VISION & MISSION */}
<section
  className="about-vision fixed-bg"
  style={{ backgroundImage: `url(${bgVision})` }}
>
  <div className="overlay"></div>

  <div className="vision-content">

    {/* LEFT – VISION */}
    <div className="vision-box">
      <h2>Our Vision</h2>
      <ul>
        <li>Provide every customer with high and enduring value.</li>
        <li>Stay ahead by providing innovative and unique solutions.</li>
        <li>Provide solutions and services that are economical, yet high in quality.</li>
      </ul>
    </div>

    {/* CENTER SEPARATOR */}
    <div className="vertical-separator"></div>

    {/* RIGHT – MISSION */}
    <div className="vision-box">
      <h2>Our Mission</h2>
      <ul>
        <li>
          Social responsibility by putting community first and supporting
          sustainable development initiatives.
        </li>
        <li>
          Taking responsibility and delegating authority aligned with
          Orbit’s traditional strength in quality service.
        </li>
        <li>
          Strong motivation to advance community development and drive
          excellence and progress.
        </li>
      </ul>
    </div>

  </div>
</section>




{/* TESTIMONIALS */}
      {/* TESTIMONIALS */}
<section className="testimonials">
  <h2>What Clients Say</h2>
  <div className="testimonial-grid">
    {testimonials.length > 0 ? (
      testimonials.map((t) => (
        <div className="testimonial" key={t._id}>
          <p>"{t.quote}"</p>
          <span>— {t.author}</span>
        </div>
      ))
    ) : (
      <p style={{ textAlign: "center" }}>No testimonials yet.</p>
    )}
  </div>
</section>


{/* TESTIMONIALS */}



      {/* SERVICES CTA */}
      <section className="about-services fixed-bg">
        <div className="overlay"></div>
        <div className="services-content">
          <h2>What We Do</h2>
          <p>
            We provide end-to-end digital services including strategy,
            engineering, and managed solutions.
          </p>
          <button onClick={() => navigate("/services")} className="secondary-btn">
            View Services
          </button>
        </div>
      </section>

    </div>
  );
};

export default About;
