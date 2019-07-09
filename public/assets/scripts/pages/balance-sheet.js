var report = new Vue({
    data: {
        total: null,
        reports: null
    },
    methods: {
        refresh_report: function() {
            $("#on-print").slideUp("slow");
            $(".loader").slideDown("slow");

            var month = $("input[name=date]")
                .data("datepicker")
                .getFormattedDate("mm");
            var year = $("input[name=date]")
                .data("datepicker")
                .getFormattedDate("yyyy");

            $.ajax({
                url: "/report/balance-sheet",
                type: "POST",
                data: {
                    cocd: app.user.cocd,
                    month: month,
                    year: year
                },
                success: function(response) {
                    $(".loader").slideUp("slow");

                    if (response.hasOwnProperty("data")) {
                        report.reports = response.data;

                        $("#on-print").slideDown("slow", function() {
                            scrollTo($("#on-print"));
                        });
                    } else {
                        bootbox.alert(`data doesn't exist on ${date}`);
                    }
                },
                error: function() {
                    console.log("as");
                    report.refresh_report();
                }
            });
        },
        print: function() {
            var company = $("select[name=company] option:selected").val();
            var date = $("input[name=date]")
                .data("datepicker")
                .getFormattedDate("dd/mm/yyyy");

            app.print(`${company} (${date})`);
        }
    }
});

$(document).ready(function() {
    $("input[name=date]")
        .datepicker({
            format: "mm/yyyy",
            minViewMode: "months",
            autoclose: true,
            endDate: "0d",
            orientation: "bottom",
            todayHighlight: true
        })
        .datepicker("setDate", moment().format("DD/MM/YYYY"));

    start = setInterval(function() {
        if (app.user != null) {
            clearInterval(start);
            report.refresh_report();
        }
    }, 0);
});
