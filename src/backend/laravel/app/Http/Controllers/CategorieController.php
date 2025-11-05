<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    // GET /api/categories → liste des catégories
    public function index()
    {
        return Categorie::with('articles')->get();
    }

    // POST /api/categories → créer une catégorie
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255|unique:categories,nom',
            'description' => 'nullable|string',
        ]);

        return Categorie::create($validated);
    }

    // GET /api/categories/{id} → afficher une catégorie
    public function show($id)
    {
        return Categorie::with('articles')->findOrFail($id);
    }

    // PUT /api/categories/{id} → modifier une catégorie
    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255|unique:categories,nom,' . $categorie->id,
            'description' => 'nullable|string',
        ]);

        $categorie->update($validated);

        return $categorie;
    }

    // DELETE /api/categories/{id} → supprimer une catégorie
    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->delete();

        return response()->json(['message' => 'Catégorie supprimée avec succès']);
    }
}
