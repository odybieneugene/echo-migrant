<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TagSeo extends Model
{
    use HasFactory;

    protected $table = 'tag_seos';

    protected $fillable = [
        'mot_cle',
    ];

    // 🔹 Relations

    // Un tag SEO peut appartenir à plusieurs articles (via article_tag_seo)
    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_tag_seo', 'tag_seo_id', 'article_id');
    }
}
