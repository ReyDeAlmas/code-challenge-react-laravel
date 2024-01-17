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
        Schema::table('tracks', function (Blueprint $table) {
            //
            $table->string('img');
            $table->boolean('added');
            $table->foreignId('playlist_id')->constrained('playlists','id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tracks', function (Blueprint $table) {
            //
            $table->dropColumn('img');
            $table->dropColumn('added');
            $table->dropConstrainedForeignId('playlist_id');
        });
    }
};
