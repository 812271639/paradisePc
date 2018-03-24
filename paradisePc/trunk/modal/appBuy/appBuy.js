/**
 * Created by Administrator on 2018/1/10/010.
 */
myApp.controller("appBuyCtrl",function($uibModalInstance,$scope,items,$rootScope) {
    var vm = this;
    vm.ok = function () {
        //防止重复提交
        $rootScope.doubleClick(vm);
        $uibModalInstance.close();
    };
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});