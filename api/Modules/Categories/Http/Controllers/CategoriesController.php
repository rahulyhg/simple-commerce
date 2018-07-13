<?php

namespace Modules\Categories\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Categories\Entities\Category;
use Modules\Categories\Transformers\CategoryTransformer;

class CategoriesController extends Controller
{

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(CategoryTransformer $categoryTransformer)
    {
        $models = Category::where('type', request('type','default'))
                    ->when(request('limit', false), function($query){
                        $query->limit(request('limit'));
                    })
                    ->when(request('random', false), function($query){
                        $query->inRandomOrder();
                    })
                    ->get();

        return response()->json(
            fractal()
                ->collection($models)
                ->transformWith($categoryTransformer)
                ->addMeta(generate_meta($models))
                ->toArray(),
            200
        );
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {

    }

}
