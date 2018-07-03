<?php

namespace Modules\Users\Http\Controllers\Admin;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;
use Modules\Users\Transformers\StatusTransformer;

class ApprovalController extends Controller
{
	/**
	 * Current User
	 *
	 * @var \App\User
	 */
	private $user;

	/**
	 * if the current request is made to change the user status then it will have one of the following values
	 *	activate|approve|reject|pending
	 * @var string
	 */
	private $approvalType;

	/**
	 * approval type reason
	 *
	 * @var string
	 */
	private $reason = '';

	public function __construct() {
		$this->middleware(function ($request, $next) {
			$this->user = User::find($request->user);

			if(!$this->user){
				return response()->json(['meta' => generate_meta('failure','Can not find user')], 400);
			}

			return $next($request);
		});

		$this->middleware(function($request, $next){
			$currentUri = Route::current()->uri();
			if (str_contains($currentUri, 'activate')) {
				$this->approvalType = 'activate';
			}elseif(str_contains($currentUri, 'approve')){
				$this->approvalType = 'approve';
			}elseif(str_contains($currentUri, 'reject')){
				$this->approvalType = 'reject';
			}elseif(str_contains($currentUri, 'pending')){
				$this->approvalType = 'setPending';
			}

			$this->reason = $request->reason ?? '';

			return $next($request);
		})->only('update');
	}


	public function index(StatusTransformer $statusTransformer)
	{
		$models = $this->user->statuses()->latest()->get();
		return response()->json(
			fractal()
				->collection($models)
				->transformWith($statusTransformer)
				->addMeta(generate_meta($models))
				->toArray(),
			200
		);
	}

	public function update()
	{
		$this->user->{$this->approvalType}($this->reason);
		return response()->json(['meta' => generate_meta('success')], 200);
	}
}
