<?php

namespace Modules\Comments\Traits;

use Modules\Comments\Entities\Comment;

trait HasComments {

    /**
     * Get all of the post's comments.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable', 'model_type', 'model_id');
    }

}