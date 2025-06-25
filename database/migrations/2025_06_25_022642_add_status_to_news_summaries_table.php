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
        Schema::table('news_summaries', function (Blueprint $table) {
            $table->enum('status', ['success', 'empty', 'failed'])->default('success')->after('summary');
            $table->text('error_message')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news_summaries', function (Blueprint $table) {
            $table->dropColumn(['status', 'error_message']);
        });
    }
};
