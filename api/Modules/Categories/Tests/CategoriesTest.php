<?php

namespace Modules\Categories\Tests;

use App\User;
use Faker\Factory;
use Tests\TestCase;
use Modules\Users\Jwt\JwtTestCase;
use BrianFaust\Categories\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CategoriesTest extends JwtTestCase
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
	public function can_list_all_categories()
	{
		$this->withoutExceptionHandling();
		//generate test data
		$faker = Factory::create();
		$categories = collect([]);
		for ($i=0; $i < 20; $i++) {
			$category = Category::create([
				'name' => 'Parent number'.$i,
				'children' => [
					['name' => 'Children number'. $i]
				]
			]);

			$categories->push($category);
		}

		$res = $this->json('get','api/admin/categories');

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);
		$res->assertJsonStructure([
			'data' => [
				'*' => ['id', 'name', 'slug']
			],
			'meta' => ['code', 'message']
		]);

		$this->assertContentCount(15, $res);

		$res = $this->json('get', 'api/admin/categories?page=2');
		$this->assertContentCount(15, $res);

		$res = $this->json('get', 'api/admin/categories?page=3');
		$this->assertContentCount(10, $res);
	}

	/** @test */
	public function can_create_category()
	{
		$this->withoutExceptionHandling();

		$parent = Category::create([
			'name' => 'Some'
		]);
		$res = $this->json('post', 'api/admin/categories',[
			'name' => 'New Category',
			'parent_id' => $parent->id
		]);


		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$this->assertDatabaseHas('categories', [
			'name' => 'New Category',
			'type' => 'default'
		]);

		$category = Category::where('name', 'New Category')->first();

		$this->assertEquals($parent->id, $category->parent->id);
	}

	/** @test */
	public function can_update_category()
	{
		$this->withoutExceptionHandling();
		$category = Category::create([
			'name' => 'Category Name Old'
		]);

		$res = $this->json('put', "api/admin/categories/{$category->id}",[
			'name' => 'Category Name New'
		]);

		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$this->assertDatabaseHas('categories', [
			'name' => 'Category Name New'
		]);
	}

	/** @test */
	public function can_delete_category()
	{
		$category = Category::create([
			'name' => 'Category Name'
		]);

		$res = $this->json('delete', "api/admin/categories/{$category->id}");
		$res->assertStatus(200);
		$res->assertJson(['meta' => generate_meta('success')]);

		$this->assertDatabaseMissing('categories', [
			'name' => 'Category Name'
		]);
	}

}
