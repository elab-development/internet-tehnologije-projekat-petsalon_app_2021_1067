<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class PretragaUslugaController extends Controller
{
    public function searchServices(Request $request)
    {
        $upit = Service::query();

        //Pretrazuje se po tezini
        if ($request->has('tezina')) {
            $upit->where('tezina', 'like', '%' . $request->input('tezina') . '%');
        }

        //Paginacija samo usluga koje su te tezine
        $page = $request->input('page', 1);

        //koliko usluga po stranici
        $perPage = 2;

        $Services = $upit->orderBy('tezina')->paginate($perPage, ['*'], 'page', $page);

        if($Services->isEmpty()){
            return response()->json(['Poruka' => 'Ne postoji nijedna usluga te tezine'], 404);
        }
        return response()->json(['Trenutna stranica' => $Services->currentPage(), 'Poslednja stranica' => $Services->lastPage(),
         'Usluge date tezine' => ServiceResource::collection($Services)], 200);
    }
}
