<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('articles')->insert([
            [
                'titre' => "Crise migratoire : l'Europe à la croisée des chemins",
                'resume' => "Les pays européens cherchent un nouvel équilibre entre solidarité et souveraineté. Découvrez notre dossier spécial sur les politiques migratoires.",
                'contenu' => "Alors que les tensions montent aux frontières, ce dossier explore les nouvelles approches migratoires adoptées par les gouvernements européens et leurs impacts humains.",
                'image_couverture' => "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop",
                'categorie_id' => 1,
                'utilisateur_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titre' => "Familles réfugiées : parcours et défis humains",
                'resume' => "Un reportage exclusif sur les parcours de familles déplacées à travers l’Europe.",
                'contenu' => "Entre frontières fermées et solidarité citoyenne, ce reportage met en lumière les défis humains derrière les chiffres.",
                'image_couverture' => "https://images.unsplash.com/photo-1534081333815-ae5019106622?q=80&w=1200&auto=format&fit=crop",
                'categorie_id' => 2,
                'utilisateur_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titre' => "Reportage : sur les routes des réfugiés en Méditerranée",
                'resume' => "Nos journalistes ont suivi les équipes humanitaires au large de la Sicile.",
                'contenu' => "Plongée au cœur d’une mission de sauvetage, entre drames et espoirs sur les routes migratoires.",
                'image_couverture' => "https://images.unsplash.com/photo-1529612700005-e35377bf1415?q=80&w=1200&auto=format&fit=crop",
                'categorie_id' => 2,
                'utilisateur_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
