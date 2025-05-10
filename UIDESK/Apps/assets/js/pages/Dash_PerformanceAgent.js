var options5 = {
    series: [{
        data: [100, 20, 15, 40, 20, 50, 70, 60, 90, 70, 110]
    }],
    chart: {
        type: "area",
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
    chart6 = new ApexCharts(document.querySelector("#sparkline-quality"), options5),
    options = (chart6.render(), {
       
    });


var optionsProductivity = {
    series: [{
        data: [100, 50, 65, 80, 120, 50, 70, 60, 90, 70, 110]
    }],
    chart: {
        type: "area",
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
    chartProductivity = new ApexCharts(document.querySelector("#sparkline-discipline"), optionsProductivity),
    options = (chartProductivity.render(), {

    });

var optionsProductivity = {
    series: [{
        data: [100, 20, 15, 40, 20, 50, 70, 60, 90, 70, 110]
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
    chartProductivity = new ApexCharts(document.querySelector("#sparkline-productivity"), optionsProductivity),
    options = (chartProductivity.render(), {

    });

var optionsPerformance = {
    series: [{
        data: [100, 20, 15, 40, 20, 50, 70, 60, 90, 70, 110]
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
    chartProductivity = new ApexCharts(document.querySelector("#sparkline-performance"), optionsPerformance),
    options = (chartProductivity.render(), {

    });

