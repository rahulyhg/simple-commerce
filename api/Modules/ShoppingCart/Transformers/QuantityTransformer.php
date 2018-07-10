<?php

namespace Modules\ShoppingCart\Transformers;

use League\Fractal\TransformerAbstract;

class QuantityTransformer extends TransformerAbstract
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
            'value' => $model->value,
            'type' => $model->type,
            'price_per_unit' => $model->price_per_unit,
            'comments' => $model->comments,
            'created_at' => $model->created_at->format('Y-m-d H:i')
        ];
    }
}
