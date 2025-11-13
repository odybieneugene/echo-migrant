import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ import essentiel
import api from "../services/apiClient";
import { getImageUrl } from "../config/constants";

function HeroSection() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/articles?limit=10") // Récupère les 10 articles les plus récents (optimisé)
      .then((res) => {
        // Trier : article en vedette d'abord, puis les 2 plus récents
        const featured = res.data.find(article => article.est_en_vedette);
        const others = res.data.filter(article => !article.est_en_vedette).slice(0, 2);

        // Si aucun article en vedette, prendre le plus récent comme principal
        if (featured) {
          setArticles([featured, ...others]);
        } else {
          setArticles(res.data.slice(0, 3));
        }
      })
      .catch(() => setError("Impossible de charger les articles à la une"));
  }, []);

  if (error) {
    return <div className="container my-5 text-muted">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="container my-5 text-muted">Chargement...</div>;
  }

  const [mainArticle, ...sideArticles] = articles;
  // Limiter à maximum 2 articles dans la sidebar
  const limitedSideArticles = sideArticles.slice(0, 2);

  return (
    <section className="container my-5">
      {/* Bandeau titre */}
      <h5
        className="fw-bold text-white d-inline-block px-3 py-2 mb-3"
        style={{
          backgroundColor: "#E6007E",
          fontFamily: "Oswald, sans-serif",
          textTransform: "uppercase",
        }}
      >
        À LA UNE
      </h5>

      <div className="row">
        {/* Article principal (gauche) */}
        <div className="col-lg-8 mb-4">
          <Link to={`/article/${mainArticle.id}`} className="text-decoration-none text-dark">
            <h2
              className="fw-bold mb-3"
              style={{ fontFamily: "Oswald, sans-serif", lineHeight: "1.2" }}
            >
              {mainArticle.titre}
            </h2>
            <img
              src={getImageUrl(mainArticle.image_couverture, "/src/assets/images/article1.jpg")}
              alt={mainArticle.titre}
              className="img-fluid rounded mb-3 shadow-sm w-100"
              style={{ objectFit: "cover", maxHeight: "500px" }}
            />
            <p
              className="text-muted"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {mainArticle.resume ||
                "Découvrez notre dossier spécial sur les politiques migratoires et leurs impacts humains."}
            </p>
          </Link>
        </div>

        {/* Articles secondaires (droite) */}
        <div className="col-lg-4 d-flex flex-column justify-content-between">
          {limitedSideArticles.map((article, index) => (
            <Link
              to={`/article/${article.id}`}
              key={index}
              className="text-decoration-none text-dark"
            >
              <div
                className="d-flex flex-column mb-4 pb-4"
                style={{
                  borderBottom:
                    index === limitedSideArticles.length - 1
                      ? "none"
                      : "1px solid #ddd",
                }}
              >
                <img
                  src={getImageUrl(
                    article.image_couverture,
                    `/src/assets/images/article${index + 2}.jpg`
                  )}
                  alt={article.titre}
                  className="img-fluid rounded mb-2 shadow-sm"
                  style={{ objectFit: "cover", maxHeight: "180px" }}
                />
                <p
                  className="fw-semibold mb-2"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontSize: "1rem",
                  }}
                >
                  {article.titre}
                </p>
                <p
                  className="text-muted small"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {article.resume?.slice(0, 100) || ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
