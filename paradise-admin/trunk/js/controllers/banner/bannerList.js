'use strict';
angular.module('admin')
    .controller('bannerListCtrl', function ($state, $scope, $rootScope, commonUtil, bannerService, bannerOptions,teachingService,courseService,taskManage) {
        var vm = this;
        vm.bannerOptions = bannerOptions;
        vm.searchParam = $state.params || {};
        vm.searchParam.size=99999;
        vm.searchParam.type = 1;
        //搜索之后无法进行拖动排序
        vm.draggable=false;
        if(vm.searchParam.url===undefined&&vm.searchParam.status===undefined){           
        vm.draggable=true;
        }
        getList(vm.searchParam);
        vm.search = function () {
            $state.go($state.current, vm.searchParam, {reload: true});

        };
        vm.rest = function () {
            commonUtil.restParms(vm.searchParam);
        };
        //获取科目是否上下架
        function subjectStatus(b,obj){
            teachingService.getSubjectDetail(b).then(function(res){
                if(res.data.code==0){
                    if(res.data.data.status==1){
                        var Obj=obj();
                        Obj.status();
                    }else{
                        $rootScope.alert("请先上架相关科目")
                    }
                }else{
                    alert(res.data.message);
                }
            })
        }
        //获取专题是否上下架
        function specialStatus(b,obj){
            teachingService.getSpecialDetail(b).then(function(res){
                if(res.data.code==0){
                    if(res.data.data.status==1){
                        var Obj=obj();
                        Obj.status();
                    }else{
                        $rootScope.alert("请先上架相关专题")
                    }
                }else{
                    alert(res.data.message);
                }
            })
        }
        //获取课程是否上下架
        function courseStatus(b,obj){
            courseService.getCourseDetail(b).then(function(res){
                if(res.data.code==0){
                    if(res.data.data.status==1){
                        var Obj=obj();
                        Obj.status();
                    }else{
                        $rootScope.alert("请先上架相关课程")
                    }
                }else{
                    alert(res.data.message);
                }
            })
        }
        //获取任务是否上下架
        function taskStatus(b,obj){
            taskManage.getTaskDetail(b).then(function(res){
                if(res.data.code==0){
                    if(res.data.data.status==1){
                        var Obj=obj();
                        Obj.status();
                    }else{
                        $rootScope.alert("请先上架相关任务")
                    }
                }else{
                    alert(res.data.message);
                }
            })
        }
        //上下架
        vm.changeStatus = function (id, status, numberStatus,bannerType,link) {
            $rootScope.alert("是否" + status + "该banner？", function () {
                    
                    var obj=function(){
                        var o={   
                        id:id,
                        numberStatus:numberStatus,
                        };
                        o.status=function(){
                            bannerService.bannerStatus(o.id, o.numberStatus).then(function (res) {
                                if (res.data.code == 0) {
                                    getList(vm.searchParam);
                                    $rootScope.alert("banner" + status + "成功", function () {
                                        $state.go("field.bannerList");
                                    },true);
                                } else {
                                    $rootScope.alert(res.data.message)
                                }
                            });
                        }
                        return o;
                    }

                    if(status=="上架"&&bannerType==2){
                        link=JSON.parse(link)
                        if(link.taskId){
                            taskStatus(link.taskId,obj);
                        }else if(link.periodId){
                            courseStatus(link.periodId,obj);
                        }else if(link.lessonId){
                            specialStatus(link.lessonId,obj);
                        }else if(link.subjectId){
                            subjectStatus(link.subjectId,obj);
                        }else{
                            console.log("somethingswrong");
                        }
                    }else{
                        var Obj=obj();
                        Obj.status();
                    }                
            });
        };
        vm.delete = function (id) {
            $rootScope.alert("是否删除该banner？", function () {
                bannerService.bannerDelete(id).then(function(res) {
                    if (res.data.code == 0) {
                        getList(vm.searchParam);
                        $rootScope.alert("banner删除成功", function () {
                            $state.go("field.bannerList");
                        },true);
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                })
        })
        }
        vm.saveSorting=function(){
            vm.array=[];
            angular.forEach(vm.list,function(data){
                vm.array.push(data.id)
            });
            bannerService.bannerSort(vm.array).then(function(res){
                if(res.data.code==0){
                    $rootScope.alert("保持排序成功。")
                }else {
                    $rootScope.alert(res.data.message)
                }
            })
        }
        function getList(params) {
            bannerService.bannerList(params).then(function (res) {
                if (res.data.code == 0) {
                    vm.toList = res.data.data.articleList;
                    angular.forEach(vm.toList,function(item){
                        if(item.bannerType==2){
                            //link用来传递判断是否上下架
                            item.link=item.content;
                            item.content=item.url;

                        }
                    })
                    vm.list=vm.toList;
                } else {
                    $rootScope.alert('请检查网络链接')
                }
            })
        }
    })