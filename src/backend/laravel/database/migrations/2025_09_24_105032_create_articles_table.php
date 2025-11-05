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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();

            // Colonnes principales
            $table->string('titre');
            $table->text('resume')->nullable(); // ✅ résumé facultatif
            $table->longText('contenu')->nullable(); // ✅ contenu long (article complet)
            $table->string('image_couverture')->nullable(); // ✅ image pour la Hero / Featured Article

            // Relations
            $table->unsignedBigInteger('categorie_id')->nullable();
            $table->foreign('categorie_id')
                ->references('id')->on('categories')
                ->onDelete('set null');

            $table->unsignedBigInteger('utilisateur_id')->nullable();
            $table->foreign('utilisateur_id')
                ->references('id')->on('utilisateurs')
                ->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
