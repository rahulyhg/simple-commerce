<?php

namespace Modules\Categories\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;
use Modules\Categories\Entities\Category;
use Modules\Categories\Http\Requests\StoreCategory;
use Modules\Categories\Transformers\CategoryTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class CategoriesController extends Controller
{
	/**
	 * category type
	 *
	 * options: default for categories and attribute for attributes
	 *
	 * @var string
	 */
	protected $type = 'default';

	public function index(CategoryTransformer $categoryTransformer)
	{
		$models = Category::with('parent')->defaultOrder()->where('type', $this->type)->paginate();

		return response()->json(
			fractal()
				->collection($models)
				->transformWith($categoryTransformer)
				->parseIncludes(['parent'])
				->addMeta(generate_meta($models))
				->paginateWith(new IlluminatePaginatorAdapter($models))
				->toArray(),
			200
		);
	}

	public function store(StoreCategory $request, CategoryTransformer $categoryTransformer)
	{
		$parent = null;
		if($request->parent_id){
			$parent = Category::find($request->parent_id);
			if(!$parent){
				return response()->json(['meta' => generate_meta('failure', 'Category was not found')], 404);
			}
		}

		$model = Category::create(
									array_add($request->validated(), 'type', $this->type),
									$parent
								);

		return response()->json(
			fractal()
				->item($model)
				->transformWith($categoryTransformer)
				->parseIncludes(['parent'])
				->addMeta(generate_meta($model))
				->toArray(),
			200
		);
	}

	public function update(StoreCategory $request, CategoryTransformer $categoryTransformer)
	{
		$model = Category::find($request->category);
		if(!$model){
			return response()->json(['meta'=>generate_meta('failure', 'Category was not found')], 200);
		}

		$model->fill($request->validated())->save();

		return response()->json(
			fractal()
				->item($model)
				->transformWith($categoryTransformer)
				->parseIncludes(['parent'])
				->addMeta(generate_meta($model))
				->toArray(),
			200
		);
	}

	public function destroy(Request $request)
	{
		$model = Category::find($request->category);
		if (!$model) {
			return response()->json(['meta' => generate_meta('failure', 'Category was not found')], 200);
		}


		if(!$model->canBeDeleted()){
			return response()->json(['meta' => generate_meta('failure', 'There\'s Some related items to specified category')], 400);
		}

		$model->delete();
		return response()->json(['meta' => generate_meta('success')], 200);
	}
}
