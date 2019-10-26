<div class="row" id="table" vue-data>
    <div class="col-xs-12">
        <!-- BEGIN EXAMPLE TABLE PORTLET-->
        <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-table font-dark"></i>
                    <span class="caption-subject bold uppercase font-dark">Profit & Loss (@{{report.type}})</span>
                </div>
            </div>
            <div class="portlet-body table-scrollable">
                <table class="table table-striped table-bordered table-hover order-column">
                    <tbody class="text-right">
                        <tr v-for="(data, index) in report.reports">
                            <td class="text-left" :class="data.ActNm[0] != ' ' ? 'bold' : ''">@{{data.ActNm.split(" ").join("&nbsp")}}</td>
                            <td>@{{data.ActAmt == 0 ? "" : parseFloat(data.ActAmt).toLocaleString(undefined, { maximumFractionDigits: 2 })}}</td>
                            <td :style="data.ActTot == 0 ? '' : 'border-top: 2px solid black'">@{{data.ActTot == 0 ? "" : parseFloat(data.ActTot).toLocaleString(undefined, { maximumFractionDigits: 2 })}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <img id="thumbnail_img" />
</div>