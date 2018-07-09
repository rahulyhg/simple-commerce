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
    public function scopeWithRating($query)
    {
        return $query->selectSub(
            Comment::select(DB::raw('sum(rating)/count(id)'))
                    ->where('model_type', Product::class)
                    ->whereRaw('model_id = products.id')
                    ->getQuery(),
            'rating'
        );
    }
}
