<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Abonnement extends Model
{
    use HasFactory;

    protected $table = 'abonnements';

    protected $fillable = [
        'type',
        'prix',
        'duree',
    ];

    /* ----------------------------
     | 🔹 Relations Eloquent (selon MLD)
     ---------------------------- */

    // Un abonnement peut avoir plusieurs utilisateurs (via pivot souscrires)
    public function utilisateurs(): BelongsToMany
    {
        return $this->belongsToMany(Utilisateur::class, 'souscrires', 'abonnement_id', 'utilisateur_id');
    }
}
