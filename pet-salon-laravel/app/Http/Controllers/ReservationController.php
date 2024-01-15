<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
         //ne moze radnik kreirati rezervaciju
         $is_worker = Auth::user()->is_worker;

        if ($is_worker) {
            return response()->json(['error' => 'Nedozvoljeno, ovo moze samo klasican korisnik raditi.'], 403);
        }

            // Validacija za polja koja se unose preko requesta
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'nacin_placanja' => 'required|in:Kartica,Kes,Cek,Gift vaucer',
        ]);

        // Provera validacije
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje nove rezervacije
        $reservation = new Reservation();
        $reservation->service_id = $request->service_id;
        $reservation->datum_vreme = now(); // Trenutno vreme
        //po defaultu kada se rezervacija kreira treba da se potvrdi,
        // pa posle to korisnik menja
        $reservation->status = 'Potrebna potvrda';
        $reservation->nacin_placanja = $request->nacin_placanja;
        $reservation->user_worker_id = rand(1, 3); // Nasumično izabran worker ID između 1 i 3
        $reservation->user_client_id = Auth::id(); // ID trenutno ulogovanog klijenta

        $reservation->save();

        return response()->json(['Poruka' => 'Kreirana je nova rezervacija u salonu za pse', 
            'reservation' => new ReservationResource($reservation)]);

    }

    public function update(Request $request, $id)
    {
            // Provera da li je korisnik obican klijent (is_worker = false)
            $is_worker = Auth::user()->is_worker;

            if ($is_worker) {
                return response()->json(['error' => 'Nedozvoljeno, ovo moze samo klasican korisnik raditi.'], 403);
            }

            // Pronalazenje rezervacije
            $reservation = Reservation::findOrFail($id);

            // Provera da li trenutno ulogovani korisnik menja svoju rezervaciju
            if ($reservation->user_client_id != Auth::id()) {
                return response()->json(['error' => 'Nemate dozvolu za azuriranje tudje rezervacije.'], 403);
            }

            // Validacija za polja koja se unose preko requesta
            $validator = Validator::make($request->all(), [
                'status' => 'required|in:Potvrdjena,Otkazana,Pomeren termin,Nerealizovana,Potrebna potvrda',
                'nacin_placanja' => 'required|in:Kartica,Kes,Cek,Gift vaucer',
            ]);

            // Provera validacije
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            // Azuriranje rezervacije
            $reservation->status = $request->status;
            $reservation->nacin_placanja = $request->nacin_placanja;

            $reservation->save();

            return response()->json(['Poruka' => 'Rezervacija je azurirana', 'reservation' => new ReservationResource($reservation)]);
    }

    public function updateStatus(Request $request, $id)
    {
            // Provera da li je korisnik obican klijent (is_worker = false)
            $is_worker = Auth::user()->is_worker;

            if ($is_worker) {
                return response()->json(['error' => 'Nedozvoljeno, ovo moze samo klasican korisnik raditi.'], 403);
            }

            // Pronalazenje rezervacije
            $reservation = Reservation::findOrFail($id);

            // Provera da li trenutno ulogovani korisnik menja svoju rezervaciju
            if ($reservation->user_client_id != Auth::id()) {
                return response()->json(['error' => 'Nemate dozvolu za azuriranje statusa tudje rezervacije.'], 403);
            }

            // Validacija za polja koja se unose preko requesta
            $validator = Validator::make($request->all(), [
                'status' => 'required|in:Potvrdjena,Otkazana,Pomeren termin,Nerealizovana,Potrebna potvrda',
            ]);

            // Provera validacije
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            // Azuriranje statusa rezervacije
            $reservation->status = $request->status;

            $reservation->save();

            return response()->json(['Poruka' => 'Status rezervacije je azuriran', 'reservation' => new ReservationResource($reservation)]);
    }

    public function destroy($id)
    {
        // Provera da li je korisnik obican klijent (is_worker = false)
        $is_worker = Auth::user()->is_worker;

        if ($is_worker) {
            return response()->json(['error' => 'Nedozvoljeno, ovo moze samo klasican korisnik raditi.'], 403);
        }

        // Pronalazenje rezervacije
        $reservation = Reservation::findOrFail($id);

        // Provera da li trenutno ulogovani korisnik brise svoju rezervaciju
        if ($reservation->user_client_id != Auth::id()) {
            return response()->json(['error' => 'Nemate dozvolu za brisanje tudje rezervacije.'], 403);
        }

        // Brisanje rezervacije
        $reservation->delete();

        return response()->json(['Poruka' => 'Uspesno ste obrisali svoju rezervaciju.']);
    }


}
   
