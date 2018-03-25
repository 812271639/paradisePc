/**
 * Created by Master on 2017/4/30.
 */
'use strict'
angular.module('paradiseApp')
    .controller('TreeHoleController', ['commonUnit', '$state', '$log', '$timeout', '$scope', '$rootScope', '$location','treeHoleService',
        function (commonUnit, $state, $log, $timeout, $scope, $rootScope, $location,treeHoleService) {
            var vm = this;
            vm.type= commonUnit.session('leavesType')||1;
            vm.randomLeaves=[];
            vm.leaves=[];
            vm.loaded = 0;
            if(vm.type==1){
                //初次进入获取6片树叶
                vm.add=0;
                vm.treeHoleHotStart=function() {
                    vm.add++;
                    commonUnit.session('leavesType',1);
                    vm.type=1;
                    treeHoleService.treeHoleRandomStart().then(function (res) {
                        if (res.data.code===0){
                            angular.forEach(res.data.data,function (data) {
                                vm.randomLeaves.push(data);
                                if (vm.randomLeaves.length==3&&vm.leaves==0){
                                    vm.leaves= vm.randomLeaves.slice(0,3);
                                }else if(vm.randomLeaves.length==6){
                                    vm.randomLeaves = vm.randomLeaves.slice(3,6);
                                }
                                vm.loaded++;
                            });
                            // console.log(vm.leaves)
                        }else {
                            $rootScope.showTips(res.data.message);
                        };
                    })
                };
                vm.treeHoleHotStart();
            }else {
                treeHoleHot();
            }
            //切换展示
            vm.showRandom=function () {
                vm.btnDisabled=false;
                if(vm.type==1){
                    treeHoleRandom();
                    //删除第一片树叶
                    vm.leaves.shift();
                    //加入新树叶 延迟展示
                    $timeout(function () {
                        vm.leaves.push(vm.randomLeaves[0]);
                        vm.randomLeaves.shift();
                    },50)
                }else {
                    vm.leaves.shift();
                    $timeout(function () {
                        vm.leaves.push(vm.hotLeaves[0]);
                        vm.hotLeaves.push(vm.hotLeaves[0]);
                        vm.hotLeaves.shift();
                    },50)
                }
                $scope.$apply();
            }

            //获取最热树叶
            var i=0;
            vm.getHot=treeHoleHot;
            function treeHoleHot() {
                vm.leaves=[];
                vm.loaded=0;
                commonUnit.session('leavesType',2);
                vm.type=2;
                // $state.go($state.current, {type: 2}, {reload: true});
                treeHoleService.treeHoleHot().then(function (res) {
                    if (res.data.code===0){
                        vm.hotLeaves=res.data.data;
                        angular.forEach(vm.hotLeaves,function () {
                            if (vm.leaves.length<3){
                                vm.leaves.push(vm.hotLeaves[0]);
                                vm.hotLeaves.push(vm.hotLeaves[0]);
                                vm.hotLeaves.shift();
                            }
                        })
                    }else {
                        $rootScope.showTips(res.data.message);
                    }
                    vm.loaded++;
                })
            }
            //获取树叶
            // treeHoleRandom();
            vm.treeHoleRandom=treeHoleRandom;
            function treeHoleRandom() {
                commonUnit.session('leavesType',1);
                vm.type=1;
                treeHoleService.treeHoleRandom().then(function (res) {
                    if (res.data.code===0){
                        vm.randomLeaves.push(res.data.data);
                        if (vm.randomLeaves.length==3&&vm.leaves==0){
                            vm.leaves= vm.randomLeaves.slice(0,3);
                        }else if(vm.randomLeaves.length==6){
                            vm.randomLeaves = vm.randomLeaves.slice(3,6);
                        }
                        // console.log(vm.leaves)

                    }else {
                        $rootScope.showTips(res.data.message);
                    };
                    vm.loaded++;
                })
            }
            //点赞、踩
            vm.commend = function (type,leaves) {
                if (!vm.btnDisabled){
                    vm.btnDisabled=true;
                    if(type==1){
                        treeHoleService.treeHoleUp(leaves.id).then(function (res) {
                            if (res.data.code===0){
                                leaves.bumpCount=leaves.bumpCount+1;
                                angular.forEach(vm.leaves,function (item) {
                                    if(item.id==leaves.id){
                                        item.bumpCount=leaves.bumpCount;
                                    }
                                })
                                angular.forEach(vm.randomLeaves,function (item) {
                                    if(item.id==leaves.id){
                                        item.bumpCount=leaves.bumpCount;
                                    }
                                })
                                // leaves.bumpCount=leaves.bumpCount+1;

                            }else {
                                $rootScope.showTips(res.data.message);
                            }
                        })
                    }else {
                        treeHoleService.treeHoleDown(leaves.id).then(function (res) {
                            if (res.data.code===0){
                                leaves.downCount=leaves.downCount+1;
                                angular.forEach(vm.leaves,function (item) {
                                    if(item.id==leaves.id){
                                        item.downCount=leaves.downCount;
                                    }
                                })
                                angular.forEach(vm.randomLeaves,function (item) {
                                    if(item.id==leaves.id){
                                        item.downCount=leaves.downCount;
                                    }
                                })
                            }else {
                                $rootScope.showTips(res.data.message);
                            }
                        })
                    }
                }
            }
            //返回
            vm.back = function () {
                if (vm.type != 2){
                    vm.type=1;
                    commonUnit.session('leavesType',1);
                    $state.go('map');
                } else {
                    vm.btnDisabled=false;
                    vm.leaves=[];
                    vm.randomLeaves=[];
                    vm.loaded=0;
                    for (var i=0;i<4;i++){
                        treeHoleRandom();
                    }
                }
            }
        }]
    )