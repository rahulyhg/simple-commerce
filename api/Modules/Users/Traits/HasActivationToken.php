<?php

namespace Modules\Users\Traits;

use Modules\Users\Entities\ActivationToken;

trait HasActivationToken
{

	/*----------------------------------------------------
	* Relationships
	--------------------------------------------------- */
	public function activationTokens()
	{
		return $this->hasMany(ActivationToken::class);
	}

	/*----------------------------------------------------
	* Methods
	--------------------------------------------------- */
	/**
	 * find unused activation token or create
	 *
	 * @return \Modules\Users\Entities\ActivationToken
	 */
	public function findATOrCreate()
	{
		$activationToken = $this->findUnusedActivationToken();
		if($activationToken){
			return $activationToken;
		}

		return $this->createActivationToken();
	}

	/**
	 * find an unsed activation token related for the user
	 *
	 * @return \Modules\Users\Entities\ActivationToken
	 */
	public function findUnusedActivationToken()
	{
		return $this->activationTokens()->whereNull('used_at')->first();
	}

	/**
	 * create a new activation token for the user
	 *
	 * @return \Modules\Users\Entities\ActivationToken
	 */
	public function createActivationToken()
	{
		do{
			$token = mt_rand(100000,999999);
		}while($this->activationTokens()->where('token', $token)->first());

		return $this->activationTokens()->save(new ActivationToken(['token' => $token]));
	}

	/*----------------------------------------------------
	* Scopes
	--------------------------------------------------- */
	public function scopeHasUnusedToken($query, $token)
	{
		return $query->whereHas('activationTokens',function($query) use($token){
			return $query->where('token', $token)->whereNull('used_at');
		});
	}
}
