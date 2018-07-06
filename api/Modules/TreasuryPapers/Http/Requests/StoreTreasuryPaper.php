<?php

namespace Modules\TreasuryPapers\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTreasuryPaper extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'value' => 'bail|required|integer:min:1',
            'type' => 'bail|required|in:out,in',
            'comments' => 'nullable',
            'model_type' => 'bail|required|in:'.app('accountable')->getModels()->implode(','),
            'model_id' => 'bail|required|exists:'.$this->getTableName($this->model_type).',id'
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->isSuperAdmin();
    }

    private function getTableName($model){
        return with(new $model)->getTable();
    }
}
