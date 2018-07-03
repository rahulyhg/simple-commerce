<?php

namespace Modules\Users\Jwt;

use Tests\TestCase;
use Illuminate\Contracts\Auth\Authenticatable;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtTestCase extends TestCase{

	/**
	 * current authenticated user
	 *
	 * @var \App\User
	 */
	protected $authUser;

	public function actingAs(Authenticatable $user, $driver = null)
	{
		$this->authUser = $user;
		parent::actingAs($this->authUser, $driver);
		return $this;
	}


	public function json($method, $uri, array $data = [], array $headers = [])
	{
		if( $this->authUser ){
			auth()->login($this->authUser);
			$token = JWTAuth::fromUser($this->authUser);
			$headers['Authorization'] = "Bearer {$token}";
		}

		return parent::json($method, $uri, $data, $headers);
	}

}