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
            // Index sur created_at pour tri rapide (ORDER BY created_at DESC)
            $table->index('created_at');

            // Index sur est_en_vedette pour recherche rapide de l'article en vedette
            $table->index('est_en_vedette');

            // Index composite pour requête status_id + created_at (WHERE status_id = 2 ORDER BY created_at)
            $table->index(['status_id', 'created_at'], 'articles_status_created_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['est_en_vedette']);
            $table->dropIndex('articles_status_created_index');
        });
    }
};
