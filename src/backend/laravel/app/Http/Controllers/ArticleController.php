<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    // ✅ GET /api/articles (public - seulement articles publiés)
    public function index()
    {
        // Récupère tous les articles avec leur catégorie, utilisateur et tags SEO
        // Triés par date de création décroissante (les plus récents en premier)
        // Support de la pagination : ?limit=10
        $query = Article::with(['categorie', 'utilisateur', 'tagsSeo'])
            ->where('status_id', 2) // Seulement les articles publiés (status_id = 2)
            ->orderBy('created_at', 'desc');

        // Si un paramètre limit est fourni, limiter les résultats
        if (request()->has('limit')) {
            $query->limit(request()->input('limit'));
        }

        return $query->get();
    }

    // ✅ GET /api/articles-admin (dashboard - tous les articles)
    public function indexAdmin()
    {
        // Récupère TOUS les articles (brouillons + publiés) pour le Dashboard
        return Article::with(['categorie', 'utilisateur', 'tagsSeo', 'status'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // ✅ POST /api/articles
    public function store(Request $request)
    {
        \Log::info('📥 Requête reçue:', ['status_id' => $request->input('status_id'), 'all' => $request->except('image_couverture')]);

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'resume' => 'nullable|string',
            'contenu' => 'required|string',
            'categorie_id' => 'nullable|exists:categories,id',
            'type_article_id' => 'nullable|exists:type_articles,id',
            'format_id' => 'nullable|exists:formats,id',
            'status_id' => 'nullable|exists:status,id',
            'image_couverture' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'meta_titre' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'tag_seo_ids' => 'nullable|array',
            'tag_seo_ids.*' => 'exists:tag_seos,id',
            'est_en_vedette' => 'nullable|boolean',
        ]);

        // 🔒 Utilisation de l'utilisateur authentifié via Sanctum
        $data = [
            'titre' => $validated['titre'],
            'resume' => $validated['resume'] ?? null,
            'contenu' => $validated['contenu'],
            'categorie_id' => $validated['categorie_id'] ?? null,
            'utilisateur_id' => $request->user()->id, // 👈 Utilisateur connecté
            'type_article_id' => $validated['type_article_id'] ?? null,
            'format_id' => $validated['format_id'] ?? null,
            'status_id' => $validated['status_id'] ?? null,
            'meta_titre' => $validated['meta_titre'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'est_en_vedette' => $validated['est_en_vedette'] ?? false,
        ];

        // ✅ Gestion de l'image si uploadée
        if ($request->hasFile('image_couverture')) {
            $path = $request->file('image_couverture')->store('images', 'public');
            $data['image_couverture'] = $path;
        }

        // ⭐ Si cet article est marqué en vedette, retirer le flag des autres
        if (isset($data['est_en_vedette']) && $data['est_en_vedette']) {
            Article::where('est_en_vedette', true)->update(['est_en_vedette' => false]);
        }

        $article = Article::create($data);

        // ✅ Attach tags SEO if provided
        if (isset($validated['tag_seo_ids']) && is_array($validated['tag_seo_ids'])) {
            $article->tagsSeo()->sync($validated['tag_seo_ids']);
        }

        return response()->json($article->load(['categorie', 'utilisateur', 'tagsSeo']), 201);
    }

    // ✅ GET /api/articles/{id}
    public function show($id)
    {
        return Article::with(['categorie', 'utilisateur', 'tagsSeo'])->findOrFail($id);
    }

    // ✅ PUT /api/articles/{id}
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'resume' => 'nullable|string',
            'contenu' => 'required|string',
            'categorie_id' => 'nullable|exists:categories,id',
            'type_article_id' => 'nullable|exists:type_articles,id',
            'format_id' => 'nullable|exists:formats,id',
            'status_id' => 'nullable|exists:status,id',
            'image_couverture' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'meta_titre' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'tag_seo_ids' => 'nullable|array',
            'tag_seo_ids.*' => 'nullable|exists:tag_seos,id',
            'est_en_vedette' => 'nullable|boolean',
        ]);

        // ✅ Gestion de l'image si uploadée
        if ($request->hasFile('image_couverture')) {
            // Supprimer l'ancienne image si elle existe
            if ($article->image_couverture && Storage::disk('public')->exists($article->image_couverture)) {
                Storage::disk('public')->delete($article->image_couverture);
            }

            $path = $request->file('image_couverture')->store('images', 'public');
            $validated['image_couverture'] = $path;
        }

        // ⭐ Si cet article est marqué en vedette, retirer le flag des autres
        if (isset($validated['est_en_vedette']) && $validated['est_en_vedette']) {
            Article::where('id', '!=', $id)
                ->where('est_en_vedette', true)
                ->update(['est_en_vedette' => false]);
        }

        // Si est_en_vedette n'est pas fourni, le garder tel quel (ne pas écraser avec false)
        if (!isset($validated['est_en_vedette'])) {
            unset($validated['est_en_vedette']);
        }

        $article->update($validated);

        // ✅ Sync tags SEO if provided
        if (isset($validated['tag_seo_ids'])) {
            $article->tagsSeo()->sync($validated['tag_seo_ids']);
        }

        return response()->json($article->load(['categorie', 'utilisateur', 'tagsSeo']));
    }

    // ✅ DELETE /api/articles/{id}
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json(['message' => 'Article supprimé avec succès ✅']);
    }
}
