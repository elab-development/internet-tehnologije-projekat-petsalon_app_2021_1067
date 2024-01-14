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
        Schema::table('reservations', function (Blueprint $table) {
            $table->foreignId('service_id')->nullable()->references('id')->on('services')->onDelete('set null');
            $table->foreignId('user_worker_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('user_client_id')->nullable()->references('id')->on('users')->onDelete('set null');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign('service_id');
            $table->dropForeign('user_worker_id');
            $table->dropForeign('user_client_id');
            
        });
    }
};
