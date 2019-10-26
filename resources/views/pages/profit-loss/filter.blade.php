<div class="row" vue-data>
    <div class="col-md-12">
        <div class="portlet light form-fit bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-filter font-green"></i>
                    <span class="caption-subject font-green bold uppercase">Data Filtering</span>
                </div>
            </div>
            <div class="portlet-body form">
                <form class="form-horizontal form-row-seperated" v-on:submit.prevent="report.refresh_report()">
                    <div class="form-body">
                        <div class="form-group">
                            <label class="col-md-3 control-label">Month</label>
                            <div class="col-md-5">
                                <input type="text" class="form-control" name="date">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">Type</label>
                        <div class="col-md-5">
                            <select name="type" class="bs-select form-control" v-model="report.type">
                                <option value="MTD">Month to Date</option>
                                <option value="YTD">Year to Date</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-actions">
                        <div class="row">
                            <div class="col-md-offset-3 col-md-9">
                                <button type="submit" class="btn green">
                                    <i class="fa fa-check"></i> Submit
                                </button>
                                <button type="button" class="btn yellow">
                                    <i class="fa fa-times"></i> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>