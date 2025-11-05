import React from "react";
import "../styles/components/featured-videos.css";
import video1 from "../assets/images/article1.jpg";
import video2 from "../assets/images/article2.jpg";
import video3 from "../assets/images/article3.jpg";

function FeaturedVideos() {
  return (
    <section className="featured-videos container my-5">
      <h2 className="section-title mb-4">Reportages & vidéos à la une</h2>

      <div className="row g-4">
        {/* Vidéo principale */}
        <div className="col-lg-6">
          <div className="video-card large shadow-sm">
            <img src={video1} alt="Reportage principal" className="video-img" />
            <div className="video-overlay">
              <span className="badge video-badge">Reportage</span>
              <h3 className="video-title">
                Au cœur des missions humanitaires en Méditerranée
              </h3>
            </div>
          </div>
        </div>

        {/* Deux vidéos secondaires */}
        <div className="col-lg-6 d-flex flex-column justify-content-between">
          <div className="video-card small shadow-sm mb-3">
            <img src={video2} alt="Vidéo secondaire 1" className="video-img" />
            <div className="video-overlay">
              <span className="badge video-badge yellow">Focus</span>
              <h4 className="video-title">
                Le parcours invisible des réfugiés en Europe
              </h4>
            </div>
          </div>

          <div className="video-card small shadow-sm">
            <img src={video3} alt="Vidéo secondaire 2" className="video-img" />
            <div className="video-overlay">
              <span className="badge video-badge">Enquête</span>
              <h4 className="video-title">
                Ces villes françaises qui accueillent autrement
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedVideos;
