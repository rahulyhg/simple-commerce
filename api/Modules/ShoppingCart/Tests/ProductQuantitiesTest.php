<?php

namespace Modules\ShoppingCart\Tests;

use App\User;
use Tests\TestCase;
use Modules\Users\Jwt\JwtTestCase;
use Modules\ShoppingCart\Entities\Product;
use Modules\ShoppingCart\Entities\Quantity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ProductQuantitiesTest extends JwtTestCase
{
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();

        $this->admin = factory(User::class)->create(['type' => 'admin']);
        $this->actingAs($this->admin);

        $this->product = factory(Product::class)->create();
    }
    /** @test */
    public function can_list_all_qty_for_a_product()
    {
        $this->withoutExceptionHandling();
        $qtys = factory(Quantity::class,30)->create([
            'product_id' => $this->product->id
        ]);

        $res = $this->json('get',"api/admin/products/{$this->product->id}/quantities");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                '*' => ['id', 'value', 'type', 'created_at']
            ]
        ]);
        $res->assertJsonCount(20, 'data');
    }

    /** @test */
    public function can_create_qty_record_for_a_product()
    {
        $this->withoutExceptionHandling();

        $res = $this->json('post',"api/admin/products/{$this->product->id}/quantities",[
            'value' => 10,
            'type' => 'in'
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                'id', 'value', 'type', 'created_at'
            ]
        ]);

        $this->assertDatabaseHas('quantities',[
            'value' => 10,
            'type' => 'in',
            'product_id' => $this->product->id
        ]);
    }


    /** @test */
    public function can_get_quantity_attribute()
    {
        factory(Quantity::class, 2)->create([
            'type' => 'in',
            'value' => 5,
            'product_id' => $this->product->id
        ]);

        factory(Quantity::class, 1)->create([
            'type' => 'out',
            'value' => 5,
            'product_id' => $this->product->id
        ]);

        $this->assertEquals(5, $this->product->qty);

        $product = Product::withQty()->first();
        $this->assertEquals(5, $product->qty);
    }
}
