import React, { useState, useEffect } from "react";
import "./News.css";
import { client, urlFor } from "../sanityClient";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "news"] | order(date desc)`)
      .then((data) => {
        setNewsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>
    );

  return (
    <>
      {/* HERO */}
      <section className="news-hero">
        <div className="news-hero-overlay">
          <h1>News & Insights</h1>
          <p>
            Strategic updates and technology-driven milestones shaping our
            enterprise growth.
          </p>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="news-section">
        <div className="news-subheading">All News</div>

        {newsData.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px" }}>
            No news articles found. Please add news in Sanity Studio.
          </p>
        ) : (
          <div className="news-grid">
            {newsData.map((item) => {
              const isActive = activeId === item._id;

              return (
                <article
                  key={item._id}
                  className={`news-card ${isActive ? "expanded" : ""}`}
                  onClick={() => setActiveId(isActive ? null : item._id)}
                >
                  <div
                    className="news-image"
                    style={{
                      backgroundImage: `url(${urlFor(item.image).width(600).url()})`,
                    }}
                  />

                  <div className="news-card-content">
                    <span className="news-date">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <h3>{item.title}</h3>
                    <p>
                      {isActive
                        ? item.content
                        : `${item.content.substring(0, 120)}...`}
                    </p>
                    <span className="news-toggle">
                      {isActive ? "Collapse" : "Read More"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default News;