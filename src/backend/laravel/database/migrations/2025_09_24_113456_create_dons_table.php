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
    Schema::create('dons', function (Blueprint $table) {
        $table->id();
        $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
        $table->decimal('montant', 8, 2); // ex : 25.50 €
        $table->string('moyen_paiement', 50); // ex : carte, PayPal, ApplePay...
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dons');
    }
};
