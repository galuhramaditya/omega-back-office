@extends('layouts.app')

@section('content')
<!-- BEGIN CONTENT BODY -->
<div id="accounts">
    <!-- BEGIN PAGE TITLE-->
    <h1 class="page-title"> Accounts System
    </h1>
    <!-- END PAGE TITLE-->

    @include('includes.alert')
    @include('pages.accounts.table')
</div>
<!-- END CONTENT BODY -->
@endsection

@section('scripts')
<script src="{{ url('/assets/scripts/pages/accounts.js') }}" type="text/javascript"></script>
@endsection