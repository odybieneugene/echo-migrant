import React, { useState, useEffect } from "react";
import api from "../services/apiClient";
import { getImageUrl } from "../config/constants";

function DashboardArticleForm({ onArticleCreated, editingArticleId, onCancelEdit }) {
  const [categories, setCategories] = useState([]);
  const [formats, setFormats] = useState([]);
  const [types, setTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [tagsSeo, setTagsSeo] = useState([]);
  const [statusIds, setStatusIds] = useState({ draft: null, published: null });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // État pour empêcher double soumission
  const [existingImage, setExistingImage] = useState(null);

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
    meta_titre: "",
    meta_description: "",
    meta_keywords: "",
    tag_seo_ids: [],
    est_en_vedette: false,
  });

  // Charger les listes (catégories, formats, types, statuts, tags SEO)
  useEffect(() => {
    Promise.all([
      api.get("/categories"),
      api.get("/formats"),
      api.get("/types-articles"),
      api.get("/statuses"),
      api.get("/tags-seo"),
    ])
      .then(([catRes, fmtRes, typRes, statRes, tagsRes]) => {
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setFormats(Array.isArray(fmtRes.data) ? fmtRes.data : []);
        setTypes(Array.isArray(typRes.data) ? typRes.data : []);
        setStatuses(Array.isArray(statRes.data) ? statRes.data : []);
        setTagsSeo(Array.isArray(tagsRes.data) ? tagsRes.data : []);

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

        console.log("📊 Status IDs détectés:", { draft, published, allStatuses: statRes.data });
        setStatusIds({ draft, published });
      })
      .catch(() => setMessage("❌ Impossible de charger les listes."))
      .finally(() => setLoading(false));
  }, []);

  // Charger l'article à modifier quand editingArticleId change
  useEffect(() => {
    if (editingArticleId) {
      api.get(`/articles/${editingArticleId}`)
        .then((res) => {
          const article = res.data;
          setForm({
            titre: article.titre || "",
            resume: article.resume || "",
            contenu: article.contenu || "",
            categorie_id: article.categorie_id || "",
            format_id: article.format_id || "",
            type_article_id: article.type_article_id || "",
            image_couverture: null,
            status_id: article.status_id || "",
            meta_titre: article.meta_titre || "",
            meta_description: article.meta_description || "",
            meta_keywords: article.meta_keywords || "",
            tag_seo_ids: article.tags_seo?.map(t => t.id) || [],
            est_en_vedette: article.est_en_vedette || false,
          });
          setExistingImage(article.image_couverture);
          setMessage("");
        })
        .catch((err) => {
          setMessage("❌ Impossible de charger l'article: " + (err.response?.data?.message || err.message));
        });
    } else {
      // Réinitialiser le formulaire
      setForm({
        titre: "",
        resume: "",
        contenu: "",
        categorie_id: categories[0]?.id || "",
        format_id: formats[0]?.id || "",
        type_article_id: types[0]?.id || "",
        image_couverture: null,
        status_id: statuses[0]?.id || "",
        meta_titre: "",
        meta_description: "",
        meta_keywords: "",
        tag_seo_ids: [],
        est_en_vedette: false,
      });
      setExistingImage(null);
      setMessage("");
    }
  }, [editingArticleId, categories, formats, types, statuses]);

  // Gérer les champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Gérer le fichier
  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image_couverture: e.target.files[0] }));
  };

  // Gérer la sélection des tags SEO
  const handleTagToggle = (tagId) => {
    setForm((prev) => ({
      ...prev,
      tag_seo_ids: prev.tag_seo_ids.includes(tagId)
        ? prev.tag_seo_ids.filter(id => id !== tagId)
        : [...prev.tag_seo_ids, tagId]
    }));
  };

  // Soumission (Brouillon / Publié)
  const handleSubmit = async (e, statusId) => {
    e.preventDefault();

    // Empêcher double soumission
    if (submitting) {
      console.warn("⚠️ Soumission déjà en cours, requête ignorée");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();

    console.log("🚀 Soumission avec statusId:", statusId, "statusIds:", statusIds);
    console.log("📝 Mode:", editingArticleId ? "MODIFICATION" : "CREATION", "Article ID:", editingArticleId);
    console.log("📋 Données du formulaire:", form);

    Object.keys(form).forEach((key) => {
      if (key === 'image_couverture') {
        // Image : envoyer UNIQUEMENT si un nouveau fichier est sélectionné
        if (form[key] && form[key] instanceof File) {
          formData.append(key, form[key]);
        }
        // Si null ou undefined, on ne l'envoie pas (garde l'image existante)
      } else if (key === 'tag_seo_ids') {
        // Envoyer les tags SEO en tant que tableau
        form[key].forEach(tagId => {
          formData.append('tag_seo_ids[]', tagId);
        });
      } else if (key === 'status_id') {
        // Ne pas envoyer status_id ici, il sera forcé plus bas
        // selon le bouton cliqué (ligne 177)
      } else if (key === 'est_en_vedette') {
        // Envoyer explicitement comme booléen (0 ou 1)
        // Laravel accepte 0/1 pour les champs boolean
        formData.append(key, form[key] ? '1' : '0');
      } else if (form[key] !== null && form[key] !== undefined && form[key] !== "") {
        // Tous les autres champs : envoyer seulement s'ils ont une valeur
        formData.append(key, form[key]);
      } else if (editingArticleId && (key === 'resume' || key === 'meta_titre' || key === 'meta_description' || key === 'meta_keywords')) {
        // En mode modification, envoyer les champs optionnels même vides
        formData.append(key, form[key] || "");
      }
    });

    // ✅ statut forcé selon le bouton cliqué
    if (statusId) {
      console.log("✅ Setting status_id to:", statusId);
      formData.set("status_id", statusId);
    }

    // Pour Laravel: utiliser _method=PUT pour la modification
    if (editingArticleId) {
      formData.append("_method", "PUT");
    }

    // Debug : afficher le contenu de FormData
    console.log("📦 FormData contenu:");
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }

    try {
      if (editingArticleId) {
        // Modification
        await api.post(`/articles/${editingArticleId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Article modifié avec succès !");
      } else {
        // Création
        await api.post("/articles", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage(
          statusId === statusIds.published
            ? "✅ Article publié avec succès !"
            : "💾 Brouillon enregistré avec succès."
        );
      }

      // Rafraîchir la liste et réinitialiser le formulaire
      if (onArticleCreated) {
        setTimeout(() => {
          onArticleCreated();
        }, 1000);
      }
    } catch (err) {
      console.error("Erreur complète:", err);
      console.error("Réponse du serveur:", err.response?.data);

      const errorMessage = err.response?.data?.message
        || err.response?.data?.error
        || JSON.stringify(err.response?.data)
        || "Erreur inconnue";

      setMessage(`❌ Erreur: ${errorMessage}`);
    } finally {
      setSubmitting(false); // Réactiver le bouton après succès ou erreur
    }
  };

  if (loading) return <div>Chargement du formulaire...</div>;

  return (
    <div className="article-form card p-4 shadow-sm mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold" style={{ fontFamily: "Oswald, sans-serif" }}>
          {editingArticleId ? "✏️ Modifier l'article" : "📰 Ajouter un nouvel article"}
        </h3>
        {editingArticleId && onCancelEdit && (
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={onCancelEdit}
          >
            ✖ Annuler
          </button>
        )}
      </div>

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

        {/* Type d'article */}
        <div className="mb-3">
          <label className="form-label d-block">Type d'article *</label>
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
          {existingImage && (
            <div className="mb-2">
              <img
                src={getImageUrl(existingImage)}
                alt="Image actuelle"
                style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover" }}
                className="rounded"
              />
              <p className="text-muted small mt-1">Image actuelle (laissez vide pour conserver)</p>
            </div>
          )}
          <input
            type="file"
            name="image_couverture"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <hr className="my-4" />

        {/* SECTION SEO */}
        <h4 className="mb-3" style={{ fontFamily: "Oswald, sans-serif" }}>
          🔍 Optimisation SEO
        </h4>

        {/* Meta Titre */}
        <div className="mb-3">
          <label className="form-label">Meta Titre (optionnel)</label>
          <input
            type="text"
            name="meta_titre"
            className="form-control"
            value={form.meta_titre}
            onChange={handleChange}
            placeholder="Titre optimisé pour les moteurs de recherche"
            maxLength="255"
          />
          <small className="form-text text-muted">
            Si vide, le titre principal sera utilisé. Recommandé: 50-60 caractères.
          </small>
        </div>

        {/* Meta Description */}
        <div className="mb-3">
          <label className="form-label">Meta Description (optionnel)</label>
          <textarea
            name="meta_description"
            className="form-control"
            rows="3"
            value={form.meta_description}
            onChange={handleChange}
            placeholder="Description pour les résultats de recherche"
          ></textarea>
          <small className="form-text text-muted">
            Recommandé: 150-160 caractères. Résumé attractif de l'article.
          </small>
        </div>

        {/* Meta Keywords */}
        <div className="mb-3">
          <label className="form-label">Meta Keywords (optionnel)</label>
          <input
            type="text"
            name="meta_keywords"
            className="form-control"
            value={form.meta_keywords}
            onChange={handleChange}
            placeholder="migration, réfugiés, Europe"
            maxLength="255"
          />
          <small className="form-text text-muted">
            Mots-clés séparés par des virgules (peu utilisé par les moteurs modernes).
          </small>
        </div>

        {/* Tags SEO */}
        <div className="mb-3">
          <label className="form-label d-block">Tags SEO (optionnel)</label>
          <small className="form-text text-muted mb-2 d-block">
            Sélectionnez les tags pertinents pour cet article:
          </small>
          <div className="row">
            {tagsSeo.map((tag) => (
              <div className="col-md-4 col-6" key={tag.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`tag-${tag.id}`}
                    checked={form.tag_seo_ids.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                    {tag.mot_cle}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case à cocher : Article en vedette */}
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="est_en_vedette"
              checked={form.est_en_vedette}
              onChange={(e) => setForm(prev => ({ ...prev, est_en_vedette: e.target.checked }))}
            />
            <label className="form-check-label fw-bold" htmlFor="est_en_vedette">
              ⭐ Mettre cet article en vedette (à la une)
            </label>
            <small className="form-text text-muted d-block">
              L'article en vedette apparaîtra en premier dans la section "À la une" de la page d'accueil.
            </small>
          </div>
        </div>

        {/* Sélecteur de statut en mode modification */}
        {editingArticleId && (
          <div className="mb-3">
            <label className="form-label fw-bold">Changer le statut de l'article</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status_choice"
                  id="status_draft"
                  checked={form.status_id === statusIds.draft || form.status_id === 1}
                  onChange={() => setForm(prev => ({ ...prev, status_id: statusIds.draft || 1 }))}
                />
                <label className="form-check-label" htmlFor="status_draft">
                  📝 Brouillon
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status_choice"
                  id="status_published"
                  checked={form.status_id === statusIds.published || form.status_id === 2}
                  onChange={() => setForm(prev => ({ ...prev, status_id: statusIds.published || 2 }))}
                />
                <label className="form-check-label" htmlFor="status_published">
                  ✅ Publié
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div className="d-flex gap-3 mt-4">
          {editingArticleId ? (
            // Mode modification : 1 seul bouton qui garde le statut actuel
            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={(e) => handleSubmit(e, form.status_id)}
              disabled={submitting}
            >
              {submitting ? "⏳ Envoi..." : "💾 Enregistrer les modifications"}
            </button>
          ) : (
            // Mode création : 2 boutons (brouillon ou publier)
            <>
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={(e) => handleSubmit(e, statusIds.draft || 1)}
                disabled={submitting}
              >
                {submitting ? "⏳ Envoi..." : "Enregistrer le brouillon"}
              </button>

              <button
                type="button"
                className="btn text-white px-4"
                style={{
                  backgroundColor: "#E6007E",
                  borderRadius: "30px",
                  fontFamily: "Poppins, sans-serif",
                }}
                onClick={(e) => handleSubmit(e, statusIds.published || 2)}
                disabled={submitting}
              >
                {submitting ? "⏳ Envoi..." : "Publier"}
              </button>
            </>
          )}
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
