<?php

namespace Modules\Comments\Providers;

use Modules\Comments\Commentable;
use Illuminate\Support\ServiceProvider;

class CommentableServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('commentable', function($app){
            return new Commentable;
        });
    }
}
