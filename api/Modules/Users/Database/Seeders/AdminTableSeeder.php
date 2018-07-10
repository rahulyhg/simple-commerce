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
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'password' => bcrypt('secret'),
            'email' => 'admin@example.com',
            'address' => 'Lebanon Bierut',
            'birthday' => '1992-09-12',
            'type' => 'admin',
            'created_at' => now()->toDateTimeString(),
            'updated_at' => now()->toDateTimeString(),
        ]);

        DB::table('users')->insert([
            'first_name' => 'User',
            'last_name' => 'User',
            'password' => bcrypt('secret'),
            'email' => 'user@example.com',
            'address' => 'Lebanon Bierut',
            'birthday' => '1992-09-12',
            'type' => 'user',
            'created_at' => now()->toDateTimeString(),
            'updated_at' => now()->toDateTimeString(),
        ]);

        // $this->call("OthersTableSeeder");
    }
}
