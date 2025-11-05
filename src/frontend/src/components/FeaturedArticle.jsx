import React, { useEffect, useState } from "react";
import api from "../services/apiClient";

function FeaturedArticle() {
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/articles?limit=1")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setFeaturedArticle(data);
      })
      .catch(() => setError("Impossible de charger l’article vedette."));
  }, []);

  if (error) {
    return <div className="container my-5 text-danger">{error}</div>;
  }

  if (!featuredArticle) {
    return <div className="container my-5 text-muted">Chargement...</div>;
  }

  return (
    <section className="container my-5">
      <div className="row align-items-center">
        {/* Image à gauche */}
        <div className="col-lg-6 mb-4">
          <img
            src={featuredArticle.image_couverture || "https://via.placeholder.com/600x400"}
            alt={featuredArticle.titre}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* Texte à droite */}
        <div className="col-lg-6">
          <span className="badge mb-2 px-3 py-2 bg-warning text-dark">
            À la une
          </span>
          <h2 className="fw-bold" style={{ fontFamily: "Oswald, sans-serif" }}>
            {featuredArticle.titre}
          </h2>
          <p className="text-muted" style={{ fontFamily: "Poppins, sans-serif" }}>
            {featuredArticle.resume ||
              "Cet article explore les récents développements autour des politiques migratoires et de leurs enjeux humanitaires."}
          </p>
          <a
            href={`/article/${featuredArticle.id}`}
            className="btn btn-sm text-white"
            style={{
              backgroundColor: "#E6007E",
              borderRadius: "30px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Lire plus
          </a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArticle;
