'use strict';
angular.module('admin')
    .controller('advertisingCtrl', function ($state, $scope, $rootScope, commonUtil,articleOptions,advertisingService) {
        var vm = this;
        vm.status=articleOptions.status;
        vm.searchParam=$state.params;
        vm.searchParam.type=3;
        console.log(vm.params);
        //获取列表
        advertisingService.getAdvertisingList(vm.searchParam).then(function (res) {
            if(res.data.code==0){
                console.log(res)
                vm.list=res.data.data.articleList;
            }else {
                $rootScope.alert(res.data.message)
            }
        });

        //删除广告
        vm.del=function (id) {
            $rootScope.alert("确认删除？",function () {
                advertisingService.deleteAdvertising(id).then(function (res) {
                    if(res.data.code==0){
                        $rootScope.alert("删除成功",function () {
                            $state.go($state.current,vm.searchParam,{reload:true})
                        })
                    }else {
                        $rootScope.alert(res.data.message)
                    }
                })
            });
        }
        //上下架
        vm.upDown=function (id,status) {
            status==1?status=2:status=1;
            status==2?vm.message='是否下架':vm.message='是否上架';
            $rootScope.alert(vm.message,function () {
                advertisingService.updownAdvertising(id,status).then(function (res) {
                    if(res.data.code==0){
                        console.log(res);
                        status==2?vm.message='下架成功':vm.message='上架成功';
                        $rootScope.alert(vm.message,function () {
                            $state.go($state.current,vm.searchParam,{reload:true})
                        })
                    }else {
                        $rootScope.alert(res.data.message)
                    }
                })
            });
        };
        //搜索
        vm.search=function () {
            $state.go($state.current,vm.searchParam,{reload:true})
        }
        //重置
        vm.rest=function () {
            $state.go($state.current,{url:'',status:''},{reload:true})
        }
    });