<?php

namespace Modules\ShoppingCart\Entities;

use Illuminate\Support\Facades\DB;
use Spatie\BinaryUuid\HasBinaryUuid;
use Modules\Comments\Entities\Comment;
use Illuminate\Database\Eloquent\Model;
use Modules\Comments\Traits\HasComments;
use Modules\Categories\Traits\HasCategories;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\ShoppingCart\Traits\HasQuantities;
use Modules\TreasuryPapers\Traits\Accountable;

class Product extends Model
{
    use SoftDeletes,
        HasComments,
        Accountable,
        HasCategories,
        HasQuantities;

    protected $fillable = [
        'title', 'price', 'image', 'description'
    ];

    /*----------------------------------------------------
    * Attribute
    --------------------------------------------------- */
    public function getImageUrlAttribute()
    {
        return 'http://files.microservices.test/api/files/'.$this->image;
    }

    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    public function dCategories()
    {
        return $this->categories()->where('type', 'default');
    }

    public function brands()
    {
        return $this->categories()->where('type', 'brand');
    }

    /*----------------------------------------------------
    * scopes
    --------------------------------------------------- */

    public function scopeInCategories($query, $categories, $type = 'default')
    {
        return $query->whereHas('categories', function($query) use($type, $categories){
            $query->where('type', $type)
                ->whereIn('categories.id', (array)$categories);
        });
    }

    public function scopeWithInWishlist($query)
    {
        return $query->selectSub(
            DB::table('wishlist')
                ->select('id')
                ->whereRaw('products.id = wishlist.product_id')
                ->where('wishlist.user_id', optional(auth()->user())->id)
                ->orderBy('wishlist.id','desc'),
            'added_to_wishlist'
        );
    }
}
// "SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '== wishlist.product_id and `wishlist`.`user_id` = ? order by `wishlist`.`id` des' at line 1 (SQL: select *, (select sum(value) from `quantities` where product_id = products.id and `type` = in) as `in`, (select sum(value) from `quantities` where product_id = products.id and `type` = out) as `out`, (select sum(rating)/count(id) from `comments` where `model_type` = Modules\Comments\Traits\Product and model_id = products.id) as `rating`, (select `rating` from `comments` where `model_type` = Modules\Comments\Traits\Product and model_id = products.id and `comments`.`user_id` = 3) as `current_user_rate`, (select * from `wishlist` where products.id == wishlist.product_id and `wishlist`.`user_id` = 3 order by `wishlist`.`id` desc) as `in_current_user_wishlist` from `products` where `products`.`deleted_at` is null order by `created_at` desc limit 6 offset 0)"