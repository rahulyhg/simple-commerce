<?php

namespace Modules\ShoppingCart\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\ShoppingCart\Entities\Product;

class Quantity extends Model
{
    protected $fillable = [
        'type', 'value', 'product_id'
    ];

    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
