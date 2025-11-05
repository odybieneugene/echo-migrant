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
    Schema::create('medias', function (Blueprint $table) {
        $table->id();
        $table->string('type', 50); // exemple : image, vidéo, audio
        $table->string('url'); // chemin ou lien du fichier
        $table->string('alt_text')->nullable(); // texte alternatif pour accessibilité
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medias');
    }
};
