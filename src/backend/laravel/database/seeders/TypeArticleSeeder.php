<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TypeArticle;

class TypeArticleSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['nom' => 'Article Texte', 'description' => null],
            ['nom' => 'Article Vidéo', 'description' => null],
            ['nom' => 'Article Audio', 'description' => null],
        ];

        foreach ($items as $item) {
            TypeArticle::firstOrCreate(['nom' => $item['nom']], $item);
        }
    }
}

