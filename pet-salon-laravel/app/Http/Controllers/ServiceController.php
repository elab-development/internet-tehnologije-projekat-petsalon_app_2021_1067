<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function index()
    {
       
        $services = Service::all();
        return ServiceResource::collection($services);

    }
    

    public function show($id)
    {
        // Provera da li je korisnik radnik
        if (Auth::user()->is_worker) {
            $service = Service::findOrFail($id);
            return new ServiceResource($service);

        } else {
            // Ako korisnik nije radnik
            return response()->json(['Poruka' => 'Nemate dozvolu za pristup ovoj usluzi.'], 403);
        }
    }

    public function store(Request $request)
    {
        
            // Validacija za polja koja se unose preko requesta
            $validator = Validator::make($request->all(), [
                'naziv' => 'required',
                'opis' => 'required',
                'trajanje' => 'required|integer',
                'tezina' => 'required|in:Lak posao,Posao srednje tezine,Tezak posao'
            ]);

            // Provera validacije
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            // Kreiranje nove usluge
            $service = new Service();

            $service->naziv = $request->naziv;
            $service->opis = $request->opis;
            $service->trajanje = $request->trajanje;
            $service->tezina = $request->tezina;
        
            $service->save();

            return response()->json(['Poruka' => 'Kreirana je nova usluga', 'service' => new ServiceResource($service)]);
       
        
    }

    public function update(Request $request, $id)
    {
         
         
            // Validacija za polja koja se unose preko requesta
            $validator = Validator::make($request->all(), [
                'naziv' => 'required',
                'opis' => 'required',
                'trajanje' => 'required|integer',
                'tezina' => 'required|in:Lak posao,Posao srednje tezine,Tezak posao'
            ]);

            // Provera validacije
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            // Azuriranje usluge koja se pronadje na osnovu ida
            $service = Service::findOrFail($id);

            $service->naziv = $request->naziv;
            $service->opis = $request->opis;
            $service->trajanje = $request->trajanje;
            $service->tezina = $request->tezina;

            $service->save();

            return response()->json(['Poruka' => 'Azurirana je izabrana usluga', 'service' => new ServiceResource($service)]);
       
    }

    public function destroy($id)
    {
         

            $service = Service::findOrFail($id);
            $service->delete();

            return response()->json(['Poruka' => 'Obrisana je izabrana usluga']);

        
    }
}
