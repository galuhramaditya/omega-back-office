var report = new Vue({
    data: {
        total: null,
        reports: null,
        summary: null,
        chart: [
            {
                title: "Profit",
                id: "profit",
                field: {
                    name: "name",
                    value: "data"
                }
            },
            {
                title: "Loss",
                id: "loss",
                field: {
                    name: "name",
                    value: "data"
                }
            }
        ],
        type: "MTD"
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
                url: url(`/report/profit-loss/${report.type}`),
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
                        report.summary = {
                            profit: [],
                            loss: []
                        };

                        report.reports.map(key => {
                            var name = key.ActNm.split("Total ").join("");

                            if (
                                key.ActNm == "Total REVENUE/SALES" ||
                                key.ActNm == "Total COST OF SALES"
                            ) {
                                report.summary.profit.push({
                                    name,
                                    data: key.ActTot
                                });
                            } else if (
                                key.ActNm == "Total EXPENSES" ||
                                key.ActNm == "Total OTHER INCOME/EXPENSES"
                            ) {
                                report.summary.loss.push({
                                    name,
                                    data: key.ActTot
                                });
                            }
                        });

                        report.chart.map(data => {
                            report.charting(data);
                        });

                        $("#on-print").slideDown("slow", function() {
                            scrollTo($("#on-print"));
                        });
                    } else {
                        bootbox.alert(`data doesn't exist on ${date}`);
                    }
                },
                error: function() {
                    report.refresh_report();
                }
            });
        },
        charting: function(data) {
            var series = report.summary[data.id].map(key => {
                key.name = key[data.field.name];
                key.y = parseFloat(key[data.field.value]);
                return key;
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
