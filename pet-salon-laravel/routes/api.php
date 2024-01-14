<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//rute kojima svako moze da pristupi
Route::post('/register',[AuthController::class,'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('forgotPassword',[AuthController::class,'forgotPassword']);


//rute za koje mora korisnik da bude autentifikovan - da ima token
//da li je radnik ili klasican proveravamo u kontrolerima

Route::group(['middleware' => ['auth:sanctum']], function () {
     Route::post('/logout', [AuthController::class, 'logout']);  

});
