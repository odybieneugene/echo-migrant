<?php

namespace App\Http\Controllers;

use App\Models\Don;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class DonController extends Controller
{
    /**
     * Afficher tous les dons
     */
    public function index()
    {
        return response()->json(Don::with('utilisateur')->get());
    }

    /**
     * Enregistrer un nouveau don
     */
    public function store(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'montant' => 'required|numeric|min:1',
            'moyen_paiement' => 'required|string|max:255',
        ]);

        $don = Don::create([
            'utilisateur_id' => $request->utilisateur_id,
            'montant' => $request->montant,
            'moyen_paiement' => $request->moyen_paiement,
        ]);

        return response()->json($don, 201);
    }

    /**
     * Afficher un don
     */
    public function show($id)
    {
        return Don::with('utilisateur')->findOrFail($id);
    }

    /**
     * Mettre à jour un don
     */
    public function update(Request $request, $id)
    {
        $don = Don::findOrFail($id);

        $request->validate([
            'montant' => 'sometimes|numeric|min:1',
            'moyen_paiement' => 'sometimes|string|max:255',
        ]);

        $don->update($request->only(['montant', 'moyen_paiement']));

        return response()->json(['message' => 'Don mis à jour', 'data' => $don]);
    }

    /**
     * Supprimer un don
     */
    public function destroy($id)
    {
        $don = Don::findOrFail($id);
        $don->delete();

        return response()->json(['message' => 'Don supprimé avec succès']);
    }
}
