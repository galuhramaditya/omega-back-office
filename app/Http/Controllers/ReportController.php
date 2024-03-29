<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReportService;
use App\Libraries\Response;
use App\Libraries\Validation;

class ReportController extends Controller
{
    protected $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    public function balanceSheet(Request $request)
    {
        $get = $this->reportService->balanceSheet($request->cocd, $request->year, $request->month, "", "", "T");
        return Response::success("succeffully get report data", $get);
    }

    public function profitLossMTD(Request $request)
    {
        $get = $this->reportService->profitLossMTD($request->cocd, $request->year, $request->month, "", "zzzzz");
        return Response::success("succeffully get report data", $get);
    }

    public function profitLossYTD(Request $request)
    {
        $get = $this->reportService->profitLossYTD($request->cocd, $request->year, $request->month, "", "zzzzz");
        return Response::success("succeffully get report data", $get);
    }
}
