angular.module('admin').controller('pwdCtrl', ['$rootScope', '$state', 'pwdService', '$scope', 'commonUtil', pwdCtrl]);

function pwdCtrl($rootScope, $state, pwdService, $scope, commonUtil) {
    var vm = this;


    vm.save = function () {
        console.log(vm.data)
        if (vm.data.newPwd == vm.data.newPwdAgain) {
            pwdService.changePwd(vm.data).then(function (res) {
                console.log(res)
                if (res.data.code == 0) {
                    $rootScope.alert("密码修改成功")
                } else {
                    $rootScope.alert(res.data.message)
                }
                vm.data = {}
            })
        } else {
            var res = {};
            res.data = {};
            res.data.message = "密码不一致";

            commonUtil.showErrMsg(res);

        }
    };

}
