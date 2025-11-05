<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['nom' => 'Brouillons', 'description' => null],
            ['nom' => 'En relecture', 'description' => null],
            ['nom' => 'Publié', 'description' => null],
        ];

        foreach ($items as $item) {
            Status::firstOrCreate(['nom' => $item['nom']], $item);
        }
    }
}

