<?php

namespace Modules\Users\Tests;

use Mail;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class JwtAuthTest extends TestCase
{
	use DatabaseMigrations;

	public function setUp()
	{

		parent::setUp();
		$this->user = factory(User::class)->create([
			'email' => 'manssour.mohammed@gmail.com',
			'password' => bcrypt('secret')
		]);


	}

	/** @test */
	public function user_can_login()
	{
		$this->withoutExceptionHandling();
		$this->user->activate()->approve();

		$res = $this->json('post', 'api/login',[
			'email' => 'manssour.mohammed@gmail.com',
			'password' => 'secret'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);
		$res->assertJsonStructure([
			'data' => ['id', 'name', 'email'],
			'meta' => ['code', 'message', 'token']
		]);
	}
}
