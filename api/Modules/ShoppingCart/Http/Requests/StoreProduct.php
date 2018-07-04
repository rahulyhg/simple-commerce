<?php

namespace Modules\ShoppingCart\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduct extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'bail|required',
            'price' => 'bail|required',
            'description' => 'bail|required',
            'image' => 'required',
            'categories' => 'required',
            'categories.*' => 'exists:categories,id',
            'brands' => 'required',
            'brands.*' => 'exists:categories,id'
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->type === 'admin';
    }
}
