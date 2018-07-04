<?php

namespace Modules\Comments\Entities;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'content', 'comment_id', 'rating', 'user_id'
    ];


    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    /**
     * Get all of the owning commentable models.
     */
    public function commentable()
    {
        return $this->morphTo('commentable', 'model_type', 'model_id');
    }


    public function replies()
    {
        return $this->hasMany(Comment::class, 'comment_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
