<?php

namespace Modules\Users\Events;

use Modules\Users\Entities\User;
use Illuminate\Queue\SerializesModels;

class UserCreated
{
	use SerializesModels;


	/**
	 * the created user
	 *
	 * @var User
	 */
	public $user;

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct($user)
	{
		$this->user = $user;
	}
}
