angular.module('admin').controller('moduleDetailCtrl', ['$rootScope', '$state', 'moduleService', '$scope', 'commonUtil', moduleDetailCtrl]);

function moduleDetailCtrl($rootScope, $state, moduleService, $scope, commonUtil) {
    var vm = this;
    vm.id = $state.params.id;

    if (vm.id) {
        moduleService.getModule(vm.id).then(function (res) {
            if (res.data.code == 0) {
                vm.data = res.data.data.module;
            } else {
                commonUtil.showErrMsg(res);
            }
        });
    }


    vm.saveOrUpdate = function () {

        moduleService.saveOrUpdateModule($state.params.id, $scope.vm.data, "field.module");


    }
}
