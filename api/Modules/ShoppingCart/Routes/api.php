<?php

use Modules\Users\Http\Middleware\ApiAdmin;

Route::middleware('auth:api')->group(function(){
    Route::apiResource('orders', 'OrdersController');
});

Route::prefix('admin')->namespace('Admin')->middleware(['auth:api', ApiAdmin::class])->group(function(){
    Route::apiResource('products', 'ProductsController');
    Route::apiResource('brands', 'BrandsController');
});
