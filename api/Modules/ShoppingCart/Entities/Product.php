<?php

namespace Modules\ShoppingCart\Entities;

use Spatie\BinaryUuid\HasBinaryUuid;
use Illuminate\Database\Eloquent\Model;
use Modules\Categories\Traits\HasCategories;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes, HasCategories;

    protected $fillable = [
        'title', 'price', 'image', 'description'
    ];

    /*----------------------------------------------------
    * Attribute
    --------------------------------------------------- */
    public function getQtyAttribute()
    {
        return 20;
    }

    public function getImageUrlAttribute()
    {
        return 'http://files.microservices.test/api/files/'.$this->image.'?s=400';
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
}
