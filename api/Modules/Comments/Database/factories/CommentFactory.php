<?php

use Faker\Generator as Faker;

$factory->define(\Modules\Comments\Entities\Comment::class, function (Faker $faker) {
    return [
        'content' => $faker->paragraph,
        'rating' => $faker->randomDigit%6,
        'model_type' => \Modules\ShoppingCart\Entities\Product::class,
        'user_id' => function(){
            return factory(\App\User::class)->create()->id;
        }
    ];
});
