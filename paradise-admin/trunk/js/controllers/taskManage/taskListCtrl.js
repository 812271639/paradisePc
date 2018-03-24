angular.module('admin')
    .controller('taskListCtrl',['$scope','$state','taskOption','$rootScope','editType','$stateParams','taskManage','commonUtil','teachingService',function($scope,$state,taskOption,$rootScope,editType,$stateParams,taskManage,commonUtil,teachingService){
        var vm = this;
        vm.option = taskOption;
        vm.periodId=$state.params.id;
        vm.delete = function (id) {

            $rootScope.alert("将删除任务及其下所有内容，是否确认删除？",function () {
                taskManage.deleteTask(id).then(function (res) {
                    $state.go($state.current, vm.params, {reload: true});
                    if(res.data.code==0){
                        $rootScope.alert("删除成功！");
                        $state.go($state.current, {} ,{reload: true});
                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }
                })
            });
        }

        //编辑状态，根据类型跳转
        vm.edit=function (type,periodId,id) {
            if(type==1){
                $state.go('field.radioDetail',{periodId:periodId,id:id})
            }
            else {
                $state.go('field.taskDetail',{periodId:periodId,id:id})
            }
        }


        vm.params = $state.params||{};
        //带id和不带id修改页面样式
        //设置初始样式
        vm.draggable=true;
        if(!vm.params.id){
            vm.draggable=false;
        }


        //进入页面请求渲染
        taskManage.getTaskList($state.params.id,vm.params).then(function (res) {
            vm.list=res.data.data;
            vm.totalPage=res.data.totalPage;
        })

        //执行搜索
        vm.search=function () {
            //在发送数据前手动清除一波数据——具体是视频类型和难度等级
            if(vm.params.taskType===''||vm.params.taskType==2){
                vm.params.specificType='';
                vm.params.difficultyLevel='';
            }
            if(vm.params.specificType===''||vm.params.specificType==1){
                vm.params.difficultyLevel='';
            }
            $state.go($state.current, vm.params, {reload: true});
        }
        //清空表单不跳转
        vm.rest=function (){
            commonUtil.restParms(vm.params);
        }
        //上下架
        vm.upDown = function (id,status) {
            vm.tip= status==1 ?"是否确认下架":"是否确认上架";
            Status=status==1?2:1;
            vm.tipS=status==1 ?"下架成功":"上架成功";
            $rootScope.alert(vm.tip,function () {
                taskManage.putTaskUpDowns(id,Status).then(function (res) {
                    console.log(res);
                    if(res.data.code==0){
                        $rootScope.alert(vm.tipS);
                        $state.go($state.current, vm.params, {reload: true});
                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }
                })
            });
        }
        //保存排序
        vm.saveSorting=function(){
            vm.array=[];
            angular.forEach(vm.list,function(data){
                vm.array.push(data.id)
            });
            return  taskManage.getTaskSorting(vm.array).then(function(res){
                console.log(res);
                if(res.data.code==0){
                    $rootScope.alert("保持排序成功。");
                    $state.go($state.current, vm.params, {reload: true});
                }
            })
        };
    }])
