<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\AbonnementController;
use App\Http\Controllers\DonController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\TagSeoController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\FormatController;
use App\Http\Controllers\TypeArticleController;
use App\Http\Controllers\AuteurController;
use App\Models\Utilisateur;

/*
|--------------------------------------------------------------------------
| API Routes - Echo Migrant
|--------------------------------------------------------------------------
|
| Toutes les routes de ton API Echo Migrant.
| Elles sont automatiquement préfixées par /api
| Exemple : http://localhost:8000/api/utilisateurs
|
*/

// ✅ Route de test simple
Route::get('/ping', function () {
    return response()->json(['message' => 'API Echo Migrant fonctionne ✅']);
});

// ✅ Routes publiques
Route::apiResource('utilisateurs', UtilisateurController::class);

// ✅ Articles (lecture publique)
Route::apiResource('articles', ArticleController::class)->only(['index', 'show']);

// 🔒 Articles (création, modification, suppression) - Réservé aux admin, journaliste, rédacteur
Route::middleware(['auth:sanctum', 'role:admin,journaliste,redacteur'])->group(function () {
    Route::apiResource('articles', ArticleController::class)->only(['store', 'update', 'destroy']);

    // Route spéciale Dashboard : retourne TOUS les articles (brouillons + publiés)
    Route::get('/articles-admin', [ArticleController::class, 'indexAdmin']);
});


// ✅ Autres ressources
Route::apiResource('categories', CategorieController::class);
Route::apiResource('commentaires', CommentaireController::class);
Route::apiResource('abonnements', AbonnementController::class);
Route::apiResource('dons', DonController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('medias', MediaController::class);
Route::apiResource('tags-seo', TagSeoController::class);
Route::apiResource('statuses', StatusController::class);
Route::apiResource('formats', FormatController::class);
Route::apiResource('types-articles', TypeArticleController::class);
Route::apiResource('auteurs', AuteurController::class);


// 🔒 Profil utilisateur (protégé par Sanctum)
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return response()->json(['user' => $request->user()]);
});


// ✅ Register - création d'un utilisateur
Route::post('/register', function (Request $request) {
    $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:utilisateurs',
        'password' => 'required|string|min:6',
        'role' => 'nullable|in:lecteur,redacteur,journaliste,admin',
    ]);

    $user = Utilisateur::create([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role ?? 'lecteur', // Par défaut: lecteur
    ]);

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'message' => 'Utilisateur créé avec succès ✅',
        'token' => $token,
        'user'  => $user,
    ], 201);
});


// ✅ Login - obtention d’un token Sanctum (toujours actif)
Route::post('/login', function (Request $request) {
    $user = Utilisateur::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'Identifiants invalides'], 401);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user'  => $user,
    ]);
});
