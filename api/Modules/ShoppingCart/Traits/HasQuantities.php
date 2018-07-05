<?php

namespace Modules\ShoppingCart\Traits;

use Modules\ShoppingCart\Entities\Quantity;


trait HasQuantities{

    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    public function quantities()
    {
        return $this->hasMany(Quantity::class);
    }

    /*----------------------------------------------------
    * Attributes
    --------------------------------------------------- */
    public function getQtyAttribute()
    {
        if($this->in && $this->out){
            return $this->in - $this->out;
        }

        $qty = Quantity::selectSub(
                Quantity::selectRaw('sum(value)')
                    ->where('product_id', $this->id)
                    ->where('type', 'in')
                    ->getQuery(),
                'in'
            )
            ->selectSub(
                Quantity::selectRaw('sum(value)')
                    ->where('product_id', $this->id)
                    ->where('type', 'out')
                    ->getQuery(),
                'out'
            )->first();

        if(!$qty){
            return 0;
        }

        return $qty->in - $qty->out;
    }

    /*----------------------------------------------------
    * scopes
    --------------------------------------------------- */
    public function scopeWithQty($query)
    {
        return $query->selectSub(
            Quantity::selectRaw('sum(value)')
                ->whereRaw('product_id = products.id')
                ->where('type', 'in')
                ->getQuery(),
            'in'
        )
        ->selectSub(
            Quantity::selectRaw('sum(value)')
                ->whereRaw('product_id = products.id')
                ->where('type', 'out')
                ->getQuery(),
            'out'
        );
    }
}