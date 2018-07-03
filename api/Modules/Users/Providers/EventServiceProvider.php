<?php

namespace Modules\Users\Providers;

use Modules\Users\Events\UserCreated;
use Modules\Users\Listeners\GetUserOnPending;
use Modules\Users\Listeners\EmailActivationToken;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
	/**
	 * The event listener mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		UserCreated::class => [
			// GetUserOnPending::class,
			// EmailActivationToken::class
		],
	];

	/**
	 * Register any events for your application.
	 *
	 * @return void
	 */
	public function boot()
	{
		parent::boot();
	}
}
