<?php

namespace App\Services;

use App\Contracts\ReportRepositoryInterface;

class ReportService
{
    protected $reportRepository;

    public function __construct(ReportRepositoryInterface $reportRepository)
    {
        $this->reportRepository = $reportRepository;
    }

    public function balanceSheet(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd, string $bsType)
    {
        $results = $this->reportRepository->balanceSheet($cocd, $cyear, $cmonth, $fDepCd, $tDepCd, $bsType);

        return $results;
    }

    public function profitLossMTD(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd)
    {
        $results = $this->reportRepository->profitLossMTD($cocd, $cyear, $cmonth, $fDepCd, $tDepCd);

        return $results;
    }

    public function profitLossYTD(string $cocd, string $cyear, string $cmonth, string $fDepCd, string $tDepCd)
    {
        $results = $this->reportRepository->profitLossYTD($cocd, $cyear, $cmonth, $fDepCd, $tDepCd);

        return $results;
    }
}
