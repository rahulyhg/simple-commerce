<?php

namespace Modules\Comments\Traits;

use Illuminate\Support\Facades\DB;
use Modules\Comments\Entities\Comment;

trait HasComments {

    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    /**
     * Get all of the post's comments.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable', 'model_type', 'model_id');
    }

    /*----------------------------------------------------
    * scopes
    --------------------------------------------------- */
    /**
     * get current user rating for the product
     *
     * @param User $user
     * @return void
     */
    public function scopeWithUserRate($query)
    {
        return $query->selectSub(
            Comment::select('rating')
                ->where('model_type', Product::class)
                ->whereRaw('model_id = products.id')
                ->where('comments.user_id', optional(auth()->user())->id)
                ->getQuery(),
            'current_user_rate'
        );
    }

    /*----------------------------------------------------
    * Attributes
    --------------------------------------------------- */
    public function getCurrentUserRateAttribute()
    {
        $comment = $this->comments()
                    ->select('rating')
                    ->where('user_id', optional(auth()->user())->id)
                    ->first();
        if(!$comment){
            return null;
        }
        return $comment->rating;
    }

}