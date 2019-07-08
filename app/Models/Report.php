<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class Report
{
    public static function balanceSheet(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd, string $bsType)
    {
        $results = DB::select('SET NOCOUNT ON; EXEC dbo.GlrBS ?,?,?,?,?,?', [$cocd, $cyear, $cmonth, $fDepCd, $tDepCd, $bsType]);

        return $results;
    }
}