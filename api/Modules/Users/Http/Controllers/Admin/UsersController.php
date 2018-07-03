<?php

namespace Modules\Users\Http\Controllers\Admin;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Users\Http\Requests\UpdateUser;
use Modules\Users\Transformers\UserTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class UsersController extends Controller
{
	public function index(UserTransformer $userTransformer)
	{
		$models = User::with('statuses')->when(request('status', 'all')!= 'all', function($query){
							return $query->currentStatus(request('status'));
						})
						->latest()
						->paginate();

		return response()->json(
			fractal()
				->collection($models)
				->transformWith($userTransformer->includeStatus()->includeTimestamps())
				->paginateWith(new IlluminatePaginatorAdapter($models))
				->addMeta(generate_meta('meta'))
				->toArray(),
			200
		);
	}


	public function update(UpdateUser $request)
	{

		$user = User::find($request->user);
		if(!$user){
			return response()->json(['meta' => generate_meta('failure','cannot find user')], 404);
		}

		$data = collect($request->validated())->map(function($value, $field){
			if($field == 'password'){
				$value = bcrypt($value);
			}
			return $value;
		});

		$user->fill($data->all())->save();

		return response()->json(['meta' => generate_meta('success')], 200);
	}
}
