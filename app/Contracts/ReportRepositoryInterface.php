<?php

namespace App\Contracts;

interface ReportRepositoryInterface
{
    public function balanceSheet(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd, string $bsType);
    public function profitLossMTD(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd);
    public function profitLossYTD(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd);
}
