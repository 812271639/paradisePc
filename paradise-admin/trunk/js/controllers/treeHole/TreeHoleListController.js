
/**
 * Created by Master on 2017/5/1.
 */
'use strict';
angular.module('admin')
.controller('TreeHoleListController', ['$state', '$scope', '$rootScope', 'commonUtil', 'treeHoleService',
    function ($state, $scope, $rootScope, commonUtil, treeHoleService) {
        var vm = this;
        vm.params=$state.params;
        vm.params.minAt = +vm.params.minAt||'';
        vm.params.maxAt = +vm.params.maxAt||'';

        //树叶列表
        treeHoleList();
        function treeHoleList() {
            treeHoleService.treeHoleList(vm.params).then(function (res) {
                if (res.data.code===0){
                    vm.treeHoleList = res.data.data;
                    vm.totalPage = res.data.totalPage;
                }else {
                    $rootScope.alert(res.data.message||'检查网络或接口问题','',true);
                }
            })
        }
        //搜索
        vm.search = function () {
            vm.params.page = 1;
            //设置一天结束时间
            if (vm.params.maxAt){
                vm.params.maxAt=+vm.params.maxAt+86399999;
            }
            $state.go($state.current,vm.params,{reload:true});
        };
        //重置
        vm.rest = function () {
            commonUtil.restParms(vm.params);
            $state.go($state.current, vm.params, {reload: true})
        };
        //删除
        vm.delete = function (item) {
            $rootScope.alert('删除后不可恢复，确定要删除该条树叶信息吗？',function () {
                treeHoleService.treeHoleDelete(item.id).then(function (res) {
                    if (res.data.code===0){
                        treeHoleList();
                    }else {
                        $rootScope.alert(res.data.message||'检查网络或接口问题');
                    }
                })
            })
        }
    }]);
