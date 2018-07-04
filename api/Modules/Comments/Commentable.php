<?php

namespace Modules\Comments;

class Commentable {

    /**
     * Models registered as commentable
     *
     * @var \Illuminate\Support\Collection
     */
    public $models;

    public function __construct() {
        $this->models = collect([]);
    }

    /**
     * register a Model Type as a commentable
     *
     * @return $this
     */
    public function register($route, $callable){
        $this->models->put($route, $callable);

        return $this;
    }

    /**
     * get Registered Model
     *
     * @param \Illuminate\Http\Request $route
     * @param string $route
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function get($request, $route){
        $callable = $this->models->get($route);

        if(!is_callable($callable)){
            return false;
        }

        return $callable($request);
    }


}