<?php

namespace Modules\Users\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Users\Emails\PasswordResetEmail;

class PasswordResetController extends Controller
{

	public function index(Request $request)
	{
		$user = User::where('email', $request->email)->first();
		if (!$user) {
			return $this->userFailureResponse();
		}

		if( ($response = $this->userApprovalFailure($user)) !== false ){
			return $response;
		}

		$user->findATOrCreate()->queue(new PasswordResetEmail($user));

		return $this->successResponse();
	}

	public function update(Request $request)
	{
		$user = User::where('email', $request->email)->hasUnusedToken($request->token)->first();
		if (!$user) {
			return $this->userFailureResponse();
		}

		if (($response = $this->userApprovalFailure($user)) !== false) {
			return $response;
		}

		$user->fill(
			array_map(
				function($item){
					return bcrypt($item);
				},
				$request->validate(['password' => 'bail|required|confirmed'])
			)
		)->save();
		$user->activationTokens()->where('token', $request->token)->first()->use();

		return $this->successResponse();
	}

	/**
	 * send success json response
	 *
	 * @return \Illuminate\Http\Response
	 */
	private function successResponse()
	{
		return response()->json(['meta' => generate_meta('success')], 200);
	}


	/**
	 * send json response that indicates user was not found
	 *
	 * @return \Illuminate\Http\Response
	 */
	private function userFailureResponse()
	{
		return response()->json(['meta' => generate_meta('failure','Can not find user')], 400);
	}

	/**
	 * check user status for active and approval and return accordingly
	 *
	 * @param User $user
	 * @return \Illuminate\Http\Response|boolean
	 */
	private function userApprovalFailure(User $user)
	{
		if (!$user->is_active) {
			return response()->json(['meta' => generate_meta('failure', 'not_active')], 422);
		}

		if (!$user->is_approved) {
			return response()->json(['meta' => generate_meta('failure', 'not_approved')], 422);
		}

		return false;
	}
}
