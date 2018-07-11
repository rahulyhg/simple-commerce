<?php

namespace Modules\Users\Entities;

use Modules\Users\Jwt\UsesJWT;
use Modules\Users\Traits\HasRoles;
use Spatie\ModelStatus\HasStatuses;
use Modules\Users\Traits\Approvable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Modules\ShoppingCart\Traits\HasWishlist;
use Modules\Users\Traits\HasActivationToken;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
	use Approvable,
		HasRoles,
		HasActivationToken,
		UsesJWT,
		HasWishlist;
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'first_name', 'last_name', 'email', 'password', 'birthday', 'address'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password', 'remember_token',
	];

	/*----------------------------------------------------
	* Attributes
	--------------------------------------------------- */
	public function getNameAttribute()
	{
		return $this->first_name.' '.$this->last_name;
	}
}
