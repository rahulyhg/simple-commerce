<?php

use Faker\Generator as Faker;

$factory->define(\Modules\ShoppingCart\Entities\Quantity::class, function (Faker $faker) {
    $types = ['in', 'out'];
    return [
        'type' => $types[$faker->randomDigit%2],
        'value' => $faker->randomDigit,
        'product_id' => function(){
            return factory(\Modules\ShoppingCart\Entities\Product::class)->create()->id;
        }
    ];
});
