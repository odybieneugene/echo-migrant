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
    Schema::create('abonnements', function (Blueprint $table) {
        $table->id();
        $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
        $table->enum('type', ['mensuel', 'annuel', 'don']);
        $table->decimal('montant', 8, 2)->nullable();
        $table->date('date_debut')->nullable();
        $table->date('date_fin')->nullable();
        $table->string('status')->default('en_attente');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abonnements');
    }
};
