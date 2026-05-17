<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RolePengajar
{
    /**
     * Hanya izinkan user dengan role 'pengajar'.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->isPengajar()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Akses ditolak. Halaman ini hanya untuk pengajar.',
            ], 403);
        }

        return $next($request);
    }
}
