<?php

namespace Modules\Categories\Traits;

use Modules\Categories\Entities\Category;
use BrianFaust\Categories\Traits\HasCategories as NestedCategories;


trait HasCategories{

	use NestedCategories;

	/*----------------------------------------------------
	* Scopes
	--------------------------------------------------- */

	/**
	 * Check if model has specific category or one of its descendants
	 *
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param \BrianFaust\Categories\Models\Category|integer $category
	 * @return void
	 */
	public function scopeWhereHasCategory($query, $category, $type = 'default')
	{
		return $query->whereHas('categories', function ($query) use ($category) {
			return $query
				->where('type', $type)
				->where('id', $category)
				->orWhereIn('id', Category::select('id')->whereDescendantOf($category));
		});
	}
}