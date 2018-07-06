<?php

namespace Modules\ShoppingCart\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\ShoppingCart\Entities\Order;
use Modules\ShoppingCart\Entities\Product;
use Modules\ShoppingCart\Transformers\OrderTransformer;
use Modules\ShoppingCart\Transformers\ProductTransformer;

class AccountableServiceProvider extends ServiceProvider
{
    public function boot()
    {
        if(app('accountable')){
            app('accountable')->register(Order::class, OrderTransformer::class);
            app('accountable')->register(Product::class, ProductTransformer::class);
        }
    }
}
