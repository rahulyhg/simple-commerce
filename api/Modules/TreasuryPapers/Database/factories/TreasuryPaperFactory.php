<?php

use Faker\Generator as Faker;

$factory->define(\Modules\TreasuryPapers\Entities\TreasuryPaper::class, function (Faker $faker) {
    $types = ['in', 'out'];
    return [
        'value' => $faker->randomDigit,
        'type' => $types[$faker->randomDigit%2],
        'comments' => $faker->paragraph
    ];
});
