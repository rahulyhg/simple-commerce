<?php

namespace Modules\Users\Listeners;

use Modules\Users\Events\UserCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use TheSeer\Tokenizer\Exception;

class EmailActivationToken
{
	/**
	 * Create the event listener.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
	}

	/**
	 * Handle the event.
	 *
	 * @param  object  $event
	 * @return void
	 */
	public function handle(UserCreated $event)
	{
		$event->user->findATOrCreate()->send();
	}
}
