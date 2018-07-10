<?php

namespace Modules\ShoppingCart\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\TreasuryPapers\Listeners\CreateTreasuryPaper;

class ProductCreateTreasuryPaper
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
    public function handle($event)
    {
        $qty = $event->qty;
        if($qty->type == 'out'){
            return;
        }

        return with(new CreateTreasuryPaper($event->product, 'out', $qty->total_price , 'Quantity Was Added For Product'))->handle();
    }
}
