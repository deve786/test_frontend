import React, { useState, useEffect } from "react";
import "./Project.css";
import { client, urlFor } from "../sanityClient";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeProject, setActiveProject] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projects, gallery] = await Promise.all([
          client.fetch(`*[_type == "project"] | order(_createdAt asc)`),
          client.fetch(`*[_type == "galleryImage"] | order(order asc)`),
        ]);
        setProjectData(projects);
        setGalleryData(gallery);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projectData
      : projectData.filter((p) => p.category === activeCategory);

  if (loading) return <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>;

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
            {["all", "Civil Telecom / OSP Services", "ELV Systems", "FTTx Solutions", "IT Networking"].map((cat) => (
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
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => (
                <div
                  key={proj._id}
                  className={`project-card ${
                    activeProject === proj._id
                      ? "expanded"
                      : activeProject
                      ? "shrink"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveProject(
                      activeProject === proj._id ? null : proj._id
                    )
                  }
                >
                  <img
                    src={urlFor(proj.image).width(800).url()}
                    alt={proj.title}
                  />
                  <div className="project-text">
                    <h3>{proj.title}</h3>
                    <ul className="project-points">
                      {proj.points && proj.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    {activeProject === proj._id && <p>{proj.description}</p>}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", padding: "40px" }}>
                No projects found. Please add projects in Sanity Studio.
              </p>
            )}
          </div>
        </section>
      </section>

      {/* GALLERY */}
      <section id="gall">
        <section className="gallery-section">
          <div className="na"></div>
          <h2 className="gallery-title">Gallery</h2>

          <div className="gallery-grid">
            {galleryData.length > 0 ? (
              galleryData.map((img, i) => (
                <div
                  key={img._id}
                  className="gallery-item"
                  onClick={() => setActiveImage(urlFor(img.image).url())}
                >
                  <img
                    src={urlFor(img.image).width(600).url()}
                    alt={img.caption || `Gallery ${i + 1}`}
                  />
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", padding: "40px" }}>
                No gallery images yet. Please add images in Sanity Studio.
              </p>
            )}
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