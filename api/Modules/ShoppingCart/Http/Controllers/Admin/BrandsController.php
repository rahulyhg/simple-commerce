<?php

namespace Modules\ShoppingCart\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Categories\Http\Controllers\Admin\CategoriesController;

class BrandsController extends CategoriesController
{
    /**
     * category type
     *
     * options: default for categories and attribute for attributes
     *
     * @var string
     */
    protected $type = 'brand';
}
