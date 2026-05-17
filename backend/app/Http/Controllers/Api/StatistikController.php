<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class StatistikController extends Controller
{
    /**
     * Daftar semua murid beserta ringkasan progres mereka.
     * Hanya bisa diakses oleh pengajar.
     */
    public function index()
    {
        $murid = User::where('role', 'murid')
            ->select('id', 'name', 'email', 'created_at')
            ->get()
            ->map(function ($user) {
                // Mock data progres — ganti dengan query real saat tabel progress sudah ada
                return [
                    'id'                 => $user->id,
                    'name'               => $user->name,
                    'email'              => $user->email,
                    'bergabung_sejak'    => $user->created_at->format('d M Y'),
                    'total_jam_belajar'  => rand(1, 50),
                    'modul_selesai'      => rand(0, 20),
                    'streak_hari'        => rand(0, 30),
                    'progres_persen'     => rand(10, 100),
                ];
            });

        return response()->json([
            'status'       => 'success',
            'total_murid'  => $murid->count(),
            'data'         => $murid,
        ]);
    }

    /**
     * Detail progres 1 murid spesifik.
     */
    public function show($id)
    {
        $murid = User::where('role', 'murid')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data'   => [
                'id'                => $murid->id,
                'name'              => $murid->name,
                'email'             => $murid->email,
                'bergabung_sejak'   => $murid->created_at->format('d M Y'),
                'total_jam_belajar' => 24,
                'modul_selesai'     => 12,
                'streak_hari'       => 7,
                'progres_persen'    => 65,
                'aktivitas_mingguan' => [
                    'Sen' => 40, 'Sel' => 60, 'Rab' => 30,
                    'Kam' => 80, 'Jum' => 50, 'Sab' => 90, 'Min' => 70,
                ],
            ],
        ]);
    }
}
