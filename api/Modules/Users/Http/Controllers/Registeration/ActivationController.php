<?php

namespace Modules\Users\Http\Controllers\Registeration;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ActivationController extends Controller
{
	public function index(Request $request)
	{
		$user = User::hasUnusedToken($request->token)->where('email', $request->email)->first();
		if(!$user){
			return response()->json(['meta' => generate_meta('failure','Email or Token is invalid')], 400);
		}

		$user->activate();
		$user->activationTokens()->where('token', $request->token)->first()->use();

		return response()->json(['meta'=> generate_meta('success')], 200);
	}

	public function show(Request $request)
	{
		$user = User::where('email', $request->email)->first();
		if (!$user) {
			return response()->json(['meta' => generate_meta('failure', 'Cannot find user')], 400);
		}

		$user->findATOrCreate()->queue();
		return response()->json(['meta' => generate_meta('success')], 200);
	}
}
