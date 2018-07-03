<?php

namespace Modules\Users\Transformers;

use League\Fractal\TransformerAbstract;

class StatusTransformer extends TransformerAbstract
{
	/**
	 * A Fractal transformer.
	 *
	 * @return array
	 */
	public function transform( $model )
	{
		return [
			'status' => $model->name,
			'reason' => $model->reason,
			'created_at' => $model->created_at->toDateTimeString()
		];
	}
}
