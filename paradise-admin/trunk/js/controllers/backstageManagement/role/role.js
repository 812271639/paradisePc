angular.module('admin').controller('roleCtrl', ["$state", "$scope", "$rootScope", "commonUtil", "roleService", roleCtrl]);

function roleCtrl($state, $scope, $rootScope, commonUtil, roleService) {
    var vm = this;
    vm.search = {
        page: $state.params.page || 1
    };

    roleService.getRoleList(vm.search).then(function (res) {


        if (res.data.code == 0) {
            vm.page = {
                next: res.data.data.next || 0,
                size: res.data.data.size || 0,
                page: res.data.data.page || 0,
                total: res.data.data.total || 0
            };
            vm.totalPage = res.data.data.totalPage;
            //vm.totalPage=Math.ceil(res.data.data.total/res.data.data.size);
            roleService.batchGetRole(res.data.data.ids).then(function (res) {

                console.log(res)
                if (res.data.code == 0) {

                    vm.list = res.data.data.roleList;

                } else {
                    commonUtil.showErrMsg(res);
                }
            });

        } else {
            commonUtil.showErrMsg(res);
        }
    });


    vm.delete = function (id) {

        $rootScope.alert("您确定要删除吗？", function () {
            roleService.deleteRole(id).then(function (res) {
                $state.go("field.role", null, {reload: true});

            });
        });

    };
};