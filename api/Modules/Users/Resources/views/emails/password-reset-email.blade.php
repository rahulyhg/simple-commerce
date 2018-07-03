@component('mail::message')

@component('mail::panel')
# Password Reset Request

Hello {{ $user->name }}!

A Password reset request have been done at {{ config('app.name') }}, use the code below to reset your password.

@component('mail::button', ['url' => '#'])
{{ $activationToken->token }}
@endcomponent

If you have not done the request then please contact us to make sure your account safe and authentic.

Thanks,<br>
{{ config('app.name') }}
@endcomponent

@endcomponent