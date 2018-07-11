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
    public function inWishlist(Product $product)
    {
        return $this->products()->where('products.id', $product->id)->count();
    }

    public function addToWishlist(Product $product)
    {
        if($this->inWishlist($product)){
            return $this;
        }

        $this->products()->attach($product->id);
        return $this;
    }

    public function removeFromWishlist(Product $product)
    {
        if (!$this->inWishlist($product)) {
            return $this;
        }

        $this->products()->detach($product->id);
        return $this;
    }
}