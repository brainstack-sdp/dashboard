/**
 * Created by Himanshu wolf on 13/05/17.
 */

var HPD = {};

HPD.urls = {
    filterList: '/school/sdp',
    schoolCount: '/school/sdp',
    survey : '/sdp/survey',
    schoolPdf : '/sdp/survey/pdf',
    surveyTable : '/sdp/survey/table'
};


(function() {

    var el = {
        $filter : $('.js-filter'),$iFilter : $('.js-iFilter'), $preLoader : $('#preloader'), $modal: $('.js-modal'), $navs : $('a.nav-link')
        }, filterList = {}, filters = {}, $scope={}, pendingCalls ={},
        filterAheadMap = {
            district : ['block', 'school_name'],
            block : ['school_name'],
            school_name : []
        },
        filterParentMap = {
            district : ['district'],
            block : ['district'],
            school_name : ['block']
        }, gradeMap = {

        }, gradeColors = {
            A : "#CA3630",
            B: "#FA7413",
            C: "#FFD159",
            D: "#5FB6C7",
            E: "#C9C77C"
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

        if(appliedFilter.value){
            $.ajax({
                method: 'GET',
                url : HPD.urls.filterList + '?' + type +'=' +encodeURIComponent($el.val()),
                success: function(res) {
                    var key = Object.keys(res.result)[0];
                    appliedFilter.key = key
                    filterList[key] = res.result[key];
                    if(type!="school_name") {
                        if (filterAheadMap[type]) {
                            filterAheadMap[type].forEach(function (item) {
                                delete filters[item];
                                $('.js-filter[data-type="' + item + '"]').html('');
                            })
                            $('.js-filter[data-type="' + key + '"]').html(createOptions(filterList[key], key))
                        } else {
                            filterAheadMap.district.forEach(function (item) {
                                delete filters[item];
                                $('.js-filter[data-type="' + item + '"]').html('');
                            })
                        }
                    }
                    if(key == "school_name"){
                        $('.js-schools').html(createPdfList(filterList[key], key))
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
        }



        if(type=="school_name" && appliedFilter.value) {
            $.ajax({
                method: 'GET',
                url : HPD.urls.surveyTable + '?' + type +'=' +encodeURIComponent($el.val()),
                success: function(res) {
                    var table = res.result.table[0];
                    table.target_type = table.target_type.split('*');
                    table.sa1 = table.sa1.split('*');
                    table.sa2 = table.sa2.split('*');
                    table.smc = table.smc.split('*');
                    table.status = table.status.split('*');
                    table.methods = table.methods.split('*');

                    var html='';

                    for(var i=0; i< table.target_type.length; i++){
                        var targetCat = table.target_type[i].split(':');
                        html+= '<tr class="js-row">';
                        html+= '<td>' + table.school+  '</td>'
                        html+= '<td>' + targetCat[0]+  '</td>'
                        html+= '<td>' + targetCat[1].replace(new RegExp("\\+","g"),' ')+  '</td>'
                        html+= '<td>' + table.sa1[i]+  '</td>'
                        html+= '<td>' + table.sa2[i]+  '</td>'
                        html+= '<td>' + table.smc[i]+  '</td>'
                        html+= '<td>' + table.methods[i]+  '</td>'
                        html+= '<td>' + table.status[i]+  '</td>'
                        html+= '<td>' + table.requirememt.replace(new RegExp("\\*","g"),'<br>')+  '</td>'
                        html +='</tr>'
                    }
                    $('.js-tableBar').show();
                    $('.js-row').remove();
                    $('.js-table').append(html)

                }
            });
        } else {
            $('.js-row').remove();
            $('.js-tableBar').hide();
        }
    };

    var createOptions = function(filters, key) {
        var options = '<option value="">All</option>';
        for (var i=0;i<filters.length;i++) {
            options += '<option value="'+ filters[i][key] +'">' + filters[i][key] + '</option>'
        }
        return options;
    }
    var createPdfList = function(filters, key) {
        var options = '';
        for (var i=0;i<filters.length;i++) {
            options += '<li class="js-schoolPdf">' + filters[i][key] + '.pdf</li>'
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
            return queryString;
        }
        var filterEnrollQuery = function () {
            var queryString = '?', paramList;
            if (filters.district) {
                queryString = '?' + type + '=' + encodeURIComponent(val)

            }
            $.each(el.$iFilter, function(key, item) {
                if(($(item).data('type')=='summer_winter') && $(item).val()){
                    queryString += $(item).data('type') +'='+ $(item).val() + '&'
                }
            });
            return queryString
        }

        pendingCalls.subjectStack =  $.when($.ajax({
                method: 'GET',
                url: HPD.urls.survey + filterQuery(1)}), $.ajax({
            method: 'GET',
            url: HPD.urls.schoolCount + filterQuery(1)}))
            .then(function (result, schoolResult) {

                var next_key = Object.keys(schoolResult[0].result)[0];
                var res = result[0], school = schoolResult[0].result[next_key];

                    var pieData = {}, series = [], sum = 0,totalSchools= 0, gradeMap = {},
                        chartItems = res.result.complete, labels = [];

                    var subjects = {}, filterLevel = {}, filterLevelItems = {}, seriesObj = {}, subjectObject = {};
                    if(chartItems.length) {
                        chartItems.forEach(function (item) {
                            gradeObj = {};
                            if(item[filterKey]){
                                if(filterKey== 'school_name'){
                                    item[filterKey]= item[filterKey].replace(/[0-9]/g, '').trim();
                                }

                                gradeObj[filterKey] = item[filterKey];
                                totalSchools = school.filter(function( obj ) {
                                    return obj[filterKey] == item[filterKey];
                                });
                                if(totalSchools.length){
                                    gradeObj.size = Math.floor((item.size/totalSchools[0].size)*100);
                                    if(gradeObj.size>100) {
                                        gradeObj.size = 100;
                                    }
                                    gradeObj.color = '#5FB6C7';
                                    series.push(gradeObj)
                                }

                            }

                        });

                        AmCharts.makeChart('sdpstatus', {
                            type: 'serial',
                            theme: 'blur',
                            color: '#333',
                            dataProvider: series,
                            valueAxes: [
                                {
                                    axisAlpha: 0,
                                    position: 'left',
                                    title: 'Percentage Completion',
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
                                gridColor: '#f0fef1',
                                title: 'Districts/Blocks/Schools',
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
                            if (filterLevel[item._id[filterKey]]) {
                                filterLevel[item._id[filterKey]].push(item)
                            } else {
                                filterLevel[item._id[filterKey]] = [item];
                            }
                        });
                        for (var i in filterLevel) {
                            if(i){
                                total = 0;
                                grades = {"केवल प्राथमिक । Primary only (Class 1-)5": 0, "केवल उच्च प्राथमिक । Upper Primary only (Class 6-8)": 0, "उच्च प्राथमिक एवं माध्यमिक या उच्च माध्यमिक । Upper Primary + Secondary/ Senior Secondary (Class 6-10 OR Class 6-12)": 0}
                                filterLevel[i].forEach(function (item) {
                                    grades[item._id.school_type] = item.size;
                                });
                                gradeObj = grades;
                                gradeObj[filterKey] = i;
                                series.push(gradeObj)
                            }
                        }
                        AmCharts.makeChart("gradeStack", {
                            "type": "serial",
                            "theme": "light",
                            color: '#333',
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
                                    "title": "Total Targets"
                                }
                            ],
                            "graphs": [{
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Primary",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "केवल प्राथमिक । Primary only (Class 1-5)"
                            },
                                {
                                    "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                    "fillAlphas": 0.8,
                                    "labelText": "[[value]]",
                                    "lineAlpha": 0.3,
                                    "title": "Upper Primary",
                                    "type": "column",
                                    "color": "#000000",
                                    "valueField": "केवल उच्च प्राथमिक । Upper Primary only (Class 6-8)"
                                },
                                {
                                    "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                    "fillAlphas": 0.8,
                                    "labelText": "[[value]]",
                                    "lineAlpha": 0.3,
                                    "title": "Upper Primary+Secondary",
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
                                labelRotation: 45,
                                title: 'Districts/Blocks/Schools'
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

                var subTargetMap = {
                        11313: 'Community Participation in School Progress',
                        11314: 'Regular SMC Meetings',
                        11315: 'Leverage Local Talent',
                        11316:	'Parent-Teacher Interaction',

                        11317:	'Attendance and Punctuality',
                        11318:	'Efficiency and Teaching Methods',
                        11319:  'Reduce Vacancies',

                        11320:	'Infrastructural Improvement',
                        11321:	'Timely Requests to DEE/SSA',
                        15171:	'Co-curricular Focus',
                        15172:	'Enrolment'
                };

                var chartItems = res.result.target_type, series = [], gradeObj = {}, possibleAnswer = {yes_count:{name:'Yes'}, no_count:{name:'No'},partial_count: {name:'Partial'}}, selected, total = 0;

                gradeObj.coms =[]
                gradeObj.stu =[]
                gradeObj.teach =[]

                var coms= 0, stu= 0, teach=0

                var chartItemsNext = res.result.target_type_504;

                if(chartItems.length) {
                    chartItems = chartItems[0];
                    chartItems.community_participation =0;
                    chartItems.teacher_performance=0;
                    chartItems.school_management=0;

                    chartItemsNext.forEach(function (item) {
                        chartItems.community_participation += item.community_participation;
                        chartItems.teacher_performance += item.teacher_performance;
                        chartItems.school_management += item.school_management;
                        if(item.status == '11313' || item.status == '11314'|| item.status == '11315'|| item.status == '11316'){
                            coms +=item.community_participation
                            gradeObj.coms.push({type: subTargetMap[item.status], percent: item.community_participation})
                        } else if(item.status == '11320' || item.status == '11321'|| item.status == '15171'|| item.status == '15172'){
                            stu +=item.school_management
                            gradeObj.stu.push({type: subTargetMap[item.status], percent: item.school_management})
                        } else if(item.status == '11317' || item.status == '11318'|| item.status == '11319') {
                            teach += item.teacher_performance
                            gradeObj.teach.push({type: subTargetMap[item.status], percent: item.teacher_performance})
                        } else {

                        }

                    });
                    gradeObj.coms.push({type: 'Others', percent: chartItems.community_participation-coms})
                    gradeObj.stu.push({type: 'Others', percent: chartItems.school_management - stu})
                    gradeObj.teach.push({type: 'Others', percent: chartItems.teacher_performance - teach})
                    for(var i in chartItems){
                        total += chartItems[i];
                    }

                    var target_types = [{
                        type: "Learning Levels",
                        percent: chartItems.learning_curve,
                        total: total,
                        color: gradeColors.B,
                        subs: []
                    },{
                        type: "Others",
                        percent: chartItems.others,
                        total: total,
                        color: gradeColors.C,
                        subs: []
                    },{type: "Community Participation",
                        percent: chartItems.community_participation,
                        total: total,
                        color: gradeColors.E,
                        subs: gradeObj.coms
                    },{type: "Teacher Performance",
                        percent: chartItems.teacher_performance,
                        total: total,
                        color: gradeColors.A,
                        subs: gradeObj.teach
                    },{type: "School Management",
                        percent: chartItems.school_management,
                        total: total,
                        color: gradeColors.D,
                        subs: gradeObj.stu
                    }];

                    function generateChartData() {
                        var chartData = [];
                        for (var i = 0; i < target_types.length; i++) {
                            if (i == selected && i >1) {
                                for (var x = 0; x < target_types[i].subs.length; x++) {
                                    chartData.push({
                                        type: target_types[i].subs[x].type,
                                        percent: target_types[i].subs[x].percent,
                                        color: target_types[i].color,
                                        pulled: true
                                    });
                                }
                            } else {
                                chartData.push({
                                    type: target_types[i].type,
                                    percent: target_types[i].percent,
                                    color: target_types[i].color,
                                    id: i
                                });
                            }
                        }
                        return chartData;
                    }

                    AmCharts.makeChart("gradePie", {
                        "type": "pie",
                        "theme": "light",

                        "dataProvider": generateChartData(),
                        "labelText": "[[title]]: [[value]]",
                        "balloonText": "[[title]]: [[value]] | [[value/total]]",
                        "titleField": "type",
                        "valueField": "percent",
                        "totalField" : 'total',
                        "colorField": "color",
                        "pulledField": "pulled",
                        "titles": [{
                            "text": "Click a slice to see the details"
                        }],
                        "export": {
                            "enabled": true
                        }
                    }).addListener("clickSlice",
                        function(event) {
                            console.log('in')
                            var chart = event.chart;
                            if (event.dataItem.dataContext.id != undefined) {
                                selected = event.dataItem.dataContext.id;
                            } else {
                                selected = undefined;
                            }
                            chart.dataProvider = generateChartData();
                            chart.validateData();
                        });
                } else {
                    $('#gradePie').html('<div class="text-center">No Data</div>')
                }
                $('.js-gradePie.js-loader').hide();

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
                                "color": "#333",
                                "valueField": levels[i]
                            })
                        }
                        for (var i in filterLevel) {
                            if(!i){
                                continue;
                            }
                            seriesObj = {};
                            var sum = 0, total = 0, ctr=0;
                            totalSchools = school.filter(function( obj ) {
                                return obj[filterKey] == i
                            });
                            filterLevel[i].forEach(function (item) {

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
                                seriesObj[item.resource] = sum

                            });

                            seriesObj.level = i;

                            series.push(seriesObj)
                        }
                        AmCharts.makeChart("resourceStack", {
                            "type": "serial",
                            "theme": "light",
                            color: '#333',
                            "colors": [
                                gradeColors.A,
                                gradeColors.B,
                                gradeColors.C,
                                gradeColors.D,
                                gradeColors.E
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
                                    "title": "Request Count"
                                }
                            ],

                            "graphs": labels,
                            "categoryField": 'level',
                            "categoryAxis": {
                                "gridPosition": "start",
                                "axisAlpha": 0,
                                "gridAlpha": 0,
                                "position": "left",
                                title: 'Districts/Blocks/Schools',
                                labelRotation: 45
                            },
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

                        })
                    } else {
                        $('#resourceStack').html('<div class="text-center">No Data</div>')
                    }
                    $('.js-resourceStack.js-loader').hide();

                var chartItems = res.result.status, possibleAnswer = {yes_count:{name:'Yes'}, no_count:{name:'No'},partial_count: {name:'Partial'}, not_updated_count: {name:'Not updated'}, total_count: {name:'Total'}}, selected, total = 0;

                if(chartItems.length) {
                    chartItems.forEach(function (item) {
                        if(item.status){
                            possibleAnswer.yes_count.proof = item.yes_count;
                            possibleAnswer.partial_count.proof = item.partial_count;
                        }
                        for(var i in item){
                            if(i=='status') {continue;}
                            if(possibleAnswer[i].count) {
                                possibleAnswer[i].count += item[i];
                            } else {
                                possibleAnswer[i].count = item[i];
                            }

                        }
                    });

                    var types = [{
                        type: "Yes",
                        percent: possibleAnswer.yes_count.count,
                        color: gradeColors.E,
                        subs: [{
                            type: "Proof",
                            percent: possibleAnswer.yes_count.proof
                        }, {
                            type: "No Proof",
                            percent: possibleAnswer.yes_count.count - possibleAnswer.yes_count.proof
                        }]
                    },{
                        type: "No",
                        percent: possibleAnswer.no_count.count,
                        color: gradeColors.D,
                        subs: [{
                        type: "Proof",
                        percent: 0
                    }, {
                        type: "No Proof",
                        percent: possibleAnswer.no_count.count
                    }]
                    },{
                        type: "Not updated",
                        percent: possibleAnswer.not_updated_count.count,
                        color: gradeColors.B,
                        subs: [{
                            type: "Proof",
                            percent: 0
                        }, {
                            type: "No Proof",
                            percent: possibleAnswer.not_updated_count.count
                        }]
                    },{type: "Partial",
                        percent: possibleAnswer.partial_count.count,
                        color: gradeColors.C,
                        subs: [{
                            type: "Proof",
                            percent: possibleAnswer.partial_count.proof
                        }, {
                            type: "No Proof",
                            percent: possibleAnswer.partial_count.count - possibleAnswer.partial_count.proof
                        }]
                    }];

                    function generateStatusChartData() {
                        var chartData = [];
                        for (var i = 0; i < types.length; i++) {
                            if (i == selected) {
                                for (var x = 0; x < types[i].subs.length; x++) {
                                    chartData.push({
                                        type: types[i].subs[x].type,
                                        percent: types[i].subs[x].percent,
                                        color: types[i].color,
                                        pulled: true
                                    });
                                }
                            } else {
                                chartData.push({
                                    type: types[i].type,
                                    percent: types[i].percent,
                                    color: types[i].color,
                                    id: i
                                });
                            }
                        }
                        return chartData;
                    }

                    AmCharts.makeChart("targetStatusValue", {
                        "type": "pie",
                        "theme": "light",

                        "dataProvider": generateStatusChartData(),
                        "labelText": "[[title]]: [[value]]",
                        "balloonText": "[[title]]: [[value]]",
                        "titleField": "type",
                        "valueField": "percent",
                        "colorField": "color",
                        "pulledField": "pulled",
                        "titles": [{
                            "text": "Click a slice to see the details"
                        }],
                        "export": {
                            "enabled": true
                        }
                    }).addListener("clickSlice",
                        function(event) {
                            console.log('in')
                            var chart = event.chart;
                            if (event.dataItem.dataContext.id != undefined) {
                                selected = event.dataItem.dataContext.id;
                            } else {
                                selected = undefined;
                            }
                            chart.dataProvider = generateStatusChartData();
                            chart.validateData();
                        });

                } else {
                    $('#targetStatusValue').html('<div class="text-center">No Data</div>')
                }
                $('.js-targetStatusValue.js-loader').hide();

                chartItems = res.result.target, grades = {}, filterLevel= {}, series = [];

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
                        grades = {"yes_count": 0, "no_count": 0, "partial_count": 0, "not_updated_count":0};
                        filterLevel[i].forEach(function (item) {
                            grades.yes_count = item.yes_count;
                            grades.no_count = item.no_count;
                            grades.partial_count = item.partial_count;
                            grades.not_updated_count = item.not_updated_count;
                        });
                        gradeObj = grades;
                        gradeObj[filterKey] = i;
                        series.push(gradeObj)
                    }
                    AmCharts.makeChart("targetStatus", {
                        "type": "serial",
                        "theme": "light",
                        color: '#333',
                        "colors": [
                            gradeColors.E,
                            gradeColors.D,
                            gradeColors.C,
                            gradeColors.B
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
                                "title": "Compliance Percentage"
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
                            "valueField": "yes_count"
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
                            },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Not update",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "not_updated_count"
                            }],
                        "categoryField": filterKey,
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left",
                            title: 'Districts/Blocks/Schools',
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

                chartItems = res.result.target_total, grades = {}, filterLevel= {}, series = [];

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
                        grades = {"yes_count": 0, "no_count": 0, "partial_count": 0, "not_updated_count":0};
                        filterLevel[i].forEach(function (item) {
                            grades.yes_count = item.yes_count;
                            grades.no_count = item.no_count;
                            grades.partial_count = item.partial_count;
                            grades.not_updated_count = item.not_updated_count;
                        });
                        gradeObj = grades;
                        gradeObj[filterKey] = i;
                        series.push(gradeObj)
                    }
                    AmCharts.makeChart("targetTotal", {
                        "type": "serial",
                        "theme": "light",
                        color: '#333',
                        "colors": [
                            gradeColors.E,
                            gradeColors.D,
                            gradeColors.C,
                            gradeColors.B
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
                                "title": "Status of Target Completion (Percentage)"
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
                            "valueField": "yes_count"
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
                            },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Not updated",
                                "type": "column",
                                "color": "#000000",
                                "valueField": "not_updated_count"
                            }],
                        "categoryField": filterKey,
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left",
                            title: 'Districts/Blocks/Schools',
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
                    $('#targetTotal').html('<div class="text-center">No Data</div>')
                }
                $('.js-targetTotal.js-loader').hide();

                var targetMap = {
                    'वि': 'Community Participation',
                    'Commun':'Community Participation',
                    Teache: 'Teacher Performance',
                    11366: 'Learning Levels',
                    11367: 'Learning Levels',
                    11368: 'Learning Levels',
                    School: 'School Management'
                }

                var chartItems = res.result.target_status, series = [], labels=[], filerLevel = {}, gradeObj = {};

                var chartItemsNext = res.result.target_status_504;

                if(chartItems.length){
                    chartItems.forEach(function (item) {
                        gradeObj = {};
                        item.target = targetMap[item.status] || 'Other';
                        if(filerLevel[item.target]) {
                            filerLevel[item.target].yes_count = item.yes_count;
                            filerLevel[item.target].no_count = item.no_count;
                            filerLevel[item.target].partial_count = item.partial_count;
                            filerLevel[item.target].not_updated_count = item.not_updated_count;
                        }
                        filerLevel[item.target] = item;
                    });
                    chartItemsNext.forEach(function (item) {
                        if(item.pc) {
                            item.target = targetMap[item.pc] || 'Other';
                            if(filerLevel[item.target]) {
                                filerLevel[item.target].yes_count = item.yes_count;
                                filerLevel[item.target].no_count = item.no_count;
                                filerLevel[item.target].partial_count = item.partial_count;
                                filerLevel[item.target].not_updated_count = item.not_updated_count;
                            }
                            filerLevel[item.target] = item;
                        }

                    });

                    for (var i in filerLevel) {
                        series.push(filerLevel[i])
                    }

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
                        "colors": [
                            gradeColors.E,
                            gradeColors.D,
                            gradeColors.C,
                            gradeColors.B
                        ],
                        "dataProvider": series,
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "stackType": "100%",
                                "unit": '%',
                                title:'Target Type'
                            }
                        ],
                        "graphs": [{
                            "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                            "fillAlphas": 0.8,
                            "labelText": "[[value]]",
                            "lineAlpha": 0.3,
                            "title": "Yes",
                            "type": "column",
                            "color": "#333",
                            "valueField": "yes_count"
                        },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "No",
                                "type": "column",
                                "color": "#333",
                                "valueField": "no_count"
                            },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Partial",
                                "type": "column",
                                "color": "#333",
                                "valueField": "partial_count"
                            },
                            {
                                "balloonText": "<b>[[category]]</b><br><span style='font-size:12px'>[[title]]: <b>[[value]]</b></span>",
                                "fillAlphas": 0.8,
                                "labelText": "[[value]]",
                                "lineAlpha": 0.3,
                                "title": "Not updated",
                                "type": "column",
                                "color": "#333",
                                "valueField": "not_updated_count"
                            }],
                        "rotate": true,
                        "categoryField": 'target',
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisAlpha": 0,
                            "gridAlpha": 0,
                            "position": "left",
                            "title": "Status of Target Completion (Percentage)",
                            labelRotation: 45
                        },
                        "export": {
                            "enabled": true,
                            "reviver": function (nodeObj) {
                                if (nodeObj.className === 'amcharts-axis-label') {
                                    nodeObj.fill = '#333';
                                }
                            }
                        }
                    });
                } else {
                    $('#targetStatusCategory').html('<div class="text-center">No Data</div>')
                }
                $('.js-targetStatusCategory.js-loader').hide();

            })
