<?php

namespace Modules\ShoppingCart\Events;

use Illuminate\Queue\SerializesModels;
use Modules\ShoppingCart\Entities\Order;

class OrderCreated
{
    use SerializesModels;

    /**
     * Order
     *
     * @var \Modules\ShoppingCart\Entities\Order
     */
    public $order;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
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
