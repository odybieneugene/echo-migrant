<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Utilisateur;

class TestUsersSeeder extends Seeder
{
    /**
     * Seed des utilisateurs de test avec différents rôles.
     */
    public function run(): void
    {
        $users = [
            [
                'nom' => 'Admin',
                'prenom' => 'Super',
                'email' => 'admin@echomigrant.fr',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ],
            [
                'nom' => 'Durand',
                'prenom' => 'Sophie',
                'email' => 'journaliste@echomigrant.fr',
                'password' => Hash::make('password123'),
                'role' => 'journaliste',
            ],
            [
                'nom' => 'Martin',
                'prenom' => 'Lucas',
                'email' => 'redacteur@echomigrant.fr',
                'password' => Hash::make('password123'),
                'role' => 'redacteur',
            ],
            [
                'nom' => 'Petit',
                'prenom' => 'Marie',
                'email' => 'lecteur@echomigrant.fr',
                'password' => Hash::make('password123'),
                'role' => 'lecteur',
            ],
        ];

        foreach ($users as $userData) {
            // Vérifier si l'utilisateur existe déjà
            $existingUser = Utilisateur::where('email', $userData['email'])->first();

            if (!$existingUser) {
                Utilisateur::create($userData);
                $this->command->info("✅ Utilisateur créé : {$userData['email']} ({$userData['role']})");
            } else {
                $this->command->warn("⏭️  Utilisateur existe déjà : {$userData['email']}");
            }
        }

        $this->command->info("\n📝 Utilisateurs de test disponibles :");
        $this->command->line("   - admin@echomigrant.fr (admin) - password: password123");
        $this->command->line("   - journaliste@echomigrant.fr (journaliste) - password: password123");
        $this->command->line("   - redacteur@echomigrant.fr (redacteur) - password: password123");
        $this->command->line("   - lecteur@echomigrant.fr (lecteur) - password: password123");
    }
}
