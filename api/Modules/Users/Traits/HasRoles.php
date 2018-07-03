<?php

namespace Modules\Users\Traits;

trait HasRoles
{
	public function isSuperAdmin()
	{
		return $this->type == 'admin';
	}
}
