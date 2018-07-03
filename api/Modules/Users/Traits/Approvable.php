<?php

namespace Modules\Users\Traits;

use Spatie\ModelStatus\HasStatuses;

trait Approvable
{
	use HasStatuses;

	/*----------------------------------------------------
	* Methods
	--------------------------------------------------- */

	/**
	 * set current model status to pending
	 *
	 * @param string|null $reason
	 * @return $this
	 */
	public function setPending($reason = '')
	{
		$this->setStatus('pending', $reason);
		return $this;
	}

	/**
	 * set current model status to active
	 *
	 * @return $this
	 */
	public function activate($reason = '')
	{
		$this->setStatus('active', $reason);
		return $this;
	}

	/**
	 * set curent model status to approved
	 *
	 * @return $this
	 */
	public function approve($reason = '')
	{
		$this->setStatus('approved', $reason);
		return $this;
	}


	/**
	 * set curent model status to rejected
	 *
	 * @return $this
	 */
	public function reject($reason = '')
	{
		$this->setStatus('rejected', $reason);
		return $this;
	}


	/*----------------------------------------------------
	* attributes
	--------------------------------------------------- */
	public function getIsActiveAttribute()
	{
		return $this->latestStatus('active') ? true : false;
	}


	public function getIsApprovedAttribute()
	{
		return $this->status == 'approved';
	}
}
