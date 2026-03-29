import React, { useState, useEffect } from "react";
import "./Service.css";
import { client, urlFor } from "../sanityClient";

const Service = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, testimonialsData] = await Promise.all([
          client.fetch(`*[_type == "service"] | order(order asc)`),
          client.fetch(`*[_type == "testimonial"]`),
        ]);
        setServices(servicesData);
        setTestimonials(testimonialsData);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>;

  return (
    <div className="service-page">

      <section id="all">
        <div className="nav-space"></div>

        {/* Hero Section */}
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>Our Services</h1>
            <p>
              Delivering reliable, scalable, and future-ready telecom and IT
              solutions through operational excellence.
            </p>
          </div>
        </section>
      </section>

      {/* Services Grid */}
      <section className="service-grid" id="all">
        {services.length > 0 ? (
          services.map((item, index) => (
            <div
              key={item._id}
              id={item.title.toLowerCase().replace(/\s+/g, "-")}
              className={`service-row ${activeRow === index ? "active" : ""}`}
              onClick={() => setActiveRow(activeRow === index ? null : index)}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="service-image">
                    <img
                      src={urlFor(item.image).width(800).url()}
                      alt={item.title}
                    />
                  </div>
                  <div className="service-content">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="service-content">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                  <div className="service-image">
                    <img
                      src={urlFor(item.image).width(800).url()}
                      alt={item.title}
                    />
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "40px" }}>
            No services found. Please add services in Sanity Studio.
          </p>
        )}
      </section>

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

      {/* CTA */}
      <section className="service-cta">
        <h2>Ready to Get Started?</h2>
        <p>
          Connect with our team to design solutions aligned with your strategic
          objectives.
        </p>
        <button>Contact Us</button>
      </section>

    </div>
  );
};

export default Service;