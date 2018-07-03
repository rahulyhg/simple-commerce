<?php

namespace Modules\Users\Tests;

use App\User;
use Tests\TestCase;
use Illuminate\Support\Facades\App;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ApprovableTest extends TestCase
{
	use DatabaseMigrations;

	public function setUp()
	{
		 parent::setUp();

		 $this->user = factory(User::class)->create();
	}

	/** @test */
	public function give_user_a_status_of_pending()
	{
		$this->user->setPending('just signed up');

		$user = User::first();
		$this->assertEquals('pending', $user->status);
	}

	/** @test */
	public function give_user_a_status_of_active()
	{
		$this->assertFalse($this->user->is_active);
		$this->user->activate();

		$user = User::first();
		$this->assertEquals('active', $user->status);
		$this->assertTrue($user->is_active);
	}


	/** @test */
	public function give_user_a_status_of_approved()
	{
		$this->assertFalse($this->user->is_approved);

		$this->user->approve();

		$user = User::first();
		$this->assertEquals('approved',$user->status);
		$this->assertTrue($user->is_approved);
	}

	/** @test */
	public function give_user_a_status_of_rejected()
	{
		$this->user->reject();

		$user = User::first();
		$this->assertEquals('rejected', $user->status);
	}
}
