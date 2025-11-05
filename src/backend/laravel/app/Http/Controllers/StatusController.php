<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    /**
     * Liste tous les statuts
     */
    public function index()
    {
        return response()->json(Status::with('articles')->get());
    }

    /**
     * Créer un statut
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:status,nom',
            'description' => 'nullable|string',
        ]);

        $status = Status::create($validated);

        return response()->json($status, 201);
    }

    /**
     * Affiche un statut avec ses articles
     */
    public function show($id)
    {
        return response()->json(Status::with('articles')->findOrFail($id));
    }

    /**
     * Mettre à jour un statut
     */
    public function update(Request $request, $id)
    {
        $status = Status::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:status,nom,' . $status->id,
            'description' => 'nullable|string',
        ]);

        $status->update($validated);

        return response()->json($status);
    }

    /**
     * Supprimer un statut
     */
    public function destroy($id)
    {
        $status = Status::findOrFail($id);
        $status->delete();

        return response()->json(['message' => 'Statut supprimé avec succès']);
    }
}
