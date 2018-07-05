<?php

namespace Modules\ShoppingCart\Events;

use Illuminate\Queue\SerializesModels;
use Modules\ShoppingCart\Entities\Order;

class OrderStatusUpdated
{
    use SerializesModels;

    /**
     * Order
     *
     * @var \Modules\ShoppingCart\Entities\Order
     */
    public $order;


    /**
     * new order status
     *
     * @var string
     */
    public $status;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Order $order, $status)
    {
        $this->order = $order;
        $this->status = $status;
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
