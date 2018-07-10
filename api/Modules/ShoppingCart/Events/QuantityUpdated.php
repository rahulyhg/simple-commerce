<?php

namespace Modules\ShoppingCart\Events;

use Illuminate\Queue\SerializesModels;

class QuantityUpdated
{
    use SerializesModels;

    /**
     * The Product
     *
     * @var \Modules\ShoppingCart\Entities\Product
     */
    public $product;

    /**
     * Qty record info
     *
     * @var \Modules\ShoppingCart\Entities\Quantity
     */
    public $qty;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($product, $qty)
    {
        $this->product = $product;
        $this->qty = $qty;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
