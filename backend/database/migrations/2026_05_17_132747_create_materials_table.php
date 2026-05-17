<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade'); // pengajar
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('type');          // video | pdf | image | document
            $table->string('file_path');     // path file di storage
            $table->string('file_name');     // nama asli file
            $table->unsignedBigInteger('file_size')->default(0); // bytes
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
