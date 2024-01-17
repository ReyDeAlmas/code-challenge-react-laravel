<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_deezer',
        'title',
        'duration',
        'links',
        'album',
        'artist',
        'added',
        'img',
        'playlist_id'
    ];
}
