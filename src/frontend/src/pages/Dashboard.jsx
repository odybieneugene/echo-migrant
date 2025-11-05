import React, { useState, useEffect } from "react";
import api from "../services/apiClient";
import "../styles/pages/dashboard.css";
import DashboardArticleForm from "../components/DashboardArticleForm";

function Dashboard() {
  const [section, setSection] = useState("overview");
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState({ utilisateurs: 0, dons: 0 });

  useEffect(() => {
    // Charger les articles au démarrage
    api.get("/articles").then((res) => setArticles(res.data));
    // Plus tard : récupérer stats, utilisateurs, dons
  }, []);

  // Fonction pour recharger la liste des articles après création
  const refreshArticles = () => {
    api.get("/articles").then((res) => setArticles(res.data));
  };

  const renderSection = () => {
    switch (section) {
      case "overview":
        return (
          <>
            <h1>Tableau de bord</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{articles.length}</h3>
                <p>Articles publiés</p>
              </div>
              <div className="stat-card">
                <h3>{stats.utilisateurs}</h3>
                <p>Utilisateurs actifs</p>
              </div>
              <div className="stat-card">
                <h3>{stats.dons}</h3>
                <p>Dons reçus</p>
              </div>
            </div>
          </>
        );

      case "articles":
        return (
          <>
            <section className="article-list">
              <h2>📰 Liste des articles</h2>
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td>{article.titre}</td>
                      <td>{article.categorie?.nom || "–"}</td>
                      <td>
                        {new Date(article.created_at).toLocaleDateString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Formulaire d’ajout d’article */}
            <DashboardArticleForm onArticleCreated={refreshArticles} />
          </>
        );

      case "users":
        return <h2>👥 Gestion des utilisateurs (à venir)</h2>;

      case "dons":
        return <h2>💳 Gestion des dons (à venir)</h2>;

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">ÉCHO MIGRANT</h2>
        <nav>
          <ul>
            <li
              className={section === "overview" ? "active" : ""}
              onClick={() => setSection("overview")}
            >
              📊 Tableau de bord
            </li>
            <li
              className={section === "articles" ? "active" : ""}
              onClick={() => setSection("articles")}
            >
              📰 Articles
            </li>
            <li
              className={section === "users" ? "active" : ""}
              onClick={() => setSection("users")}
            >
              👥 Utilisateurs
            </li>
            <li
              className={section === "dons" ? "active" : ""}
              onClick={() => setSection("dons")}
            >
              💳 Dons
            </li>
            <li onClick={() => (window.location.href = "/")}>
              ↩️ Retour au site
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="main-content">{renderSection()}</main>
    </div>
  );
}

export default Dashboard;
