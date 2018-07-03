<?php

namespace Modules\Users\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUser extends FormRequest
{
	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'first_name' => 'bail|required',
			'last_name' => 'bail|required',
			'email' => 'bail|required|email|unique:users',
			'password' => 'bail|required|confirmed',
			'birthday' => 'bail|nullable|date',
			'address' => 'bail|nullable',
		];
	}

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}
}
