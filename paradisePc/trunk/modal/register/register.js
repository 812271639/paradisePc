//注册模态框控制器
myApp.controller('ModalRegisterCtrl', function($uibModalInstance, $scope, $interval, user, ipCookie, $state, $rootScope) {
    var vm = this;
    vm.params = {};
    vm.codeButton = false;
    vm.registerButton = false;
    vm.checkNameResult = false;
    vm.checkImageResult = true;
    vm.checkCodeResult = true;
    vm.focusDisappear= false;
    vm.focusDisappearRight= false;
    vm.focusDisappearPhone= false;
    vm.focusDisappearLogin= false;


    //获取验证码按钮初始赋值
    vm.getTips = "获取验证码";
    vm.getcode = false;
    vm.voice = false;

    //检查是否是手机号函数
    function phone(b) {
        var reg = /^1[34578]\d{9}$/;
        if (reg.test(b)) {
            ////console.log("手机号")
            return true;
        } else {
            ////console.log("邮箱");
            return false;
        }
    };
    //判定用户名是否已存在的步骤2
    function checkAccount(b,c) {
        ////console.log(b);
        user.getVerifyAccount(b).then(function(res) {
            ////console.log(res);
            if (res.data.register == true) {
                vm.checkNameResult = true;
            }else{
                getCode2(c.item1,c.item2);
            }
                ;
            if(res.data.code==0){

            }else{
                // console.log(res.data.message);
            }

        })
    }
    //判定用户名是否已存在步骤1
    vm.checkName = function(b,c) {
            vm.checkNameResult = false;
            ////console.log(b);
            //判断是否是手机号
            if (phone(vm.params.account)) {
                vm.params.type = "mobile";
            } else {
                vm.params.type = "mail";
            }
            if (!b) { //如果表单验证通过,进行请求
                var params = {
                    openid: vm.params.account,
                    type: vm.params.type
                }
                     checkAccount(params,c);
            }
        }
    //刷新验证码图片
    $(document).ready(function(){
        $("#imageCode").click();
    })

    //请求发送手机验证码的函数

    function sentPhoneCode(params) {
        user.postSendCode(params).then(function(res) {
            ////console.log("手机验证码",res);
            if(res.data.code==0){
                $rootScope.timer(vm);
            }else if(res.data.code == -2007){
                vm.checkNameResult = true;
            } else{
                console.log(res.data.message);
                vm.limitNumer=true;
                vm.errorMessage = res.data.message;
            }
        })
    }
    //请求发送邮箱验证码
    function sentMailCode(params) {
        user.postSendMailCode(params).then(function(res) {
            ////console.log("邮箱验证码",res)
            if(res.data.code==0){
                $rootScope.timer(vm);
            }else{
                console.log(res.data.message)
            }

        })
    }
    //请求发送语音验证码
    function getVoice(b) {
        ////console.log("传入的参数",b);
        user.postSendVoice(b).then(function(res) {
            ////console.log("获得的参数",res)
            if(res.data.code==0){
                $rootScope.timer(vm);
            }else{
                console.log(res.data.message)
            }
        })
    }

    //获取语音验证码
    vm.getVoice = function(b) {
            if (b && vm.params.account > 0) {
                ////console.log("发送语音验证码")
                vm.getCode(true, "voice")
            }
        }
        //获取短信验证码
    vm.getCode = function(a, b) {
        vm.codeButton = true;
        var c={
            item1:a,
            item2:b
        };
        if(a){
        vm.checkName(false,c);
        }

    }
    //获取短信验证码第二布
    function getCode2(a,b){
        if (a) {
            ////console.log("表单验证通过，请求发送验证码短信");
            //请求发送语音验证码
            if (b == "voice") {
                console.log("发送语音")
                var params = {
                    areaCode: "+86",
                    mobile: vm.params.account,
                    type: "register"
                }
                getVoice(params);

                //发送普通验证码
            } else {
                console.log("发送")
                //如果是手机,发送手机验证码
                var b = phone(vm.params.account);
                if (b) {
                    console.log("发送手机")
                    var params = {
                        areaCode: "+86",
                        mobile: vm.params.account,
                        type: "register"
                    };
                    sentPhoneCode(params);

                    //如果不是手机，发送邮箱验证码
                } else {
                    console.log("发送邮箱")
                    var params = {
                        mail: vm.params.account,
                        type: "register"
                    }
                    sentMailCode(params);
                }
            }
            // $rootScope.timer(vm);
        }
    }


    vm.ok = function() {

        // $uibModalInstance.close();
    };
    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };


    //注册成功之后登录的函数
    function getLogin() {
        var b = phone(vm.params.account);
        var params = {
            account: vm.params.account,
            pwd: vm.params.pwd,
            os: "web"
        };
        if (b) {
            ////console.log("手机登录");
            params.type = "mobile"
        } else {
            ////console.log("邮箱登录");
            params.type = "mail"
        };
        user.postLogin(params).then(function(res) {
            ////console.log(res);
            if (res.data.code == 0) {
                ipCookie("login2", true);
                localStorage.setItem('token',res.data.token);
                vm.cancel();
                location.href = location.href;
            }else{
                // console.log(res.data.message);
            }
        })
    }
    //请求注册的函数
    function getRegister(b) {
        console.log("传入的参数",b);

        user.postRegister(b).then(function(res) {
            console.log("获得的参数",res);

            if (res.data.code == 0) {
                vm.tips=1;
                setTimeout(function () {
                    vm.tips=2;
                    console.log("注册成功？")
                    getLogin()
                },2000);
            } else {
                vm.showError = true;
                vm.errorMessage = res.data.message;
                console.log(res.data.message)
            }
        })
    }
    //注册函数
    vm.register = function(b) {
        //防止重复提交
        console.log("注册开始")
        $rootScope.doubleClick(vm);

        vm.registerButton = true;
        if (b && vm.checkImageResult && !vm.checkNameResult) {
             console.log("注册开始2")
            //如果是手机,配置参数
            var b = phone(vm.params.account);
            if (b) {
                vm.params.areaCode = "%2B86";
                 console.log("注册开始3")
                ////console.log("手机注册",vm.params);
            } else {
                ////console.log("邮箱注册",vm.params)
            }
            getRegister(vm.params);

        }
    }
    // 切换至登陆
    vm.login = function() {
                $rootScope.login()
            };


        //检查图片验证码是否正确
    vm.checkImage = function(b) {
         vm.focusDisappearRight= true;
        vm.checkImageResult = false;
        var params = {
            inputValue: vm.imageCode,
        }
        // console.log(vm.imageCode.length);
        if(b&&vm.imageCode.length>3){

        user.getCaptcha(params).then(function(res) {
            console.log(res);
            if (res.data.code == 0) {
                vm.checkImageResult = true;
            } else {
                vm.checkImageResult = false;
                console.log(res.data.message)
            }
        })

        }
    }
    //账号输入清空错误
    vm.focusAccount=function(){
        vm.showError=false;
        vm.checkNameResult=false;
        vm.nameChange=true;
        //下面是验证焦点状态
        vm.focusDisappear=true;


    }
    vm.focusImage=function(){
        // vm.checkImageResult = true;
    }

});