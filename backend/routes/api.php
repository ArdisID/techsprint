<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ProgressController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user', [AuthController::class, 'updateProfile']);
});

// BISINDO.AI API Routes
Route::prefix('v1')->group(function () {
    // Lessons
    Route::get('/lessons', [LessonController::class, 'index']);
    Route::get('/lessons/{id}', [LessonController::class, 'show']);
    
    // Progress & Tracking
    Route::get('/progress', [ProgressController::class, 'index']);
    Route::post('/progress/update', [ProgressController::class, 'update']);
    Route::get('/progress/streak', [ProgressController::class, 'streak']);
    
    // AI Gesture Feedback Mock
    Route::post('/gesture/analyze', [LessonController::class, 'analyzeGesture']);
});
