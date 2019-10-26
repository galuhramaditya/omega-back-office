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

    public function profitLossMTD(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd)
    {
        return Report::profitLossMTD($cocd, $cyear, $cmonth, $fDepCd, $tDepCd);
    }

    public function profitLossYTD(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd)
    {
        return Report::profitLossYTD($cocd, $cyear, $cmonth, $fDepCd, $tDepCd);
    }
}
