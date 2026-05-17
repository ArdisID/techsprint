<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MaterialController extends Controller
{
    /**
     * Daftar semua materi yang diupload pengajar ini.
     */
    public function index(Request $request)
    {
        $materials = Material::where('uploaded_by', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $materials,
        ]);
    }

    /**
     * Upload materi baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'file'        => 'required|file|max:51200', // maks 50MB
            'type'        => 'required|in:video,pdf,image,document',
        ]);

        $file     = $request->file('file');
        $path     = $file->store('materials', 'public');

        $material = Material::create([
            'uploaded_by'  => $request->user()->id,
            'title'        => $request->title,
            'description'  => $request->description,
            'type'         => $request->type,
            'file_path'    => $path,
            'file_name'    => $file->getClientOriginalName(),
            'file_size'    => $file->getSize(),
            'is_published' => false,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Materi berhasil diupload.',
            'data'    => $material,
        ], 201);
    }

    /**
     * Publish / unpublish materi.
     */
    public function togglePublish(Request $request, $id)
    {
        $material = Material::where('uploaded_by', $request->user()->id)
            ->findOrFail($id);

        $material->update(['is_published' => !$material->is_published]);

        return response()->json([
            'status'  => 'success',
            'message' => $material->is_published ? 'Materi dipublikasikan.' : 'Materi disembunyikan.',
            'data'    => $material,
        ]);
    }

    /**
     * Hapus materi.
     */
    public function destroy(Request $request, $id)
    {
        $material = Material::where('uploaded_by', $request->user()->id)
            ->findOrFail($id);

        Storage::disk('public')->delete($material->file_path);
        $material->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Materi berhasil dihapus.',
        ]);
    }
}
