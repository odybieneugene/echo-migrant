<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class Utilisateur extends Authenticatable
{
     use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password', // ✅ cohérent avec Laravel
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /* ----------------------------
     | 🔹 Relations Eloquent (corrigées selon MLD)
     ---------------------------- */

    // Un utilisateur peut écrire plusieurs articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'utilisateur_id');
    }

    // Un utilisateur peut faire plusieurs commentaires
    public function commentaires(): HasMany
    {
        return $this->hasMany(Commentaire::class, 'utilisateur_id');
    }

    // Un utilisateur peut avoir plusieurs rôles (N:N)
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'utilisateur_role', 'utilisateur_id', 'role_id');
    }

    // Un utilisateur a un seul abonnement (1:N du côté Abonnement)
    public function abonnement(): BelongsTo
    {
        return $this->belongsTo(Abonnement::class, 'abonnement_id');
    }

    // Un utilisateur peut accéder à plusieurs médias (N:N)
    public function medias(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'acceders', 'utilisateur_id', 'media_id');
    }

    // Un utilisateur peut être co-auteur de plusieurs articles (N:N via redigers)
    public function redactions(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'redigers', 'utilisateur_id', 'article_id');
    }

    // Un utilisateur peut faire plusieurs dons
    public function dons(): HasMany
    {
        return $this->hasMany(Don::class, 'utilisateur_id');
    }
}
