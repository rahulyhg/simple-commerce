<?php

namespace Modules\Users\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Users\Http\Middleware\ApiAdmin;
use Modules\Users\Http\Requests\UpdateUser;
use Modules\Users\Transformers\UserTransformer;

class UsersController extends Controller
{

	public function update(UpdateUser $request, UserTransformer $userTransformer)
	{
		$user = auth()->user();

		$data = collect($request->validated())->map(function ($value, $field) {
			//if password field was provided and it passed validation then hash it
			if ($field == 'password') {
				$value = bcrypt($value);
			}
			return $value;
		});

		$user->fill($data->all())->save();

		return response()->json(
			fractal()
				->item($user)
				->transformWith($userTransformer)
				->addMeta(generate_meta('success'))
				->toArray(),
			200
		);
	}

	public function show(UserTransformer $userTransformer)
	{
		return response()->json(
			fractal()
				->item(auth()->user())
				->transformWith($userTransformer)
				->addMeta(generate_meta('success'))
				->toArray(),
			200
		);
	}
}
