<?php

namespace Modules\TreasuryPapers;

use League\Fractal\TransformerAbstract;

class Accountable{

    /**
     * transformers map
     *
     * @var \Illuminate\Support\Collection
     */
    protected $transformers;

    public function __construct() {
        $this->transformers = collect([]);
    }

    /**
     * map model type to callback the returns transformers
     *
     * @param string $modelType
     * @param \League\Fractal\TransformerAbstract $callback
     * @return $this
     */
    public function register($modelType, $transformer)
    {
        $this->transformers->put($modelType, $transformer);
        return $this;
    }

    /**
     * call the callback to get transformer
     *
     * @param string $modelType
     * @return \League\Fractal\TransformerAbstract
     */
    public function get($modelType)
    {
        return $this->transformers->get($modelType);
    }

    /**
     * get list of registered models
     *
     * @return \Illuminate\Support\Collection
     */
    public function getModels(){
        return $this->transformers->keys();
    }

}