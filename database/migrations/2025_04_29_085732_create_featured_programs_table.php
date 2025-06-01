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
        Schema::create('featured_programs', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // equivalent to varchar title [not null]
            $table->text('icon'); // equivalent to varchar icon [not null]
            $table->text('description'); // equivalent to text description [not null]
            $table->string('url'); // equivalent to varchar url [not null]
            $table->boolean('is_active')->default(true); // equivalent to bool is_active [default: true]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('featured_programs');
    }
};
