<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorieSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            ['nom' => 'Actualités', 'created_at' => now(), 'updated_at' => now()],
            ['nom' => 'Reportages', 'created_at' => now(), 'updated_at' => now()],
            ['nom' => 'Dossiers', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
