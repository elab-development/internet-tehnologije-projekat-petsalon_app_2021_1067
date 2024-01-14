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
        //nova duzina
        Schema::table('services', function (Blueprint $table) {
            $table->string('opis', 200)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //kako je pre bilo
        Schema::table('services', function (Blueprint $table) {
            $table->string('opis', 100)->change();
        });
    }
};
