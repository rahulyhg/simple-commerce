<?php

namespace Modules\ShoppingCart\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\ShoppingCart\Entities\Product;
use Modules\ShoppingCart\Http\Requests\StoreProduct;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use Modules\ShoppingCart\Transformers\ProductTransformer;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductsController extends Controller
{
    public function index(ProductTransformer $productTransformer)
    {
        $models = Product::withRating()->paginate(20);

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
        DB::beginTransaction();

        try{
            $model = Product::create($request->validated());

            $model->categories()->sync(array_merge($request->categories, $request->brands));

            DB::commit();
        }catch(\Exception $e){
            DB::rollback();
            return response()->json(['meta' => generate_meta('failure', $e->getMessage())], 200);
        }

        return response()->json(
            fractal()
                ->item($model)
                ->transformWith($productTransformer)
                ->parseIncludes(['categories', 'brands', 'comments'])
                ->addMeta(generate_meta($model))
                ->toArray(),
            200
        );
    }

    public function update(StoreProduct $request, Product $product ,ProductTransformer $productTransformer)
    {
        DB::beginTransaction();

        try {
            $product->fill(
                $request->validated()
            )->save();

            $product->categories()->sync(array_merge($request->categories, $request->brands));

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['meta' => generate_meta('failure', $e->getMessage())], 200);
        }

        return response()->json(
            fractal()
                ->item($product)
                ->transformWith($productTransformer)
                ->parseIncludes(['categories', 'brands', 'comments'])
                ->addMeta(generate_meta($productTransformer))
                ->toArray(),
            200
        );
    }

    public function show(Request $request, ProductTransformer $productTransformer)
    {
        $product = Product::with('dCategories','brands','comments')->withRating()->find($request->product);

        if(!$product){
            throw new ModelNotFoundException();
        }

        return response()->json(
            fractal()
                ->item($product)
                ->transformWith($productTransformer)
                ->parseIncludes(['categories', 'brands', 'comments'])
                ->addMeta(generate_meta($product))
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
