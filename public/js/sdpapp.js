/**
 * Created by Himanshu wolf on 13/05/17.
 */

var HPD = {};

HPD.urls = {
    filterList: '/school',
    survey : '/sdp/survey'
};


(function() {

    var el = {
        $filter : $('.js-filter'),$iFilter : $('.js-iFilter'), $preLoader : $('#preloader'), $modal: $('.js-modal'), $navs : $('a.nav-link')
        }, filterList = {}, filters = {}, $scope={}, pendingCalls ={},
        filterAheadMap = {
            district : ['block', 'school_name'],
            block : ['school_name'],
            school_name : []
        }, gradeMap = {

        }, gradeColors = {
            A : "#76FF03",
            B: "#00C853",
            C: "#ffff00",
            D: "#ee7810",
            E: "#e85656"
        }, typeMap ={
            1 : 'Basic',
            2 : 'Mediocre',
            3 : 'Advanced'
        }, appliedFilter ={key: 'district'};


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
                enabled: true,
                "reviver": function(nodeObj) {
                    if (nodeObj.className === 'amcharts-pie-label'){
                        nodeObj.fill = '#333';
                    }
                },
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
        appliedFilter.type = type;
        appliedFilter.value = $el.val();

        pendingCalls.filter = $.ajax({
            method: 'GET',
            url : HPD.urls.filterList + '?' + type +'=' +encodeURIComponent($el.val()),
            success: function(res) {
                var key = Object.keys(res.result)[0];
                appliedFilter.key = key
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
                var iQuery = '&';
                $.each(el.$iFilter, function(key, item) {
                    if($(item).val()){
                        iQuery += $(item).data('type') +'='+ $(item).val() + '&'
                    }
                });
                chartInit(key, type, $el.val(), iQuery);
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
    var chartInit = function(filterKey, type, val, iQuery) {
        $('.js-loader').show();

        var filterQuery = function (index, isCompetency) {
            var queryString = '?', paramList;
            if (filters.district) {
                queryString = '?' + type + '=' + encodeURIComponent(val) +'&graph' + '=' + index;

            } else {
                queryString = '?graph' + '=' + index;
            }
            if(!isCompetency){
                queryString += iQuery;
            }
            return queryString;
        }
        var filterCQuery = function (index, isCompetency) {
            var queryString = '?', paramList;
            if (filters.district) {
                queryString = '?' + type + '=' + encodeURIComponent(val) +'&graph' + '=' + index;

            } else {
                queryString = '?graph' + '=' + index + '&';
            }
            $.each(el.$iFilter, function(key, item) {
                if($(item).data('type')!='sex' && $(item).data('type')!='category' && $(item).val()){
                    queryString += $(item).data('type') +'='+ $(item).val() + '&'
                }
            });
            return queryString;
        }
        var filterEnrollQuery = function () {
            var queryString = '?', paramList;
            if (filters.district) {
                queryString = '?' + type + '=' + encodeURIComponent(val)

            }
            $.each(el.$iFilter, function(key, item) {
                if(($(item).data('type')=='summer_winter' || $(item).data('type')=='class_code') && $(item).val()){
                    queryString += $(item).data('type') +'='+ $(item).val() + '&'
                }
            });
            return queryString
        }

        //pendingCalls.gradePie = $.ajax({
        //    method: 'GET',
        //    url: HPD.urls.survey + filterQuery(0),
        //    success: function (res) {
        //        var chartItems = res.result.gradePie;
        //
        //        if(chartItems.length) {
        //            createPieChart('gradePie', chartItems);
        //        } else {
        //            $('#gradePie').html('<div class="text-center">No Data</div>')
        //        }
        //        $('.js-gradePie.js-loader').hide();
        //    }, error: function() {
        //        $('#gradePie').html('<div class="text-center">Something Went Wrong</div>')
        //        $('.js-gradePie.js-loader').hide();
        //    }
        //    });
        pendingCalls.subjectStack = $.ajax({
                method: 'GET',
                url: HPD.urls.survey + filterQuery(1),
                success: function (res) {
                    var pieData = {}, series = [], sum = 0, gradeMap = {},
                        chartItems = res.result.complete, labels = [];

                    var subjects = {}, filterLevel = {}, filterLevelItems = {}, seriesObj = {}, subjectObject = {};
                    if(chartItems.length) {
                        chartItems.forEach(function (item) {
                            gradeObj = {};
                            gradeObj[filterKey] = item[filterKey];
                            gradeObj.size = item.size/item.size*100;
                            series.push(gradeObj)
                        });

                        AmCharts.makeChart('sdpstatus', {
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
                                    valueField: 'size'
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
                                enabled: true,
                                "reviver": function(nodeObj) {
                                    if (nodeObj.className === 'amcharts-axis-label'){
                                        nodeObj.fill = '#333';
                                    }
                                },
                            },
                            creditsPosition: 'top-right'
                        });
                    } else {
                        $('#subjectStack').html('<div class="text-center">No Data</div>')
                    }
                    $('.js-subjectStack.js-loader').hide();

                    pieData = {}; series = []; sum = 0;
                        chartItems = res.result.school_type; labels = [];

                     subjects = {}, filterLevel = {}, filterLevelItems = {}, seriesObj = {}, subjectObject = {};
                    var grades ={}, gradeObj = {};

                    if(chartItems.length) {
                        chartItems.forEach(function (item) {
                            if (filterLevel[item[filterKey]]) {
                                filterLevel[item[filterKey]].push(item)
                            } else {
                                filterLevel[item[filterKey]] = [item];
                            }
                        });
                        for (var i in filterLevel) {
                            total = 0;
                            grades = {"केवल प्राथमिक । Primary only (Class 1-)5": 0, "केवल उच्च प्राथमिक । Upper Primary only (Class 6-8)": 0, "उच्च प्राथमिक एवं माध्यमिक या उच्च माध्यमिक । Upper Primary + Secondary/ Senior Secondary (Class 6-10 OR Class 6-12)": 0}
                            filterLevel[i].forEach(function (item) {
                                grades[item._id] = item.size;
                            });
                            gradeObj = grades;
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
                                gradeColors.C
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
                                    "unit": '%',
                                    "title": "Grade Distribution"
                                }
                            ],
                            "graphs": [{
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "P",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "केवल प्राथमिक । Primary only (Class 1-5)"
                            },
                                {
                                    "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                    "fillAlphas": 0.8,
                                    "labelText": "[[value]]",
                                    "lineAlpha": 0.3,
                                    "title": "UP",
                                    "type": "column",
                                    "color": "#000000",
                                    "valueField": "केवल उच्च प्राथमिक । Upper Primary only (Class 6-8)"
                                },
                                {
                                    "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                    "fillAlphas": 0.8,
                                    "labelText": "[[value]]",
                                    "lineAlpha": 0.3,
                                    "title": "UP+S",
                                    "type": "column",
                                    "color": "#000000",
                                    "valueField": "उच्च प्राथमिक एवं माध्यमिक या उच्च माध्यमिक । Upper Primary + Secondary/ Senior Secondary (Class 6-10 OR Class 6-12)"
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
                                "enabled": true,
                                "reviver": function (nodeObj) {
                                    if (nodeObj.className === 'amcharts-axis-label') {
                                        nodeObj.fill = '#333';
                                    }
                                }
                            },
                            "chartScrollbar": {
                                "enabled": true,
                                "selectedBackgroundColor": '#333',
                                "gridCount": 4
                            }

                        });
                    } else {
                        $('#gradeStack').html('<div class="text-center">No Data</div>')
                    }
                    $('.js-gradeStack.js-loader').hide();

                    var resource_1 = res.result.resource_584;
                    var resource_2 = res.result.resource_587;
                    var resource_3 = res.result.resource_588;

                    var labels = [], series = [], filterLevel = {}, filterLevelItems = {}, seriesObj = {}, levels = ['Human', 'Physical', 'Financial Resource'];
                    var classes = {}, classObject = {};
                    if(resource_1.length && resource_2.length && resource_3.length) {
                        resource_1.forEach(function (item) {
                            item.resource = levels[0]
                        });
                        resource_2.forEach(function (item) {
                            item.resource = levels[1]
                        });
                        resource_3.forEach(function (item) {
                            item.resource = levels[2]
                        });
                        chartItems = resource_1.concat(resource_2).concat(resource_3)

                        chartItems.forEach(function (item) {
                            if (filterLevel[item[filterKey]]) {
                                filterLevel[item[filterKey]].push(item)
                            } else {
                                filterLevel[item[filterKey]] = [item];
                            }
                        });
                        for (var i=0;i< levels.length;i++) {
                            labels.push({
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "",
                                "lineAlpha": 0.3,
                                "title": levels[i],
                                "type": "column",
                                "color": "#fff",
                                "valueField": levels[i]
                            })
                        }
                        for (var i in filterLevel) {
                            seriesObj = {};
                            var sum = 0, total = 0, ctr=0;
                            filterLevel[i].forEach(function (item) {
                                total += item.size;
                                switch (item.resource) {
                                    case levels[0] :
                                        sum += 1 * item.size;
                                        break;
                                    case levels[1] :
                                        sum += 1 * item.size;
                                        break;
                                    case levels[2] :
                                        sum += 1 * item.size;
                                        break;
                                }
                                seriesObj[item.resource] = (sum / total)*100;

                            });
                            seriesObj.level = i;

                            series.push(seriesObj)
                        }
                        AmCharts.makeChart("resourceStack", {
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
                            valueAxes: [{
                                minimum: 0,
                                maximum: 5
                            }],
                            "export": {
                                "enabled": true,
                                "reviver": function (nodeObj) {
                                    if (nodeObj.className === 'amcharts-axis-label') {
                                        nodeObj.fill = '#333';
                                    }
                                },
                            },
                            "chartScrollbar": {
                                "enabled": true,
                                "selectedBackgroundColor": '#333',
                                "gridCount": 5
                            }

                        });
                    } else {
                        $('#resourceStack').html('<div class="text-center">No Data</div>')
                    }
                    $('.js-resourceStack.js-loader').hide();

                }, error: function() {
                $('#subjectStack').html('<div class="text-center">Something Went Wrong</div>')
                $('.js-subjectStack.js-loader').hide();

                var chartItems = res.result.target;

                if(chartItems.length) {
                    AmCharts.makeChart("targetStatus", {
                        "type": "serial",
                        "theme": "light",
                        color: '#fff',
                        "colors": [
                            gradeColors.E,
                            gradeColors.D,
                            gradeColors.C
                        ],
                        "legend": {
                            "horizontalGap": 10,
                            "maxColumns": 1,
                            "position": "right",
                            "useGraphSettings": true,
                            "markerSize": 10
                        },
                        "dataProvider": chartItems,
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "stackType": "100%",
                                "unit": '%',
                                "title": "Grade Distribution"
                            }
                        ],
                        "graphs": [{
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Yes",
                            "type": "column",
                            "color": "#000000",
                            "valueField": "yes_count)"
                        },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "No",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "no_count"
                            },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Partial",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "partial_count"
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
                            "enabled": true,
                            "reviver": function (nodeObj) {
                                if (nodeObj.className === 'amcharts-axis-label') {
                                    nodeObj.fill = '#333';
                                }
                            }
                        },
                        "chartScrollbar": {
                            "enabled": true,
                            "selectedBackgroundColor": '#333',
                            "gridCount": 4
                        }

                    });
                } else {
                    $('#targetStatus').html('<div class="text-center">No Data</div>')
                }
                $('.js-targetStatus.js-loader').hide();
            }
            });

        pendingCalls.classStack = $.ajax({
                method: 'GET',
                url: HPD.urls.survey + filterQuery(2),
                success: function (res) {


                }, error: function() {
                $('#classStack').html('<div class="text-center">Something Went Wrong</div>')
                $('.js-resourceStack.js-loader').hide();
            }
            });

        /**
         * 7. Competency Category
         */
        pendingCalls.competencyCategory = $.ajax({
                method: 'GET',
                url: HPD.urls.survey + filterCQuery(1, true),
                success: function (res) {

                    var targetMap = {
                        '11356': 'Community Participation',
                        '11357':'Community Participation',
                        '11358':'Community Participation',
                        11361: 'Teacher Performance',
                        11362: 'Teacher Performance',
                        11363: 'Teacher Performance',
                        11318: 'Teacher Performance',
                        11319: 'Teacher Performance',
                        11320: 'School Management',
                        11321: 'School Management',
                        11366: 'Learning Levels',
                        11367: 'Learning Levels',
                        11368: 'Learning Levels',
                        15171: 'School Management',
                        15172: 'School Management'
                    }

                    var chartItems = res.result.target_status, series = [], labels=[], categoryList = {}, gradeObj = {};

                    if(chartItems.length){
                        chartItems.forEach(function (item) {
                            gradeObj = {};
                            item.target = targetMap[item.status] || 'Other'
                        });
                        series = chartItems

                        AmCharts.makeChart("targetStatusCategory", {
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
                                "valueAxes": [{
                                    "stackType": "regular",
                                    "axisAlpha": 0.5,
                                    "gridAlpha": 0
                                }],
                                "graphs": [{
                                    "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                                    "fillAlphas": 0.8,
                                    "labelText": "[[value]]",
                                    "lineAlpha": 0.3,
                                    "title": "Yes",
                                    "type": "column",
                                    "color": "#000000",
                                    "valueField": "yes_count"
                                }, {
                                    "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                                    "fillAlphas": 0.8,
                                    "labelText": "[[value]]",
                                    "lineAlpha": 0.3,
                                    "title": "No",
                                    "type": "column",
                                    "color": "#000000",
                                    "valueField": "no_count"
                                }, {
                                    "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                                    "fillAlphas": 0.8,
                                    "labelText": "[[value]]",
                                    "lineAlpha": 0.3,
                                    "title": "Partial",
                                    "type": "column",
                                    "color": "#000000",
                                    "valueField": "partial_count"
                                }],
                                "rotate": true,
                                "categoryField": "target",
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
                    } else {
                        $('#targetStatusCategory').html('<div class="text-center">No Data</div>')
                    }
                    $('.js-targetStatusCategory.js-loader').hide();
                }, error: function() {
            $('#targetStatusCategory').html('<div class="text-center">Something Went Wrong</div>')
            $('.js-targetStatusCategory.js-loader').hide();
        }
            }); // end of ajax call

        pendingCalls.competencyDistribution = $.ajax({
                method: 'GET',
                url: HPD.urls.survey + filterCQuery(2, true),
                success: function (res) {

                    var chartItems = res.result.competencyDistribution, series = [], filterLevel = {}, gradeObj = {};
                    if(chartItems.length) {

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
                                    'minimium': 0, 'maximum': 100
                                }
                            ],
                            startDuration: 1,
                            graphs: [
                                {
                                    balloonText: '<b>[[category]]: [[value]]%</b>',
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
                                enabled: true,
                                "reviver": function (nodeObj) {
                                    if (nodeObj.className === 'amcharts-axis-label') {
                                        nodeObj.fill = '#333';
                                    }
                                },
                            },
                            creditsPosition: 'top-right'
                        });
                    } else {
                        $('#competency').html('<div class="text-center">No Data</div>')
                    }
                    $('.js-competency.js-loader').hide();
                }, error: function() {
                $('#competency').html('<div class="text-center">Something Went Wrong</div>')
                $('.js-competency.js-loader').hide();
            }
            });
