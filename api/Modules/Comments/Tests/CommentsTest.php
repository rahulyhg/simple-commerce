<?php

namespace Modules\Comments\Tests;

use App\User;
use Tests\TestCase;
use Modules\Users\Jwt\JwtTestCase;
use Modules\Comments\Entities\Comment;
use Modules\ShoppingCart\Entities\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CommentsTest extends JwtTestCase
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
    public function can_get_products_comments()
    {
        $this->withoutExceptionHandling();
        $models = factory(Comment::class)->create([
            'model_id' => $this->product->id
        ]);

        $res = $this->json('get', "api/products/{$this->product->id}/comments");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => [
                '*' => ['id', 'content', 'rating']
            ],
            'meta' => ['code', 'message']
        ]);
    }

    /** @test */
    public function can_create_comment()
    {
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();

        $res = $this->actingAs($user)->json('post', "api/products/{$this->product->id}/comments",[
            'content' => 'This is comment content',
            'rating' => 5
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => ['id', 'content', 'rating', 'replies_count']
        ]);

        $this->assertDatabaseHas('comments', [
            'content' => 'This is comment content',
            'rating' => 5,
            'user_id' => $user->id,
            'model_id' => $this->product->id,
            'model_type' => Product::class
        ]);
    }

    /** @test */
    public function can_edit_comment()
    {
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();
        $comment = factory(Comment::class)->create([
            'model_id' => $this->product->id,
            'user_id' => $user->id
        ]);

        $res = $this->actingAs($user)->json('put', "api/products/{$this->product->id}/comments/{$comment->id}",[
            'content' => 'This is comment content',
            'rating' => 5
        ]);

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);
        $res->assertJsonStructure([
            'data' => ['id', 'content', 'rating', 'replies_count']
        ]);

        $this->assertDatabaseHas('comments', [
            'content' => 'This is comment content',
            'rating' => 5,
            'user_id' => $user->id,
            'model_id' => $this->product->id,
            'model_type' => Product::class
        ]);
    }

    /** @test */
    public function can_delete_comment(){
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();
        $comment = factory(Comment::class)->create([
            'model_id' => $this->product->id,
            'user_id' => $user->id,
            'content' => 'This is comment content',
            'rating' => 5
        ]);

        $res = $this->actingAs($user)->json('delete', "api/products/{$this->product->id}/comments/{$comment->id}");

        $res->assertStatus(200);
        $res->assertJson(['meta' => generate_meta('success')]);

        $this->assertDatabaseMissing('comments', [
            'content' => 'This is comment content',
            'rating' => 5,
            'user_id' => $user->id,
            'model_id' => $this->product->id,
            'model_type' => Product::class
        ]);
    }
}
