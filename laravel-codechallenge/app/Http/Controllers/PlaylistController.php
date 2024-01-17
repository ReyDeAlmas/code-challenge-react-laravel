<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlaylistCollection;
use App\Http\Resources\TracksCollection;
use App\Models\Track;
use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PlaylistController extends Controller
{
    //

    public function index(){
      return new TracksCollection(Track::all());
    }



    public function store(Request $request){

        try{
 
         $validator = Validator::make($request->all(), [
             'id' => 'required|boolean',
             'title' => 'required|boolean',
             'duration' => 'required|boolean',
             'link' => 'required|boolean',
             'album' => 'required|boolean',
             'artist' => 'required|boolean',
             'img' => 'image|required',
             'added' => 'boolean|required',
             
         ]);
 
        
 
 
        $playlist = Playlist::exists() ? Playlist::first() : Playlist::create();
        
 
         
 
        DB::beginTransaction();

        
        if(Track::where("id_deezer",$request['id'] )->exists() )
        {
          return response()->json(['mensaje' => 'Solicitud fallida']);
 
        }
 
        Track::create([
         'id_deezer' => $request['id'],
         'title' => $request['title'],
         'duration' => $request['duration'],
         'links' => $request['link'],
         'album' => $request['album'],
         'artist' => $request['artist'],
         'added' => $request['added'],
         'img' => $request['img'],
         'playlist_id' => $playlist->id
        ]);
 
          DB::commit();
 
          return response()->json(['mensaje' => 'Solicitud exitosa'], 200);
        }catch(\Exception $e){
         DB::rollback();
         return response()->json(['mensaje' => 'Solicitud fallida'], $e->getMessage());
        }
 
 
     }

     public function destroy($id){
      try{
        $track = Track::where("id_deezer", $id)->first();
        $track->delete();
        return response()->json(['mensaje' => 'Solicitud exitosa'], 200);
        
      }catch(\Exception $e){
        
         return response()->json(['mensaje' => 'Solicitud fallida'], $e->getMessage());
        }
        
        
     }
 
}
