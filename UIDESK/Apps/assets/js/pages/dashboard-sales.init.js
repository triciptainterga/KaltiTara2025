var options5 = {
    series: [{
        data: [10, 20, 15, 40, 20, 50, 70, 60, 90, 70, 110]
    }],
    chart: {
        type: "bar",
        height: 50,
        sparkline: {
            enabled: !0
        }
    },
    plotOptions: {
        bar: {
            columnWidth: "50%"
        }
    },
    tooltip: {
        fixed: {
            enabled: !1
        },
        y: {
            title: {
                formatter: function (e) {
                    return ""
                }
            }
        }
    },
    colors: ["#038edc"]
},
    chart5 = new ApexCharts(document.querySelector("#sparkline-chart-1-Backup"), options5),
    options = (chart5.render(), {
        series: [{
            name: "Series A",
            data: [10, 90, 30, 60, 50, 90, 25, 55, 30, 40]
        }],
        chart: {
            height: 50,
            type: "line",
            sparkline: {
                enabled: !0
            },
            toolbar: {
                show: !1
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: !1,
                opacityFrom: .45,
                opacityTo: .05,
                stops: [50, 100, 100, 100]
            }
        },
        colors: ["#038edc", "transparent"]
    }),
    chart5 = new ApexCharts(document.querySelector("#sparkline-chart-1-1"), options5),
    options = (chart5.render(), {
        series: [{
            name: "Series A",
            data: [10, 90, 30, 60, 50, 90, 25, 55, 30, 40]
        }],
        chart: {
            height: 50,
            type: "area",
            sparkline: {
                enabled: !0
            },
            toolbar: {
                show: !1
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: !1,
                opacityFrom: .45,
                opacityTo: .05,
                stops: [50, 100, 100, 100]
            }
        },
        colors: ["#038edc", "transparent"]
    }),
    chart5 = new ApexCharts(document.querySelector("#sparkline-chart-1-4"), options5),
    options = (chart5.render(), {
        series: [{
            name: "Series A",
            data: [10, 90, 30, 60, 50, 90, 25, 55, 30, 40]
        }],
        chart: {
            height: 50,
            type: "area",
            sparkline: {
                enabled: !0
            },
            toolbar: {
                show: !1
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: !1,
                opacityFrom: .45,
                opacityTo: .05,
                stops: [50, 100, 100, 100]
            }
        },
        colors: ["#038edc", "transparent"]
    }),
    chart = new ApexCharts(document.querySelector("#sparkline-chart-2"), options),
    options5 = (chart.render(), {
        series: [{
            data: [40, 20, 30, 40, 20, 60, 55, 70, 95, 65, 110]
        }],
        chart: {
            type: "bar",
            height: 50,
            sparkline: {
                enabled: !0
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "50%"
            }
        },
        tooltip: {
            fixed: {
                enabled: !1
            },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            }
        },
        colors: ["#038edc"]
    }),
    options = ((chart5 = new ApexCharts(document.querySelector("#sparkline-chart-3"), options5)).render(), {
        series: [{
            name: "Series A",
            data: [10, 90, 30, 60, 50, 90, 25, 55, 30, 40]
        }],
        chart: {
            height: 50,
            type: "area",
            sparkline: {
                enabled: !0
            },
            toolbar: {
                show: !1
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: !1,
                opacityFrom: .45,
                opacityTo: .05,
                stops: [50, 100, 100, 100]
            }
        },
        colors: ["#038edc", "transparent"]
    }),
    options = ((chart = new ApexCharts(document.querySelector("#sparkline-chart-1"), options)).render(), {
        chart: {
            height: 332,
            type: "line",
            stacked: !1,
            offsetY: -5,
            toolbar: {
                show: !1
            }
        },
        stroke: {
            width: [0, 0, 0, 1],
            curve: "smooth"
        },
        plotOptions: {
            bar: {
                columnWidth: "40%"
            }
        },
        colors: ["#5fd0f3", "#038edc", "#dfe2e6", "#51d28c"],
        series: [{
            name: "Income",
            type: "column",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        }, {
            name: "Sales",
            type: "column",
            data: [19, 8, 26, 21, 18, 36, 30, 28, 40, 39, 15]
        }, {
            name: "Conversation Ratio",
            type: "area",
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        }, {
            name: "Users",
            type: "line",
            data: [9, 11, 13, 12, 10, 8, 6, 9, 14, 17, 22]
        }],
        fill: {
            opacity: [.85, 1, .25, 1],
            gradient: {
                inverseColors: !1,
                shade: "light",
                type: "vertical",
                opacityFrom: .85,
                opacityTo: .55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ["01/01/2003", "02/01/2003", "03/01/2003", "04/01/2003", "05/01/2003", "06/01/2003", "07/01/2003", "08/01/2003", "09/01/2003", "10/01/2003", "11/01/2003"],
        markers: {
            size: 0
        },
        xaxis: {
            type: "datetime"
        },
        yaxis: {
            title: {
                text: "Sales Analytics",
                style: {
                    fontWeight: 500
                }
            }
        },
        tooltip: {
            shared: !0,
            intersect: !1,
            y: {
                formatter: function (e) {
                    return void 0 !== e ? e.toFixed(0) : e
                }
            }
        },
        grid: {
            borderColor: "#f1f1f1",
            padding: {
                bottom: 15
            }
        }
    }),
    options = ((chart = new ApexCharts(document.querySelector("#sales-analytics-chart"), options)).render(), {
        chart: {
            height: 130,
            type: "donut"
        },
        dataLabels: {
            enabled: !1
        },
        series: [44, 25, 19],
        labels: ["Revenue", "Expenses", "Profit"],
        colors: ["#038edc", "#dfe2e6", "#5fd0f3"],
        legend: {
            show: !1,
            position: "bottom",
            horizontalAlign: "center",
            verticalAlign: "middle",
            floating: !1,
            fontSize: "14px",
            offsetX: 0
        }
    }),
    map = ((chart = new ApexCharts(document.querySelector("#donut_chart"), options)).render(), new jsVectorMap({
        map: "world_merc",
        selector: "#world-map-markers",
        zoomOnScroll: !1,
        zoomButtons: !1,
        markers: [{
            name: "Greenland",
            coords: [72, -42]
        }, {
            name: "Canada",
            coords: [56.1304, -106.3468]
        }, {
            name: "Brazil",
            coords: [-14.235, -51.9253]
        }, {
            name: "Egypt",
            coords: [26.8206, 30.8025]
        }, {
            name: "Russia",
            coords: [61, 105]
        }, {
            name: "China",
            coords: [35.8617, 104.1954]
        }, {
            name: "United States",
            coords: [37.0902, -95.7129]
        }, {
            name: "Norway",
            coords: [60.472024, 8.468946]
        }, {
            name: "Ukraine",
            coords: [48.379433, 31.16558]
        }],
        lines: [{
            from: "Canada",
            to: "Egypt"
        }, {
            from: "Russia",
            to: "Egypt"
        }, {
            from: "Greenland",
            to: "Egypt"
        }, {
            from: "Brazil",
            to: "Egypt"
        }, {
            from: "United States",
            to: "Egypt"
        }, {
            from: "China",
            to: "Egypt"
        }, {
            from: "Norway",
            to: "Egypt"
        }, {
            from: "Ukraine",
            to: "Egypt"
        }],
        lineStyle: {
            animation: !0,
            strokeDasharray: "6 3 6"
        }
    }));
