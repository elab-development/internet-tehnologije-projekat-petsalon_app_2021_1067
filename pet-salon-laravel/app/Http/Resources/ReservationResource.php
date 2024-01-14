<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'datum_vreme' => $this->resource->datum_vreme,
            'status' => $this->resource->status,
            'nacin_placanja' => $this->resource->nacin_placanja,
            'service' => new ServiceResource($this->resource->service),
            'worker' => new UserResource($this->resource->worker),
            'client' => new UserResource($this->resource->client)
        ];
    } 

 }

