//更换手机号模态框控制器
myApp.controller('ModalChangePhoneNumberCtrl', function($state, user, $uibModalInstance, $scope, $interval, $rootScope) {
    var vm = this;
    vm.step2 = false;
    vm.checkNameResult = false;
    vm.checkCodeResult = true;
    vm.codeGet = "123456";
    vm.step1Button = false;

    vm.checkName2Result = false;
    vm.checkCode2Result = true;
    vm.codeGet2 = "123456";
    vm.step2Button = false;
    vm.closeWindown = true;
    vm.ok = function() {
        $uibModalInstance.close();
    };
    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    //验证原手机号是否注册
    vm.check = function () {
        vm.oldPhoneMsg = false
    }

    vm.getTips = "获取验证码";
    vm.getcode = false;
    vm.voice = false;
    //获取验证码/语音验证码
    vm.getCode = function(b, type) {
        if (b) {
            var obj = {};
            obj.areaCode = '+86';
            obj.mobile = vm.name;
            obj.type = 'bind';
            if (type == 1) {
                //短信验证码
                user.postSendCode(obj).then(function(res) {
                    if(res.data.code ===0){
                        $rootScope.timer(vm);
                    }else  if(res.data.code==-4){
                        $uibModalInstance.dismiss('cancel');
                        $rootScope.loginOut();
                    }else {
                        alert(res.data.message);
                    }
                });
            } else if (type == 2) {
                // 语音验证码
                user.postSendVoice(obj).then(function(res) {
                    if(res.data.code ===0){
                        $rootScope.timer(vm);
                    }else if(res.data.code==-4){
                        $uibModalInstance.dismiss('cancel');
                        $rootScope.loginOut();
                    }else {
                        alert(res.data.message);
                    }
                })
            }
        }
        vm.codeButton = true;
    };
    //验证手机号是否属于当前用户
    vm.getVifPhone = function (b, type) {
        var obj = {};
        obj.openid = vm.name;
        user.getVifPhone(obj).then(function (res) {
            if (res.data.code === 0){
                if(res.data.data.isOwner == true){
                    //手机号正确执行验证码获取。
                    vm.getCode(b, type);

                }else if (res.data.data.isOwner == false){
                    vm.oldPhoneMsg = '输入的手机号不正确';
                    return;
                }

            }else if(res.data.code==-4){
                $uibModalInstance.dismiss('cancel');
                $rootScope.loginOut();
            }else {
                alert(res.data.message);
            }
        })
    };
    //提交判断验证码是否正确
    vm.next = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
        vm.step1Button = true;
        if (b) {
            var obj = {};
            obj.openid = vm.name;
            obj.type = 'bind';
            obj.verify = vm.code;
            user.getVifVerify(obj).then(function (res) {
                if(res.data.code ===0 ){
                    if(res.data.isVerify == true){
                        vm.step2 = true;
                    }else if(res.data.isVerify == false){
                        return
                    }

                }else if(res.data.code == -2005) {
                    vm.errCodeMsg2005 ='验证码错误'

                }else if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    alert(res.data.message);
                }
            })
        }
    };

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    //新手机号的code 码
    vm.getCode2 = function(b, type) {
        if (b) {
            var obj = {};
            obj.areaCode = '+86';
            obj.mobile = vm.name2;
            obj.type = 'register';
            if (type == 1) {
                user.postSendCode(obj).then(function(res) {
                    if(res.data.code ===0){
                        $rootScope.timer2(vm)
                    }else if(res.data.code ===-2007){
                        vm.newPhoneMsg ='该手机号已注册';
                    } else if(res.data.code==-4){
                        $uibModalInstance.dismiss('cancel');
                        $rootScope.loginOut();
                    }else {
                        alert(res.data.message);
                    }
                });
            } else if (type == 2) {
                user.postSendVoice(obj).then(function(res) {
                    if(res.data.code === 0){
                        $rootScope.timer2(vm)

                    }else if(res.data.code==-4){
                        $uibModalInstance.dismiss('cancel');
                        $rootScope.loginOut();
                    }else {
                        alert(res.data.message);
                    }
                })
            }
        }
        vm.codeButton = true;
    };
    //验证手机号是否注册
    vm.getIsVifNewPhone = function (b, type) {
        var obj = {};
        obj.openid = vm.name2;
        obj.type = 'mobile';
        user.getVifNewPhone(obj).then(function (res) {
            if (res.data.code == 0){
                if(!res.data.register){
                    //手机号正确执行验证码获取。
                    vm.getCode2(b, type);

                }else if (res.data.register){
                    vm.newPhoneMsg = '输入的手机号不正确';
                    return;
                }

            }else if(res.data.code==-4){
                $uibModalInstance.dismiss('cancel');
                $rootScope.loginOut();
            }else {
                alert(res.data.message);
            }

        })
    };
    //提交新手机号
    vm.complete = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
        vm.step2Button = true;
        if (b) {
            var obj = {};
            obj.verify = vm.code2;
            obj.openid = vm.name2;
            obj.type = 'mobile';
            user.putBindPhone(obj).then(function(res) {
                if(res.data.code ===0 ) {
                    vm.cancel();
                    $state.go($state.current, {}, {reload: true});
                }else if(res.data.code == -2005){
                        vm.errNewCodeMsg ='验证码错误'
                 }else if(res.data.code == -2035){
                    vm.newPhoneMsg =res.data.message;
                }else if(res.data.code==-4){
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.loginOut();
                }else {
                    alert(res.data.message);
                }
            })
        }
    };
    vm.getTips2 = "获取验证码";
    vm.getcode2 = false;
    vm.voice2 = false;
    //打开登录模态框
    vm.login = function() {
        $rootScope.login();
    }

});