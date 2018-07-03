<?php

namespace Modules\Users\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiAdmin
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next)
	{
		if(!$request->user()->isSuperAdmin()){
			return response()->json(['meta' => generate_meta('failure','FORBIDDEN')], 403);
		}
		return $next($request);
	}
}
