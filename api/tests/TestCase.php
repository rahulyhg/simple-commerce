<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * assert that the response data count is equals to expected
     * @param  integer $expected
     * @param  Illuminate\Foundation\Testing\TestResponse $res
     * @return void
     */
    public function assertContentCount($expected, $res)
    {
        $data = json_decode($res->getContent())->data;

        $this->assertCount($expected, $data);
    }
}
