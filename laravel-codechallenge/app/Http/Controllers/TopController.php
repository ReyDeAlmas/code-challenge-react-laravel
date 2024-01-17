<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TopController extends Controller
{
    //
    public function index(){
        $jsonResponse =  Http::get("https://api.deezer.com/editorial/0/charts");

        if($jsonResponse->status() == 200)
        {
            
            $data = json_decode($jsonResponse, true);
   
            $result = array_map(function ($item) {
                return [
                    'id' => $item['id'],
                    'title' => $item['title'],
                    'duration' => $item['duration'],
                    'link' => $item['link'],
                    'album' => $item['album']['title'],
                    'artist' => $item['artist']['name'],
                     'img' => $item['album']['cover_medium'],
                     'added' => false
                ];
            }, $data['tracks']['data']);

            foreach($result as $index => $track){
                if(Track::where('id_deezer', $track['id'])->exists())
                {
                    $result[$index]['added'] = true;
                }
            }

            return json_encode($result,JSON_UNESCAPED_UNICODE);
        }
        else{
            return response()->json(['error' => 'La solicitud no fue exitosa'], $jsonResponse->status());
        }
   
    }
}
