<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            'Kupanje i feniranje',
            'Sisanje kratke dlake',
            'Sisanje duge dlake',
            'Skracivanje noktiju',
            'Uklanjanje buva i krpelja',
            'Uklanjanje parazita',
            'Ciscenje usiju',
            'Tretman protiv linjanja',
            'Izbrijavanje sapa'
        ];

        foreach ($services as $service) {
            Service::factory()->create([
                'naziv' => $service,
            ]);
        }
        
    }
}
