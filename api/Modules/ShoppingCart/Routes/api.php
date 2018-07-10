<?php

use Modules\Users\Http\Middleware\ApiAdmin;

Route::middleware('auth:api')->group(function(){
    Route::apiResource('orders', 'OrdersController');
    Route::apiResource('products', 'ProductsController',[
        'only' => ['index', 'show']
    ]);
});

Route::prefix('admin')->namespace('Admin')->middleware(['auth:api', ApiAdmin::class])->group(function(){

    Route::resource('products/{product}/quantities','QuantitiesController',[
        'only' => ['index', 'store']
    ]);

    Route::apiResource('products', 'ProductsController');
    Route::apiResource('brands', 'BrandsController');
});
