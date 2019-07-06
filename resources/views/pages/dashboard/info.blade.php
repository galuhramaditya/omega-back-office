<div class="row" vue-data>
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-user font-green"></i>
                    <span class="caption-subject font-green bold uppercase">User Info</span>
                </div>
                {{-- <div class="actions">
                    <div class="btn-group">
                        <a class="btn yellow btn-outline btn-circle btn-sm" data-toggle="modal" href="#self-edit">Edit</a>
                        @include("pages.dashboard.self-edit")
                    </div>
                    <div class="btn-group">
                        <a class="btn purple btn-outline btn-circle btn-sm" data-toggle="modal" href="#change-self-password">Change Password</a>
                        @include("pages.dashboard.change-self-password")
                    </div>
                </div> --}}
            </div>
            <div class="portlet-body" v-if="user != null">
                <div class="row">
                    <div class="col-xs-5 text-right">
                        Company Code
                    </div>
                    <div class="col-xs-1" style="width: 1%"> : </div>
                    <div class="col-xs-6 bold">
                        @{{user.CoCd}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5 text-right">
                        Usercd
                    </div>
                    <div class="col-xs-1" style="width: 1%"> : </div>
                    <div class="col-xs-6 bold">
                        @{{user.UserCd}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5 text-right">
                        Name
                    </div>
                    <div class="col-xs-1" style="width: 1%"> : </div>
                    <div class="col-xs-6 bold">
                        @{{user.Name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>