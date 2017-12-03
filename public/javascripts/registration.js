$(document).ready(function() {
    var customDataTable = $('#datatable').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url":"/event/getregistration",
            "type":"GET"
        }
    } );

    $('#customSearchTextBox').on('keyup', function () {
        customDataTable.search(this.value).draw();
    });

} );