angular.module('admin').controller('managerDetailCtrl', ['$state', '$scope', '$rootScope', 'commonUtil', 'managerService', 'roleService','$timeout', managerDetailCtrl]);

function managerDetailCtrl($state, $scope, $rootScope, commonUtil, managerService, roleService,$timeout) {
    var vm = this;
    vm.data={};
    vm.id = $state.params.id;
    var roleParam = {size: 65535};
    vm.data={};
    vm.req=true;

    $scope.roleList = {};

    vm.change=function () {
        console.log("切换选项");
        console.log(vm.data.roleID);
        if(vm.data.roleID==159){
            vm.checked=true;
        }
        else {
            vm.checked=false;
        }
        if(!vm.data.roleID){
            vm.req=true;
        }
    }

    vm.schoolCheckbox=function () {
        console.log(vm.checked)
        if(!vm.checked){
            vm.data.roleID=undefined;
            vm.req=true;
        }
        else {
            vm.req=false;
        }
    }


    //编辑时用户详情渲染
    if(vm.id){

        managerService.getManager(vm.id).then(function (res) {
            //console.log('渲染用户详情',res);
            vm.data = res.data.data.manager;
            //console.log(vm.data.roleID);

            if(vm.data.schoolId){
                vm.checked=true;
            }
            else {
                vm.checked=false;
            }
        })
    }

    //角色列表下拉渲染
    roleService.getRoleList(roleParam).then(function (res) {
        //console.log('角色列表下拉渲染',res);
        if (res.data.code == 0) {
            //vm.roleList = res.data.data.roleList;
            roleService.batchGetRole(res.data.data.ids).then(function (res) {

                if (res.data.code == 0) {
                    vm.roleList = res.data.data.roleList;
                } else {
                    commonUtil.showErrMsg(res);
                }
            });
        } else {
            commonUtil.showErrMsg(res);
        }
    });
    vm.saveOrUpdate = function () {
        if(vm.checked){
            vm.data.roleID=159;
        }
        /*var res*/
        managerService.saveOrUpdateManager(vm.id, vm.data, "field.manager" );
    }
}
