import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/apiClient";
import { getImageUrl } from "../config/constants";
import placeholder from "../assets/images/article1.jpg";
import "../styles/components/recent-articles.css";

function RecentArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api
      .get("/articles", { params: { limit: 3 } })
      .then((res) => setArticles(res.data))
      .catch(() => console.error("Erreur lors du chargement des articles."));
  }, []);

  return (
    <section className="recent-articles container my-5">
      <h2 className="section-title mb-4">Derniers articles</h2>

      <div className="row">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="col-md-4 mb-4">
              <div className="article-card shadow-sm h-100">
                <img
                  src={getImageUrl(article.image_couverture, placeholder)}
                  alt={article.titre}
                  className="article-img"
                />
                <div className="article-body">
                  <h5 className="article-title">{article.titre}</h5>
                  <p className="article-resume">
                    {article.resume
                      ? article.resume.slice(0, 120) + "..."
                      : "Découvrez nos dernières analyses et enquêtes sur les politiques migratoires."}
                  </p>
                  <Link
                    to={`/article/${article.id}`}
                    className="article-btn"
                  >
                    Lire plus
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Chargement des articles...</p>
        )}
      </div>
    </section>
  );
}

export default RecentArticles;
