@component('mail::message')

@component('mail::panel')
# Registeration Done Successfully

Hello {{ $user->name }}!

We're really thrilled to have you at {{ config('app.name') }}, so please complete you're registeration by activating your account using the next activation code

@component('mail::button', ['url' => '#'])
{{ $activationToken->token }}
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

@endcomponent