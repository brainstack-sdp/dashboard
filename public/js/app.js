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
        $filter : $('.js-filter')
        }, filterList = {}, filters = {}, $scope={},
        filterAheadMap = {
            district : ['block', 'cluster', 'school_name', 'summer_winter'],
            block : ['cluster', 'school_name', 'summer_winter'],
            cluster : ['school_name', 'summer_winter'],
            school_name : ['summer_winter'],
            summer_winter : []
        }, gradeMap = {

        }


    var loadFilters = function($el) {
        var type= $el.data('type');
        filters[type] = $el.val();

        $.ajax({
            method: 'GET',
            url : HPD.urls.filterList + '?' + type +'=' +$el.val(),
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
        })
    };

    var createOptions = function(filters, key) {
        var options = '<option value="">All</option>';
        for (var i=0;i<filters.length;i++) {
            options += '<option value="'+ filters[i][key] +'">' + filters[i][key] + '</option>'
        }
        return options;
    }
    var chartInit = function(filterKey, type, val) {

        var filterQuery = function() {
            var queryString = '?', paramList, index;
            if(filters.district) {
                queryString = '?'+ type + '=' + val;

            } else {
                queryString = ''
            }
            return queryString
        }
        Morris.Grid.prototype.gridDefaults.gridLineColor = "#888";
        Morris.Grid.prototype.gridDefaults.gridTextColor = '#333';
        $scope.simpleLineOptions = {
            color: '#666666',
            fullWidth: true,
            height: "300px",
            chartPadding: {
                right: 40
            }
        };

        $scope.simpleLineData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            series: [
                [20, 20, 12, 45, 50],
                [10, 45, 30, 14, 12],
                [34, 12, 12, 40, 50],
                [10, 43, 25, 22, 16],
                [3, 6, 30, 33, 43]
            ]
        };

        $scope.areaLineData = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [5, 9, 7, 8, 5, 3, 5, 4]
            ]
        };

        $scope.areaLineOptions = {
            fullWidth: true,
            height: "300px",
            low: 0,
            showArea: true
        };

        $scope.biLineData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
                [1, 2, 3, 1, -2, 0, 1],
                [-2, -1, -2, -1, -2.5, -1, -2],
                [0, 0, 0, 1, 2, 2.5, 2],
                [2.5, 2, 1, 0.5, 1, 0.5, -1]
            ]
        };

        $scope.biLineOptions = {
            height: "300px",
            high: 3,
            low: -3,
            showArea: true,
            showLine: false,
            showPoint: false,
            fullWidth: true,
            axisX: {
                showGrid: false
            }
        };

        $scope.simpleBarData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8],
                [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]
            ]
        };

        $scope.simpleBarOptions = {
            fullWidth: true,
            height: "300px"
        };

        $scope.multiBarResponsive = [
            ['screen and (min-width: 400px)', {
                reverseData: true,
                horizontalBars: true,
                axisX: {
                    labelInterpolationFnc: Chartist.noop
                },
                axisY: {
                    offset: 60
                }
            }],
            ['screen and (min-width: 700px)', {
                stackBars: false,
                reverseData: false,
                horizontalBars: false,
                seriesBarDistance: 15
            }]
        ];

        $scope.stackedBarData = {
            labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
            series: [
                [800000, 1200000, 1400000, 1300000],
                [200000, 400000, 500000, 300000],
                [100000, 200000, 400000, 600000]
            ]
        };

        $scope.stackedBarOptions = {
            fullWidth: true,
            height: "300px",
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function (value) {
                    return (value / 1000) + 'k';
                }
            }
        };

        $scope.simplePieData = {
            series: [5, 3, 4]
        };

        $scope.simplePieOptions = {
            fullWidth: true,
            height: "300px",
            weight: "300px",
            labelInterpolationFnc: function (value) {
                return Math.round(value / 12 * 100) + '%';
            }
        };

        $.ajax({
            method: 'GET',
            url : HPD.urls.chartRecord + filterQuery(),
            success: function(res) {
                var chartItems = res.result.gradePie, labels= [], series= [], sum= 0, gradeMap ={};
                chartItems.forEach(function(item) {
                    labels.push(item.grade);
                    series.push(item.count)
                    gradeMap[item.grade] = item.count;
                    sum +=item.count;
                });
                $scope.labelsPieData = {
                    labels: labels,
                    series: series
                };

                $scope.labelsPieOptions = {
                    fullWidth: true,
                    height: "300px",
                    weight: "300px",
                    labelOffset: 50,
                    chartPadding: 10,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function (value) {
                        return value[0] + ' ' + Math.round(gradeMap[value] /sum * 100) + '%';
                    }
                };
                new Chartist.Pie('#label-pie', $scope.labelsPieData, $scope.labelsPieOptions);

                chartItems = res.result.subjectStack, labels= [], series= [];
                var subjects ={}, filterLevel ={},filterLevelItems={}, seriesObj={}, subjectObject ={};
                chartItems.forEach(function(item) {
                    subjects[item.subject]= 1;
                    if(filterLevel[item[filterKey]]) {
                        filterLevel[item[filterKey]].push(item)
                    } else {
                        filterLevel[item[filterKey]] = [item];
                    }


                });
                for(var i in filterLevel){
                    seriesObj={};
                    filterLevel[i].forEach(function(item) {
                        subjectObject[item.subject] = {
                            sum:0,total:0, percentage :0
                        };
                        subjectObject[item.subject].sum += item.sum;
                        subjectObject[item.subject].total += item.max_marks;
                        subjectObject[item.subject].percentage = Math.round((subjectObject[item.subject].sum/subjectObject[item.subject].total)*100);
                        if(subjectObject[item.subject].percentage >= 80){
                            seriesObj[item.subject]  = 5
                        } else if(subjectObject[item.subject].percentage >= 65 && subjectObject[item.subject].percentage <=79){
                            seriesObj[item.subject]  = 4
                        } else if(subjectObject[item.subject].percentage >= 50 && subjectObject[item.subject].percentage <=64){
                            seriesObj[item.subject]  = 3
                        } else if(subjectObject[item.subject].percentage >= 35 && subjectObject[item.subject].percentage <=49){
                            seriesObj[item.subject]  = 2
                        } else if(subjectObject[item.subject].percentage >=34 && subjectObject[item.subject].percentage >=0){
                            seriesObj[item.subject]  = 1
                        } else{
                        }
                    });
                    seriesObj.level = i;

                series.push(seriesObj)
                }
                $('#subjectStack').empty();
                new Morris.Bar({
                    element: 'subjectStack',
                    data: series,
                    xkey: 'level',
                    ykeys: Object.keys(subjects),
                    labels: Object.keys(subjects)
                });

                chartItems = res.result.classStack, labels= [], series= [], filterLevel ={},filterLevelItems={}, seriesObj={};
                var classes = {}, classObject ={};
                chartItems.forEach(function(item) {
                    classes[item.class_code]= 1;
                    if(filterLevel[item[filterKey]]) {
                        filterLevel[item[filterKey]].push(item)
                    } else {
                        filterLevel[item[filterKey]] = [item];
                    }


                });
                for(var i in filterLevel){
                    seriesObj={};
                    filterLevel[i].forEach(function(item) {
                        classObject[item.class_code] = {
                            sum:0,total:0, percentage :0
                        };
                        classObject[item.class_code].sum += item.sum;
                        classObject[item.class_code].total += item.max_marks;
                        classObject[item.class_code].percentage = Math.round((classObject[item.class_code].sum/classObject[item.class_code].total)*100);
                        if(classObject[item.class_code].percentage >= 80){
                            seriesObj[item.class_code]  = 5
                        } else if(classObject[item.class_code].percentage >= 65 && classObject[item.class_code].percentage <=79){
                            seriesObj[item.class_code]  = 4
                        } else if(classObject[item.class_code].percentage >= 50 && classObject[item.class_code].percentage <=64){
                            seriesObj[item.class_code]  = 3
                        } else if(classObject[item.class_code].percentage >= 35 && classObject[item.class_code].percentage <=49){
                            seriesObj[item.class_code]  = 2
                        } else if(classObject[item.class_code].percentage >=34 && classObject[item.class_code].percentage >=0){
                            seriesObj[item.class_code]  = 1
                        } else{
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

                chartItems = res.result.gradeStack, labels= [], series= [], filterLevel={};
                var gradeObj = {A: {},B:{},C:{},D:{},E:{}},grades = {},gradeData=[],total = 0;
                chartItems.forEach(function(item) {
                    if(filterLevel[item[filterKey]]) {
                        filterLevel[item[filterKey]].push(item)
                    } else {
                        filterLevel[item[filterKey]] = [item];
                    }
                });
                for(var i in filterLevel){
                    total = 0;
                    grades = {A: 0,B:0,C:0,D:0,E:0}
                    filterLevel[i].forEach(function(item) {
                        total += item.count;
                        grades[item.grade] = item.count;
                    });
                    gradeObj.A[i] = (grades.A*100 || 0)/total;
                    gradeObj.B[i] = (grades.B*100 || 0)/total;
                    gradeObj.C[i] = (grades.C*100 || 0)/total;
                    gradeObj.D[i] = (grades.D*100 || 0)/total;
                    gradeObj.E[i] = (grades.E*100 || 0)/total;
                }
                for(var i in gradeObj){
                    gradeData =[];

                    for(var j in filterLevel){
                        gradeData.push(gradeObj[i][j])
                    }
                series.push(gradeData)
                }

                $scope.stackedBarData = {
                    labels: Object.keys(filterLevel),
                    series: series
                };
                $scope.stackedBarOptions = {
                    fullWidth: false,
                    height: "300px",
                    stackBars: true,
                    isFixedWidth:false,
                    //Number - Pixel width of the bar
                    barWidth:30,
                    axisY: {
                        labelInterpolationFnc: function (value) {
                            return (value) + '%';
                        }
                    }
                };

                new Chartist.Bar('#gradeStack', $scope.stackedBarData, $scope.stackedBarOptions)
            }
        })



        $scope.pieResponsive = getResponsive(20, 80);

        function getResponsive(padding, offset){
            return [
                ['screen and (min-width: 1550px)', {
                    chartPadding: padding,
                    labelOffset: offset,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }],
                ['screen and (max-width: 1200px)', {
                    chartPadding: padding,
                    labelOffset: offset,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }],
                ['screen and (max-width: 600px)', {
                    chartPadding: 0,
                    labelOffset: 0,
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }]
            ];
        }

        new Chartist.Line('#line-chart', $scope.simpleLineData, $scope.simpleLineOptions);
        new Chartist.Line('#area-chart', $scope.areaLineData, $scope.areaLineOptions);
        new Chartist.Line('#bi-chart', $scope.biLineData, $scope.biLineOptions);

        new Chartist.Bar('#simple-bar', $scope.simpleBarData, $scope.simpleBarOptions);
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
