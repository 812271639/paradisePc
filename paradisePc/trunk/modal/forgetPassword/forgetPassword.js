//忘记密码模态框控制器
myApp.controller('ModalForgetPasswordCtrl', function($uibModalInstance, $scope, $interval, $rootScope, user, $state, ipCookie) {
    var vm = this;
    vm.codeButton = false;
    vm.nextButton = false;
    vm.checkNameResult = false;
    vm.eb = false;
    vm.checkPasswordResult = false;
    vm.checkPassword2Result = false;
    vm.step2 = false;
    vm.params = {};

    /*var timer=function () {
     var second = 9;
     var timerHandler;
     vm.time = second + 1 + "s后重新获取";
     timerHandler = $interval(function() {
     if (second <= 0) {
     $interval.cancel(timerHandler); //当执行的时间59s结束时，取消定时器 ，cancle方法取消
     vm.canClick = false; //因为 ng-disabled属于布尔值，设置按钮可以点击，可点击发送
     vm.canClickVoice = false;
     vm.getcode = false;
     vm.voice = true;
     vm.nameChange = false;
     //console.log(vm.step2);
     } else {
     vm.time = second + "s后重新获取";
     second--;
     vm.canClick = true;
     vm.canClickVoice = true;
     }
     }, 1000) //每一秒执行一次$interval定时器方法

     }*/
    vm.params2 = {};
    vm.ok = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
        if (b) {
            vm.params.account = vm.params.openid;
            delete eval(vm.params).verify;
            delete eval(vm.params).type;
            delete eval(vm.params).openid;
            vm.params.newpwd = vm.password2;
            user.putForgetEditCode(vm.params).then(function(res) {
                if (res.data.code == 0) {
                    //vm.cancel();
                    vm.params2.account = vm.name;
                    vm.params2.pwd = vm.password2;
                    vm.params2.type = vm.name > 0 ? 'mobile' : 'mail';
                    vm.params2.os = 'web';
                    user.postLogin(vm.params2).then(function(res) {
                        if (res.data.code == 0) {
                            ipCookie("login2", true, { expires: 1 });
                            $state.go($state.current, {}, { reload: true });
                            vm.cancel();
                        } else {
                            console.log(res.data.message)
                        }
                    })
                } else {
                    console.log(res.data.message)
                }
            })
        }
        // $uibModalInstance.close();
    };
    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    /*。
    vm.checkName = function(b) {//这里可以不用做失焦验证
     vm.checkNameResult = false;
     ////console.log(b);
     if (!b) { //如果表单验证通过,进行请求
     vm.params.type = 'mobile';
     vm.params.openid=vm.params.mobile;
     delete eval(vm.params).mobile;
     user.getVerifyAccount(vm.params).then(function(res) {
     if (res.data.code!=0) { //未注册无返回code,暂时用这个字段！！
     vm.checkNameResult = true;
     ////console.log(vm.checkNameResult2);
     ////console.log('无法绑定！');
     }
     })
     }
     }*/
    /*vm.checkCode = function() {
     vm.checkCodeResult = false;
     if (vm.code === vm.codeGet) {
     vm.checkCodeResult = true;
     return true;
     } else {
     return false;
     }
     }*/
    vm.next = function(b) {
        vm.nextButton = true;
        if (b) {
            //防止重复提交
            $rootScope.doubleClick(vm);
            //去除多余字段
            delete eval(vm.params).areaCode;
            delete eval(vm.params).type;
            delete eval(vm.params).mail;
            delete eval(vm.params).mobile;
            vm.params.openid = vm.name;
            vm.params.type = 'password';

            user.getVifVerify(vm.params).then(function(res) {
                console.log(res)
                if (res.data.isVerify) {
                    vm.step2 = true;
                    vm.codeErr = false;
                } else {
                    vm.codeErr = true;
                }
            })

        }
    }
    //修改密码
    vm.checkPassword = function() { //新密码不能与原密码相同
        vm.checkPasswordResult = false;
        vm.isPsword = true
        vm.passwordGet = "123456";
        if (vm.password === vm.passwordGet) {
            vm.checkPasswordResult = false;
        }
    }
    vm.checkPassword2 = function() { //两次密码不一致
        vm.checkPassword2Result = false;
        vm.surePsword = true;
        if (vm.password2 === vm.password) {
            vm.checkPassword2Result = true;
        } else {
            vm.eb = true;
        }
    }
    //获取验证码按钮初始赋值
    vm.getTips = "获取验证码";
    vm.getcode = false;
    vm.voice = false;

    vm.getCode = function(b) {
        console.log("大门");
        if (b) {
            vm.params.type = "password";
            vm.params.mobile = vm.name;
            if (vm.params.mobile > 0) {
                vm.get = function() {
                    return user.postSendCode(vm.params);
                }
            } else {
                vm.params.mail = vm.name;
                //delete eval(vm.params).mobile;
                vm.get = function() {
                    return user.postSendMailCode(vm.params);
                }
            }
            //去除多余字段
            delete eval(vm.params).verify;
            vm.get().then(function(res) {
                console.log(res);
                if (res.data.code == 0) {
                    //验证发送成功后开始倒计时请求
                    vm.codeButton = true;
                    console.log("开始daojishi");
                    ////console.log("表单验证通过，请求发送验证码短信");
                    vm.checkNameResult = false;
                    // vm.getcode = true;
                    $rootScope.timer(vm);
                } else {
                    vm.checkNameResult = true;
                    vm.else = res.data.message;
                }
            })
        }
    }
    vm.getVoice = function(b) {
        delete eval(vm.params).verify;
        vm.params.type = "password";
        ////console.log(vm.params);
        user.postSendVoice(vm.params).then(function(res) {
            ////console.log(res);
            if (res.data.code == 0) {
                vm.codeButton = true;
                ////console.log("表单验证通过，请求发送验证码短信");
                // vm.getcode = true;
                $rootScope.timer(vm);
            } else {
                console.log(res.data.message)
            }
        })
    }
});