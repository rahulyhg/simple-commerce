<?php

namespace Modules\ShoppingCart\Entities;

use App\User;
use Spatie\ModelStatus\Status;
use Modules\Users\Traits\Approvable;
use Illuminate\Database\Eloquent\Model;
use Modules\ShoppingCart\Entities\Product;

class Order extends Model
{
    use Approvable;

    protected $fillable = ['user_id'];

    /*----------------------------------------------------
    * Relationship
    --------------------------------------------------- */
    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('qty');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /*----------------------------------------------------
    * Attributes
    --------------------------------------------------- */
    public function getTotalPriceAttribute()
    {
        return $this->products->sum(function($product){
            return $product->pivot->qty * $product->price;
        });
    }

    /*----------------------------------------------------
    * scopes
    --------------------------------------------------- */
    public function scopeWithLatestStatus($query)
    {
        return $query->select('*')->selectSub(
            Status::select('name')->where('model_type',Order::class)->whereRaw('model_id = orders.id')->orderBy('id','desc')->limit(1)->getQuery(),
            'latest_status'
        );
    }
}
