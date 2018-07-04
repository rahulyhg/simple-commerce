<?php

namespace Modules\Comments\Transformers;

use League\Fractal\TransformerAbstract;

class CommentTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($model)
    {
        return [
            'id' => $model->id,
            'content' => $model->content,
            'rating' => $model->rating,
            'replies_count' => $model->replies_count
        ];
    }
}
