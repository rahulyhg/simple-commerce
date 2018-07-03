<?php

namespace Modules\Users\Emails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Users\Entities\ActivationToken;

class ActivationTokenEmail extends Mailable
{
	use Queueable, SerializesModels;

	/**
	 * the user that will received the activation token
	 *
	 * @var \App\User
	 */
	protected $user;

	/**
	 * the activationToken that will be sent
	 *
	 * @var \Modules\Users\Entities\ActivationToken
	 */
	protected $activationToken;

	/**
	 * email from
	 *
	 * @var string
	 */
	protected $fromEmail = 'activate@fusecommerce.com';

	protected $email = 'users::emails.activation-token-email';

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct($user, $activationToken = null)
	{
		$this->user = $user;
		$this->activationToken = $activationToken;
	}


	public function setActivationToken(ActivationToken $activationToken)
	{
		$this->activationToken = $activationToken;
		return $this;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->from($this->fromEmail)
					->markdown($this->email)
					->with('activationToken', $this->activationToken)
					->with('user', $this->user);
	}
}
