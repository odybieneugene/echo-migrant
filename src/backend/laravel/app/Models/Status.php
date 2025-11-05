<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    use HasFactory;

    // La migration crée actuellement la table 'status' (singulier)
    protected $table = 'status';

    protected $fillable = [
        'nom',
        'description',
    ];

    // 🔹 Relations

    // Un statut peut être attribué à plusieurs articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'status_id');
    }
}
