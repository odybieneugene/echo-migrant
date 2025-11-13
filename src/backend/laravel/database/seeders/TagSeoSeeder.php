<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TagSeo;

class TagSeoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'migration',
            'réfugiés',
            'intégration',
            'politique',
            'humanitaire',
            'témoignage',
            'Europe',
            'Méditerranée',
            'frontières',
            'asile',
            'droits humains',
            'accueil',
            'solidarité',
            'exil',
            'demandeur d\'asile',
        ];

        foreach ($tags as $tag) {
            TagSeo::firstOrCreate(['mot_cle' => $tag]);
        }

        $this->command->info('✅ ' . count($tags) . ' tags SEO créés avec succès!');
    }
}
