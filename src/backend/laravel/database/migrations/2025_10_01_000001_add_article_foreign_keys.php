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
            if (!Schema::hasColumn('articles', 'type_article_id')) {
                $table->unsignedBigInteger('type_article_id')->nullable()->after('categorie_id');
                $table->foreign('type_article_id')->references('id')->on('type_articles')->onDelete('set null');
            }

            if (!Schema::hasColumn('articles', 'format_id')) {
                $table->unsignedBigInteger('format_id')->nullable()->after('type_article_id');
                $table->foreign('format_id')->references('id')->on('formats')->onDelete('set null');
            }

            if (!Schema::hasColumn('articles', 'status_id')) {
                $table->unsignedBigInteger('status_id')->nullable()->after('format_id');
                // La table créée est `status` (cf. migration 2025_09_24_113453_create_statuses_table)
                $table->foreign('status_id')->references('id')->on('status')->onDelete('set null');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            if (Schema::hasColumn('articles', 'status_id')) {
                $table->dropForeign(['status_id']);
                $table->dropColumn('status_id');
            }
            if (Schema::hasColumn('articles', 'format_id')) {
                $table->dropForeign(['format_id']);
                $table->dropColumn('format_id');
            }
            if (Schema::hasColumn('articles', 'type_article_id')) {
                $table->dropForeign(['type_article_id']);
                $table->dropColumn('type_article_id');
            }
        });
    }
};

