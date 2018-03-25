/**
 * Created by Master on 2017/4/30.
 */
'use strict'
angular.module('paradiseApp')
.controller('LeavesController', ['commonUnit', '$state', '$log', '$timeout', '$scope', '$rootScope','treeHoleService',
    function (commonUnit, $state, $log, $timeout, $scope, $rootScope, treeHoleService) {
        var vm = this;
        vm.perfection = function () {
            if (vm.content) {
                treeHoleService.treeHoleAdd({content:vm.content}).then(function (res) {
                    if (res.data.code===0){
                        // $rootScope.showTips('添加成功');
                        $state.go('treeHole');
                    }
                })
            } else {
                $rootScope.showTips('请输入正文')
            }

        }
    }])