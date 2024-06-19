<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'datum_vreme' => $this->datum_vreme,
            'status' => $this->status,
            'nacin_placanja' => $this->nacin_placanja,
            'service' => new ServiceResource($this->service),
            'worker' => new UserResource($this->worker),
            'client' => new UserResource($this->client),
        ];
    }
}
