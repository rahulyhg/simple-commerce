<?php

namespace Modules\ShoppingCart\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\ShoppingCart\Entities\Product;

class Quantity extends Model
{
    protected $fillable = [
        'type', 'value', 'price_per_unit' ,'product_id', 'comments'
    ];

    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /*----------------------------------------------------
    * Attributes
    --------------------------------------------------- */
    public function getTotalPriceAttribute()
    {
        return $this->value * $this->price_per_unit;
    }
}
