<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Vérifier si l'utilisateur est authentifié
        if (! $request->user()) {
            return response()->json([
                'error' => 'Non authentifié. Veuillez vous connecter.',
            ], 401);
        }

        // Vérifier si l'utilisateur a l'un des rôles requis
        if (! in_array($request->user()->role, $roles)) {
            return response()->json([
                'error' => 'Accès refusé. Rôles requis : '.implode(', ', $roles),
                'votre_role' => $request->user()->role,
            ], 403);
        }

        return $next($request);
    }
}
