<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UtilisateurSeeder::class,
            CategorieSeeder::class,
            TypeArticleSeeder::class,
            StatusSeeder::class,
            ArticleSeeder::class,
            AbonnementSeeder::class,
            RoleSeeder::class,
            CommentaireSeeder::class,
        ]);
    }
}
