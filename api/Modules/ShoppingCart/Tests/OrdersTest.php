<?php

namespace Modules\ShoppingCart\Tests;

use App\User;
use Tests\TestCase;
use Modules\Users\Jwt\JwtTestCase;
use Illuminate\Support\Facades\Event;
use Modules\ShoppingCart\Entities\Order;
use Modules\ShoppingCart\Entities\Product;
use Modules\ShoppingCart\Events\OrderCreated;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\ShoppingCart\Events\OrderStatusUpdated;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class OrdersTest extends JwtTestCase
{
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();

        $this->admin = factory(User::class)->create(['type' => 'admin']);
    }

    /** @test */
    public function can_get_orders()
    {
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();

        factory(Order::class,20)->create()->each(function($order){
            return $order->activate()->approve();
        });
        factory(Order::class,10)->create([
            'user_id' => $user->id
        ])->each(function ($order) {
            return $order->activate()->approve();
        });

        $res = $this->actingAs($user)->json('get', 'api/orders');

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                '*' => ['id', 'created_at', 'user']
            ],
            'meta' => ['code', 'message']
        ]);
        $res->assertJsonCount(10, 'data');
    }

    /** @test */
    public function can_create_order()
    {
        Event::fake();
        $this->withoutExceptionHandling();
        $products = factory(Product::class, 4)->create()->transform(function($product, $index){
            return [
                'product_id' => $product->id,
                'qty' => $index+1
            ];
        });

        $user = factory(User::class)->create();

        $res = $this->actingAs($user)->json('post','api/orders',[
            'products' => $products
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => ['id', 'status', 'created_at', 'user', 'products']
        ]);

        Event::assertDispatched(OrderCreated::class);
    }

    /** @test */
    public function can_see_order()
    {
        $products = factory(Product::class, 4)->create()->transform(function ($product, $index) {
            return [
                'product_id' => $product->id,
                'qty' => $index + 1
            ];
        });

        $user = factory(User::class)->create();

        $order = factory(Order::class)->create([
            'user_id' => $user->id
        ]);

        $order->products()->sync($products->toArray());

        $res = $this->actingAs($user)->json('get',"api/orders/{$order->id}");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => ['id', 'created_at','status','user','products']
        ]);
    }

    /** @test */
    public function can_cancel_product()
    {
        Event::fake();

        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();
        $order = factory(Order::class)->create([
            'user_id' => $user->id
        ]);
        $order->activate();

        $res = $this->actingAs($user)->json('put',"api/orders/{$order->id}",[
            'status' => 'canceled'
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $order = Order::find($order->id);
        $this->assertEquals('canceled', $order->status);

        Event::assertDispatched(OrderStatusUpdated::class,function($e) use($order){
            return $e->order->id == $order->id && $e->status == 'canceled';
        });
    }
}
