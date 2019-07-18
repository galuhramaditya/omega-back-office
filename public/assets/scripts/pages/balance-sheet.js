var report = new Vue({
    data: {
        total: null,
        reports: null,
        chart: [
            {
                title: "Activa",
                id: "assets",
                field: {
                    name: "ActNm",
                    value: "ActTot"
                }
            },
            {
                title: "Pasiva",
                id: "liabilities",
                field: {
                    name: "PasNm",
                    value: "PasTot"
                }
            }
        ]
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

                            $.each(report.chart, function(i, point) {
                                report.charting(point);
                            });
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
        charting: function(data) {
            var items = report.reports;
            var obj = {};
            var last = "";

            $.each(items, function(i, point) {
                if (
                    point[data.field.name][0] != " " &&
                    point[data.field.name] != ""
                ) {
                    last = point[data.field.name];
                    obj[last] = {
                        name: last,
                        y: 0
                    };
                }
                if (point[data.field.value] != 0) {
                    obj[last]["y"] = parseFloat(point[data.field.value]);
                }
            });

            var series = [];
            $.each(obj, function(i, point) {
                series.push(point);
            });

            Highcharts.chart(data.id, {
                chart: {
                    type: "pie"
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: $("input[name=date]")
                        .data("datepicker")
                        .getFormattedDate("MM yyyy")
                },
                tooltip: {
                    pointFormat: "<b>{point.y}</b> ({point.percentage:.2f}%)"
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            format:
                                "<b>{point.name}</b>: {point.percentage:.2f}%"
                        }
                    }
                },
                series: [
                    {
                        colorByPoint: true,
                        data: series
                    }
                ]
            });
        },
        print: function() {
            var date = $("input[name=date]")
                .data("datepicker")
                .getFormattedDate("mm/yyyy");

            app.print(date);
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
