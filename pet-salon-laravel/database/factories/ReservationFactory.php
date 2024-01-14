<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'datum_vreme' => $this->faker->dateTime(),
            'status' => $this->faker->randomElement($array= array('Potvrdjena','Otkazana','Pomeren termin',
                                                                   'Nerealizovana','Potrebna potvrda')), 
            'nacin_placanja' => $this->faker->randomElement($array= array('Kartica','Kes','Cek','Gift vaucer')), 
            'service_id' => Service::factory(), 
            'user_worker_id' => User::factory(), 
            'user_client_id' => User::factory(),   
            
        ];
    }
}
