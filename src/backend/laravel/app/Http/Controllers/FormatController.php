<?php

namespace App\Http\Controllers;

use App\Models\Format;
use Illuminate\Http\Request;

class FormatController extends Controller
{
    /**
     * Liste tous les formats
     */
    public function index()
    {
        return response()->json(Format::with('articles')->get());
    }

    /**
     * Créer un format
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:formats,nom',
            'description' => 'nullable|string',
        ]);

        $format = Format::create($validated);

        return response()->json($format, 201);
    }

    /**
     * Affiche un format avec ses articles
     */
    public function show($id)
    {
        return response()->json(Format::with('articles')->findOrFail($id));
    }

    /**
     * Mettre à jour un format
     */
    public function update(Request $request, $id)
    {
        $format = Format::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:formats,nom,' . $format->id,
            'description' => 'nullable|string',
        ]);

        $format->update($validated);

        return response()->json($format);
    }

    /**
     * Supprimer un format
     */
    public function destroy($id)
    {
        $format = Format::findOrFail($id);
        $format->delete();

        return response()->json(['message' => 'Format supprimé avec succès']);
    }
}
