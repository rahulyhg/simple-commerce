<?php

namespace Modules\Users\Tests;

use App\User;
use Modules\Users\Jwt\JwtTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class UserApprovalTest extends JwtTestCase
{
	use DatabaseMigrations;

	public function setUp()
	{
		parent::setUp();

		$this->admin = factory(User::class)->create([
			'type' => 'admin'
		]);

		$this->user = factory(User::class)->create();

		$this->actingAs($this->admin);

		$this->withoutExceptionHandling();
	}


	/** @test */
	public function can_get_user_approvable_history()
	{
		$this->user->setPending()->activate()->approve();

		$res = $this->json('get',"api/users/{$this->user->id}/history");

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);
		$res->assertJsonStructure([
			'data' => [
				'*' => ['status', 'reason', 'created_at']
			],
			'meta' => ['code', 'message']
		]);

		$this->assertContentCount(3, $res);
	}


	/** @test */
	public function admin_can_activate_user_account()
	{
		$res = $this->json('post', "api/users/{$this->user->id}/activate",[
			'reason' => 'want to activate'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$user = User::find($this->user->id);
		$this->assertEquals('active', $user->status);

		$this->assertDatabaseHas('statuses',[
			'reason' => 'want to activate'
		]);
	}

	/** @test */
	public function admin_can_approve_user_account()
	{
		$res = $this->json('post', "api/users/{$this->user->id}/approve",[
			'reason' => 'after activation approval'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$user = User::find($this->user->id);
		$this->assertEquals('approved', $user->status);

		$this->assertDatabaseHas('statuses', [
			'reason' => 'after activation approval'
		]);
	}

	/** @test */
	public function admin_can_reject_user_account()
	{
		$res = $this->json('post', "api/users/{$this->user->id}/reject",[
			'reason' => 'no reason at all'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$user = User::find($this->user->id);
		$this->assertEquals('rejected', $user->status);

		$this->assertDatabaseHas('statuses', [
			'reason' => 'no reason at all'
		]);
	}

	/** @test */
	public function admin_can_set_user_account_on_pending()
	{
		$res = $this->json('post', "api/users/{$this->user->id}/pending",[
			'reason' => 'waiting for approval'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$user = User::find($this->user->id);
		$this->assertEquals('pending', $user->status);

		$this->assertDatabaseHas('statuses', [
			'reason' => 'waiting for approval'
		]);
	}
}
