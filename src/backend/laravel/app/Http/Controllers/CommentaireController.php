<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use App\Models\Article;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class CommentaireController extends Controller
{
    /**
     * Affiche tous les commentaires
     */
    public function index()
    {
        return response()->json(Commentaire::with(['utilisateur', 'article'])->get());
    }

    /**
     * Ajouter un commentaire à un article
     */
    public function store(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'article_id' => 'required|exists:articles,id',
            'contenu' => 'required|string',
        ]);

        $commentaire = Commentaire::create([
            'utilisateur_id' => $request->utilisateur_id,
            'article_id' => $request->article_id,
            'contenu' => $request->contenu,
            'date_commentaire' => now(),
        ]);

        return response()->json($commentaire, 201);
    }

    /**
     * Affiche un commentaire spécifique
     */
    public function show($id)
    {
        $commentaire = Commentaire::with(['utilisateur', 'article'])->findOrFail($id);
        return response()->json($commentaire);
    }

    /**
     * Modifier un commentaire
     */
    public function update(Request $request, $id)
    {
        $commentaire = Commentaire::findOrFail($id);

        $request->validate([
            'contenu' => 'required|string',
        ]);

        $commentaire->update([
            'contenu' => $request->contenu,
        ]);

        return response()->json($commentaire);
    }

    /**
     * Supprimer un commentaire
     */
    public function destroy($id)
    {
        $commentaire = Commentaire::findOrFail($id);
        $commentaire->delete();

        return response()->json(['message' => 'Commentaire supprimé avec succès']);
    }
}
