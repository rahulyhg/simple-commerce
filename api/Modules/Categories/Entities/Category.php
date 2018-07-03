<?php

namespace Modules\Categories\Entities;

use Illuminate\Support\Facades\DB;
use Modules\Products\Entities\Product;
use Illuminate\Database\Eloquent\Model;
use BrianFaust\Categories\Models\Category as BaseCategory;

class Category extends BaseCategory
{
	/*----------------------------------------------------
	* Methods
	--------------------------------------------------- */
	/**
	 * Check if current category can be deleted
	 *
	 * @return boolean
	 */
	public function canBeDeleted()
	{
		return !DB::table('model_has_categories')->where('category_id', $this->id)->count();
	}
}
