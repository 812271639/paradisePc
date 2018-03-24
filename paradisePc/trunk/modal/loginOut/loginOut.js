angular.module('myApp')
    .controller('loginOutCtrl', ['$rootScope', '$uibModalInstance', 'items', 'user', '$timeout',
        function($rootScope, $uibModalInstance, items, user, $timeout) {
            var vm = this;
            vm.data = items;
            console.log(vm.data);

            vm.sure=function () {
                $uibModalInstance.dismiss('cancel');
                $rootScope.login();
            }
        }]);