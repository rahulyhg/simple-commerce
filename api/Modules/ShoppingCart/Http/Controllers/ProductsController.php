<?php

namespace Modules\ShoppingCart\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\ShoppingCart\Entities\Product;
use Modules\ShoppingCart\Transformers\ProductTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(ProductTransformer $productTransformer)
    {
        $models = Product::select('*')
                    ->with('brands')
                    ->withQty()
                    ->withRating()
                    ->withUserRate()
                    ->withInWishlist()
                    ->when(request('categories', 'all') != 'all',function($query){
                        return $query->inCategories(explode(',', request('categories')));
                    })
                    ->when(request('brands', 'all') != 'all',function($query){
                        return $query->inCategories(explode(',', request('brands')), 'brand');
                    })
                    ->when(request('s', false) != 'all',function($query){
                        return $query->where('title', 'LIKE', '%'.request('s').'%');
                    })
                    ->latest()
                    ->paginate(request('items', 20));

        return response()->json(
            fractal()
                ->collection($models)
                ->transformWith($productTransformer)
                ->addMeta(generate_meta($models))
                ->parseIncludes(['brands'])
                ->paginateWith(new IlluminatePaginatorAdapter($models))
                ->toArray(),
            200
        );
    }


    /**
     * Show the specified resource.
     * @return Response
     */
    public function show(Product $product, ProductTransformer $productTransformer)
    {
        $product->load('dCategories', 'brands', 'comments', 'comments.user');

        return response()->json(
            fractal()
                ->item($product)
                ->transformWith($productTransformer)
                ->parseIncludes(['categories', 'brands', 'comments'])
                ->addMeta(generate_meta('success'))
                ->toArray(),
            200
        );
    }
}
