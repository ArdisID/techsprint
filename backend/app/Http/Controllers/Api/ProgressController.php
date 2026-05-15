<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => [
                'total_hours' => 24,
                'completed_modules' => 12,
                'current_streak' => 7,
                'weekly_activity' => [
                    'Mon' => 40, 'Tue' => 60, 'Wed' => 30, 'Thu' => 80, 'Fri' => 50, 'Sat' => 90, 'Sun' => 70
                ]
            ]
        ]);
    }

    public function update(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Progress updated successfully'
        ]);
    }

    public function streak()
    {
        return response()->json([
            'data' => [
                'streak' => 7,
                'is_active_today' => true
            ]
        ]);
    }
}
