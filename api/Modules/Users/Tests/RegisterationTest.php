<?php

namespace Modules\Users\Tests;

use Mail;
use Event;
use App\User;
use Tests\TestCase;
use Modules\Users\Events\UserCreated;
use Modules\Users\Emails\ActivationTokenEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class RegisterationTest extends TestCase
{
	use DatabaseMigrations;

	/** @test */
	public function can_register_with_a_new_account()
	{
		Event::fake();

		$this->withoutExceptionHandling();

		$res = $this->send_register_user_request();

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$this->assertDatabaseHas('users',[
			'first_name' => 'Mohammed',
			'last_name' => 'Manssour',
			'email' => 'manssour.mohammed@gmail.com',
		]);

		Event::assertDispatched(UserCreated::class);
	}

	/** @test */
	public function user_will_be_approved_after_registeration()
	{
		$this->withoutExceptionHandling();

		$res = $this->send_register_user_request();

		$res->assertStatus(200);

		$user = User::first();
		$this->assertEquals('approved',$user->status);
	}

	public function send_register_user_request()
	{
		return $this->json('post', 'api/register', [
			'first_name' => 'Mohammed',
			'last_name' => 'Manssour',
			'email' => 'manssour.mohammed@gmail.com',
			'password' => "secret",
			'password_confirmation' => 'secret'
		]);
	}
}
