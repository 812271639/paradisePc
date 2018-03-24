angular.module('admin').controller('moduleCtrl', ['$rootScope', '$state', 'moduleService', '$scope', 'commonUtil', moduleCtrl]);

function moduleCtrl($rootScope, $state, moduleService, $scope, commonUtil) {
    var vm = this;
    moduleService.getModuleList().then(function (res) {
        if (res.data.code == 0) {
            vm.next = res.data.data.next;
            vm.list = res.data.data.moduleList;
            vm.totalPage = res.data.data.totalPage;
        } else {
            commonUtil.showErrMsg(res);
        }
    });

    vm.delete = function (id) {
        $rootScope.alert("您确定要删除吗？", function () {
            moduleService.deleteModule(id).then(function (res) {

                commonUtil.showReturnMsg(res, "field.module");


            });
        });

    };
}