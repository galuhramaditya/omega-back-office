@extends('layouts.app')

@section('css')
<link href=" {{ url('/assets/css/bootstrap-datepicker.min.css') }}" rel="stylesheet" type="text/css" />
@endsection

@section('toolbar')
<div class="btn-group pull-right">
    <button type="button" class="btn green btn-sm btn-outline" v-on:click.prevent="report.print()">
        <i class="fa fa-print"></i> Print
    </button>
</div>
@endsection

@section('content')
<!-- BEGIN CONTENT BODY -->
<div id="report">
    <!-- BEGIN PAGE TITLE-->
    <h1 class="page-title"> Report System
    </h1>
    <!-- END PAGE TITLE-->
    @include("pages.balance-sheet.filter")
    <!-- LOADER -->
    @include("includes.loader")
    <!-- END LOADER -->
    <div id="on-print">
        @include("pages.balance-sheet.chart")
        @include("pages.balance-sheet.table")
    </div>
</div>
<!-- END CONTENT BODY -->
@endsection

@section('scripts')
<script src="{{ url('/assets/scripts/global/bootstrap-datepicker.min.js') }}" type="text/javascript"></script>
<script src="{{ url('/assets/scripts/pages/balance-sheet.js') }}" type="text/javascript"></script>
@endsection