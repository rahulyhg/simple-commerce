<?php

namespace Modules\TreasuryPapers\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\TreasuryPapers\Accountable;

class AccountableServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('accountable', function($app){
            return new Accountable;
        });
    }
}
