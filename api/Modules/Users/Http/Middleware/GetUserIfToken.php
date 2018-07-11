<?php

namespace Modules\Users\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class GetUserIfToken
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
        $token = $request->bearerToken('Authorization');
        if(!$token){
            return $next($request);
        }

        JWTAuth::parser()->setRequest($request);
        JWTAuth::parseToken()->authenticate();
        return $next($request);
    }
}
