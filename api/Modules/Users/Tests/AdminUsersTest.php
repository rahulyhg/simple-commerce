<?php

namespace Modules\Users\Tests;

use App\User;
use Modules\Users\Jwt\JwtTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class AdminUsersTest extends JwtTestCase
{
	use DatabaseMigrations;

	public function setUp()
	{
		 parent::setUp();

		 $this->admin = factory(User::class)->create([
			 'type' => 'admin'
		 ]);

		 $this->actingAs($this->admin);
	}

	/** @test */
	public function admin_can_list_users()
	{
		$this->withoutExceptionHandling();
		$users = factory(User::class, 30)->create();

		$users->each(function($user){
			$user->activate()->approve();
		});

		$res = $this->json('get','api/admin/users');

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);
		$res->assertJsonStructure([
			'data' => [
				'*' => ['id', 'name', 'email', 'created_at','updated_at', 'status'],
			],
			'meta' => ['code', 'message', 'pagination'],
		]);

		$this->assertContentCount(15, $res);

		$res = $this->json('get','api/admin/users?page=2');
		$this->assertContentCount(15, $res);
	}

	/** @test */
	public function admin_can_get_users_that_have_specific_status()
	{
		$this->withoutExceptionHandling();
		$users = factory(User::class, 15)->create();

		$users->each(function ($user) {
			$user->activate()->approve();
		});

		$users = factory(User::class, 15)->create()->each->setPending();

		$res = $this->json('get', 'api/admin/users?status=pending');

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);
		$res->assertJsonStructure([
			'data' => [
				'*' => ['id', 'name', 'email', 'created_at', 'updated_at', 'status'],
			],
			'meta' => ['code', 'message', 'pagination'],
		]);

		$this->assertContentCount(15, $res);

		$res = $this->json('get', 'api/admin/users?status=pending&page=2');
		$this->assertContentCount(0, $res);
	}


	/** @test */
	public function admin_can_edit_user()
	{
		$this->withoutExceptionHandling();
		$user = factory(User::class)->create();

		$res = $this->json('put', "api/admin/users/{$user->id}",[
			'first_name' => 'Mohammed Manssour',
			'last_name' => 'Mohammed Manssour',
			'email' => 'manssour.mohammed@gmail.com'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$this->assertDatabaseHas('users',[
			'first_name' => 'Mohammed Manssour',
			'last_name' => 'Mohammed Manssour',
			'email' => 'manssour.mohammed@gmail.com'
		]);
	}
}
