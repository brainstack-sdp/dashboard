/**
 * Created by Himanshu wolf on 13/05/17.
 */

var HPD = {};

HPD.urls = {
    filterList: 'school',
    chartRecord : 'student'
};


(function() {

    var el = {
        $filter : $('.js-filter'), $preLoader : $('#preloader')
        }, filterList = {}, filters = {}, $scope={},
        filterAheadMap = {
            district : ['block', 'cluster', 'school_name', 'summer_winter'],
            block : ['cluster', 'school_name', 'summer_winter'],
            cluster : ['school_name', 'summer_winter'],
            school_name : ['summer_winter'],
            summer_winter : []
        }, gradeMap = {

        }

    var createPieChart = function(id, data) {
        AmCharts.makeChart(id, {
            type: 'pie',
            startDuration: 0,
            theme: 'blur',
            addClassNames: true,
            color: '#333',
            labelTickColor: '#333',
            legend: {
                position: 'right',
                marginRight: 100,
                autoMargins: false
            },
            defs: {
                filter: [
                    {
                        id: 'shadow',
                        width: '200%',
                        height: '200%',
                        feOffset: {
                            result: 'offOut',
                            in: 'SourceAlpha',
                            dx: 0,
                            dy: 0
                        },
                        feGaussianBlur: {
                            result: 'blurOut',
                            in: 'offOut',
                            stdDeviation: 5
                        },
                        feBlend: {
                            in: 'SourceGraphic',
                            in2: 'blurOut',
                            mode: 'normal'
                        }
                    }
                ]
            },
            dataProvider: data,
            valueField: 'count',
            titleField: 'grade',
            export: {
                enabled: true
            },
            creditsPosition: 'bottom-left',

            autoMargins: false,
            marginTop: 10,
            alpha: 0.8,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            pullOutRadius: 0,
            responsive: {
                enabled: false
            }
        });
    }


    var loadFilters = function($el) {
        var type= $el.data('type');
        filters[type] = $el.val();
        //el.$preLoader.show();

        $.ajax({
            method: 'GET',
            url : HPD.urls.filterList + '?' + type +'=' +encodeURIComponent($el.val()),
            success: function(res) {
                var key = Object.keys(res.result)[0];
                filterList[key] = res.result[key];
                if(filterAheadMap[type]) {
                    filterAheadMap[type].forEach(function(item) {
                        delete filters[item];
                        $('.js-filter[data-type="'+item+'"]').html('');
                    })
                    $('.js-filter[data-type="'+key+'"]').html(createOptions(filterList[key],key))
                } else {
                    filterAheadMap.district.forEach(function(item) {
                        delete filters[item];
                        $('.js-filter[data-type="'+item+'"]').html('');
                    })
                }
                chartInit(key, type, $el.val());
            }
        });
    };

    var createOptions = function(filters, key) {
        var options = '<option value="">All</option>';
        for (var i=0;i<filters.length;i++) {
            options += '<option value="'+ filters[i][key] +'">' + filters[i][key] + '</option>'
        }
        return options;
    }
    var chartInit = function(filterKey, type, val) {

        var filterQuery = function (index) {
            var queryString = '?', paramList;
            if (filters.district) {
                queryString = '?' + type + '=' + encodeURIComponent(val) +'&graph' + '=' + index;

            } else {
                queryString = '?graph' + '=' + index;
            }
            return queryString
        }
        Morris.Grid.prototype.gridDefaults.gridLineColor = "#888";
        Morris.Grid.prototype.gridDefaults.gridTextColor = '#333';
        $.ajax({
            method: 'GET',
            url: HPD.urls.chartRecord + filterQuery(8),
            success: function (res) {
                $('.js-access').html(res.studentsAccessed);

            }
        });

        $.ajax({
            method: 'GET',
            url: HPD.urls.chartRecord + filterQuery(0),
            success: function (res) {
                var chartItems = res.result.gradePie, pieData = {}, series = [], sum = 0, gradeMap = {};
                createPieChart('gradePie', chartItems)

            }
            });
            $.ajax({
                method: 'GET',
                url: HPD.urls.chartRecord + filterQuery(1),
                success: function (res) {
                    var pieData = {}, series = [], sum = 0, gradeMap = {},
                        chartItems = res.result.subjectStack, labels = [];

                    var subjects = {}, filterLevel = {}, filterLevelItems = {}, seriesObj = {}, subjectObject = {};
                    chartItems.forEach(function (item) {
                        subjects[item.subject] = 1;
                        if (filterLevel[item[filterKey]]) {
                            filterLevel[item[filterKey]].push(item)
                        } else {
                            filterLevel[item[filterKey]] = [item];
                        }


                    });
                    for (var i in filterLevel) {
                        seriesObj = {};
                        filterLevel[i].forEach(function (item) {
                            subjectObject[item.subject] = {
                                sum: 0, total: 0, percentage: 0
                            };
                            subjectObject[item.subject].sum += item.sum;
                            subjectObject[item.subject].total += item.max_marks;
                            subjectObject[item.subject].percentage = Math.round((subjectObject[item.subject].sum / subjectObject[item.subject].total) * 100);
                            if (subjectObject[item.subject].percentage >= 80) {
                                seriesObj[item.subject] = 5
                            } else if (subjectObject[item.subject].percentage >= 65 && subjectObject[item.subject].percentage <= 79) {
                                seriesObj[item.subject] = 4
                            } else if (subjectObject[item.subject].percentage >= 50 && subjectObject[item.subject].percentage <= 64) {
                                seriesObj[item.subject] = 3
                            } else if (subjectObject[item.subject].percentage >= 35 && subjectObject[item.subject].percentage <= 49) {
                                seriesObj[item.subject] = 2
                            } else if (subjectObject[item.subject].percentage >= 34 && subjectObject[item.subject].percentage >= 0) {
                                seriesObj[item.subject] = 1
                            } else {
                            }
                        });
                        seriesObj.level = i;

                        series.push(seriesObj)
                    }
                    $('#subjectStack').empty();
                    Morris.Bar({
                        element: 'subjectStack',
                        data: series,
                        xkey: 'level',
                        ykeys: Object.keys(subjects),
                        labels: Object.keys(subjects)
                    });
                }
            });

            $.ajax({
                method: 'GET',
                url: HPD.urls.chartRecord + filterQuery(2),
                success: function (res) {

                    var chartItems = res.result.classStack, labels = [], series = [], filterLevel = {}, filterLevelItems = {}, seriesObj = {};
                    var classes = {}, classObject = {};
                    chartItems.forEach(function (item) {
                        classes[item.class_code] = 1;
                        if (filterLevel[item[filterKey]]) {
                            filterLevel[item[filterKey]].push(item)
                        } else {
                            filterLevel[item[filterKey]] = [item];
                        }


                    });
                    for (var i in filterLevel) {
                        seriesObj = {};
                        filterLevel[i].forEach(function (item) {
                            classObject[item.class_code] = {
                                sum: 0, total: 0, percentage: 0
                            };
                            classObject[item.class_code].sum += item.sum;
                            classObject[item.class_code].total += item.max_marks;
                            classObject[item.class_code].percentage = Math.round((classObject[item.class_code].sum / classObject[item.class_code].total) * 100);
                            if (classObject[item.class_code].percentage >= 80) {
                                seriesObj[item.class_code] = 5
                            } else if (classObject[item.class_code].percentage >= 65 && classObject[item.class_code].percentage <= 79) {
                                seriesObj[item.class_code] = 4
                            } else if (classObject[item.class_code].percentage >= 50 && classObject[item.class_code].percentage <= 64) {
                                seriesObj[item.class_code] = 3
                            } else if (classObject[item.class_code].percentage >= 35 && classObject[item.class_code].percentage <= 49) {
                                seriesObj[item.class_code] = 2
                            } else if (classObject[item.class_code].percentage >= 34 && classObject[item.class_code].percentage >= 0) {
                                seriesObj[item.class_code] = 1
                            } else {
                            }
                        });
                        seriesObj.level = i;

                        series.push(seriesObj)
                    }
                    $('#classStack').empty();
                    new Morris.Bar({
                        element: 'classStack',
                        data: series,
                        xkey: 'level',
                        ykeys: Object.keys(classes),
                        labels: Object.keys(classes)
                    });
                }
            });
            $.ajax({
                method: 'GET',
                url: HPD.urls.chartRecord + filterQuery(3),
                success: function (res) {

                    var chartItems = res.result.gradeStack, labels = [], series = [], filterLevel = {};
                    var gradeObj = {A: {}, B: {}, C: {}, D: {}, E: {}}, grades = {}, gradeData = [], total = 0;
                    chartItems.forEach(function (item) {
                        if (filterLevel[item[filterKey]]) {
                            filterLevel[item[filterKey]].push(item)
                        } else {
                            filterLevel[item[filterKey]] = [item];
                        }
                    });
                    for (var i in filterLevel) {
                        total = 0;
                        grades = {A: 0, B: 0, C: 0, D: 0, E: 0}
                        filterLevel[i].forEach(function (item) {
                            total += item.count;
                            grades[item.grade] = item.count;
                        });
                        gradeObj = {};

                        gradeObj.A = Math.round((grades.A * 100 || 0) / total);
                        gradeObj.B = Math.round((grades.B * 100 || 0) / total);
                        gradeObj.C = Math.round((grades.C * 100 || 0) / total);
                        gradeObj.D = Math.round((grades.D * 100 || 0) / total);
                        gradeObj.E = Math.round((grades.E * 100 || 0) / total);
                        gradeObj[filterKey] = i;
                        series.push(gradeObj)
                    }
                    //for (var i in gradeObj) {
                    //    gradeData = [];
                    //
                    //    for (var j in filterLevel) {
                    //        gradeObj[j] = filterLevel[j];
                    //        gradeData.push(gradeObj[i][j])
                    //    }
                    //    series.push(gradeData)
                    //}

                    $scope.stackedBarData = {
                        labels: Object.keys(filterLevel),
                        series: series
                    };
                    $scope.stackedBarOptions = {
                        fullWidth: false,
                        height: "300px",
                        stackBars: true,
                        isFixedWidth: false,
                        //Number - Pixel width of the bar
                        barWidth: 30,
                        axisY: {
                            labelInterpolationFnc: function (value) {
                                return (value) + '%';
                            }
                        }
                    };

                    //new Chartist.Bar('#gradeStack', $scope.stackedBarData, $scope.stackedBarOptions)
                    AmCharts.makeChart("gradeStack", {
                        "type": "serial",
                        "theme": "light",
                        "legend": {
                            "horizontalGap": 10,
                            "maxColumns": 1,
                            "position": "right",
                            "useGraphSettings": true,
                            "markerSize": 10
                        },
                        "dataProvider": series,
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "stackType": "100%",
                                "title": "Grade Distribution"
                            }
                        ],
                        "graphs": [{
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "A",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "A"
                        }, {
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "B",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "B"
                        }, {
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "C",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "C"
                        }, {
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "D",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "D"
                        }, {
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "E",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "E"
                        }],
                        "categoryField": filterKey,
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left"
                        },
                        "export": {
                            "enabled": true
                        }

                    });

                }
            });
            $.ajax({
                method: 'GET',
                url: HPD.urls.chartRecord + filterQuery(4),
                success: function (res) {
                    var chartItems = res.result.competencyType, series = [], filterLevel = {}, gradeObj = {};

                    chartItems.forEach(function (item) {
                        item.type = 'Type ' + item.type;
                        if (filterLevel[item.class_code]) {
                            filterLevel[item.class_code].push(item)
                        } else {
                            filterLevel[item.class_code] = [item];
                        }
                    });
                    for (var i in filterLevel) {
                        gradeObj = {'Type 1': 0, 'Type 2': 0, 'Type 3': 0};

                        filterLevel[i].forEach(function (item) {
                            gradeObj[item.type] = Math.round(item.success / item.total * 100);
                        });
                        gradeObj.class = 'Class ' + i;
                        series.push(gradeObj)
                    }


                    AmCharts.makeChart('competencyTrends', {
                        "type": "serial",
                        "categoryField": "class",
                        "startDuration": 1,
                        "theme": "light",
                        "categoryAxis": {
                            "gridPosition": "start"
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                "balloonText": "[[title]] of [[category]]:[[value]]",
                                "bullet": "round",
                                "id": "AmGraph-1",
                                "title": "Type 1",
                                "valueField": "Type 1"
                            },
                            {
                                "balloonText": "[[title]] of [[category]]:[[value]]",
                                "bullet": "square",
                                "id": "AmGraph-2",
                                "title": "Type 2",
                                "valueField": "Type 2"
                            },
                            {
                                "balloonText": "[[title]] of [[category]]:[[value]]",
                                "bullet": "square",
                                "id": "AmGraph-3",
                                "title": "Type 3",
                                "valueField": "Type 3"
                            },
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "title": "Success Percentage"
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "legend": {
                            "enabled": true,
                            "useGraphSettings": true
                        },
                        "dataProvider": series
                    });

                }
            });
            $.ajax({
                method: 'GET',
                url: HPD.urls.chartRecord + filterQuery(5),
                success: function (res) {
                    var chartItems = res.result.competencyCategory, series = [], filterLevel = {}, gradeObj = {};

                    chartItems.forEach(function (item) {
                        gradeObj = {};
                        if (item.competency_category) {
                            gradeObj.category = item.competency_category;
                            gradeObj.success = Math.round(item.success / item.total * 100);
                            series.push(gradeObj)
                        }
                    });


                    AmCharts.makeChart('competencyCategory', {
                        "type": "serial",
                        "categoryField": "category",
                        "startDuration": 1,
                        "theme": "light",
                        "categoryAxis": {
                            "gridPosition": "start",
                            labelRotation: 45
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                "balloonText": "[[category]]:[[value]]",
                                "bullet": "round",
                                "id": "AmGraph-1",
                                "title": "",
                                "valueField": "success"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "title": "Success Percentage"
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "legend": {
                            "enabled": true,
                            "useGraphSettings": true
                        },
                        "dataProvider": series
                    });
                }
            });
            $.ajax({
                method: 'GET',
                url: HPD.urls.chartRecord + filterQuery(6),
                success: function (res) {


                    var chartItems = res.result.competencyDistribution, series = [], filterLevel = {}, gradeObj = {};

                    chartItems.forEach(function (item) {
                        gradeObj = {};
                        if (item.district) {
                            gradeObj.district = item.district;
                            gradeObj.success = Math.round(item.success / item.total * 100);
                            series.push(gradeObj)
                        }
                    });

                    AmCharts.makeChart('competency', {
                        type: 'serial',
                        theme: 'blur',
                        color: '#333',
                        dataProvider: series,
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                title: 'Success Percentage',
                                color: '#333'
                            }
                        ],
                        startDuration: 1,
                        graphs: [
                            {
                                balloonText: '<b>[[category]]: [[value]]</b>',
                                fillColorsField: 'color',
                                fillAlphas: 0.9,
                                lineAlpha: 0.2,
                                type: 'column',
                                valueField: 'success'
                            }
                        ],
                        chartCursor: {
                            categoryBalloonEnabled: false,
                            cursorAlpha: 0,
                            zoomable: false
                        },
                        categoryField: 'district',
                        categoryAxis: {
                            gridPosition: 'start',
                            labelRotation: 45,
                            gridAlpha: 0.5,
                            gridColor: '#f0fef1'
                        },
                        export: {
                            enabled: true
                        },
                        creditsPosition: 'top-right'
                    });
                }
            });
            $.ajax({
                method: 'GET',
                url: HPD.urls.chartRecord + filterQuery(7),
                success: function (res) {

                    var chartItems = res.result.competencyAnalysis, series = [], filterLevel = {}, gradeObj = {};

                    chartItems.forEach(function (item) {
                        gradeObj = {};
                        if (item.competency) {
                            gradeObj.competency = item.competency;
                            gradeObj.success = Math.round(item.success / item.total * 100);
                            series.push(gradeObj)
                        }
                    });

                    AmCharts.makeChart('competencyAcheivement', {
                        type: 'serial',
                        theme: 'blur',
                        color: '#333',
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                title: 'Success Percentage',
                                gridAlpha: 0.5,
                                color: '#f0fef1'
                            }
                        ],
                        startDuration: 1,
                        graphs: [
                            {
                                balloonText: '<b>[[category]]: [[value]]</b>',
                                fillColorsField: 'color',
                                fillAlphas: 0.7,
                                lineAlpha: 0.2,
                                type: 'column',
                                valueField: 'success'
                            }
                        ],
                        chartCursor: {
                            categoryBalloonEnabled: false,
                            cursorAlpha: 0,
                            zoomable: false
                        },
                        categoryField: 'competency',
                        categoryAxis: {
                            gridPosition: 'start',
                            labelRotation: 45,
                            gridAlpha: 0.5,
                            gridColor: '#f0fef1'
                        },
                        export: {
                            enabled: true
                        },
                        creditsPosition: 'top-right',
                        "dataProvider": series
                    });
                }
            });

    }
    el.$filter.on('change', function() {
        loadFilters($(this));
    })

    var init = function() {
        $.ajax({
            method: 'GET',
            url : HPD.urls.filterList,
            success: function(res) {
                var key = Object.keys(res.result)[0];
                filterList[key] = res.result[key];
                $('.js-filter[data-type="district"]').html(createOptions(filterList[key],'district'))
                console.log(filterList)
            }
        })
        chartInit('district');

    }
    init();
})()
