<?php

namespace Modules\ShoppingCart\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\TreasuryPapers\Listeners\CreateTreasuryPaper;

class OrderCreateTreasuryPaper
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
        $status = $event->status;

        if($status != 'approved'){
            return;
        }

        return with(new CreateTreasuryPaper($order, 'in', $order->total_price, 'Order Submitted'))->handle();
    }
}
