<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TopController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\GenresController;
use App\Http\Controllers\PlaylistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/tracks',[TrackController::class ,'index']);
Route::get('/top', [TopController::class, 'index']);

Route::get('/playlist', [PlaylistController::class, 'index']);
Route::post('/playlist', [PlaylistController::class, 'store']);
Route::delete('/playlist/{id}', [PlaylistController::class, 'destroy']);
