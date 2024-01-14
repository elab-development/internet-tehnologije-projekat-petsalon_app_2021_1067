<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'datum_vreme',
        'status', 
        'nacin_placanja',
        'service_id',
        'user_worker_id',
        'user_client_id'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function worker()
    {
        return $this->belongsTo(User::class, 'user_worker_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'user_client_id');
    }
}
