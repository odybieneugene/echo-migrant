<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UtilisateurSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('utilisateurs')->insert([
            [
                'nom' => 'Dupont',
                'prenom' => 'Jean',
                'email' => 'jean.dupont@example.com',
                'password' => Hash::make('Password123!'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Testeur',
                'prenom' => 'Echo',
                'email' => 'testeur@echomigrant.com',
                'password' => Hash::make('Password123!'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
