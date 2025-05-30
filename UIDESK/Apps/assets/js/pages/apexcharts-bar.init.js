var options = {
    chart: {
        height: 350,
        type: "bar",
        toolbar: {
            show: !1
        }
    },
    plotOptions: {
        bar: {
            horizontal: !0
        }
    },
    dataLabels: {
        enabled: !1
    },
    series: [{
        data: [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365]
    }],
    colors: ["#51d28c"],
    grid: {
        borderColor: "#f1f1f1"
    },
    xaxis: {
        categories: ["South Korea", "Canada", "United Kingdom", "Netherlands", "Italy", "France", "Japan", "United States", "China", "Germany"]
    }
},
    chart = new ApexCharts(document.querySelector("#bar_chart"), options),
    options = (chart.render(), {
        series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
        chart: {
            type: "bar",
            height: 350,
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                barHeight: "100%",
                distributed: !0,
                horizontal: false,
                dataLabels: {
                    position: "bottom"
                }
            }
        },
        colors: ["#5fd0f3", "#495057", "#e83e8c", "#13d8aa", "#f34e4e", "#2b908f", "#f9a3a4", "#564ab1", "#f1734f", "#038edc"],
        dataLabels: {
            enabled: !0,
            textAnchor: "start",
            style: {
                colors: ["#fff"]
            },
            formatter: function (e, t) {
                return t.w.globals.labels[t.dataPointIndex] + ":  " + e
            },
            offsetX: 0,
            dropShadow: {
                enabled: !1
            }
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        xaxis: {
            categories: ["South Korea", "Canada", "United Kingdom", "Netherlands", "Italy", "France", "Japan", "United States", "China", "India"]
        },
        yaxis: {
            labels: {
                show: !1
            }
        },
        title: {
            text: "Custom DataLabels",
            align: "center",
            floating: !0,
            style: {
                fontWeight: 600
            }
        },
        subtitle: {
            text: "Category Names as DataLabels inside bars",
            align: "center"
        },
        tooltip: {
            theme: "dark",
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function () {
                        return ""
                    }
                }
            }
        }
    }),
    options = ((chart = new ApexCharts(document.querySelector("#custom_datalabels_bar"), options)).render(), {
        series: [{
            name: "Marine Sprite",
            data: [44, 55, 41, 37, 22, 43, 21]
        }, {
            name: "Striking Calf",
            data: [53, 32, 33, 52, 13, 43, 32]
        }, {
            name: "Tank Picture",
            data: [12, 17, 11, 9, 15, 11, 20]
        }, {
            name: "Bucket Slope",
            data: [9, 7, 5, 8, 6, 9, 4]
        }, {
            name: "Reborn Kid",
            data: [25, 12, 19, 32, 25, 24, 10]
        }],
        chart: {
            type: "bar",
            height: 350,
            stacked: !0,
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                horizontal: !0
            }
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        title: {
            text: "Fiction Books Sales",
            style: {
                fontWeight: 600
            }
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            labels: {
                formatter: function (e) {
                    return e + "K"
                }
            }
        },
        yaxis: {
            title: {
                text: void 0
            }
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return e + "K"
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40
        },
        colors: ["#038edc", "#51d28c", "#f7cc53", "#e83e8c", "#564ab1"]
    }),
    options = ((chart = new ApexCharts(document.querySelector("#stacked_bar"), options)).render(), {
        series: [{
            name: "Marine Sprite",
            data: [44, 55, 41, 37, 22, 43, 21]
        }, {
            name: "Striking Calf",
            data: [53, 32, 33, 52, 13, 43, 32]
        }, {
            name: "Tank Picture",
            data: [12, 17, 11, 9, 15, 11, 20]
        }, {
            name: "Bucket Slope",
            data: [9, 7, 5, 8, 6, 9, 4]
        }, {
            name: "Reborn Kid",
            data: [25, 12, 19, 32, 25, 24, 10]
        }],
        chart: {
            type: "bar",
            height: 350,
            stacked: !0,
            stackType: "100%",
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                horizontal: !0
            }
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        title: {
            text: "100% Stacked Bar",
            style: {
                fontWeight: 600
            }
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014]
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return e + "K"
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40
        },
        colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e", "#564ab1"]
    }),
    options = ((chart = new ApexCharts(document.querySelector("#stacked_bar_100"), options)).render(), {
        series: [{
            name: "Males",
            data: [.4, .65, .76, .88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5, 3.9, 3.5, 3]
        }, {
            name: "Females",
            data: [-.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8]
        }],
        chart: {
            type: "bar",
            height: 360,
            stacked: !0,
            toolbar: {
                show: !1
            }
        },
        colors: ["#f34e4e", "#038edc"],
        plotOptions: {
            bar: {
                horizontal: !0,
                barHeight: "80%"
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        grid: {
            xaxis: {
                lines: {
                    show: !1
                }
            }
        },
        yaxis: {
            min: -5,
            max: 5,
            title: {
                text: "Age",
                style: {
                    fontWeight: 600
                }
            }
        },
        tooltip: {
            shared: !1,
            x: {
                formatter: function (e) {
                    return e
                }
            },
            y: {
                formatter: function (e) {
                    return Math.abs(e) + "%"
                }
            }
        },
        title: {
            text: "Mauritius population pyramid 2011",
            style: {
                fontWeight: 600
            }
        },
        xaxis: {
            categories: ["85+", "80-84", "75-79", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49", "40-44", "35-39", "30-34", "25-29", "20-24", "15-19", "10-14", "5-9", "0-4"],
            title: {
                text: "Percent"
            },
            labels: {
                formatter: function (e) {
                    return Math.abs(Math.round(e)) + "%"
                }
            }
        }
    }),
    options = ((chart = new ApexCharts(document.querySelector("#negative_bars"), options)).render(), {
        series: [{
            name: "Jumlah Pengunjung",
            data: [{
                x: "1",
                y: 12,
            }, {
                x: "2",
                y: 44,
            },
            {
                x: "3",
                y: 44,
            }, {
                x: "4",
                y: 54,
            }, {
                x: "5",
                y: 66,
            }, {
                x: "6",
                y: 85,
            }, {
                x: "7",
                y: 81,
            },
            {
                x: "8",
                y: 78,
            },
            {
                x: "9",
                y: 67,
            },
            {
                x: "10",
                y: 55,
            },
            {
                x: "11",
                y: 59,
            },
            {
                x: "12",
                y: 55,
            },
            {
                x: "13",
                y: 49,
            },
            {
                x: "14",
                y: 62,
            },
            {
                x: "15",
                y: 57,
            },
            {
                x: "16",
                y: 88,
            },
            {
                x: "17",
                y: 85,
            },
            {
                x: "18",
                y: 35,
            },
            {
                x: "19",
                y: 43,
            },
            {
                x: "20",
                y: 59,
            },
            {
                x: "21",
                y: 75,
            },
            {
                x: "22",
                y: 56,
            },
            {
                x: "23",
                y: 42,
            },
            {
                x: "24",
                y: 65,
            },
            {
                x: "25",
                y: 81,
            },
            {
                x: "26",
                y: 78,
            },
            {
                x: "27",
                y: 81,
            },
            {
                x: "28",
                y: 54,
            }, {
                x: "29",
                y: 93,
            },
            {
                x: "30",
                y: 81,
            },
            {
                x: "31",
                y: 67,
            }]
        }],
        chart: {
            height: 270,
            type: "bar",
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
            }
        },
        colors: ["#51d28c"],
        dataLabels: {
            formatter: function (e, t) {
                t.w.config.series[t.seriesIndex].data[t.dataPointIndex].goals;
                return e
            }
        },
        legend: {
            show: !0,
            showForSingleSeries: !0,
            customLegendItems: ["Jumlah Pengunjung"],
            markers: {
                fillColors: ["#00E396", "#775DD0"]
            }
        }
    }),
    options = ((chart = new ApexCharts(document.querySelector("#bar_markers"), options)).render(), {
        series: [{
            data: [400, 430, 448, 470, 540, 580, 690]
        }],
        chart: {
            type: "bar",
            height: 350,
            toolbar: {
                show: !1
            }
        },
        annotations: {
            xaxis: [{
                x: 500,
                borderColor: "#038edc",
                label: {
                    borderColor: "#038edc",
                    style: {
                        color: "#fff",
                        background: "#038edc"
                    },
                    text: "X annotation"
                }
            }],
            yaxis: [{
                y: "July",
                y2: "September",
                label: {
                    text: "Y annotation"
                }
            }]
        },
        plotOptions: {
            bar: {
                horizontal: !0
            }
        },
        dataLabels: {
            enabled: !0
        },
        xaxis: {
            categories: ["June", "July", "August", "September", "October", "November", "December"]
        },
        grid: {
            xaxis: {
                lines: {
                    show: !0
                }
            }
        },
        yaxis: {
            reversed: !0,
            axisTicks: {
                show: !0
            }
        }
    }),
    options = ((chart = new ApexCharts(document.querySelector("#reversed_bars"), options)).render(), {
        series: [{
            name: "Marine Sprite",
            data: [44, 55, 41, 37, 22, 43, 21]
        }, {
            name: "Striking Calf",
            data: [53, 32, 33, 52, 13, 43, 32]
        }, {
            name: "Tank Picture",
            data: [12, 17, 11, 9, 15, 11, 20]
        }, {
            name: "Bucket Slope",
            data: [9, 7, 5, 8, 6, 9, 4]
        }],
        chart: {
            type: "bar",
            height: 350,
            stacked: !0,
            dropShadow: {
                enabled: !0,
                blur: 1,
                opacity: .25
            },
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                horizontal: !0,
                barHeight: "60%"
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            width: 2
        },
        title: {
            text: "Compare Sales Strategy",
            style: {
                fontWeight: 600
            }
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014]
        },
        yaxis: {
            title: {
                text: void 0
            }
        },
        tooltip: {
            shared: !1,
            y: {
                formatter: function (e) {
                    return e + "K"
                }
            }
        },
        fill: {
            type: "pattern",
            opacity: 1,
            pattern: {
                style: ["circles", "slantedLines", "verticalLines", "horizontalLines"]
            }
        },
        states: {
            hover: {
                filter: "none"
            }
        },
        legend: {
            position: "right",
            offsetY: 40
        },
        colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e"]
    }),
    options = ((chart = new ApexCharts(document.querySelector("#patterned_bars"), options)).render(), {
        series: [{
            data: [44, 55, 41, 64, 22, 43, 21]
        }, {
            data: [53, 32, 33, 52, 13, 44, 32]
        }],
        chart: {
            type: "bar",
            height: 410,
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                horizontal: !0,
                dataLabels: {
                    position: "top"
                }
            }
        },
        dataLabels: {
            enabled: !0,
            offsetX: -6,
            style: {
                fontSize: "12px",
                colors: ["#fff"]
            }
        },
        stroke: {
            show: !0,
            width: 1,
            colors: ["#fff"]
        },
        tooltip: {
            shared: !0,
            intersect: !1
        },
        xaxis: {
            categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007]
        },
        color: ["#51d28c", "#038edc"]
    }),
    options = ((chart = new ApexCharts(document.querySelector("#grouped_bar"), options)).render(), {
        series: [{
            name: "coins",
            data: [2, 4, 3, 4, 3, 5, 5, 6.5, 6, 5, 4, 5, 8, 7, 7, 8, 8, 10, 9, 9, 12, 12, 11, 12, 13, 14, 16, 14, 15, 17, 19, 21]
        }],
        chart: {
            type: "bar",
            height: 410,
            animations: {
                enabled: !1
            },
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                horizontal: !0,
                barHeight: "100%"
            }
        },
        dataLabels: {
            enabled: !1
        },
        stroke: {
            colors: ["#fff"],
            width: .2
        },
        labels: Array.apply(null, {
            length: 39
        }).map(function (e, t) {
            return t + 1
        }),
        yaxis: {
            axisBorder: {
                show: !1
            },
            axisTicks: {
                show: !1
            },
            labels: {
                show: !1
            },
            title: {
                text: "Weight"
            }
        },
        grid: {
            position: "back"
        },
        title: {
            text: "Paths filled by clipped image",
            align: "right",
            offsetY: 30,
            style: {
                fontWeight: 600
            }
        },
        fill: {
            type: "image",
            opacity: .87,
            image: {
                src: ["../../assets/images/profile-bg.jpg"],
                width: 466,
                height: 406
            }
        }
    });
(chart = new ApexCharts(document.querySelector("#bar_images"), options)).render();