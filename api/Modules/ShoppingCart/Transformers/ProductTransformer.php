<?php

namespace Modules\ShoppingCart\Transformers;

use League\Fractal\TransformerAbstract;

class ProductTransformer extends TransformerAbstract
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
            'title' => $model->title,
            'price' => $model->price,
            'description' => $model->description,
            'image' => $model->image_url,
            'qty' => $model->qty
        ];
    }
}
