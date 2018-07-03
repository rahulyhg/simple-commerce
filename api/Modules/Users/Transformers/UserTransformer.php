<?php

namespace Modules\Users\Transformers;

use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
	/**
	 * wether to include user timestamps or not
	 *
	 * @var boolean
	 */
	private $timestamps = false;


	/**
	 * wether to include latest status
	 *
	 * @var boolean
	 */
	private $status = false;

	/**
	 * A Fractal transformer.
	 *
	 * @return array
	 */
	public function transform($model)
	{
		$info = [
			'id' => $model->id,
			'first_name' => $model->first_name,
			'last_name' => $model->last_name,
			'name' => $model->name,
			'email' => $model->email,
			'birthday' => $model->birthday,
			'address' => $model->address
		];

		if($this->timestamps){
			$info['created_at'] = $model->created_at->toDateTimeString();
			$info['updated_at'] = $model->updated_at->toDateTimeString();
		}

		if($this->status){
			$info['status'] = $model->status;
		}

		return $info;
	}

	/**
	 * wether to include user timestamps or not
	 *
	 * @param boolean $include
	 * @return $this
	 */
	public function includeTimestamps($include = true)
	{
		$this->timestamps = $include;
		return $this;
	}

	/**
	 * wether to include user latest status
	 *
	 * @param boolean $include
	 * @return $this
	 */
	public function includeStatus($include = true)
	{
		$this->status = $include;
		return $this;
	}
}
