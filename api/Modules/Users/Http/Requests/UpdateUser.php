<?php

namespace Modules\Users\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUser extends FormRequest
{
	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		$rules = [
			'first_name' => 'bail|required',
			'last_name' => 'bail|required',
			'email' => [
				'bail',
				'required',
				'email',
				Rule::unique('users')->ignore($this->user()->id),
			],
			'birthday' => 'bail|nullable|date',
			'address' => 'bail|nullable',
		];

		if( $this->password ){
			$rules['password'] = 'bail|required|confirmed';
		}

		return $rules;
	}

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		// if user is updating his profile or a user is an admin
		if( $this->user()->isSuperAdmin() || !$this->route('user') ){
			return true;
		}
		return false;
	}
}
