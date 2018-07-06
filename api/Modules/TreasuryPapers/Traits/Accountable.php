<?php

namespace Modules\TreasuryPapers\Traits;

use Modules\TreasuryPapers\Entities\TreasuryPaper;



trait Accountable{

    /*----------------------------------------------------
    * Relationships
    --------------------------------------------------- */
    public function treasuryPapers()
    {
        return $this->morphMany(TreasuryPaper::class, 'accountable', 'model_type', 'model_id');
    }

}