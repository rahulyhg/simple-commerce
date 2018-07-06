<?php

namespace Modules\TreasuryPapers\Tests;

use App\User;
use Tests\TestCase;
use Modules\Users\Jwt\JwtTestCase;
use Modules\ShoppingCart\Entities\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\TreasuryPapers\Entities\TreasuryPaper;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class AdminTreasuryPapersTest extends JwtTestCase
{

    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();

        $this->admin = factory(User::class)->create([
            'type' => 'admin'
        ]);

        $this->order = factory(Order::class)->create();

        $this->actingAs($this->admin);
    }
    /** @test */
    public function can_list_all_treasury_papers()
    {
        $this->withoutExceptionHandling();
        $papers = factory(TreasuryPaper::class,30)->create([
            'model_id' => $this->order->id,
            'model_type' => Order::class
        ]);

        $res = $this->json('get',"api/admin/treasurypapers");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                '*' => ['id', 'accountable','value', 'type', 'created_at']
            ]
        ]);

        $res->assertJsonCount(20, 'data');

        $res = $this->json('get', "api/admin/treasurypapers?page=2");
        $res->assertJsonCount(10, 'data');
    }

    /** @test */
    public function can_create_new_treasury_paper()
    {
        $this->withoutExceptionHandling();
        $res = $this->json('post','api/admin/treasurypapers',[
            'type' => 'in',
            'model_id' => $this->order->id,
            'model_type' => Order::class,
            'value' => 100
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => ['id', 'value', 'created_at', 'comments', 'accountable']
        ]);

        $this->assertDatabaseHas('treasury_papers', [
            'type' => 'in',
            'model_id' => $this->order->id,
            'model_type' => Order::class,
            'value' => 100
        ]);
    }
}
