<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    // ✅ GET /api/articles
    public function index()
    {
        // Récupère tous les articles avec leur catégorie et utilisateur associé
        return Article::with(['categorie', 'utilisateur'])->get();
    }

    // ✅ POST /api/articles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'resume' => 'nullable|string',
            'contenu' => 'required|string',
            'categorie_id' => 'nullable|exists:categories,id',
            'type_article_id' => 'nullable|exists:type_articles,id',
            'format_id' => 'nullable|exists:formats,id',
            // Table réelle : 'statuses'
            'status_id' => 'nullable|exists:statuses,id',
            'image_couverture' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        /* ------------------------------------------------------------------
        | 🔒 Ancienne version protégée par Sanctum (désactivée temporairement)
        | ------------------------------------------------------------------
        | $data = [
        |     'titre' => $validated['titre'],
        |     'resume' => $validated['resume'] ?? null,
        |     'contenu' => $validated['contenu'],
        |     'categorie_id' => $validated['categorie_id'] ?? null,
        |     'utilisateur_id' => $request->user()->id, // 👈 dépend de l’auth Sanctum
        |     'type_article_id' => $validated['type_article_id'] ?? null,
        |     'format_id' => $validated['format_id'] ?? null,
        |     'status_id' => $validated['status_id'] ?? null,
        | ];
        -------------------------------------------------------------------*/

        // ✅ Nouvelle version temporaire sans authentification Sanctum
        $data = [
            'titre' => $validated['titre'],
            'resume' => $validated['resume'] ?? null,
            'contenu' => $validated['contenu'],
            'categorie_id' => $validated['categorie_id'] ?? null,
            'utilisateur_id' => 1, // 👈 ID par défaut (admin/test)
            'type_article_id' => $validated['type_article_id'] ?? null,
            'format_id' => $validated['format_id'] ?? null,
            'status_id' => $validated['status_id'] ?? null,
        ];

        // ✅ Gestion de l’image si uploadée
        if ($request->hasFile('image_couverture')) {
            $path = $request->file('image_couverture')->store('images', 'public');
            $data['image_couverture'] = $path;
        }

        $article = Article::create($data);

        return response()->json($article, 201);
    }

    // ✅ GET /api/articles/{id}
    public function show($id)
    {
        return Article::with(['categorie', 'utilisateur'])->findOrFail($id);
    }

    // ✅ PUT /api/articles/{id}
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'resume' => 'sometimes|nullable|string',
            'contenu' => 'sometimes|string',
            'categorie_id' => 'nullable|exists:categories,id',
            'type_article_id' => 'sometimes|nullable|exists:type_articles,id',
            'format_id' => 'sometimes|nullable|exists:formats,id',
            'status_id' => 'sometimes|nullable|exists:statuses,id',
        ]);

        $article->update($validated);

        return $article;
    }

    // ✅ DELETE /api/articles/{id}
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json(['message' => 'Article supprimé avec succès ✅']);
    }
}
