<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => [
                ['id' => 1, 'title' => 'Sapaan Sehari-hari', 'duration' => '15 Min', 'lessons' => 5],
                ['id' => 2, 'title' => 'Angka 1-10', 'duration' => '10 Min', 'lessons' => 3],
                ['id' => 3, 'title' => 'Kata Tanya', 'duration' => '20 Min', 'lessons' => 6],
            ]
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => [
                'id' => $id,
                'title' => 'Huruf A, B, dan C',
                'description' => 'Mengenal abjad dasar dalam BISINDO.',
                'content' => [
                    ['letter' => 'A', 'instruction' => 'Kepalkan tangan Anda...'],
                    ['letter' => 'B', 'instruction' => 'Telapak tangan terbuka...'],
                ]
            ]
        ]);
    }

    public function analyzeGesture(Request $request)
    {
        // Mocking AI Gesture recognition feedback
        return response()->json([
            'status' => 'success',
            'data' => [
                'is_correct' => true,
                'accuracy' => 98.5,
                'feedback' => 'Sempurna! Gerakan Anda sangat akurat.'
            ]
        ]);
    }
}
