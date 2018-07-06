<?php

namespace Modules\TreasuryPapers\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\TreasuryPapers\Entities\TreasuryPaper;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use Modules\TreasuryPapers\Transformers\TreasuryPaperTransformer;
use Modules\TreasuryPapers\Http\Requests\StoreTreasuryPaper;

class TreasuryPapersController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(TreasuryPaperTransformer $paperTransformer)
    {
        $start_date = request('start_date', now()->startOfMonth()->format('Y-m-d'));
        $end_date = request('end_date', now()->endOfMonth()->format('Y-m-d'));

        $models = TreasuryPaper::whereDate('created_at','>=',$start_date)
                        ->whereDate('created_at','<=',$end_date)
                        ->paginate(20);

        return response()->json(
            fractal()
                ->collection($models)
                ->transformWith($paperTransformer)
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
    public function store(StoreTreasuryPaper $request, TreasuryPaperTransformer $paperTransformer)
    {
        $model = TreasuryPaper::create(
            $request->validated()
        );

        return response()->json(
            fractal()
                ->item($model)
                ->transformWith($paperTransformer)
                ->addMeta(generate_meta($model))
                ->toArray(),
            200
        );
    }
}
