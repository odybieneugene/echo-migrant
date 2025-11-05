<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * Liste tous les médias
     */
    public function index()
    {
        return response()->json(Media::with(['articles', 'utilisateurs'])->get());
    }

    /**
     * Ajouter un média
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'type' => 'required|string|max:50', // ex: image, video, audio
            'url' => 'required|url',
        ]);

        $media = Media::create($validated);

        return response()->json($media, 201);
    }

    /**
     * Affiche un média
     */
    public function show($id)
    {
        return response()->json(Media::with(['articles', 'utilisateurs'])->findOrFail($id));
    }

    /**
     * Mettre à jour un média
     */
    public function update(Request $request, $id)
    {
        $media = Media::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:50',
            'url' => 'sometimes|url',
        ]);

        $media->update($validated);

        return response()->json($media);
    }

    /**
     * Supprimer un média
     */
    public function destroy($id)
    {
        $media = Media::findOrFail($id);
        $media->delete();

        return response()->json(['message' => 'Média supprimé avec succès']);
    }
}
