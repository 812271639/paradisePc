angular.module('admin')
    .controller('statisticCtrl', ['$scope', '$state', '$http', '$rootScope', 'courseOption', 'teachingService', 'courseService', 'taskOption', 'memberType', 'taskManage', 'pageStatic', 'systemType',function($scope, $state, $http, $rootScope, courseOption, teachingService, courseService, taskOption, memberType, taskManage, pageStatic,systemType) {
        var vm = this;

        //获取页码
        vm.page = $state.params.page || '';
        vm.staticActive=true;
        vm.subjectGrade = courseOption.grade;
        vm.taskTypeList = taskOption.taskType;
        vm.memberType = memberType;
        vm.changeMember=vm.memberType.slice(0,2);

        vm.systemTypes = systemType;


        vm.searchParams = $state.params || {};
        vm.obj = {};
        vm.obj.targetType = $state.params.targetType;
        console.log(vm.obj.targetType);
        vm.obj.isMember = $state.params.isMember;
        console.log(vm.obj.isMember);
        // vm.obj.startAt =vm.params.effectBegin||'';
        // vm.obj.endAt = vm.params.effectEnd||'';
        vm.lessonId = $state.params.lessonId;
        // vm.searchParams.gradeDept = $state.params.gradeDept == '' || $state.params.gradeDept == undefined ? $state.params.gradeDept : parseInt($state.params.gradeDept);
        vm.searchParams.gradeDept = $state.params.gradeDept == '' || $state.params.gradeDept == undefined ? $state.params.gradeDept : parseInt($state.params.gradeDept);
        var dates = $("#start,#end");
        dates.datepicker({
            //显示上下月的日子
            showOtherMonths: true,
            selectOtherMonths: true,
            //图标触发器
            showOn: "button",
            buttonImage: "../images/date.png",
            buttonImageOnly: true,
            //显示其他月份及日子
            changeMonth: true,
            changeYear: true,
            //还可以显示多个月份、年份
            // numberOfMonths: 3,
            // showButtonPanel: true
            onSelect: function(selectedDate) {
                var option = this.id == "start" ? "minDate" : "maxDate";
                dates.not(this).datepicker("option", option, selectedDate);
            }
        });



        //获取个人中心页/签到页/开通会员页/卡券激活页 统计 数据
        vm.getCommonDataList = function() {
            console.log(vm.obj);
            pageStatic.pageDetailStatic(vm.obj).then(function(res) {

                if (res.data.code == 0) {
                    vm.commonDataList = res.data.data;
                    vm.viewsStat = vm.commonDataList.viewsStat;
                    console.log(vm.commonDataList);
                    console.log(vm.viewsStat);
                }
            })
        };
        vm.goto = function(page) {
            switch (page) {
                case 0:
                    $state.go('field.statistic.subjectDetail',{},{reload:true});
                    break;
                case 1:
                    vm.getTaskStaticA();
                    $state.go('field.statistic.taskpage');
                    break;
                case 2:
                    $state.go('field.statistic.personcenter');
                    break;
                case 3:
                    $state.go('field.statistic.signpage');
                    break;
                case 4:
                    $state.go('field.statistic.openmember');
                    break;
                case 5:
                    $state.go('field.statistic.cardactive');
                    break;

            }
            vm.obj.targetType = page;
            // alert(vm.obj.targetType);
            vm.getCommonDataList();

        };
        //
        // (function() {
        //     teachingService.getSubjectList().then(function(res) {
        //         res.data.code === 0 ? vm.subjectTotalSize = res.data.data.length : console.log("异常信息：" + res);
        //     })
        // }());
        // console.log(vm.searchParams.gradeDept);
        //搜索或获取科目列表数据
        vm.getSubjectListData = function(params) {
            var params = {
                status:1,
                gradeDept: vm.searchParams.gradeDept,
            };
            teachingService.getSubjectList(params).then(function(res) {
                if (res.data.code === 0 && angular.isArray(res.data.data)) {
                    vm.subjectListData = res.data.data;
                    console.log(vm.subjectListData);
                } else {
                    $rootScope.alert("异常信息：" + res);
                }
            })
        };
        vm.getSubjectListData();

        function statusFilter(a) {
            var arr = [];
            angular.forEach(a, function(item) {
                if (item.status == 1) {
                    arr.push(item);
                }
            })
            return arr;
        }


        //获取专题量
        vm.getSubject = function(params) {
            var params = {
                size: 30,
                status:1,
                subjectName: vm.subName,
            };
            console.log(params);
            teachingService.getSpecialStatic(params).then(function(res) {
                vm.subject = res.data.data;
            });
        }
        vm.getSubject();

        if (vm.lessonId) {
            teachingService.getSpecialDetail(vm.lessonId).then(function(res) {
                if (res.data.code === 0 || res.data.code == '') {
                    vm.SpecialListData = res.data.data;
                    vm.params.gradeDept = vm.SpecialListData.gradeDept;
                    vm.params.subjectName = vm.SpecialListData.subjectName;
                    vm.params.lessonName = vm.SpecialListData.lessonName;
                    vm.params.subjectId = vm.SpecialListData.subjectId;
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        }

        //获取专题统计页面所有数据
        //筛选
        vm.getLessonStatic = function(a) {
            var params = {
                size: 30,
                status:1,
                isMember: vm.identifyType,
                page: vm.page,
                gradeDept: vm.searchParams.gradeDept,
                subjectName: vm.subName,
                lessonId: vm.name,
                startAt: vm.startAt,
                endAt: vm.endAt,
                os:vm.systemType,

            }
            pageStatic.lessonDetailStatic(params).then(function(res) {
                if (res.data.code === 0) {
                    vm.lessonStaticData = res.data.data;
                    vm.totalPage = res.data.totalPage;
                    console.log(vm.lessonStaticData);
                    var viewStatTotal = [];
                    angular.forEach(vm.lessonStaticData, function(data) {
                        viewStatTotal.push(data.viewStat);
                        // console.log(viewStatTotal);
                    });
                    var result = 0;
                    for (var i = 0; i < viewStatTotal.length; i++) {
                        result += viewStatTotal[i];
                    }
                    vm.result = result;
                    // console.log(result);

                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
        vm.getLessonStatic();
        //今日访问

        //近一个月
        vm.historyVisit = function(a) {

            vm.a=a;
            console.log(vm.a);
            console.log(typeof(a));
            vm.effectBegin='';
            vm.effectEnd='';
            vm.staticActive=true;
                var date = new Date();
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                // 昨天凌晨的毫秒
                vm.startAt = date.getTime() - a * 86400000;
                // console.log(vm.startAt);
                if (a == 0 || a == 1) {
                    vm.endAt = vm.startAt;
                    // console.log(vm.endAt);
                } else if (a==7||a==30) {
                    vm.endAt = date.getTime();

                } else {
                     vm.startAt = '';
                     vm.endAt = vm.startAt;
                }

            if (vm.obj.targetType > 1) {
                vm.obj.startAt = vm.startAt;
                vm.obj.endAt = vm.endAt;
                vm.getCommonDataList();
            } else if (vm.obj.targetType == 1) {
                console.log(vm.obj.targetType);
                vm.getTaskStaticA()
            } else {
                vm.getLessonStatic();
            }
        }

        //将日历格式转化为时间戳
        var str = '2013-08-30'; // 日期字符串
        str = str.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
        var date = new Date(str); // 构造一个日期型数据，值为传入的字符串
        var time = date.getTime();

        //日历筛选
        vm.dateChoice = function() {
            // if (vm.effectBegin!==''&&vm.effectEnd!==0) {
            //     vm.staticActive=false;
            // }

             if ((vm.effectBegin!==undefined)&&(vm.effectEnd!==undefined)) {
                vm.staticActive=false;
            }

            vm.obj.startAt = vm.effectBegin || '';
            vm.obj.endAt = vm.effectEnd;
            vm.obj.isMember=vm.identifyType;
            vm.obj.os=vm.systemType;
            console.log('测试');
            console.log(vm.obj.targetType);
            if (vm.obj.targetType > 1) {
                vm.getCommonDataList();
            } else if (vm.obj.targetType == 1) {
                vm.startAt = vm.effectBegin;
                vm.endAt = vm.effectEnd;
                console.log(vm.obj.targetType);
                vm.getTaskStatic();
            } else {
                vm.startAt = vm.effectBegin;
                vm.endAt = vm.effectEnd;
                vm.getLessonStatic();
            }
        }




        //下面是任务详情页

        //请求课程列表
        vm.getTaskList = function() {
             console.log(vm.name);
            var params = {
                size: 30,
                status:1,
                periodName: vm.name,
            };
            console.log(vm.name,params);
            courseService.getCourse(params).then(function(res) {
                if (res.data.code === 0) {
                    vm.taskListCount = res.data.data;
                    console.log('aa');
                    console.log(vm.taskListCount);
                }
            })

        }
        vm.getTaskList();

        //系统类型变动
        vm.systemTypeChange =function(params){
            //联动
            if (vm.systemType=='2'||vm.systemType=='3') {
                vm.memberType=vm.changeMember;
                // console.log(vm.changeMember);
            }else{
                vm.memberType=memberType;
            }
            //
            // if (vm.obj.targetType > 1) {
            //     console.log(params);
            //     vm.obj.os=vm.systemType;
            //     vm.getCommonDataList(params);
            // } else if (vm.obj.targetType == 1) {
            //     vm.getTaskStaticA(params);
            // } else {
            //     vm.getLessonStatic(params);
            // }
        }
        //请求任务列表
        vm.getTask = function() {
            var params = {
                size: 30,
                status: 1,
                periodName: vm.period,
                taskType:vm.taskType,
                isMember: vm.identifyType,
                page: vm.page,
                gradeDept: vm.searchParams.gradeDept,
                subjectName: vm.subName,
                lessonName: vm.name,
                startAt: vm.startAt,
                endAt: vm.endAt,
                os:vm.systemType,
            };
            taskManage.gettaskListStatic(params).then(function(res) {
                vm.workName = res.data.data;
                // vm.taskListCount = res.data.data;
                console.log(vm.workName);
                // vm.bannerOptions
            });
        }
        vm.getTask();
        //用户类型变化
        vm.identifyTypeChange = function(params) {
            // alert("sss");
            if (vm.obj.targetType > 1) {

                vm.getCommonDataList(params);
            } else if (vm.obj.targetType == 1) {
                // vm.taskStaticData(params);
                vm.getTaskStaticA(params);
            } else {
                vm.getLessonStatic(params);
            }
        }
        //获取科目选项
        vm.sujectOptions=function(){
            var params = {
                size:999,
                page:1,
                status:1,
                gradeDept: vm.searchParams.gradeDept,
            }
            pageStatic.taskDetailStatic(params).then(function(res) {
                if (res.data.code === 0) {
                    vm.sujectOptionsData = res.data.data;
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
        vm.sujectOptions();
        // 获取专题选项
        vm.lessonOptions=function(){
            var params = {
                size:999,
                page:1,
                status:1,

                gradeDept: vm.searchParams.gradeDept,

                subjectName: vm.subName,
            }
            pageStatic.taskDetailStatic(params).then(function(res) {
                if (res.data.code === 0) {
                    vm.lessonOptionsData = res.data.data;
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
        vm.lessonOptions();

        //获取课程选项
        vm.periodOptions=function(){
            var params = {
                size:999,
                page:1,
                status:1,

                gradeDept: vm.searchParams.gradeDept,
                subjectName: vm.subName,

                lessonName: vm.name,
            }
            pageStatic.taskDetailStatic(params).then(function(res) {
                if (res.data.code === 0) {
                    vm.periodOptionsData = res.data.data;
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
        vm.periodOptions();


        //获取任务类型
        vm.taskTypeOptions=function(){
            var params = {
                size:999,
                page:1,
                status:1,
                gradeDept: vm.searchParams.gradeDept,
                subjectName: vm.subName,
                lessonName: vm.name,
                periodName: vm.period,
                periodName: vm.period,
                // taskType: vm.taskType,
            }
            pageStatic.taskDetailStatic(params).then(function(res) {
                if (res.data.code === 0) {
                    vm.taskTypeOptionsData = res.data.data;
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
        vm.taskTypeOptions();

        //获取任务名称
        //  vm.taskNameOptions=function(){
        //     var params = {
        //         size:999,
        //         page:1,
        //         status:1,
        //         periodName: vm.period,
        //         taskType: vm.taskType,
        //     }
        //     pageStatic.taskDetailStatic(params).then(function(res) {
        //         if (res.data.code === 0) {
        //             taskNameOptionsData = res.data.data;
        //         }else {
        //             $rootScope.alert(res.data.message);
        //         }
        //     })
        // }
        // vm.taskNameOptions();










        //获取任务统计
        vm.getTaskStatic = function() {

            console.log('11');
            var params = {
                size: 30,
                status:1,
                isMember: vm.identifyType,
                page: vm.page,
                gradeDept: vm.searchParams.gradeDept,
                subjectName: vm.subName,
                lessonName: vm.name,
                periodName: vm.period,
                taskName: vm.taskName,
                taskType: vm.taskType,
                startAt: vm.startAt,
                endAt: vm.endAt,
                os:vm.systemType,
            }
            console.log(params);
            pageStatic.taskDetailStatic(params).then(function(res) {
                if (res.data.code === 0) {
                    vm.taskStaticData = res.data.data;


                    vm.totalTakPage = res.data.totalPage;
                    var viewStatTotal = [];
                    var collectStatTotal = [];
                    var cacheStatStatTotal = [];
                    angular.forEach(vm.taskStaticData, function(data) {
                        viewStatTotal.push(data.viewStat);
                        collectStatTotal.push(data.collectStat);
                        cacheStatStatTotal.push(data.cacheStat);
                    });
                    Array.prototype.delNull = function() {
                        for (var i = 0; i < this.length; i++) {
                            if (typeof(this[i]) == 'string') {
                                this.splice(i, 1);
                                i = i - 1;
                            }

                        }
                        return this;

                    }
                     //去除空值
                    collectStatTotal.delNull();
                    cacheStatStatTotal.delNull();

                    var result = 0;

                    var collectResult = 0;
                    var cacheStat = 0;
                    // for (var i = 0; i < viewStatTotal.length; i++) {
                    //     result += viewStatTotal[i];
                    // }

                    angular.forEach(vm.taskStaticData, function(item){
                        result+= item.viewStat;
                        collectResult+=item.collectStat;
                        cacheStat+=item.cacheStat;


                    });
                    vm.result = result;

                    vm.collectResult = collectResult;

                    vm.cacheStat = cacheStat;
                    vm.taskStaticDataA = vm.taskStaticData;
                    console.log(result);

                    // // var collectResult = 0;
                    // for (var i = 0; i < collectStatTotal.length; i++) {
                    //     collectResult += collectStatTotal[i];
                    // }
                    // vm.collectResult = collectResult;
                    // console.log(collectResult);

                    // var cacheStat = 0;
                    // for (var i = 0; i < cacheStatStatTotal.length; i++) {
                    //     cacheStat += cacheStatStatTotal[i];
                    // }
                    // vm.cacheStat = cacheStat;

                    // console.log(cacheStat);
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        }

        // vm.getTaskStatic();



         // 实验
         vm.getTaskStaticA = function() {
            var params = {
                size: 30,
                status:1,
                isMember: vm.identifyType,
                page: vm.page,
                gradeDept: vm.searchParams.gradeDept,
                subjectName: vm.subName,
                lessonName: vm.name,
                periodName: vm.period,
                taskName: vm.taskName,
                taskType: vm.taskType,
                startAt: vm.startAt,
                endAt: vm.endAt,
                os:vm.systemType,

            }
            console.log(params);
            pageStatic.taskDetailStatic(params).then(function(res) {
                if (res.data.code === 0) {
                    vm.taskStaticDataA = res.data.data;
                    console.log(vm.taskStaticDataA);
                    vm.totalTakPage = res.data.totalPage;
                    var viewStatTotal = [];
                    var collectStatTotal = [];
                    var cacheStatStatTotal = [];
                    angular.forEach(vm.taskStaticDataA, function(data) {
                        viewStatTotal.push(data.viewStat);
                        collectStatTotal.push(data.collectStat);
                        cacheStatStatTotal.push(data.cacheStat);
                    });
                    Array.prototype.delNull = function() {
                        for (var i = 0; i < this.length; i++) {
                            if (typeof(this[i]) == 'string') {
                                this.splice(i, 1);
                                i = i - 1;
                            }

                        }
                        return this;

                    }
                     //去除空值
                    collectStatTotal.delNull();
                    cacheStatStatTotal.delNull();

                    var result = 0;

                    for (var i = 0; i < viewStatTotal.length; i++) {
                        result += viewStatTotal[i];
                    }
                    vm.result = result;

                    var collectResult = 0;
                    for (var i = 0; i < collectStatTotal.length; i++) {
                        collectResult += collectStatTotal[i];
                    }
                    vm.collectResult = collectResult;
                    var cacheStat = 0;
                    for (var i = 0; i < cacheStatStatTotal.length; i++) {
                        cacheStat += cacheStatStatTotal[i];
                    }
                    vm.cacheStat = cacheStat;
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
        // vm.getTaskStaticA();










    }])