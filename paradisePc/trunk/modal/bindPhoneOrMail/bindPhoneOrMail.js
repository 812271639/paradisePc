//绑定手机号或者邮箱模态框控制器
myApp.controller('ModalBindPhoneOrMailCtrl', function($uibModalInstance, $scope, items, $interval, user, $state, $rootScope) {
    var vm = this;
    vm.params = {};
    vm.checkCodeResult = true;
    vm.checkNameResult = false;
    vm.mailButton = false;
    vm.codeGet = "123456";

    vm.checkCodeResult2 = true;
    vm.checkNameResult2 = false;
    vm.phoneButton = false;
    vm.codeGet2 = "123456";
    if (items == "phone") {
        vm.phone = true;
        vm.title = "绑定手机号";
    } else {
        vm.phone = false;
        vm.title = "绑定邮箱";
    }
    ////console.log(items);
    vm.ok = function() {
        if (items == "phone") {
            ////console.log("绑定手机模态框确认关闭")
            $uibModalInstance.close();
        } else if (items == "mail") {
            ////console.log("绑定邮箱模态框确认关闭")
            $uibModalInstance.close();
        }

    };
    vm.cancel = function() {
        if (items == "phone") {
            ////console.log("绑定手机模态框取消关闭")
            $uibModalInstance.dismiss('cancel');
        } else if (items == "mail") {
            ////console.log("绑定邮箱模态框取消关闭")
            $uibModalInstance.dismiss('cancel');
        }
    };
    //绑定邮箱
    // vm.getCode=function(b){
    //   //console.log(b)
    //   if(b){
    //     //console.log("表单验证通过，请求发送验证码短信")
    //   }
    // }
    vm.checkName = function(b) {
        vm.checkNameResult = false;
        ////console.log(b);
        if (!b) { //如果表单验证通过,进行请求
            vm.params.type = 'mail';
            vm.params.openid = vm.mail;
            user.getVerifyAccount(vm.params).then(function(res) {
                if (res.data.code==0) { //未注册无返回code,暂时用这个字段！！
                    if(res.data.register){
                        vm.checkNameResult = true;
                    }
                } else if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }

    }
    vm.checkCode = function() {
        vm.checkCodeResult = false;
        if (vm.code === vm.codeGet) {
            vm.checkCodeResult = true;
            return true;
        } else {
            return false;
        }
    }
    vm.bindMail = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
        vm.mailButton = true;
        //去除多余字段
        delete eval(vm.params).mail;
        if (b /*&&vm.checkCode()*/ ) { //影响请求，已注释！
            vm.params.type = "mail";
            vm.params.openid = vm.mail;

            user.putBindPhone(vm.params).then(function(res) {
                ////console.log(res);
                if (res.data.code == 0) {
                    //alert("绑定成功！");
                    vm.cancel();
                    $state.go($state.current, {}, { reload: true });
                } if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    $rootScope.alert(res.data.message);
                }
            })

        }
    }
    //获取验证码按钮初始赋值
    vm.getTips = "获取验证码";
    vm.getcode = false;
    vm.voice = false;
    vm.getCode = function(b) {
        if (b) {
            //去除多余字段
            delete eval(vm.params).verify;
            delete eval(vm.params).openid;
            vm.params.mail = vm.mail;
            vm.params.type = "bind";
            //(vm.params);
            user.postSendMailCode(vm.params).then(function(res) {
                if (res.data.code == 0) {
                    vm.codeButton = true;
                    ////console.log("表单验证通过，请求发送验证码短信");
                    //vm.getcode = true;
                    $rootScope.timer(vm);
                }if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
    }

    //绑定手机号
    // vm.getCode2=function(b){
    //   //console.log(b)
    //   if(b){
    //     //console.log("表单验证通过，请求发送验证码短信")
    //   }
    // }
    vm.checkName2 = function(b) {
        vm.checkNameResult2 = false;
        ////console.log(b);
        if (!b) { //如果表单验证通过,进行请求
            vm.params.type = 'mobile';
            vm.params.openid = vm.name2;
            user.getVerifyAccount(vm.params).then(function(res) {
                if (res.data.code==0) { //未注册无返回code,暂时用这个字段！！
                    if(res.data.register){
                        vm.checkNameResult2 = true;
                    }
                    ////console.log(vm.checkNameResult2);
                    ////console.log('无法绑定！');
                }if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    $rootScope.alert(res.data.message);
                }
            })

        }
    }
    vm.checkCode2 = function() {
        vm.checkCodeResult2 = false;
        if (vm.code2 === vm.codeGet2) {
            vm.checkCodeResult2 = true;
            return true;
        } else {
            return false;
        }
    }
    vm.bindPhone = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
        vm.phoneButton = true;
        delete eval(vm.params).mobile;
        if (b /*&&vm.checkCode()*/ ) { //影响请求，已注释！
            ////console.log("进行绑定邮箱请求")
            //去除多余字段
            vm.params.type = "mobile";
            //改字段名！
            vm.params.openid = vm.name2;
            vm.params.verify = vm.code2;
            //delete eval(vm.params).mobile; 清除，否则第二次点击没有字段！
            user.putBindPhone(vm.params).then(function(res) {
                ////console.log(res);
                if (res.data.code == 0) {
                    //alert("绑定成功！");
                    vm.cancel();
                    $state.go($state.current, {}, { reload: true });
                } if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
    }
    //验证码点击按钮
    vm.getTips2 = "获取验证码";
    vm.getcode2 = false;
    vm.voice2 = false;
    //获取验证码
    vm.getCode2 = function(b) {
        if (b) {
            delete eval(vm.params).verify;
            delete eval(vm.params).openid;
            vm.params.type = "register";
            vm.params.mobile = vm.name2;
            ////console.log(vm.params);
            user.postSendCode(vm.params).then(function(res) {
                ////console.log(res);
                if (res.data.code == 0) {
                    vm.codeButton = true;
                    ////console.log("表单验证通过，请求发送验证码短信");
                    //vm.getcode2 = true;
                    $rootScope.timer2(vm);
                }if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
    }
    vm.getVoice2 = function(b) {
        //var second = 9; //语音重新赋值！
        if (b) {
            delete eval(vm.params).verify;
            vm.params.type = "register";
            ////console.log(vm.params);
            user.postSendVoice(vm.params).then(function(res) {
                ////console.log(res);
                if (res.data.code == 0) {
                    vm.codeButton = true;
                    ////console.log("表单验证通过，请求发送验证码短信");
                    //vm.getcode2 = true;
                    $rootScope.timer2(vm);
                }if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
    }
});