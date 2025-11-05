<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Media extends Model
{
    use HasFactory;

    protected $table = 'media';

    protected $fillable = [
        'type',
        'url',
        'description',
    ];

    // 🔹 Relations

    // Un média peut appartenir à plusieurs articles
    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'contenirs', 'media_id', 'article_id');
    }

    // Un média peut être accessible à plusieurs utilisateurs
    public function utilisateurs(): BelongsToMany
    {
        return $this->belongsToMany(Utilisateur::class, 'acceders', 'media_id', 'utilisateur_id');
    }
}
