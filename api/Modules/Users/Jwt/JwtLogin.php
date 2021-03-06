<?php

namespace Modules\Users\Jwt;

use Modules\Users\Jwt\Jwt;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Modules\Users\Transformers\UserTransformer;

trait JwtLogin
{
	public function index(Request $request)
	{
		$credentials = request(['email', 'password']);

		if (!($token = JWTAuth::attempt($credentials))) {
			return response()->json(['meta' => generate_meta('failure', 'Unauthorized')], 401);
		}

		$user = auth()->user();
		if(!$user->isSuperAdmin()){
			if(!$user->is_active){
				return response()->json(['meta' => generate_meta('failure','not_active')], 422);
			}

			if(!$user->is_approved){
				return response()->json(['meta' => generate_meta('failure','not_approved')], 422);
			}
		}

		return response()->json(
			fractal()
				->item($user)
				->transformWith((new UserTransformer())->includeTimestamps())
				->addMeta(generate_meta('success'))
				->addMeta(['token' => $token])
				->toArray(),
			200
		);

	}
}
