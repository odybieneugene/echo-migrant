<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Auteur extends Model
{
    use HasFactory;

    protected $table = 'auteurs';

    protected $fillable = [
        'nom',
        'prenom',
        'biographie',
    ];

    // 🔹 Relations

    // Un auteur peut rédiger plusieurs articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'auteur_id');
    }
}
