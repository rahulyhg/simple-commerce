<?php

namespace Modules\Users\Tests;

use App\User;
use Modules\Users\Jwt\JwtTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class UserTest extends JwtTestCase
{
	use DatabaseMigrations;

	public function setUp()
	{
		 parent::setUp();
		 $this->admin = factory(User::class)->create();
		 $this->user = factory(User::class)->create();
	}

	/** @test */
	public function user_can_see_his_profile()
	{
		$this->user = factory(User::class)->create([
			'first_name' => 'Mohammed',
			'last_name' => 'Manssour',
			'email' => 'manssour.mohammed@gmail.com',
		]);

		$res = $this->actingAs($this->user)->json('get','api/profile');

		// $res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);
		$res->assertJsonStructure([
			'data' => ['id', 'name', 'email'],
			'meta' => ['code', 'message']
		]);

		//since this is very simple so no need for snapshot
		$content = json_decode($res->getContent())->data;
		$this->assertEquals('Mohammed Manssour', $content->name);
		$this->assertEquals('manssour.mohammed@gmail.com', $content->email);
	}

	/** @test */
	public function user_can_edit_his_account()
	{
		$this->withoutExceptionHandling();
		$res = $this->actingAs($this->user)->json('put', 'api/profile',[
			'first_name' => 'Mohammed Manssour',
			'last_name' => 'Mohammed Manssour',
			'email' => 'manssour.mohammed@gmail.com',
			'password' => '123456',
			'password_confirmation' => '123456'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);
		$res->assertJsonStructure([
			'data' => ['id','name', 'email'],
			'meta' => ['code', 'message']
		]);
		$this->assertDatabaseHas('users',[
			'first_name' => 'Mohammed Manssour',
			'last_name' => 'Mohammed Manssour',
			'email' => 'manssour.mohammed@gmail.com',
		]);
	}
}
