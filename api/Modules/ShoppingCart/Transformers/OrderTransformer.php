<?php

namespace Modules\ShoppingCart\Transformers;

use League\Fractal\TransformerAbstract;
use Modules\ShoppingCart\Entities\Order;
use Modules\Users\Transformers\UserTransformer;
use Modules\ShoppingCart\Transformers\ProductTransformer;

class OrderTransformer extends TransformerAbstract
{
    /**
     * Include resources without needing it to be requested.
     *
     * @var array
     */
    protected $defaultIncludes = ['user'];

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = ['products'];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($model)
    {
        return [
            'model_type' => 'order',
            'id' => $model->id,
            'status' => $model->status,
            'created_at' => $model->created_at->format('Y-m-d H:i'),
            'total_price' => $model->total_price
        ];
    }

    public function includeUser($model)
    {
        return $this->item($model->user, new UserTransformer);
    }

    public function includeProducts($model)
    {
        $products = $model->products;

        return $this->collection($products, new ProductTransformer);
    }
}