//----------------------------------------------------------------------------------------------------------------------

    }
    el.$filter.on('change', function() {
        for(var key in pendingCalls){
            pendingCalls[key].abort();
        }
        loadFilters($(this));
    });
    el.$iFilter.on('change', function() {
        var iQuery = '&';
        $.each(el.$iFilter, function(key, item) {
            if($(item).val()){
                iQuery += $(item).data('type') +'='+ $(item).val() + '&'
            }
        });
        for(var key in pendingCalls){
            pendingCalls[key].abort();
        }
        chartInit(appliedFilter.key, appliedFilter.type, appliedFilter.value, iQuery)
    });
    el.$navs.on('click', function() {
        $('.nav-item').toggleClass('active');
        $('.tab-pane').toggleClass('active');
    })
    $('.js-close').on('click', function() {
        el.$modal.hide();
        el.$modal.removeClass('in');
    })



    var init = function() {
        pendingCalls.filter = $.ajax({
            method: 'GET',
            url : HPD.urls.filterList,
            success: function(res) {
                var key = Object.keys(res.result)[0];
                filterList[key] = res.result[key];
                $('.js-filter[data-type="district"]').html(createOptions(filterList[key],'district'))
                console.log(filterList)
            }
        })
        chartInit('district', '','','');

    }
    init();
})()
