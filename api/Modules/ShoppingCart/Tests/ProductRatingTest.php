<?php

namespace Modules\ShoppingCart\Tests;

use Tests\TestCase;
use Modules\Comments\Entities\Comment;
use Modules\ShoppingCart\Entities\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ProductRatingTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function can_calculate_rating_with_scope()
    {
        $product = factory(Product::class)->create();

        $ratings = collect([1, 2, 4, 5]);
        $ratings->each(function($rating) use($product){
            factory(Comment::class)->create([
                'model_id' => $product,
                'rating' => $rating
            ]);
        });

        $product = Product::withRating()->first();

        $this->assertEquals(3,$product->rating);
    }
}
