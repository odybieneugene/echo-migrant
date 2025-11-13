import React, { useState, useEffect } from "react";
import api from "../services/apiClient";
import "../styles/pages/dashboard.css";
import DashboardArticleForm from "../components/DashboardArticleForm";

function Dashboard() {
  const [section, setSection] = useState("overview");
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState({ utilisateurs: 0, dons: 0 });
  const [editingArticleId, setEditingArticleId] = useState(null);

  useEffect(() => {
    // Charger TOUS les articles (brouillons + publiés) pour le Dashboard
    api.get("/articles-admin").then((res) => setArticles(res.data));

    // Charger le nombre d'utilisateurs
    api.get("/utilisateurs").then((res) => {
      setStats(prev => ({ ...prev, utilisateurs: res.data.length }));
    }).catch(() => console.error("Impossible de charger les utilisateurs"));

    // Charger le nombre de dons
    api.get("/dons").then((res) => {
      setStats(prev => ({ ...prev, dons: res.data.length }));
    }).catch(() => console.error("Impossible de charger les dons"));
  }, []);

  // Fonction pour recharger la liste des articles après création
  const refreshArticles = () => {
    api.get("/articles-admin").then((res) => setArticles(res.data));
    setEditingArticleId(null);
  };

  // Fonction pour modifier un article
  const handleEdit = (articleId) => {
    setEditingArticleId(articleId);
    // Faire défiler vers le formulaire
    setTimeout(() => {
      document.querySelector('.article-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Fonction pour supprimer un article
  const handleDelete = async (articleId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return;
    }

    try {
      await api.delete(`/articles/${articleId}`);
      alert("✅ Article supprimé avec succès");
      refreshArticles();
    } catch (error) {
      alert("❌ Erreur lors de la suppression: " + (error.response?.data?.message || error.message));
    }
  };

  const renderSection = () => {
    switch (section) {
      case "overview":
        return (
          <>
            <h1>Tableau de bord</h1>
            <div className="stats-grid">
              <div
                className="stat-card clickable"
                onClick={() => setSection("articles")}
                style={{ cursor: 'pointer' }}
              >
                <h3>{articles.length}</h3>
                <p>Articles publiés</p>
              </div>
              <div
                className="stat-card clickable"
                onClick={() => setSection("users")}
                style={{ cursor: 'pointer' }}
              >
                <h3>{stats.utilisateurs}</h3>
                <p>Utilisateurs actifs</p>
              </div>
              <div
                className="stat-card clickable"
                onClick={() => setSection("dons")}
                style={{ cursor: 'pointer' }}
              >
                <h3>{stats.dons}</h3>
                <p>Dons reçus</p>
              </div>
            </div>

            {/* Tableau des articles */}
            <section className="article-list mt-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>📰 Articles récents</h2>
                <button
                  className="btn btn-success"
                  onClick={() => setSection("articles")}
                  style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ➕ Ajouter un article
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Statut</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.slice(0, 5).map((article) => {
                    const isPublished = article.status?.nom?.toLowerCase().includes('publi');
                    const statusColor = isPublished ? '#28a745' : '#ffc107';
                    const statusIcon = isPublished ? '✅' : '📝';

                    return (
                      <tr key={article.id}>
                        <td>{article.titre}</td>
                        <td>{article.categorie?.nom || "–"}</td>
                        <td>
                          <span
                            style={{
                              color: statusColor,
                              fontWeight: 'bold',
                              fontSize: '0.9rem'
                            }}
                          >
                            {statusIcon} {article.status?.nom || "–"}
                          </span>
                        </td>
                        <td>
                          {new Date(article.created_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(article.id)}
                          >
                            ✏️ Modifier
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(article.id)}
                          >
                            🗑️ Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button
                className="btn btn-primary mt-3"
                onClick={() => setSection("articles")}
              >
                Voir tous les articles →
              </button>
            </section>
          </>
        );

      case "articles":
        return (
          <>
            <section className="article-list">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>📰 Liste des articles</h2>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setEditingArticleId(null);
                    setTimeout(() => {
                      document.querySelector('.article-form')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ➕ Ajouter un article
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Statut</th>
                    <th>Permalien</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => {
                    const permalink = `${window.location.origin}/article/${article.id}`;
                    const isPublished = article.status?.nom?.toLowerCase().includes('publi');
                    const statusColor = isPublished ? '#28a745' : '#ffc107';
                    const statusIcon = isPublished ? '✅' : '📝';

                    return (
                      <tr key={article.id}>
                        <td>{article.titre}</td>
                        <td>{article.categorie?.nom || "–"}</td>
                        <td>
                          <span
                            style={{
                              color: statusColor,
                              fontWeight: 'bold',
                              fontSize: '0.9rem'
                            }}
                          >
                            {statusIcon} {article.status?.nom || "–"}
                          </span>
                        </td>
                        <td>
                          <a
                            href={permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-decoration-none"
                            style={{ fontSize: "0.85rem" }}
                          >
                            {permalink}
                          </a>
                        </td>
                        <td>
                          {new Date(article.created_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(article.id)}
                          >
                            ✏️ Modifier
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(article.id)}
                          >
                            🗑️ Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>

            {/* Formulaire d'ajout/modification d'article */}
            <DashboardArticleForm
              onArticleCreated={refreshArticles}
              editingArticleId={editingArticleId}
              onCancelEdit={() => setEditingArticleId(null)}
            />
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
