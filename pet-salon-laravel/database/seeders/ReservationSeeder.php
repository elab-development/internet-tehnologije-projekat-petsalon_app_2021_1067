<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //uzima sve id-eve za usluge
        $serviceIds = Service::pluck('id')->toArray();

        for ($i = 1; $i <= 10; $i++) {
            Reservation::factory()->create([
                'user_worker_id' => rand(1, 3),
                'user_client_id' => rand(4, 6),
                'service_id' => $this->getRandomId($serviceIds),
            ]);
        }
    }

    //funkcija koja iz niza id-eva vraca neki random (treba nam za dodeljivanje postojecih usluga)
    private function getRandomId(array $ids): int
    {
        return $ids[array_rand($ids)];
    }
}
