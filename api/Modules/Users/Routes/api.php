<?php

use Modules\Users\Jwt\Jwt;
use Modules\Users\Http\Middleware\ApiAdmin;

Route::middleware('guest')->namespace('Registeration')->group(function(){
	Route::post('register', 'RegisterController@index');
	Route::post('activate/resend-code', 'ActivationController@show');
	Route::post('activate', 'ActivationController@index');
});

Jwt::routes();

Route::middleware('auth:api')->group(function(){
	Route::get('profile', 'UsersController@show');
	Route::put('profile', 'UsersController@update');
});

Route::middleware('auth:api')->middleware(ApiAdmin::class)->namespace('Admin')->group(function(){
	Route::get('users/{user}/history','ApprovalController@index');

	Route::post('users/{user}/activate','ApprovalController@update');
	Route::post('users/{user}/approve','ApprovalController@update');
	Route::post('users/{user}/reject','ApprovalController@update');
	Route::post('users/{user}/pending','ApprovalController@update');
});

Route::middleware('auth:api')->middleware(ApiAdmin::class)->prefix('admin')->group(function(){
	Route::resource('users', 'Admin\UsersController',[
		'except' => ['edit', 'create','store','destroy']
	]);
});
