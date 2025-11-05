<?php

namespace App\Http\Controllers;

use App\Models\TagSeo;
use Illuminate\Http\Request;

class TagSeoController extends Controller
{
    /**
     * Liste tous les tags SEO
     */
    public function index()
    {
        return response()->json(TagSeo::with('articles')->get());
    }

    /**
     * Créer un tag SEO
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mot_cle' => 'required|string|max:255|unique:tag_seos,mot_cle',
        ]);

        $tag = TagSeo::create($validated);

        return response()->json($tag, 201);
    }

    /**
     * Affiche un tag SEO avec ses articles
     */
    public function show($id)
    {
        return response()->json(TagSeo::with('articles')->findOrFail($id));
    }

    /**
     * Mettre à jour un tag SEO
     */
    public function update(Request $request, $id)
    {
        $tag = TagSeo::findOrFail($id);

        $validated = $request->validate([
            'mot_cle' => 'sometimes|string|max:255|unique:tag_seos,mot_cle,' . $tag->id,
        ]);

        $tag->update($validated);

        return response()->json($tag);
    }

    /**
     * Supprimer un tag SEO
     */
    public function destroy($id)
    {
        $tag = TagSeo::findOrFail($id);
        $tag->delete();

        return response()->json(['message' => 'Tag SEO supprimé avec succès']);
    }
}
