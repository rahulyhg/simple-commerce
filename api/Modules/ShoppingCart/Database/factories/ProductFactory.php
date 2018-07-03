<?php

use Faker\Generator as Faker;
use Modules\ShoppingCart\Entities\Product;

$factory->define(\Modules\ShoppingCart\Entities\Product::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'price' => $faker->randomDigit,
        'image' => $faker->uuid,
        'description' => $faker->paragraphs(3, true)
    ];
});
