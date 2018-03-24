'use strict';
angular.module('admin')
    .controller('schoolCtrl', ['$state',  'schoolManage','commonUtil', schoolCtrl]);

function schoolCtrl($state,schoolManage,commonUtil){
    var vm = this;

    vm.params = $state.params;
    schoolManage.getSchoolList(vm.params).then(function (res) {
        //确认分页页数
        vm.totalPage=Math.ceil(res.data.total/res.data.size);
        vm.list=res.data.data;
    })

    //搜索列表
    vm.search=function () {
        //console.log(vm.params);
        $state.go($state.current, vm.params, {reload: true});
    }
    vm.clear=function () {
        commonUtil.restParms(vm.params);
        /*$state.go($state.current, vm.params, {reload: true});*/
    }
}
