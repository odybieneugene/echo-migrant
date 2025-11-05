import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/apiClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/pages/articleDetail.css";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch(() => setError("Impossible de charger l'article."));

    api
      .get(`/articles?limit=3`)
      .then((res) => setRelatedArticles(res.data))
      .catch(() => console.log("Erreur chargement articles liés"));
  }, [id]);

  if (error) return <div className="container my-5 text-muted">{error}</div>;
  if (!article) return <div className="container my-5 text-muted">Chargement...</div>;

  return (
    <>
      <Navbar />

      {/* Image de couverture */}
      <section className="container my-4">
        <img
          src={article.image_couverture || "/src/assets/images/article1.jpg"}
          alt={article.titre}
          className="img-fluid w-100 rounded shadow-sm"
          style={{ maxHeight: "480px", objectFit: "cover" }}
        />
      </section>

      {/* Contenu principal */}
      <section className="container my-4">
        <span
          className="badge px-3 py-2"
          style={{ backgroundColor: "#FBBA00", color: "#000" }}
        >
          {article.categorie?.nom || "Actualités"}
        </span>
        <h1 className="fw-bold mt-3" style={{ fontFamily: "Oswald, sans-serif" }}>
          {article.titre}
        </h1>
        <p className="text-muted mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          {article.auteur?.nom || "Rédaction Echo Migrant"} {" • "}
          {new Date(article.created_at).toLocaleDateString("fr-FR")}
        </p>
        <div className="article-content" style={{ fontFamily: "Poppins, sans-serif" }}>
          {article.contenu}
        </div>
      </section>

      {/* Articles liés */}
      <section className="container my-5">
        <h3 className="fw-bold mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
          À lire aussi
        </h3>
        <div className="row">
          {relatedArticles.slice(0, 3).map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card border-0 shadow-sm h-100">
                <img
                  src={item.image_couverture || "/src/assets/images/article2.jpg"}
                  className="card-img-top"
                  alt={item.titre}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    {item.titre}
                  </h5>
                  <p className="card-text text-muted">{item.resume}</p>
                  <Link
                    to={`/article/${item.id}`}
                    className="btn btn-sm text-white"
                    style={{ backgroundColor: "#E6007E", borderRadius: "20px" }}
                  >
                    Lire plus
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ArticleDetail;

