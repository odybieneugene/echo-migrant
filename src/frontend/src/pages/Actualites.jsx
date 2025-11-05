import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/actualites.css";
import api from "../services/apiClient";
import Navbar from "../components/Navbar";
import AVoir from "../components/AVoir";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

function Actualites() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/articles")
      .then((res) => setArticles(res.data))
      .catch(() => setError("Impossible de charger les actualités."));
  }, []);

  return (
    <>
      <Navbar />

      <section className="actualites-header text-center py-5">
        <h1 className="actualites-title">ACTUALITÉS</h1>
        <div className="title-underline"></div>
      </section>

      <section className="actualites-section container py-5">
        {error && <p className="text-muted text-center">{error}</p>}

        <div className="row">
          {articles.map((article) => (
            <div key={article.id} className="col-12 col-md-4 mb-5">
              <div className="article-card shadow-sm">
                <img
                  src={article.image_couverture || "/src/assets/images/article1.jpg"}
                  alt={article.titre}
                  className="article-image"
                />
                <div className="article-content p-3">
                  <span className="badge article-category mb-2">
                    {article.categorie?.nom || "Actualité"}
                  </span>
                  <h5 className="article-title">{article.titre}</h5>
                  <p className="article-resume">
                    {article.resume?.length > 120
                      ? article.resume.substring(0, 120) + "..."
                      : article.resume}
                  </p>
                  <Link
                    to={`/article/${article.id}`}
                    className="btn btn-readmore mt-2"
                  >
                    Lire plus
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <AVoir />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Actualites;
