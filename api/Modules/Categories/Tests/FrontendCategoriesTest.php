<?php

namespace Modules\Categories\Tests;

use Tests\TestCase;
use Modules\Categories\Entities\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class FrontendCategoriesTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function can_get_random_categories()
    {
        collect(range(1,10,1))->each(function($number){
            Category::create([
                'name' => 'category'.$number,
                'image' => 'here'
            ]);
        });

        $res = $this->json('get', 'api/categories');

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'slug', 'image']
            ]
        ]);
        $res->assertJsonCount(3, 'data');
    }
}
