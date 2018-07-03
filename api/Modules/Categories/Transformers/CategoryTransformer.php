<?php

namespace Modules\Categories\Transformers;

use League\Fractal\TransformerAbstract;

class CategoryTransformer extends TransformerAbstract
{
	/**
	 * Resources that can be included if requested.
	 *
	 * @var array
	 */
	protected $availableIncludes = ['parent'];

	/**
	 * A Fractal transformer.
	 *
	 * @return array
	 */
	public function transform($model)
	{
		return [
			'id' => $model->id,
			'name' => $model->name,
			'slug' => $model->slug
		];
	}

	public function includeParent($model)
	{
		$parent = $model->parent;
		if(!$parent){
			return null;
		}

		return $this->item($parent, $this);
	}
}
