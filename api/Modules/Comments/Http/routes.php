<?php

Route::group(['middleware' => 'web', 'prefix' => 'comments', 'namespace' => 'Modules\Comments\Http\Controllers'], function()
{
    Route::get('/', 'CommentsController@index');
});
