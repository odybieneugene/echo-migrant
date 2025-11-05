<?php

namespace App\Http\Controllers;

use App\Models\Auteur;
use Illuminate\Http\Request;

class AuteurController extends Controller
{
    /**
     * Liste tous les auteurs
     */
    public function index()
    {
        return response()->json(Auteur::with('articles')->get());
    }

    /**
     * Créer un auteur
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'biographie' => 'nullable|string',
        ]);

        $auteur = Auteur::create($validated);

        return response()->json($auteur, 201);
    }

    /**
     * Affiche un auteur avec ses articles
     */
    public function show($id)
    {
        return response()->json(Auteur::with('articles')->findOrFail($id));
    }

    /**
     * Mettre à jour un auteur
     */
    public function update(Request $request, $id)
    {
        $auteur = Auteur::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100',
            'prenom' => 'sometimes|string|max:100',
            'biographie' => 'nullable|string',
        ]);

        $auteur->update($validated);

        return response()->json($auteur);
    }

    /**
     * Supprimer un auteur
     */
    public function destroy($id)
    {
        $auteur = Auteur::findOrFail($id);
        $auteur->delete();

        return response()->json(['message' => 'Auteur supprimé avec succès']);
    }
}
