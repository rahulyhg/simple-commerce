<?php

Route::group(['middleware' => 'web', 'prefix' => 'treasurypapers', 'namespace' => 'Modules\TreasuryPapers\Http\Controllers'], function()
{
    Route::get('/', 'TreasuryPapersController@index');
});
