<?php

namespace Modules\ShoppingCart\Tests;

use App\User;
use Tests\TestCase;
use Modules\Users\Jwt\JwtTestCase;
use Modules\Categories\Entities\Category;
use Modules\ShoppingCart\Entities\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ProductsTest extends JwtTestCase
{
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->actingAs($this->user);
    }

    /** @test */
    public function can_get_all_products()
    {
        $this->withoutExceptionHandling();
        $products = factory(Product::class,30)->create();

        $res = $this->json('get','api/products');

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'price', 'description', 'brands']
            ],
            'meta' => ['code', 'message']
        ]);

        $res->assertJsonCount(20, 'data');

        $res = $this->json('get', 'api/products?page=2');
        $res->assertJsonCount(10, 'data');
    }


    /** @test */
    public function can_get_products_related_to_a_category()
    {
        $this->withoutExceptionHandling();
        $category = Category::create([
            'name' => 'Category 1',
            'image' => 'uuidhere'
        ]);

        $products = factory(Product::class,10)->create()->each->syncCategories([$category->id]);

        $category2 = Category::create([
            'name' => 'Category 2',
            'image' => 'uuidhere'
        ]);
        $products = factory(Product::class, 10)->create()->each->syncCategories([$category2->id]);

        $res = $this->json('get', "api/products?categories={$category->id}");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'price', 'description', 'brands']
            ],
            'meta' => ['code', 'message']
        ]);
        $res->assertJsonCount(10, 'data');

        $res = $this->json('get', "api/products?page=2");
        $res->assertJsonCount(0, 'data');
    }

    /** @test */
    public function can_get_product()
    {
        $category = Category::create([
            'name' => 'category1',
            'image' => 'uuidhere',
        ]);

        $brand = Category::create([
            'name' => 'brand',
            'image' => 'uuidhere',
            'type' => 'brand'
        ]);

        $product = factory(Product::class)->create();

        $product->syncCategories([$category->id, $brand->id]);

        $res = $this->json('get', "api/products/{$product->id}");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                'id', 'title', 'price', 'description',
                'brands' => [
                    'data' => ['*' => ['id', 'name', 'slug', 'image']]
                ],
                'categories' => [
                    'data' => ['*' => ['id', 'name', 'slug', 'image']]
                ]
            ]
        ]);
    }
}
