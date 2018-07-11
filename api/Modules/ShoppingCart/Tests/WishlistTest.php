<?php

namespace Modules\ShoppingCart\Tests;

use App\User;
use Tests\TestCase;
use Modules\Users\Jwt\JwtTestCase;
use Modules\ShoppingCart\Entities\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class WishlistTest extends JwtTestCase
{
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
        $this->actingAs($this->user);
    }

    /** @test */
    public function can_get_user_wishlist()
    {
        $products = factory(Product::class,30)->create();

        $this->user->products()->sync($products);

        $res = $this->json('get', 'api/wishlist');

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonCount(20, 'data');

        $res = $this->json('get', 'api/wishlist?page=2');
        $res->assertJsonCount(10, 'data');
    }

    /** @test */
    public function can_add_a_new_product_to_user_wishlist()
    {
        $product = factory(Product::class)->create();

        $res = $this->json('post', 'api/wishlist',[
            'product_id' => $product->id
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);

        $this->assertDatabaseHas('wishlist', [
            'user_id' => $this->user->id,
            'product_id' => $product->id
        ]);
    }

    /** @test */
    public function can_remove_product_from_wishlist()
    {
        $product = factory(Product::class)->create();
        $this->user->addToWishlist($product);

        $res = $this->json('delete', 'api/wishlist',[
            'product_id' => $product->id
        ]);

        // $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);

        $this->assertDatabaseMissing('wishlist', [
            'user_id' => $this->user->id,
            'product_id' => $product->id
        ]);
    }
}
