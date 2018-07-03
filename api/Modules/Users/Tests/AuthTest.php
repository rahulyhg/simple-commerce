<?php

namespace Modules\Users\Tests;

use Mail;
use App\User;
use Tests\TestCase;
use Modules\Users\Emails\PasswordResetEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class AuthTest extends TestCase
{
	use DatabaseMigrations;

	public function setUp()
	{
		 parent::setUp();
		 $this->user = factory(User::class)
						->create([
							'email' => 'manssour.mohammed@gmail.com'
						])
						->activate()
						->approve();
	}


	/** @test */
	public function user_can_request_password_reset()
	{
		$this->withoutExceptionHandling();

		Mail::fake();
		$res = $this->json('post', 'api/request-password-reset', [
			'email' => 'manssour.mohammed@gmail.com'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		Mail::assertQueued(PasswordResetEmail::class, function($email){
			return $email->hasTo($this->user->email);
		});
	}

	/** @test */
	public function user_can_reset_his_password()
	{
		$this->withoutExceptionHandling();

		$activationToken = $this->user->findATOrCreate();

		$res = $this->json('put', 'api/password-reset',[
			'email' => 'manssour.mohammed@gmail.com',
			'token' => $activationToken->token,
			'password' => '123456',
			'password_confirmation' => '123456'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);
	}
}
