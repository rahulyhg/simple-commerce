<?php

namespace Modules\ShoppingCart\Transformers;

use League\Fractal\TransformerAbstract;
use Modules\Categories\Transformers\CategoryTransformer;

class ProductTransformer extends TransformerAbstract
{
    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = ['categories'];

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

    public function includeCategories($model)
    {
        $categories = $model->dCategories;

        return $this->collection($categories, new CategoryTransformer);
    }
}
