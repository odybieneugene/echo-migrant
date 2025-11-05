<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categorie extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'nom',
        'description',
    ];

    /* ----------------------------
     | 🔹 Relations Eloquent (selon MLD)
     ---------------------------- */

    // Une catégorie contient plusieurs articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'categorie_id');
    }
}
