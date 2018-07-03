<?php

namespace Modules\Users\Entities;

use Mail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Modules\Users\Emails\ActivationTokenEmail;

class ActivationToken extends Model
{
	protected $fillable = ['user_id','token','used_at'];

	/*----------------------------------------------------
	* Relationships
	--------------------------------------------------- */

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	/*----------------------------------------------------
	* methods
	--------------------------------------------------- */

	/**
	 * set current activation token as used
	 *
	 * @return void
	 */
	public function use()
	{
		$this->used_at = Carbon::now()->toDateTimeString();
		$this->save();
	}

	/**
	 * send activation token via email
	 *
	 * @param \App\User $user
	 *
	 * @return void
	 */
	public function send($email = null)
	{
		if (is_null($email)) {
			$email = new ActivationTokenEmail($this->user);
		}

		$email->setActivationToken($this);

		return Mail::to($this->user)->send($email);
	}

	/**
	 * send activation token via email
	 *
	 * @param \App\User $user
	 *
	 * @return void
	 */
	public function queue($email = null)
	{
		if( is_null($email) ){
			$email = new ActivationTokenEmail($this->user);
		}

		$email->setActivationToken($this);

		return Mail::to($this->user)->queue($email);
	}
}
