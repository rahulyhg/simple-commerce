<?php

namespace Modules\ShoppingCart\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\ShoppingCart\Entities\Product;

class CommentableServiceProvider extends ServiceProvider
{
    public function boot()
    {
        if( ( $commentable = app('commentable') ) ){
            $commentable->register('products/{product}/comments', function($request){
                return Product::find($request->product);
            });
        }
    }
}
