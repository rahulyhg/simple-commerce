<?php

namespace Modules\Users\Http\Controllers\Registeration;

use Event;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Users\Events\UserCreated;
use Modules\Users\Http\Requests\StoreUser;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
	public function index(StoreUser $request)
	{
		$user = User::create(
			collect($request->validated())
			->map(function($value, $key){
				if($key == 'password'){
					return bcrypt($value);
				}
				return $value;
			})
			->toArray()
		);

		$user->activate()->approve();

		Event::fire(new UserCreated($user));

		return response()->json(['meta'=> generate_meta('success')], 200);
	}
}
