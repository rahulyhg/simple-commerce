<?php

namespace Modules\ShoppingCart\Policies;

use App\User;
use Modules\ShoppingCart\Entities\Order;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        if($user->isSuperAdmin()){
            return true;
        }
    }

    public function see(User $user, Order $order)
    {
        return $user->id == $order->user_id;
    }
}
