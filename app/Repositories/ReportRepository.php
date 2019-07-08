<?php

namespace App\Repositories;

use App\Contracts\ReportRepositoryInterface;
use App\Models\Report;

class ReportRepository implements ReportRepositoryInterface
{
    public function balanceSheet(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd, string $bsType)
    {
        return Report::balanceSheet($cocd, $cyear, $cmonth, $fDepCd, $tDepCd, $bsType);
    }
}