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

    public function scopeWithRating($query)
    {
        return $query->selectSub(
            Comment::select(DB::raw('sum(rating)/count(id)'))
                ->where('model_type', 'LIKE', '%Product')
                ->whereRaw('model_id = products.id')
                ->getQuery(),
            'rating'
        );
    }
}