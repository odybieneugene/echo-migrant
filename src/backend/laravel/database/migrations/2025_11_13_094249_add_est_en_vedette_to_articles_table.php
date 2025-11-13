<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            // Ajout du champ "est_en_vedette" (article à la une)
            // Par défaut FALSE, un seul article devrait être TRUE à la fois
            $table->boolean('est_en_vedette')->default(false)->after('status_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('est_en_vedette');
        });
    }
};
