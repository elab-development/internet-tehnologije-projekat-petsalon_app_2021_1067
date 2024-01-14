<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv',
        'opis', 
        'trajanje',
        'tezina',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
