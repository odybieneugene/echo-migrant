import React from "react";
import "../styles/components/see-also.css";
import video1 from "../assets/images/article1.jpg";
import video2 from "../assets/images/article2.jpg";
import video3 from "../assets/images/article3.jpg";
import video4 from "../assets/images/hero.jpg";

function SeeAlso() {
  const videos = [
    {
      image: video1,
      title: "Solidarité à la frontière : témoignages en direct",
      category: "Reportage",
    },
    {
      image: video2,
      title: "Les visages de l’exil — série documentaire",
      category: "Documentaire",
    },
    {
      image: video3,
      title: "En mer : opérations de sauvetage humanitaire",
      category: "Enquête",
    },
    {
      image: video4,
      title: "Vivre sans papiers en Europe — le quotidien caché",
      category: "Témoignage",
    },
  ];

  return (
    <section className="see-also-section py-5">
      <div className="container">
        <h2 className="section-title mb-4">À voir aussi</h2>
        <div className="row g-4">
          {videos.map((video, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="video-story-card shadow-sm">
                <div className="video-wrapper">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="video-thumbnail"
                  />
                  <div className="video-overlay">
                    <span className="badge category-badge">{video.category}</span>
                  </div>
                </div>
                <h5 className="video-title mt-2">{video.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeeAlso;
