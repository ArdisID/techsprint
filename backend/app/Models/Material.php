<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Material extends Model
{
    protected $fillable = [
        'uploaded_by',
        'title',
        'description',
        'type',
        'file_path',
        'file_name',
        'file_size',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'file_size'    => 'integer',
    ];

    /**
     * Pengajar yang mengupload materi ini.
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
