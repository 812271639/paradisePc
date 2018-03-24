angular.module('admin').controller('managerCtrl', ['$state', '$scope', '$rootScope', 'commonUtil', 'managerService', 'roleService', managerCtrl]);

function managerCtrl($state, $scope, $rootScope, commonUtil, managerService, roleService) {
    var vm = this;
    $scope.rid_role = {};
    vm.roleList = [];
    var roleParam = {size: 65535};

    function getRoleList(ids) {
        managerService.batchGetManager(ids).then(function (res) {
            console.log(res);
            if (res.data.code == 0) {
                vm.list = res.data.data.managerList;
            } else {
                commonUtil.showErrMsg(res);
            }

        });
    }

    function getManagerList() {
        managerService.getManagerList().then(function (res) {
            if (res.data.code == 0) {
                vm.next = res.data.data.next;
                vm.list = res.data.data.managerList;
                vm.totalPage = res.data.data.totalPage;

            } else {
                commonUtil.showErrMsg(res);

            }
        });
    }

    getManagerList();


    vm.delete = function (id) {

        $rootScope.alert("您确定要删除吗？", function () {
            managerService.deleteManager(id).then(function (res) {
                $state.go("field.manager", null, {reload: true});
            });
        });

    };


    roleService.getRoleList(roleParam).then(function (res) {
        //console.log(res)
        if (res.data.code == 0) {
            roleService.batchGetRole(res.data.data.ids).then(function (res) {
                if (res.data.code == 0) {
                    vm.roleList = res.data.data.roleList;
                    vm.roleList.push({id: -1, name: "全部角色"});
                } else {
                    commonUtil.showErrMsg(res);
                }
            });
        } else {
            commonUtil.showErrMsg(res);
        }

    });

    // search
    vm.rid = {};
    vm.search = function () {


        if (vm.rid < 0) {
            getManagerList();

        } else {
            searchManager(vm.rid);
        }
    };

    // init
    function searchManager(param) {

        roleService.getRoleManager(param).then(function (res) {
            if (res.data.code == 0) {
                vm.listIds = res.data.data.ids;

                getRoleList(vm.listIds);
            } else {
                commonUtil.showErrMsg(res);
            }
        });
    }


}
