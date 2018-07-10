<?php

use Modules\Users\Http\Middleware\ApiAdmin;

Route::apiResource('categories','CategoriesController',[
	'only' => 'index'
]);

Route::middleware(['auth:api', ApiAdmin::class])->namespace('Admin')->prefix('admin')->group(function(){
	Route::resource('categories', 'CategoriesController',[
		'except' => ['edit', 'create', 'show']
	]);
});