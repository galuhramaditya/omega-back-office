var dashboard = new Vue({
    data: {
        outlet: null,
        chart: {
            display: [],
            list: {
                "balance-sheet": {},
                "balance-sheet-act": {
                    title: "Activa",
                    field: {
                        name: "ActNm",
                        value: "ActTot"
                    },
                    date: moment(),
                    date_format: "MMMM YYYY"
                },
                "balance-sheet-pas": {
                    title: "Pasiva",
                    field: {
                        name: "PasNm",
                        value: "PasTot"
                    },
                    date: moment(),
                    date_format: "MMMM YYYY"
                }
            }
        }
    },
    methods: {
        "balance-sheet-act": function() {
            var func = arguments.callee.name;
            var data = dashboard.chart.list[func];

            loading_down(func);

            $.ajax({
                url: "/report/balance-sheet",
                type: "POST",
                data: {
                    cocd: app.user.cocd,
                    month: data.date.format("MM"),
                    year: data.date.format("YYYY")
                },
                success: function(response) {
                    loading_up(func);

                    var items = {};
                    var last = "";

                    $.each(response.data, function(i, point) {
                        if (
                            point[data.field.name][0] != " " &&
                            point[data.field.name] != ""
                        ) {
                            last = point[data.field.name];
                            items[last] = {
                                name: last,
                                y: 0
                            };
                        }
                        if (point[data.field.value] != 0) {
                            items[last]["y"] = parseFloat(
                                point[data.field.value]
                            );
                        }
                    });

                    var series = [];
                    $.each(items, function(i, point) {
                        series.push(point);
                    });

                    pie_chart({
                        data: series,
                        id: func,
                        title: data.title,
                        subtitle: subtitle(data)
                    });
                }
            });
        },
        "balance-sheet-pas": function() {
            var func = arguments.callee.name;
            var data = dashboard.chart.list[func];

            loading_down(func);

            $.ajax({
                url: "/report/balance-sheet",
                type: "POST",
                data: {
                    cocd: app.user.cocd,
                    month: data.date.format("MM"),
                    year: data.date.format("YYYY")
                },
                success: function(response) {
                    loading_up(func);

                    var items = {};
                    var last = "";

                    $.each(response.data, function(i, point) {
                        if (
                            point[data.field.name][0] != " " &&
                            point[data.field.name] != ""
                        ) {
                            last = point[data.field.name];
                            items[last] = {
                                name: last,
                                y: 0
                            };
                        }
                        if (point[data.field.value] != 0) {
                            items[last]["y"] = parseFloat(
                                point[data.field.value]
                            );
                        }
                    });

                    var series = [];
                    $.each(items, function(i, point) {
                        series.push(point);
                    });

                    pie_chart({
                        data: series,
                        id: func,
                        title: data.title,
                        subtitle: subtitle(data)
                    });
                }
            });
        }
    }
});

$(document).ready(function() {
    start = setInterval(function() {
        if (app.menu != null) {
            clearInterval(start);
            $("[vue-data]").slideDown("slow");
            $.each(app.menu, function(index, value) {
                path = value.url.split("/");
                item = path[path.length - 1];
                if (dashboard.chart.list.hasOwnProperty(item)) {
                    if (item == "balance-sheet") {
                        dashboard.chart.display.push({
                            title: value.name,
                            link: value.url,
                            id: `${item}-act`
                        });
                        dashboard.chart.display.push({
                            title: value.name,
                            link: value.url,
                            id: `${item}-pas`
                        });
                        dashboard[`${item}-act`]();
                        dashboard[`${item}-pas`]();
                    } else {
                        dashboard.chart.display.push({
                            title: value.name,
                            link: value.url,
                            id: item
                        });
                        dashboard[item]();
                    }
                }
            });
        }
    }, 1000);
});

var pie_chart = function(data) {
    Highcharts.chart(data.id, {
        chart: {
            type: "pie"
        },
        credits: {
            enabled: false
        },
        title: {
            text: data.title
        },
        subtitle: {
            text: data.subtitle
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
                    format: "<b>{point.name}</b>: {point.percentage:.2f}%"
                }
            }
        },
        series: [
            {
                colorByPoint: true,
                data: data.data
            }
        ]
    });
};

var line_chart = function(data) {
    Highcharts.chart(data.id, {
        chart: {
            type: "line"
        },
        credits: {
            enabled: false
        },
        title: {
            text: data.title
        },
        subtitle: {
            text: data.subtitle
        },
        xAxis: {
            categories: data.categories
        },
        yAxis: {
            title: {
                text: data.hint
            }
        },
        plotOptions: {
            line: {
                cursor: "pointer"
            }
        },
        series: data.series
    });
};

var show_no_data = function(id, data) {
    var no_data = $(`#${id}`).find(".no-data");
    no_data.find(".title").html(data.title);
    no_data.find(".subtitle").html(subtitle(data));
    no_data.slideDown("slow");
};

var subtitle = function(data) {
    return `${data.date.format(data.date_format)}`;
};

var loading_down = function(func) {
    $(`.${func}`).slideDown("slow");
    $(`#${func}`).slideUp("slow");
};

var loading_up = function(func) {
    $(`.${func}`).slideUp("slow");
    $(`#${func}`).slideDown("slow");
};
