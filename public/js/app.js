/**
 * Created by Himanshu wolf on 13/05/17.
 */

var HPD = {};

HPD.urls = {
    filterList: 'school',
    studentsEnrolled : 'school/enrollment',
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

        },
        subjectMap = {
            1: 'Hindi',
            2: 'Maths',
            3: 'EVS',
            4: 'English',
            5: 'SST',
            6: 'Science'
        }, gradeColors = {
            A : "#76FF03",
            B: "#00C853",
            C: "#ffff00",
            D: "#ee7810",
            E: "#e85656"
        }


    var createPieChart = function(id, data) {
        AmCharts.makeChart(id, {
            type: 'pie',
            startDuration: 0,
            theme: 'blur',
            addClassNames: true,
            color: '#fff',
            "colors": [
                gradeColors.A,
                gradeColors.B,
                gradeColors.C,
                gradeColors.D,
                gradeColors.E
            ],
            labelTickColor: '#fff',
            legend: {
                position: 'right',
                marginRight: 100,
                valueText: '',
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
            "balloonText": "[[title]]<br><span style='font-size:14px'>([[percents]]%)</span>",
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
        var filterEnrollQuery = function () {
            var queryString = '?', paramList;
            if (filters.district) {
                queryString = '?' + type + '=' + encodeURIComponent(val)

            }
            return queryString
        }
        $.ajax({
            method: 'GET',
            url: HPD.urls.chartRecord + filterQuery(8),
            success: function (res) {
                $('.js-access').html(res.result.studentsAccessed[0].total);

            }
        });
        $.ajax({
            method: 'GET',
            url: HPD.urls.studentsEnrolled + filterEnrollQuery(),
            success: function (res) {
                $('.js-enroll').html(res.result.student_enrolled);

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

                    for( var subject in subjects) {
                        labels.push({
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": subjectMap[subject],
                            "type": "column",
                            "color": "#fff",
                            "valueField": subject
                        })
                    }

                    for (var i in filterLevel) {
                        seriesObj = {};
                        var sum= 0, total= 0;
                        filterLevel[i].forEach(function (item) {
                            total += item.count;
                            switch(item.grade) {
                                case 'A' : sum += 5*item.count;
                                    break;
                                case 'B' : sum += 4*item.count;
                                    break;
                                case 'C' : sum += 3*item.count;
                                    break;
                                case 'D' : sum += 2*item.count;
                                    break;
                                case 'E' : sum += 1*item.count;
                                    break;
                            }
                            seriesObj[item.subject] =(sum/total).toFixed(1);
                        });
                        seriesObj.level = i;

                        series.push(seriesObj)
                    }
                    AmCharts.makeChart("subjectStack", {
                        "type": "serial",
                        "theme": "light",
                        color: '#fff',
                        "colors": [
                            gradeColors.E,
                            gradeColors.D,
                            gradeColors.C,
                            gradeColors.B,
                            gradeColors.A,

                        ],
                        "legend": {
                            "horizontalGap": 10,
                            "maxColumns": 1,
                            "position": "right",
                            "useGraphSettings": true,
                            "markerSize": 10
                        },
                        "dataProvider": series,

                        "graphs": labels,
                        "categoryField": 'level',
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left",
                            labelRotation: 45
                        },
                        valueAxes : [{
                            minimum: 0,
                            maximum: 5
                        }],
                        "export": {
                            "enabled": true
                        },
                        "chartScrollbar": {
                            "enabled": true,
                            "selectedBackgroundColor" : '#333',
                            "gridCount" : 5
                        }

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
                    for( var class_code in classes) {
                        labels.push({
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Class " + class_code,
                            "type": "column",
                            "color": "#fff",
                            "valueField": class_code
                        })
                    }
                    for (var i in filterLevel) {
                        seriesObj = {};
                        var sum= 0, total= 0;
                        filterLevel[i].forEach(function (item) {
                            total += item.count;
                            switch(item.grade) {
                                case 'A' : sum += 5*item.count;
                                            break;
                                case 'B' : sum += 4*item.count;
                                    break;
                                case 'C' : sum += 3*item.count;
                                    break;
                                case 'D' : sum += 2*item.count;
                                    break;
                                case 'E' : sum += 1*item.count;
                                    break;
                            }
                            seriesObj[item.class_code] =(sum/total).toFixed(1);
                        });
                        seriesObj.level = i;

                        series.push(seriesObj)
                    }
                    AmCharts.makeChart("classStack", {
                        "type": "serial",
                        "theme": "light",
                        color: '#fff',
                        "colors": [
                            "#e85656",
                            "#ee7810",
                            "#e0e004",
                            "#90b900",
                            "#209e91"
                        ],
                        "legend": {
                            "horizontalGap": 10,
                            "maxColumns": 1,
                            "position": "right",
                            "useGraphSettings": true,
                            "markerSize": 10
                        },
                        "dataProvider": series,

                        "graphs": labels,
                        "categoryField": 'level',
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left",
                            labelRotation: 45
                        },
                        valueAxes : [{
                            minimum: 0,
                            maximum: 5
                            }],
                        "export": {
                            "enabled": true
                        },
                        "chartScrollbar": {
                            "enabled": true,
                            "selectedBackgroundColor" : '#333',
                            "gridCount" : 5
                        }

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
                    AmCharts.makeChart("gradeStack", {
                        "type": "serial",
                        "theme": "light",
                        color: '#fff',
                        "colors": [
                            gradeColors.E,
                            gradeColors.D,
                            gradeColors.C,
                            gradeColors.B,
                            gradeColors.A
                        ],
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
                                "unit" :'%',
                                "title": "Grade Distribution"
                            }
                        ],
                        "graphs": [  {
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "E",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "E"
                        },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "D",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "D"
                            },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "C",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "C"
                            },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "B",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "B"
                            },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "A",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "A"
                            }],
                        "categoryField": filterKey,
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left",
                            labelRotation: 45
                        },
                        "export": {
                            "enabled": true
                        },
                        "chartScrollbar": {
                            "enabled": true,
                            "selectedBackgroundColor" : '#333',
                            "gridCount" : 10
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
                        color: '#fff',
                        "colors": [
                            "#e85656",
                            "#ee7810",
                            "#e0e004",
                            "#90b900",
                            "#209e91"
                        ],
                        "legend": {
                            "horizontalGap": 10,
                            "maxColumns": 1,
                            "position": "right",
                            "useGraphSettings": true,
                            "markerSize": 10
                        },
                        "dataProvider": series,

                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left",
                            labelRotation: 45
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
                            "title": "Success Percentage",
                            unit: '%',
                            'minimium': 0,'maximum': 100
                            }
                        ],
                        "allLabels": [],
                        "balloon": {}
                    });


                }
            });

        /**
         * 7. Competency Category
         */
            $.ajax({
                method: 'GET',
                url: HPD.urls.chartRecord + filterQuery(5),
                success: function (res) {
                    var chartItems = res.result.competencyCategory, series = [], labels=[], categoryList = {}, gradeObj = {};

                    chartItems.forEach(function (item) {
                        gradeObj = {};
                        if (item.competency_category) {
                            categoryList[item.competency_category] =1;
                            gradeObj.category = item.competency_category;
                            gradeObj.success = Math.round(item.success / item.total * 100);
                            series.push(gradeObj)
                        }
                    });

                    AmCharts.makeChart('competencyCategory', {
                        type: 'serial',
                        theme: 'blur',
                        color: '#fff',
                        dataProvider: series,
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                title: 'Success Percentage',
                                unit: '%',
                                'minimium': 0,'maximum': 100
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
                        categoryField: 'category',
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
                url: HPD.urls.chartRecord + filterQuery(6),
                success: function (res) {


                    var chartItems = res.result.competencyDistribution, series = [], filterLevel = {}, gradeObj = {};

                    chartItems.forEach(function (item) {
                        gradeObj = {};
                        gradeObj[filterKey] = item[filterKey];
                        gradeObj.success = Math.round(item.success / item.total * 100);
                        series.push(gradeObj)
                    });

                    AmCharts.makeChart('competency', {
                        type: 'serial',
                        theme: 'blur',
                        color: '#fff',
                        dataProvider: series,
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                title: 'Success Percentage',
                                unit: '%',
                                'minimium': 0,'maximum': 100
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
                        categoryField: filterKey,
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
                            gradeObj.description = item.competency_description;
                            gradeObj.success = Math.round(item.success / item.total * 100);
                            series.push(gradeObj)
                        }
                    });

                    AmCharts.makeChart('competencyAcheivement', {
                        type: 'serial',
                        theme: 'blur',
                        color: '#fff',
                        dataProvider: series,
                        valueAxes: [
                            {
                                position: 'left',
                                title: 'Success Percentage',
                                unit: '%',
                                'minimium': 0,'maximum': 100
                            }
                        ],
                        startDuration: 1,
                        graphs: [
                            {
                                balloonText: '<b>[[description]]: [[value]]</b>',
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
                        "chartScrollbar": {
                            "enabled": true,
                            "selectedBackgroundColor" : '#333',
                            "gridCount" : 10
                        },
                        creditsPosition: 'top-right'
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
