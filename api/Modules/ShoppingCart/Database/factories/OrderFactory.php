<?php

use Faker\Generator as Faker;

$factory->define(\Modules\ShoppingCart\Entities\Order::class, function (Faker $faker) {
    return [
        'user_id' => function(){
            return factory(\App\User::class)->create()->id;
        }
    ];
});
