<?php

namespace App\Contracts;

interface ReportRepositoryInterface
{
    public function balanceSheet(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd, string $bsType);
}