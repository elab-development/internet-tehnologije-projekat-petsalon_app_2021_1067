<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
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

        return [
            
            'naziv' => $this->faker->randomElement($services),
            'opis' => $this->faker->sentence,
            'trajanje' => $this->faker->randomElement([20, 30, 45, 60, 75, 90]),
            'tezina' => $this->faker->randomElement($array= array('Lak posao','Posao srednje tezine','Tezak posao')), 
           
        ];
    }
}
