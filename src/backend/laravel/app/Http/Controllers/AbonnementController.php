<?php

namespace App\Http\Controllers;

use App\Models\Abonnement;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class AbonnementController extends Controller
{
    /**
     * Affiche tous les abonnements disponibles
     */
    public function index()
    {
        return response()->json(Abonnement::all());
    }

    /**
     * Souscrire un utilisateur à un abonnement
     */
    public function store(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'abonnement_id' => 'required|exists:abonnements,id',
            'date_souscription' => 'required|date',
            'date_expiration' => 'required|date|after:date_souscription',
        ]);

        $utilisateur = Utilisateur::findOrFail($request->utilisateur_id);

        // Un utilisateur ne peut avoir qu'un seul abonnement actif
        if ($utilisateur->abonnements()->wherePivot('date_expiration', '>=', now())->exists()) {
            return response()->json(['message' => 'Utilisateur a déjà un abonnement actif'], 400);
        }

        $utilisateur->abonnements()->attach($request->abonnement_id, [
            'date_souscription' => $request->date_souscription,
            'date_expiration' => $request->date_expiration,
        ]);

        return response()->json(['message' => 'Souscription effectuée avec succès']);
    }

    /**
     * Affiche un abonnement spécifique
     */
    public function show($id)
    {
        $abonnement = Abonnement::findOrFail($id);
        return response()->json($abonnement);
    }

    /**
     * Annuler un abonnement (détacher l’utilisateur du pivot)
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'abonnement_id' => 'required|exists:abonnements,id',
        ]);

        $utilisateur = Utilisateur::findOrFail($request->utilisateur_id);

        $utilisateur->abonnements()->detach($request->abonnement_id);

        return response()->json(['message' => 'Abonnement annulé avec succès']);
    }
}
