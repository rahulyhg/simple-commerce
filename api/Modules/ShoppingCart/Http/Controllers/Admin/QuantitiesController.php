<?php

namespace Modules\ShoppingCart\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\ShoppingCart\Entities\Product;
use Modules\ShoppingCart\Entities\Quantity;
use Modules\ShoppingCart\Http\Requests\StoreQuantity;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use Modules\ShoppingCart\Transformers\QuantityTransformer;

class QuantitiesController extends Controller
{
    /**
     * The product
     *
     * @var \Modules\ShoppingCart\Entities\Product
     */
    protected $product;

    public function __construct() {
        $this->middleware(function($request, $next){

            $this->product = Product::find($request->product);

            if(!$this->product){
                throw new ModelNotFoundException();
            }

            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(QuantityTransformer $qtyTransformer)
    {
        $models = $this->product->quantities()->paginate(20);

        return response()->json(
            fractal()
                ->collection($models)
                ->transformWith($qtyTransformer)
                ->paginateWith(new IlluminatePaginatorAdapter($models))
                ->addMeta(generate_meta($models))
                ->toArray(),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(StoreQuantity $request, QuantityTransformer $qtyTransformer)
    {
        $model = Quantity::create(
            array_add($request->validated(), 'product_id', $this->product->id)
        );

        return response()->json(
            fractal()
                ->item($model)
                ->transformWith($qtyTransformer)
                ->addMeta(generate_meta($model))
                ->toArray(),
            200
        );
    }
}
