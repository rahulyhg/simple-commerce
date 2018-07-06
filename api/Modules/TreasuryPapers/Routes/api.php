<?php

use Modules\Users\Http\Middleware\ApiAdmin;

Route::prefix('admin')
    ->middleware(['auth:api',ApiAdmin::class])
    ->namespace('Admin')
    ->group(function(){
        Route::resource('treasurypapers','TreasuryPapersController',[
            'only' => ['index','store']
        ]);
    });