'use strict';
angular.module('admin')
    .controller('helpListCtrl', function ($state, $scope, $rootScope, commonUtil, helpService) {
        var vm = this;
      
        vm.searchParam = $state.params || {};
        console.log($state.params)
        getList(vm.searchParam);
        vm.searchParam.type=2;
        // search
        vm.search = function () {
            vm.searchParam.page = 1;
            console.log(vm.searchParam);
            $state.go($state.current, vm.searchParam, {reload: true});
        };

        //rest
        vm.rest = function () {
            commonUtil.restParms(vm.searchParam);

        };
        vm.delete = function (id) {
            $rootScope.alert("是否删除该help？", function () {
                helpService.helpDelete(id).then(function(res) {
                    console.log(res)
                    if (res.data.code == 0) {
                        getList(vm.searchParam);
                        $rootScope.alert("help删除成功", function () {
                            $state.go("field.helpList");
                        },true);
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                })
        })
        }
        function getList(params) {
            console.log("传入的参数",params);
            helpService.helpList(params).then(function (res) {
                console.log("获取的数据",res);
                if (res.data.code == 0) {
                    vm.list = res.data.data.articleList;
                    console.log(vm.list);
                    vm.totalPage = res.data.totalPage;
                } else {
                    $rootScope.alert('请检查网络链接')
                }
            })
        }
    });