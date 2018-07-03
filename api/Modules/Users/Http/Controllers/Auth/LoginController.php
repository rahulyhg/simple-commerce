<?php

namespace Modules\Users\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\Users\Jwt\JwtLogin;
use Illuminate\Routing\Controller;

class LoginController extends Controller
{
	use JwtLogin;
}
