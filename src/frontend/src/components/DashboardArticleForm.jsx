import React, { useState, useEffect } from "react";
import api from "../services/apiClient";

function DashboardArticleForm() {
  const [categories, setCategories] = useState([]);
  const [formats, setFormats] = useState([]);
  const [types, setTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [statusIds, setStatusIds] = useState({ draft: null, published: null });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Champs du formulaire
  const [form, setForm] = useState({
    titre: "",
    resume: "",
    contenu: "",
    categorie_id: "",
    format_id: "",
    type_article_id: "",
    image_couverture: null,
    status_id: "",
  });

  // Charger les listes (catégories, formats, types, statuts)
  useEffect(() => {
    Promise.all([
      api.get("/categories"),
      api.get("/formats"),
      api.get("/types-articles"),
      api.get("/statuses"),
    ])
      .then(([catRes, fmtRes, typRes, statRes]) => {
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setFormats(Array.isArray(fmtRes.data) ? fmtRes.data : []);
        setTypes(Array.isArray(typRes.data) ? typRes.data : []);
        setStatuses(Array.isArray(statRes.data) ? statRes.data : []);

        // valeurs par défaut
        setForm((prev) => ({
          ...prev,
          categorie_id: catRes.data?.[0]?.id || "",
          format_id: fmtRes.data?.[0]?.id || "",
          type_article_id: typRes.data?.[0]?.id || "",
          status_id: statRes.data?.[0]?.id || "",
        }));

        // détecter les IDs des statuts "brouillon" et "publié"
        const draft =
          statRes.data?.find((s) => (s.nom || "").toLowerCase().includes("brouillon"))?.id || null;
        const published =
          statRes.data?.find((s) => (s.nom || "").toLowerCase().includes("publi"))?.id || null;

        setStatusIds({ draft, published });
      })
      .catch(() => setMessage("❌ Impossible de charger les listes."))
      .finally(() => setLoading(false));
  }, []);

  // Gérer les champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Gérer le fichier
  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image_couverture: e.target.files[0] }));
  };

  // Soumission (Brouillon / Publié)
  const handleSubmit = async (e, statusId) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });

    // ✅ statut forcé selon le bouton cliqué
    if (statusId) formData.set("status_id", statusId);

    try {
      await api.post("/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(
        statusId === statusIds.published
          ? "✅ Article publié avec succès !"
          : "💾 Brouillon enregistré avec succès."
      );
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l’ajout de l’article.");
    }
  };

  if (loading) return <div>Chargement du formulaire...</div>;

  return (
    <div className="article-form card p-4 shadow-sm mt-4">
      <h3 className="mb-3 fw-bold" style={{ fontFamily: "Oswald, sans-serif" }}>
        📰 Ajouter un nouvel article
      </h3>

      <form>
        {/* Titre */}
        <div className="mb-3">
          <label className="form-label">Titre *</label>
          <input
            type="text"
            name="titre"
            className="form-control"
            value={form.titre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Résumé */}
        <div className="mb-3">
          <label className="form-label">Résumé *</label>
          <textarea
            name="resume"
            className="form-control"
            rows="2"
            value={form.resume}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Contenu */}
        <div className="mb-3">
          <label className="form-label">Contenu *</label>
          <textarea
            name="contenu"
            className="form-control"
            rows="6"
            value={form.contenu}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Catégorie */}
        <div className="mb-3">
          <label className="form-label d-block">Catégorie *</label>
          {categories.map((c) => (
            <div className="form-check" key={c.id}>
              <input
                className="form-check-input"
                type="radio"
                name="categorie_id"
                id={`cat-${c.id}`}
                value={c.id}
                checked={String(form.categorie_id) === String(c.id)}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`cat-${c.id}`}>
                {c.nom}
              </label>
            </div>
          ))}
        </div>

        {/* Format */}
        <div className="mb-3">
          <label className="form-label d-block">Format *</label>
          {formats.map((f) => (
            <div className="form-check" key={f.id}>
              <input
                className="form-check-input"
                type="radio"
                name="format_id"
                id={`fmt-${f.id}`}
                value={f.id}
                checked={String(form.format_id) === String(f.id)}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`fmt-${f.id}`}>
                {f.nom}
              </label>
            </div>
          ))}
        </div>

        {/* Type d’article */}
        <div className="mb-3">
          <label className="form-label d-block">Type d’article *</label>
          {types.map((t) => (
            <div className="form-check" key={t.id}>
              <input
                className="form-check-input"
                type="radio"
                name="type_article_id"
                id={`typ-${t.id}`}
                value={t.id}
                checked={String(form.type_article_id) === String(t.id)}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`typ-${t.id}`}>
                {t.nom}
              </label>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Image de couverture</label>
          <input
            type="file"
            name="image_couverture"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Boutons */}
        <div className="d-flex gap-3 mt-4">
          <button
            type="button"
            className="btn btn-secondary px-4"
            onClick={(e) => handleSubmit(e, statusIds.draft)}
          >
            Enregistrer le brouillon
          </button>

          <button
            type="button"
            className="btn text-white px-4"
            style={{
              backgroundColor: "#E6007E",
              borderRadius: "30px",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={(e) => handleSubmit(e, statusIds.published)}
          >
            Publier
          </button>
        </div>
      </form>

      {message && (
        <div className="alert alert-info mt-3" style={{ fontFamily: "Poppins" }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default DashboardArticleForm;
