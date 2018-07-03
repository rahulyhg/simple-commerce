<?php

namespace Modules\Users\Emails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PasswordResetEmail extends ActivationTokenEmail
{
	public $fromEmail = 'password-reset@fusecommerce.com';

	protected $email = 'users::emails.password-reset-email';
}
