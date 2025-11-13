<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Article extends Model
{
    use HasFactory;

    protected $table = 'articles';

    protected $fillable = [
        'titre',
        'resume',
        'contenu',
        'image_couverture',
        'categorie_id',
        'type_article_id',
        'status_id',
        'format_id',
        'utilisateur_id',
        'meta_titre',
        'meta_description',
        'meta_keywords',
        'est_en_vedette',
    ];

    /* ----------------------------
     | 🔹 Relations Eloquent (corrigées selon MLD)
     ---------------------------- */

    // Un article appartient à une catégorie
    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    // Un article appartient à un type (ex: reportage, analyse…)
    public function typeArticle(): BelongsTo
    {
        return $this->belongsTo(TypeArticle::class, 'type_article_id');
    }

    // Un article a un statut (publié, brouillon…)
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    // Un article a un format (texte, vidéo, audio…)
    public function format(): BelongsTo
    {
        return $this->belongsTo(Format::class, 'format_id');
    }

    // Un article appartient à un utilisateur (auteur principal)
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }

    // Un article peut avoir plusieurs commentaires
    public function commentaires(): HasMany
    {
        return $this->hasMany(Commentaire::class, 'article_id');
    }

    // Un article peut avoir plusieurs médias associés (N:N via contenirs)
    public function medias(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'contenirs', 'article_id', 'media_id');
    }

    // Un article peut avoir plusieurs co-auteurs (N:N via redigers)
    public function redacteurs(): BelongsToMany
    {
        return $this->belongsToMany(Utilisateur::class, 'redigers', 'article_id', 'utilisateur_id');
    }

    // Un article peut avoir plusieurs tags SEO (N:N via article_tag_seo)
    public function tagsSeo(): BelongsToMany
    {
        return $this->belongsToMany(TagSeo::class, 'article_tag_seo', 'article_id', 'tag_seo_id');
    }
}
