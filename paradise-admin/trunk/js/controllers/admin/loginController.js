angular.module("admin").controller('LoginController', ['$state', '$cookies', '$timeout', 'loginService', 'managerService', LoginController]);

function LoginController($state, $cookies, $timeout, loginService, managerService) {
    var vm = this;

    vm.submit = function () {
        var params = {
            name: vm.name,
            pwd: vm.pwd
        };
        loginService.login(params).then(function (res) {
            if (res.data.code == 0) {
                $cookies.login = "true";
                $state.go("field.dashboard");
                managerService.saveSelfDetail(res.data.data);
            } else {
                vm.errorTip = res.data.message;
                $timeout(function () {
                    vm.errorTip = "";
                }, 3000);
            }
        });
    }
}