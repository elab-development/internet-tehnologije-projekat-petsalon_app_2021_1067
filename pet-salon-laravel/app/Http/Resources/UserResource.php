<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'email' => $this->resource->email,
        ];

        if ($this->resource->is_worker) {
            $data['is_worker'] = 'Ovaj korisnik je radnik u salonu za pse.';
        }

        if (!($this->resource->is_worker)) {
            $data['is_worker'] = 'Ovo je obican korisnik koji koristi usluge salona.';
        }

        return $data;

    }
    
}
