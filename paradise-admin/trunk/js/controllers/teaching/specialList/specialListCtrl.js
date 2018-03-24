/**
 * Created by Administrator on 2017\9\2 0002.
 *
 */
'use strict';
angular.module('admin')

    .controller('specialListCtrl',['$scope','$state','teachingService','courseOption','$rootScope',
        function ($scope,$state,teachingService,courseOption,$rootScope) {
            var vm = this;
            vm.subjectGrade = courseOption.grade;
            vm.subjectStatus = courseOption.status;
            vm.params = $state.params;
            vm.params.status = $state.params.status == '' ||$state.params.status == undefined? $state.params.status:parseInt($state.params.status);
            vm.params.gradeDept = $state.params.gradeDept == '' ||$state.params.gradeDept == undefined? $state.params.gradeDept:parseInt($state.params.gradeDept);
            vm.subject = {};
            vm.subject.subjectId = vm.params.id;
            // 树形菜单进来专题 和 科目进来的专题 共享一个页面
            //搜索或获取专题列表数据
            vm.getSpecialData = function () {
                teachingService.getSpecial(vm.subject.subjectId, vm.params).then(function (res) {
                    if (res.data.code === 0 || res.data.code =='' ){
                        vm.SpecialListData = res.data.data;
                        vm.totalPage = res.data.totalPage;
                    }else {
                        $rootScope.alert(res.data.message);
                    }
                })
            };
            //开关拖动排序
            vm.draggable=true;
            if(!vm.params.id){
                vm.draggable=false;
            }
            vm.getSpecialData();
            vm.search = function () {
                vm.params.page = 1;$state.go($state.current, vm.params, {reload: true});
            };
            //上下架
            vm.changeStatus = function (id,status) {
                if(status == 1){
                    vm.updown = '上架';
                }else if(status == 2){
                    vm.updown ='下架';
                }

                $rootScope.alert('是否'+vm.updown+'该专题',function () {
                    teachingService.putSpecialUpDowns(id, status).then(function (res) {
                        if (res.data.code == 0) {
                            vm.getSpecialData();
                            $rootScope.alert('成功');
                        } else if (res.data.code === 4) {
                            $rootScope.alert(res.data.message);
                        } else if (res.data.code === 7) {
                            $rootScope.alert(res.data.message);
                        }else if(res.data.code == -4101){
                            $rootScope.alert(res.data.message);
                        }else {
                            $rootScope.alert(res.data.message);
                        }
                    })
                })
            };
            //保存排序
            vm.saveSorting=function(){
                vm.array=[];
                angular.forEach(vm.SpecialListData,function(data){
                    vm.array.push(data.id)
                });
                console.log(vm.array);
                teachingService.postSpecialSort(JSON.stringify(vm.array)).then(function(res){
                    // console.log(res)
                    if(res.data.code === 0){
                        $rootScope.alert("保持排序成功。")
                    }else {
                        $rootScope.alert(res.data.message);
                    }
                })
            };
                vm.rest = function () {
                    vm.params.name = '';
                    vm.params.gradeDept = '';
                    vm.params.subjectName = '';
                    vm.params.status = '';
                }

        }]);


