<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TracksResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string => $this->duration, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id_deezer,
            "title"=> $this->title,
            'duration' => $this->duration,
            'links' => $this->links,
            'album' => $this->album,
            'artist' => $this->artist,
            'added' => $this->added,
            'img' => $this->img,
        ];
    }
}
