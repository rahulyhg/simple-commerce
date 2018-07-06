<?php

namespace Modules\TreasuryPapers\Transformers;

use League\Fractal\TransformerAbstract;

class TreasuryPaperTransformer extends TransformerAbstract
{

    /**
     * Include resources without needing it to be requested.
     *
     * @var array
     */
    protected $defaultIncludes = ['accountable'];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($model)
    {
        return [
            'id' => $model->id,
            'value' => $model->value,
            'type' => $model->type,
            'comments' => $model->comments,
            'created_at' => $model->created_at->format('Y-m-d')
        ];
    }

    public function includeAccountable($model)
    {
        $accountable = $model->accountable;
        $transformer = app('accountable')->get($model->model_type);
        return $this->item($accountable, new $transformer);
    }
}
