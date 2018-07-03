<?php

namespace Modules\Users\Jwt;

use Illuminate\Support\Facades\Route;

Class Jwt{

	/**
	 * jwt routes
	 *
	 * @return void
	 */
	public static function routes()
	{
		Route::middleware('guest')->namespace('Auth')->group(function(){
			Route::post('login', 'LoginController@index');
			Route::post('request-password-reset', 'PasswordResetController@index');
			Route::put('password-reset', 'PasswordResetController@update');
		});
	}

}