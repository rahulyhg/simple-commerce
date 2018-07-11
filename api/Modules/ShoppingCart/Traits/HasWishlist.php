<?php

namespace Modules\ShoppingCart\Traits;

use Modules\ShoppingCart\Entities\Product;

trait HasWishlist{

    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'wishlist');
    }

    /*----------------------------------------------------
    * Methods
    --------------------------------------------------- */
    public function addToWishlist(Product $product)
    {
        $this->products()->attach($product->id);
        return $this;
    }

    public function removeFromWishlist(Product $product)
    {
        $this->products()->detach($product->id);
        return $this;
    }
}