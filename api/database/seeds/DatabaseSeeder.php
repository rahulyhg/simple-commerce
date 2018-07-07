<?php

use Illuminate\Database\Seeder;
use Modules\Users\Database\Seeders\AdminTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AdminTableSeeder::class);
    }
}
