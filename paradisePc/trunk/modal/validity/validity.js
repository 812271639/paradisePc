/**
 * Created by Administrator on 2018/1/9/009.
 */
myApp.controller('validityCtrl',function($uibModalInstance, $scope, $rootScope){
    var vm =this;
    vm.ok = function () {
        //防止重复提交
        $rootScope.doubleClick(vm);
        $uibModalInstance.close();
    };
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});