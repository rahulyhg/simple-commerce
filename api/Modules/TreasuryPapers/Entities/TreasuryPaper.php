<?php

namespace Modules\TreasuryPapers\Entities;

use Illuminate\Database\Eloquent\Model;

class TreasuryPaper extends Model
{
    protected $fillable = [
        'value', 'type', 'comments', 'model_type', 'model_id'
    ];

    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    public function accountable()
    {
        return $this->morphTo('accountable', 'model_type', 'model_id')->withTrashed();
    }
}
