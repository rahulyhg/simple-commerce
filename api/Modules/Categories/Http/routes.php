<?php

Route::group(['middleware' => 'web', 'prefix' => 'categories', 'namespace' => 'Modules\Categories\Http\Controllers'], function()
{
    Route::get('/', 'CategoriesController@index');
});
