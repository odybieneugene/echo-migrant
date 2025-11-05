<?php

namespace App\Http\Controllers;

use App\Models\TypeArticle;
use Illuminate\Http\Request;

class TypeArticleController extends Controller
{
    /**
     * Liste tous les types d’articles
     */
    public function index()
    {
        return response()->json(TypeArticle::with('articles')->get());
    }

    /**
     * Créer un type d’article
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:type_articles,nom',
            'description' => 'nullable|string',
        ]);

        $typeArticle = TypeArticle::create($validated);

        return response()->json($typeArticle, 201);
    }

    /**
     * Affiche un type d’article avec ses articles
     */
    public function show($id)
    {
        return response()->json(TypeArticle::with('articles')->findOrFail($id));
    }

    /**
     * Mettre à jour un type d’article
     */
    public function update(Request $request, $id)
    {
        $typeArticle = TypeArticle::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:type_articles,nom,' . $typeArticle->id,
            'description' => 'nullable|string',
        ]);

        $typeArticle->update($validated);

        return response()->json($typeArticle);
    }

    /**
     * Supprimer un type d’article
     */
    public function destroy($id)
    {
        $typeArticle = TypeArticle::findOrFail($id);
        $typeArticle->delete();

        return response()->json(['message' => 'Type d’article supprimé avec succès']);
    }
}
