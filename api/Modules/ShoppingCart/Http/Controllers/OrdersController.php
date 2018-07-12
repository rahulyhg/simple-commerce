<?php

namespace Modules\ShoppingCart\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\ShoppingCart\Entities\Order;
use Modules\ShoppingCart\Events\OrderCreated;
use Modules\ShoppingCart\Http\Requests\StoreOrder;
use Modules\ShoppingCart\Events\OrderStatusUpdated;
use Modules\ShoppingCart\Http\Requests\UpdateOrder;
use Modules\ShoppingCart\Transformers\OrderTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(OrderTransformer $orderTransformer)
    {
        $models = Order::with('user')
                        ->withLatestStatus()
                        ->when(!($user = auth()->user())->isSuperAdmin(), function($query) use($user){
                            return $query->where('user_id', $user->id);
                        })
                        ->latest()
                        ->paginate(20);

        return response()->json(
            fractal()
                ->collection($models)
                ->transformWith($orderTransformer)
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
    public function store(StoreOrder $request, OrderTransformer $orderTransformer)
    {
        DB::beginTransaction();
        try{
            $order = Order::create(
                array_add($request->validated(),'user_id', auth()->user()->id)
            );

            $order->activate();

            $order->products()->sync($request->products);

            event(new OrderCreated($order));

            DB::commit();
        }catch(\Exception $e){
            DB::rollback();
            return response()->json(['meta' => generate_meta('failure',$e->getMessage())], 200);
        }

        return response()->json(
            fractal()
                ->item($order)
                ->transformWith($orderTransformer)
                ->parseIncludes(['products'])
                ->addMeta(generate_meta('success'))
                ->toArray(),
            200
        );
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show(Order $order, OrderTransformer $orderTransformer)
    {
        if(!auth()->user()->can('see',$order)){
            return response()->json(['meta' => generate_meta('failure','FORBIDDEN')], 200);
        }

        return response()->json(
            fractal()
            ->item($order)
            ->transformWith($orderTransformer)
            ->addMeta(generate_meta('success'))
            ->parseIncludes(['products'])
            ->toArray(),
            200
        );
    }

    public function update(Order $order, UpdateOrder $request)
    {
        if (!auth()->user()->can('see', $order)) {
            return response()->json(['meta' => generate_meta('failure', 'FORBIDDEN')], 403);
        }

        if($order->status == 'approved'){
            return response()->json(['meta' => generate_meta('failure', 'CAN NOT UPDATE APPROVED ORDER STATUS')], 400);
        }

        $order->setStatus($request->status);

        event(new OrderStatusUpdated($order, $request->status));

        return response()->json(['meta' => generate_meta('success')], 200);
    }
}
