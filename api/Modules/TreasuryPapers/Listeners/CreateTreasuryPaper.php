<?php

namespace Modules\TreasuryPapers\Listeners;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\TreasuryPapers\Entities\TreasuryPaper;

class CreateTreasuryPaper
{
    /**
     * The Model to create treasuryPaper for
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * TreasuryPaper Type
     *
     * @var string
     */
    protected $type;

    /**
     * TreasuryPaper Value
     *
     * @var integer
     */
    protected $value;

    /**
     * TreasuryPaper Comments
     *
     * @var sting
     */
    protected $comments;

    public function __construct(Model $model, $type, $value, $comments)
    {
        $this->model = $model;
        $this->type = $type;
        $this->value = $value;
        $this->comments = $comments;
    }

    public function handle()
    {
        if(!$this->checkModelRegistered()){
            return false;
        }

        return TreasuryPaper::create([
            'model_id' => $this->model->id,
            'model_type' => get_class($this->model),
            'value' => $this->value,
            'type' => $this->type,
            'comments' => $this->comments,
        ]);
    }

    private function checkModelRegistered(){
        return app('accountable')->getModels()->contains(get_class($this->model));
    }
}
