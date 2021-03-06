<?php

namespace Modules\ShoppingCart\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuantity extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'value' => 'required|integer',
            'type' => 'required|in:out,in',
            'price_per_unit' => 'nullable|required_if:type,in|integer',
            'comments' => 'nullable'
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
}
