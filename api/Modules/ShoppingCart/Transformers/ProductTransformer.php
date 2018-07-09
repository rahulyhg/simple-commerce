<?php

namespace Modules\ShoppingCart\Transformers;

use League\Fractal\TransformerAbstract;
use Modules\ShoppingCart\Entities\Product;
use Modules\Comments\Transformers\CommentTransformer;
use Modules\Categories\Transformers\CategoryTransformer;

class ProductTransformer extends TransformerAbstract
{
    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = ['categories', 'brands', 'comments'];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($model)
    {
        return [
            'model_type' => Product::class,
            'id' => $model->id,
            'title' => $model->title,
            'price' => $model->price,
            'description' => $model->description,
            'image' => $model->image,
            'image_url' => $model->image_url,
            'qty' => $model->qty,
            'rating' => $model->rating
        ];
    }

    public function includeCategories($model)
    {
        $categories = $model->dCategories;

        return $this->collection($categories, new CategoryTransformer);
    }

    public function includeBrands($model)
    {
        $brands = $model->brands;
        return $this->collection($brands, new CategoryTransformer);
    }

    public function includeComments($model){
        $comments = $model->comments;

        return $this->collection($comments, new CommentTransformer);
    }
}
