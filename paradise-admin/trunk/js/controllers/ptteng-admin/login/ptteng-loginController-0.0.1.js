'use strict';
angular.module('admin')
    .controller('LoginCtrl', function ($scope, loginService, managerService, $state, $timeout) {
        var vm = $scope.vm = {};
        vm.name = "";
        vm.pwd = "";

        $scope.submit = function () {
            loginService.login({name: vm.name, pwd: vm.pwd}).then(function (res) {
                if (res.data.code == 0) {
                    $state.go("field.home");
                    managerService.saveSelfDetail(res.data.data);
                } else {
                    vm.errorTip = res.data.message;
                    $timeout(function () {
                        vm.errorTip = "";
                    }, 3000);
                }
            });
        };
    });