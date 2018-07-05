<?php

namespace Modules\ShoppingCart\Tests;

use App\User;
use Modules\Users\Jwt\JwtTestCase;
use Modules\Categories\Entities\Category;
use Modules\ShoppingCart\Entities\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class AdminProductsTest extends JwtTestCase
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
    public function admin_can_list_products()
    {
        $this->withoutExceptionHandling();
        $products = factory(Product::class,30)->create();

        $res = $this->json('get','api/admin/products');

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'price', 'image', 'qty', 'description']
            ],
            'meta' => ['code', 'message']
        ]);
        $this->assertContentCount(20, $res);

        $res = $this->json('get', 'api/admin/products?page=2');
        $this->assertContentCount(10, $res);
    }

    /** @test */
    public function admin_can_create_product()
    {
        $this->withoutExceptionHandling();

        $categories = $this->createCategories();
        $brands = $this->createCategories('brand');

        $res = $this->json('post','api/admin/products',[
            'title' => 'Product Title',
            'description' => 'This is description',
            'price' => 40,
            'image' => 'uuidhere',
            'categories' => $categories->pluck('id')->toArray(),
            'brands' => $brands->pluck('id')->toArray()
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => ['id', 'title', 'price', 'qty', 'image', 'description',
            'categories' => ['data' => ['*' => ['id', 'name', 'slug', 'image']]],
            'brands' => ['data' => ['*' => ['id', 'name', 'slug', 'image']]]
            ]
        ]);

        $this->assertDatabaseHas('products',[
            'title' => 'Product Title',
            'description' => 'This is description',
            'price' => 40,
            'image' => 'uuidhere'
        ]);
    }

    /** @test */
    public function admin_can_edit_product()
    {
        $product = factory(Product::class)->create();

        $categories = $this->createCategories();
        $brands = $this->createCategories('brand');

        $res = $this->json('put', "api/admin/products/{$product->id}",[
            'title' => 'Product Title',
            'description' => 'This is description',
            'price' => 40,
            'image' => 'uuidhere',
            'categories' => $categories->pluck('id')->toArray(),
            'brands' => $brands->pluck('id')->toArray()
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                'id', 'title', 'price', 'qty', 'image', 'description',
                'categories' => [ 'data' => ['*' => ['id', 'name', 'slug', 'image'] ] ],
                'brands' => [ 'data' => ['*' => ['id', 'name', 'slug', 'image'] ] ]
            ]
        ]);

        $this->assertDatabaseHas('products', [
            'title' => 'Product Title',
            'description' => 'This is description',
            'price' => 40,
            'image' => 'uuidhere'
        ]);
    }

    /** @test */
    public function admin_can_delete_product()
    {
        $product = factory(Product::class)->create([
            'title' => 'Product Title',
            'description' => 'This is description',
            'price' => 40,
            'image' => 'uuidhere'
        ]);

        $res = $this->json('delete', "api/admin/products/{$product->id}");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
    }

    /** @test */
    public function admin_can_see_the_product()
    {
        $product = factory(Product::class)->create();

        $categories = $this->createCategories();

        $product->categories()->sync($categories->pluck('id'));

        $res = $this->json('get', "api/admin/products/{$product->id}");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                'id', 'title', 'price', 'qty', 'image', 'description',
                'categories' => ['data' => [
                    '*' => ['id', 'name', 'slug', 'image']
                ]],
                'brands' => ['data' => [
                    '*' => ['id', 'name', 'slug', 'image']
                ]],
                'comments'
            ],
            'meta' => ['code', 'message']
        ]);
    }

    private function createCategories($type = 'default')
    {
        return collect(['name1', 'name2', 'name3'])
            ->transform(function ($category) use($type) {
                return Category::create([
                    'name' => $category,
                    'image' => 'uuidhere',
                    'type' => $type
                ]);
            });
    }
}
