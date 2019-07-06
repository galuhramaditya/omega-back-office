<div class="modal fade text-left" :id=`edit-${pages.id}` tabindex="-1" role="dialog" aria-hidden="true" :modal-action=`edit-${pages.id}`>
    <div class="modal-dialog">
        <form class='modal-content' :form-action=`edit-${pages.id}` v-on:submit.prevent="page.handle_edit(pages.id, pages.name)">
            <div class="modal-header bg-font-green bg-green">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Edit Page</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Name</label>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="fa fa-cog"></i>
                        </span>
                        <input type="text" class="form-control" name="name" placeholder="Role Name" :value="pages.name">
                    </div>
                    <div class="help-block font-red" help-name="name"></div>
                </div>
                <div class="form-group">
                    <label>URL</label>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="fa fa-sort-numeric-asc"></i>
                        </span>
                        <input type="text" class="form-control" name="url" placeholder="Only Pathname : /pages" :value="pages.url">
                    </div>
                    <div class="help-block font-red" help-name="url"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn dark" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                <button type="submit" class="btn green"><i class="fa fa-check"></i> Submit</button>
            </div>
        </form>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->