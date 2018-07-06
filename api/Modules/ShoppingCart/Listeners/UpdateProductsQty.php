<?php

namespace Modules\ShoppingCart\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateProductsQty
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $order = $event->order;
        $status = $order->status;

        if($status != 'approved'){
            return false;
        }

        $order->products->each(function ($product) {
            $product->decrementQty($product->pivot->qty);
        });
    }
}
