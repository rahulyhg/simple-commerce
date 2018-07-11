<?php

namespace Modules\ShoppingCart\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\ShoppingCart\Entities\Product;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use Modules\ShoppingCart\Http\Requests\StoreWishlistItem;
use Modules\ShoppingCart\Transformers\ProductTransformer;

class WishlistController extends Controller
{
    /**
     * Current User
     *
     * @var \App\User
     */
    protected $user;

    public function __construct()
    {
        $this->middleware(function($request, $next){
            $this->user = auth()->user();

            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(ProductTransformer $productTransformer)
    {
        $models = $this->user->products()->paginate(20);

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


    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(StoreWishlistItem $request)
    {
        $this->user->addToWishlist(
            Product::findOrFail($request->product_id)
        );

        return response()->json(['meta' => generate_meta('success')], 200);
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy(StoreWishlistItem $request)
    {
        $this->user->removeFromWishlist(
            Product::findOrFail($request->product_id)
        );

        return response()->json(['meta' => generate_meta('success')], 200);
    }
}
