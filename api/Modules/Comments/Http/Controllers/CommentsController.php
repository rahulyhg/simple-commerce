<?php

namespace Modules\Comments\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;
use Modules\Comments\Entities\Comment;
use Illuminate\Database\Eloquent\Model;
use Modules\Comments\Http\Requests\StoreComment;
use Modules\Comments\Http\Requests\DeleteComment;
use Modules\Comments\Transformers\CommentTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class CommentsController extends Controller
{

    /**
     * Model
     *
     * @var Model
     */
    protected $model;

    public function __construct() {

        $this->middleware(function($request, $next){
            $uri = Route::current()->uri();
            $uri = Str::startsWith($uri, 'api') ? substr($uri, 4) : $uri;
            $uri = Str::endsWith($uri, '/{comment}') ? substr($uri, 0, strpos($uri,'/{comment}')) : $uri;


            $this->model = app('commentable')->get(
                $request,
                $uri
            );

            if( !$this->model ){
                return response()->json(['meta' => generate_meta('failure','NOT FOUND')], 404);
            }

            return $next($request);
        });

    }


    public function index(CommentTransformer $commentTransformer)
    {
        $models = $this->model->comments()->withCount('replies')->paginate(10);

        return response()->json(
            fractal()
                ->collection($models)
                ->transformWith($commentTransformer)
                ->paginateWith(new IlluminatePaginatorAdapter($models))
                ->addMeta(generate_meta($models))
                ->toArray(),
            200
        );
    }

    public function store(StoreComment $request, CommentTransformer $commentTransformer)
    {
        if( $this->hasPreviousComments() ){
            return response()->json(
                ['meta' => generate_meta('failure',['You have reviewed this product before'])],
                403
            );
        }

        $model = $this->model->comments()->save(
            new Comment(
                array_add($request->validated(), 'user_id', auth()->user()->id)
            )
        );

        return response()->json(
            fractal()
                ->item($model)
                ->transformWith($commentTransformer)
                ->addMeta(generate_meta($model))
                ->toArray(),
            200
        );
    }

    public function update(StoreComment $request, CommentTransformer $commentTransformer)
    {
        $model = $request->comment;

        $model->fill(
            array_add($request->validated(), 'user_id', auth()->user()->id)
        )->save();

        return response()->json(
            fractal()
                ->item($model)
                ->transformWith($commentTransformer)
                ->addMeta(generate_meta($model))
                ->toArray(),
            200
        );
    }

    public function destroy(DeleteComment $request)
    {
        $model = $request->comment;

        $model->replies()->delete();
        $model->delete();

        return response()->json(['meta' => generate_meta('success')], 200);
    }


    private function hasPreviousComments()
    {
        return $this->model->comments()->where('user_id', auth()->user()->id)->first();
    }
}
