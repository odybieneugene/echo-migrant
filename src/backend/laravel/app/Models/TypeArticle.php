<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeArticle extends Model
{
    use HasFactory;

    protected $table = 'type_articles';

    protected $fillable = [
        'nom',
        'description',
    ];

    // 🔹 Relations

    // Un type d'article peut concerner plusieurs articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'type_article_id');
    }
}
