<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UtilisateurController extends Controller
{
    // GET /api/utilisateurs
    public function index()
    {
        return Utilisateur::all();
    }

    // POST /api/utilisateurs
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'password' => 'required|string|min:6',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        return Utilisateur::create($validated);
    }

    // GET /api/utilisateurs/{id}
    public function show($id)
    {
        return Utilisateur::findOrFail($id);
    }

    // PUT /api/utilisateurs/{id}
    public function update(Request $request, $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);

        $utilisateur->update($request->all());

        return $utilisateur;
    }

    // DELETE /api/utilisateurs/{id}
    public function destroy($id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
