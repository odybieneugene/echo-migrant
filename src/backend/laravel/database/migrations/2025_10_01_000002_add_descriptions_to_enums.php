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
        if (Schema::hasTable('formats')) {
            Schema::table('formats', function (Blueprint $table) {
                if (!Schema::hasColumn('formats', 'description')) {
                    $table->string('description')->nullable()->after('nom');
                }
            });
        }

        if (Schema::hasTable('type_articles')) {
            Schema::table('type_articles', function (Blueprint $table) {
                if (!Schema::hasColumn('type_articles', 'description')) {
                    $table->string('description')->nullable()->after('nom');
                }
            });
        }

        if (Schema::hasTable('status')) {
            Schema::table('status', function (Blueprint $table) {
                if (!Schema::hasColumn('status', 'description')) {
                    $table->string('description')->nullable()->after('nom');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('formats')) {
            Schema::table('formats', function (Blueprint $table) {
                if (Schema::hasColumn('formats', 'description')) {
                    $table->dropColumn('description');
                }
            });
        }

        if (Schema::hasTable('type_articles')) {
            Schema::table('type_articles', function (Blueprint $table) {
                if (Schema::hasColumn('type_articles', 'description')) {
                    $table->dropColumn('description');
                }
            });
        }

        if (Schema::hasTable('status')) {
            Schema::table('status', function (Blueprint $table) {
                if (Schema::hasColumn('status', 'description')) {
                    $table->dropColumn('description');
                }
            });
        }
    }
};

