//设置密码或者修改密码模态框控制器
myApp.controller('ModalChangePasswordCtrl', function($uibModalInstance, $scope, items, $rootScope, user,main,$state,ipCookie) {
    var vm = this;
    if (items == "change") {
        vm.change = true;
        vm.title = "修改密码";
    } else {
        vm.change = false;
        vm.title = "设置密码";
    }
    vm.ok = function() {
        if (items == "change") {
            ////console.log("修改密码模态框确认关闭")
            $uibModalInstance.close();
        } else if (items == "setting") {
            ////console.log("设置密码模态框确认关闭")
            $uibModalInstance.close();
        }
    };
    vm.cancel = function() {
        if (items == "change") {
            ////console.log("修改密码模态框取消关闭")
            $uibModalInstance.dismiss('cancel');
        } else if (items == "setting") {
            ////console.log("设置密码模态框取消关闭")
            $uibModalInstance.dismiss('cancel');
        }
    };
    //用户登出
    vm.logout = function() {
        main.postUserLoginOut().then(function(res) {
            if (res.data.code === 0) {
                ipCookie.remove("login2");
                //delete ipCookie("cookieS");
                //console.log('退出成功，现在状态：',ipCookie("login2") )
                localStorage.removeItem("token");
                $state.go('main.home', {}, { reload: true });
                var payX = {
                    pay: 4
                }
                $rootScope.memberActive(payX);
                // $state.go($state.current, {}, {reload: true});
            }else if(res.data.code==-4){
                $uibModalInstance.dismiss('cancel');
                $rootScope.loginOut();
            }else {
                alert(res.data.message);
            }
        })
    };

    //修改密码
    vm.changePassword = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
            if (b) {
                ////console.log("表单验证成功，发送修改密码请求");

                var obj = {}
                obj.oldPwd = vm.password;
                obj.newPwd = vm.password3;
                user.putMdfPwd(obj).then(function(res) {
                    if (res.data.code === 0) {

                        $uibModalInstance.dismiss('cancel');
                        // $state.go('main.home');
                        vm.logout();

                    } else if (res.data.code == -2006) {
                        vm.errMsg = res.data.message;
                    } if(res.data.code==-4){
                        $uibModalInstance.dismiss('cancel');
                        $rootScope.loginOut();
                    }else {
                        // console.log(res.data.message);
                        // alert(res.data.message);
                    }
                });

            }
        }
        //设置密码
        // vm.settingPassword=function(b){
        //   if(b){
        //     //console.log("表单验证成功，发送设置密码请求")
        //   }
        // }
});