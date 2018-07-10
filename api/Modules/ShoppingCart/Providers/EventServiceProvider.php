<?php

namespace Modules\ShoppingCart\Providers;

use Modules\ShoppingCart\Events\OrderCreated;
use Modules\ShoppingCart\Events\QuantityUpdated;
use Modules\ShoppingCart\Events\OrderStatusUpdated;
use Modules\ShoppingCart\Listeners\UpdateProductsQty;
use Modules\ShoppingCart\Listeners\OrderCreateTreasuryPaper;
use Modules\ShoppingCart\Listeners\ProductCreateTreasuryPaper;
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
        ],
        OrderStatusUpdated::class => [
            UpdateProductsQty::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //check if TreasuryPaper Module is enabled
        if(app('accountable')){
            $this->listen[OrderStatusUpdated::class][] = OrderCreateTreasuryPaper::class;
            $this->listen[QuantityUpdated::class][] = ProductCreateTreasuryPaper::class;
        }

        parent::boot();

    }
}
