/**
 * Created by XH on 2017/9/19.
 */
angular.module("myApp")
    .controller("SubjectCtrl", ["$scope", "$state", "$http", "special", '$timeout','$rootScope','main',function($scope, $state, $http, special,$timeout,$rootScope,main) {
        var vm = this;
        vm.user=JSON.parse(localStorage.getItem('user'));
        if(vm.user==null){
            vm.id='';
        }else {
            vm.id=vm.user.id
        }
        special.getSpecialDetail($state.params.id,{userId:vm.id}).then(function(res) {
            if (res.code == null) {
                vm.data = res.data;
                 console.log(vm.data);
                angular.forEach(vm.data.periodList,function (data) {
                    angular.forEach(data.periodTasks,function (data) {
                        if(data.learningProcess!=1&&data.learningProcess!=''){
                            data.color=vm.data.data.fontColor

                        }
                    })
                })
            } else {
                console.log(res.data);
                res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
            }
        });

        //跳转课程
        vm.goCourse=function (periodId,taskId,li) {
            if(!$rootScope.isLogin()&&vm.data.data.isLock==1){
                $rootScope.login()
            }else if(vm.data.data.isLock==1&&vm.user.isMember==2){
                vm.tips=1;
                $timeout(function () {
                    vm.tips=2
                },1000)
            }else {
                $state.go('main.course',{id:periodId,taskId:taskId},{reload:true})
            }
        };
        //去任务详情
        vm.goTask=function (id,taskId) {
            if(!$rootScope.isLogin()&&vm.data.data.isLock==1){
                $rootScope.login()
            }else if(vm.data.data.isLock==1&&vm.user.isMember==2){
                vm.tips=1;
                $timeout(function () {
                    vm.tips=2
                },1000)
            }else {
                $state.go('main.course',{id:id,taskId:taskId},{reload:true})
            }
        };
        //购买Vip
        vm.buyVip=function () {
            if($rootScope.isLogin()){
                $state.go('main.newMember')
            }else {
                $rootScope.login()
            }
        };
        //购买专题
        vm.buySubject=function () {
            if($rootScope.isLogin()){
                $rootScope.choosePay(vm.data)
            }else {
                $rootScope.login()
            }
        };
        //数据埋点
        main.postDataBurialPoint(
            {
                targetId:$state.params.id-0,
                targetType:0,
                subTargetType:1,
                userId:vm.id,
                os:1
            }
        ).then(function(res){
        });

    }]);