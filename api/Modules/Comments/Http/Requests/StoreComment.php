<?php

namespace Modules\Comments\Http\Requests;

use Modules\Comments\Entities\Comment;
use Illuminate\Foundation\Http\FormRequest;

class StoreComment extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'content' => 'required',
            'rating' => 'required|min:1|max:5'
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(!$this->route('comment')){
            return true;
        }

        $this->comment = Comment::find($this->route('comment'));

        if(!$this->comment){
            return false;
        }

        return $this->user()->isSuperAdmin() || $this->user()->id === $this->comment->user_id ;
    }
}
