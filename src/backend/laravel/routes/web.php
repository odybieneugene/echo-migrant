<?php

use Illuminate\Support\Facades\Route;

// Page d'accueil temporaire (test backend)
Route::get('/', function () {
    return response()->json([
        'message' => 'Bienvenue sur l’API Echo Migrant 🌍',
        'status' => 'Backend Laravel opérationnel ✅'
    ]);
});
