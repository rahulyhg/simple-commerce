<?php

namespace App;

use Modules\Users\Entities\User as BaseUser;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends BaseUser
{
    use Notifiable;
}
