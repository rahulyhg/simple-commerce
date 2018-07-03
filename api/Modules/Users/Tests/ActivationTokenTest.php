<?php

namespace Modules\Users\Tests;

use App\User;
use Tests\TestCase;
use Modules\Users\Entities\ActivationToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ActivationTokenTest extends TestCase
{
	use DatabaseMigrations;

	public function setUp()
	{
		 parent::setUp();

		 $this->user = factory(User::class)->create();
	}

	/** @test */
	public function user_can_create_activationToken()
	{
		$activationToken = $this->user->createActivationToken();

		$this->assertNotNull($activationToken);
		$this->assertInstanceOf(ActivationToken::class, $activationToken);
	}

	/** @test */
	public function user_can_get_unused_activationToken()
	{
		//create an activation token
		$usedActivationToken = $this->user->createActivationToken()->use();

		$activationToken = $this->user->findUnusedActivationToken();
		$this->assertNull($activationToken);

		$unusedActivationToken = $this->user->createActivationToken();

		$activationToken = $this->user->findUnusedActivationToken();
		$this->assertNotNull($activationToken);
		$this->assertEquals($activationToken->id, $unusedActivationToken->id);
	}

	/** @test */
	public function user_can_create_new_activationToken_if_there_are_no_unused_activation_tokens()
	{
		$activationToken = $this->user->findATOrCreate();

		$this->assertNotNull($activationToken);
	}


	/** @test */
	public function user_can_use_activationToken()
	{
		$activationToken = $this->user->createActivationToken();
		$activationToken->use();

		$activationToken = ActivationToken::first();
		$this->assertNotNull($activationToken->used_at);
	}

}
