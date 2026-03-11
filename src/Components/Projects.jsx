import React, { useState, useEffect } from "react";
import "./Project.css";

import gal1 from "../assets/gal1.jpeg";
import gal2 from "../assets/gal2.jpeg";
import gal3 from "../assets/gal3.jpeg";
import gal4 from "../assets/gal4.jpeg";
import gal5 from "../assets/gal5.jpeg";
import gal6 from "../assets/gal6.jpeg";
import gal7 from "../assets/gal7.jpeg";
import gal8 from "../assets/gal8.jpeg";
import gal9 from "../assets/gal9.jpeg";
import gal10 from "../assets/gal11.jpeg";

const projectData = [
  {
    id: 1,
    category: "Civil Telecom / OSP Services",
    title: "Telecom Tower Upgrade",
    description: "Upgraded tower network throughput and coverage.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    points: ["High Availability", "Secure Architecture", "Scalable Design", "24/7 Support"]
  },
  {
    id: 2,
    category: "Civil Telecom / OSP Services",
    title: "Data Center Installation",
    description: "Enterprise-level data center deployment.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    points: ["High Availability", "Secure Architecture", "Scalable Design", "24/7 Support"]
  },
  {
    id: 3,
    category: "Civil Telecom / OSP Services",
    title: "Fiber Backbone Expansion",
    description: "Extended fiber backbone across major cities.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    points: ["High Availability", "Secure Architecture", "Scalable Design", "24/7 Support"]
  },
  {
    id: 4,
    category: "ELV Systems",
    title: "Network Optimization",
    description: "Performance optimization for corporate clients.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    points: ["High Availability", "Secure Architecture", "Scalable Design", "24/7 Support"]
  },
  {
    id: 5,
    category: "ELV Systems",
    title: "WiFi Mesh Deployment",
    description: "Campus-wide WiFi mesh deployment.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    points: ["High Availability", "Secure Architecture", "Scalable Design", "24/7 Support"]
  },
  {
    id: 6,
    category: "ELV Systems",
    title: "4G to 5G Upgrade",
    description: "Smooth 5G rollout for telco partners.",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
    points: ["High Availability", "Secure Architecture", "Scalable Design", "24/7 Support"]
  }
];

const galleryData = [
  gal1,
  gal2,
  gal3,
  gal4,
  gal5,
  gal6,
  gal7,
  gal8,
  gal9,
  gal10
];

const Projects = () => {

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeProject, setActiveProject] = useState(null);

  const [images, setImages] = useState(galleryData);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(prev => {
        const reordered = [...prev];
        const moved = reordered.splice(1, 1)[0];
        reordered.push(moved);
        return reordered;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projectData
      : projectData.filter(p => p.category === activeCategory);

  return (
    <div className="projects-page">

      <section id="proj">

        <div className="navbar-spacer"></div>

        <section className="project-hero">
          <div className="hero-overlay"></div>
          <h1 className="hero-title">Projects</h1>
        </section>

        <section className="projects-section">

          <div className="project-tabs-container">
            {["all", "Civil Telecom / OSP Services", "ELV Systems", "FTTx Solutions", "IT Networking"].map(cat => (
              <span
                key={cat}
                className={`project-tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveProject(null);
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map(proj => (
              <div
                key={proj.id}
                className={`project-card ${activeProject === proj.id ? "expanded" : activeProject ? "shrink" : ""}`}
                onClick={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
              >
                <img src={`${proj.image}?auto=format&w=800`} alt={proj.title} />

                <div className="project-text">
                  <h3>{proj.title}</h3>

                  <ul className="project-points">
                    {proj.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>

                  {activeProject === proj.id && <p>{proj.description}</p>}
                </div>
              </div>
            ))}
          </div>

        </section>
      </section>

      <section id="gall">

        <section className="gallery-section">

          <div className="na"></div>
          <h2 className="gallery-title">Gallery</h2>

          <div className="gallery-grid">
            {images.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`Gallery ${i + 1}`} />
              </div>
            ))}
          </div>

          {activeImage && (
            <div className="gallery-modal" onClick={() => setActiveImage(null)}>
              <img src={activeImage} alt="Expanded view" />
            </div>
          )}

        </section>

      </section>

    </div>
  );
};

export default Projects;