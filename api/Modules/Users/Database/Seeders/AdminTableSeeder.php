<?php

namespace Modules\Users\Database\Seeders;

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('users')->insert([
            'first_name' => 'Mohammed',
            'last_name' => 'Manssour',
            'password' => bcrypt('secret'),
            'email' => 'manssour.mohammed@gmail.com',
            'address' => 'Lebanon Bierut',
            'birthday' => '1992-09-12',
            'type' => 'admin'
        ]);

        // $this->call("OthersTableSeeder");
    }
}
