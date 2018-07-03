<?php

namespace Modules\ShoppingCart\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\ShoppingCart\Entities\Product;
use Modules\ShoppingCart\Http\Requests\StoreProduct;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use Modules\ShoppingCart\Transformers\ProductTransformer;

class ProductsController extends Controller
{
    public function index(ProductTransformer $productTransformer)
    {
        $models = Product::paginate(20);

        return response()->json(
            fractal()
                ->collection($models)
                ->transformWith($productTransformer)
                ->addMeta(generate_meta($models))
                ->paginateWith(new IlluminatePaginatorAdapter($models))
                ->toArray(),
            200
        );
    }

    public function store(StoreProduct $request, ProductTransformer $productTransformer)
    {
        $model = Product::create(
            $request->validated()
        );

        return response()->json(
            fractal()
                ->item($model)
                ->transformWith($productTransformer)
                ->addMeta(generate_meta($model))
                ->toArray(),
            200
        );
    }

    public function update(StoreProduct $request, Product $product ,ProductTransformer $productTransformer)
    {
        $product->fill(
            $request->validated()
        )->save();

        return response()->json(
            fractal()
                ->item($product)
                ->transformWith($productTransformer)
                ->addMeta(generate_meta($productTransformer))
                ->toArray(),
            200
        );
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['meta' => generate_meta('success')], 200);
    }
}