//----------------------------------------------------------------------------------------------------------------------

    }
    el.$filter.on('change', function() {
        for(var key in pendingCalls){
            pendingCalls[key].fail();
        }
        var $this = $(this), parent =  $this.attr('data-type')
        if($this.val()){
            loadFilters($(this));
        } else {
            loadFilters($('[data-type="'+filterParentMap[parent]+'"]'));
        }

    });
    el.$iFilter.on('change', function() {
        var iQuery = '&';
        $.each(el.$iFilter, function(key, item) {
            if($(item).val()){
                iQuery += $(item).data('type') +'='+ $(item).val() + '&'
            }
        });
        for(var key in pendingCalls){
            pendingCalls[key].fail();
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
                //console.log(filterList)
                $('.js-filter[data-type="district"]').val('KULLU')
                $('.js-filter[data-type="district"]').trigger('change')
            }
        })

        //chartInit('district', '','KULLU','');

    }
    init();

    var getDistributionFile = function(school_name){
        var schools = "?school_name=" +encodeURIComponent(school_name);
        var resType = {type: 'application/pdf'};
        fileWindow = window.open('','_blank');
        fileWindow.document.write("<h3>Loading file...</h3> Do not close this window.");
        var xhr = new XMLHttpRequest();
        xhr.open('GET', HPD.urls.schoolPdf + schools);
        xhr.responseType = 'blob';
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function(e) {
            if (this.status == 200) {
                var blob = new Blob([this.response], resType),
                    url = URL.createObjectURL(blob);
                fileWindow.location.href=url;
            }else{
                fileWindow.close();
                console.log('Cannot Load File');
            }
        };
        xhr.ontimeout = function(e) {
            fileWindow.close();
            console.log('Cannot Load File');
        };
        xhr.onerror = function(e){
            fileWindow.close();
            console.log('Cannot Load File');
        }
        xhr.send();
    }

    $('body').on('click','.js-schoolPdf', function() {
        getDistributionFile($(this).text().split('.')[0]);
    });

})()
