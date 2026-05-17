<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ProgressController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\StatistikController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Auth Routes (publik)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Routes umum (semua user yang login)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',  [AuthController::class, 'logout']);
    Route::get('/user',     [AuthController::class, 'user']);
    Route::put('/user',     [AuthController::class, 'updateProfile']);
});

/*
|--------------------------------------------------------------------------
| Routes MURID (harus login)
|--------------------------------------------------------------------------
*/
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // Lessons — murid belajar
    Route::get('/lessons',          [LessonController::class, 'index']);
    Route::get('/lessons/{id}',     [LessonController::class, 'show']);

    // Progres murid sendiri
    Route::get('/progress',         [ProgressController::class, 'index']);
    Route::post('/progress/update', [ProgressController::class, 'update']);
    Route::get('/progress/streak',  [ProgressController::class, 'streak']);

    // AI Gesture Feedback
    Route::post('/gesture/analyze', [LessonController::class, 'analyzeGesture']);
});

/*
|--------------------------------------------------------------------------
| Routes PENGAJAR — harus login & role pengajar
|--------------------------------------------------------------------------
*/
Route::prefix('v1/pengajar')->middleware(['auth:sanctum', 'role.pengajar'])->group(function () {
    // Upload & kelola materi
    Route::get('/materi',                   [MaterialController::class, 'index']);
    Route::post('/materi',                  [MaterialController::class, 'store']);
    Route::patch('/materi/{id}/publish',    [MaterialController::class, 'togglePublish']);
    Route::delete('/materi/{id}',           [MaterialController::class, 'destroy']);

    // Statistik & progres murid
    Route::get('/statistik',                [StatistikController::class, 'index']);
    Route::get('/statistik/{id}',           [StatistikController::class, 'show']);
});
