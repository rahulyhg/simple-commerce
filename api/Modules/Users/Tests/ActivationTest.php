<?php

namespace Modules\Users\Tests;

use Mail;
use App\User;
use Tests\TestCase;
use Modules\Users\Entities\ActivationToken;
use Modules\Users\Emails\ActivationTokenEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ActivationTest extends TestCase
{
	use DatabaseMigrations;

	public function setUp()
	{
		 parent::setUp();

		 $this->user = factory(User::class)->create([
			 'email' => 'manssour.mohammed@gmail.com'
		 ]);
		 $this->activationToken = $this->user->findATOrCreate();
	}

	/** @test */
	public function user_can_activate_his_account()
	{
		$this->withoutExceptionHandling();

		$res = $this->json('post', 'api/activate',[
			'email' => 'manssour.mohammed@gmail.com',
			'token' => $this->activationToken->token
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$user = User::first();
		$this->assertEquals('active', $user->status);

		$activationToken = ActivationToken::first();
		$this->assertNotNull($activationToken->used_at);
	}

	/** @test */
	public function user_can_request_resending_activation_email()
	{
		Mail::fake();

		$res = $this->json('post','api/activate/resend-code', [
			'email' => 'manssour.mohammed@gmail.com'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		Mail::assertQueued(ActivationTokenEmail::class, function($email){
			return $email->hasTo($this->user->email);
		});
	}
}
