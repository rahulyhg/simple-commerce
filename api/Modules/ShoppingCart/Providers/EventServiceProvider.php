<?php

namespace Modules\ShoppingCart\Providers;

use Modules\ShoppingCart\Events\OrderCreated;
use Modules\ShoppingCart\Events\OrderStatusUpdated;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        OrderCreated::class => [
			// GetUserOnPending::class,
			// EmailActivationToken::class
        ],
        OrderStatusUpdated::class => [

        ]
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
