'use strict';
angular.module('admin')
    .controller('newSchoolCtrl', ['$state', '$scope', '$rootScope', 'schoolManage', '$stateParams',newSchoolCtrl]);

function newSchoolCtrl($state,$scope,$rootScope,schoolManage,$stateParams){
    var vm = this;
    //判断新增还是编辑
    vm.title=$stateParams.id?"编辑学校":"新增学校";
    vm.name=$stateParams.name;
    vm.params={};
    //保存学校
    vm.done=function () {
        vm.params.name=vm.name;
        schoolManage.editSchool($stateParams.id,vm.params).then(function (res) {
            //console.log(res);
            //成功后返回上一页
            if(res.data.code==0){
                window.history.go(-1);
            }
            //异常状态简单弹窗
            else {
                alert(res.data.message);
            }
        })
    }
}
