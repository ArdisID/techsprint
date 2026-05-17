<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Akun Pengajar
        User::create([
            'name'              => 'Pengajar Demo',
            'email'             => 'pengajar@bisindo.ai',
            'password'          => Hash::make('password123'),
            'role'              => 'pengajar',
            'email_verified_at' => now(),
        ]);

        // Akun Murid
        User::create([
            'name'              => 'Murid Demo',
            'email'             => 'murid@bisindo.ai',
            'password'          => Hash::make('password123'),
            'role'              => 'murid',
            'email_verified_at' => now(),
        ]);
    }
}
