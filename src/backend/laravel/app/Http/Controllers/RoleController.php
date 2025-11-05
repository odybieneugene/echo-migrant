<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Liste tous les rôles
     */
    public function index()
    {
        return response()->json(Role::with('utilisateurs')->get());
    }

    /**
     * Créer un rôle
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $role = Role::create($validated);

        return response()->json($role, 201);
    }

    /**
     * Affiche un rôle
     */
    public function show($id)
    {
        return response()->json(Role::with('utilisateurs')->findOrFail($id));
    }

    /**
     * Mettre à jour un rôle
     */
    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100',
            'description' => 'nullable|string',
        ]);

        $role->update($validated);

        return response()->json($role);
    }

    /**
     * Supprimer un rôle
     */
    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json(['message' => 'Rôle supprimé avec succès']);
    }
}
