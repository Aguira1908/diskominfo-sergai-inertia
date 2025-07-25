<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sub_menu_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('menu_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('title', 255);
            $table->longText('content')->nullable();
            $table->string('slug', 255)->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
