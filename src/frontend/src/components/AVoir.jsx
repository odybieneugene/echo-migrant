import React from "react";
import "../styles/components/avoir.css";

// Importation des vidéos locales
import video1 from "../assets/images/video1.mp4";
import video2 from "../assets/images/video2.mp4";
import video3 from "../assets/images/video3.mp4";
import video4 from "../assets/images/video4.mp4";

function AVoir() {
  const videos = [
    { id: 1, src: video1, titre: "Join the conversation! Join the conversation!" },
    { id: 2, src: video2, titre: "Join the conversation! Join the conversation!" },
    { id: 3, src: video3, titre: "Join the conversation! Join the conversation!" },
    { id: 4, src: video4, titre: "Join the conversation! Join the conversation!" },
  ];

  return (
    <section className="a-voir-section py-5">
      <div className="container">
        <h3 className="a-voir-title mb-4">À VOIR</h3>
        <div className="row justify-content-center">
          {videos.map((vid) => (
            <div key={vid.id} className="col-6 col-md-3 mb-4">
              <div className="video-card position-relative">
                <video
                  src={vid.src}
                  className="video-story rounded-3 shadow-sm"
                  muted
                  loop
                  //autoPlay
                  playsInline
                />
                <div className="overlay-text">
                  <p>{vid.titre}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AVoir;
