//微信登录之后绑定账号模态框控制器
myApp.controller('ModalAfterWeChatCtrl', function($uibModalInstance, $scope, $rootScope, $interval, user, ipCookie,$state,$location) {
    var vm = this;
    vm.codeButton = false;//是否点击了获取验证码按钮
    vm.registerButton = false;//是否点击了注册按钮
    vm.checkNameResult = false;//绑定账号时检查账号是否存在以及是否已经被绑定
    vm.checkName2Result = false;//注册账号时检查账号是否存在以及是否已经被绑定
    vm.checkImageResult = true;
    vm.checkImage2Result = true;
    vm.checkCodeResult = true;
    vm.closeImage = "images/remove3.jpg";
    vm.haveAccount = false;//设置默认显示页面

    /*共同部分*/

    //获取存储的微信头像和openId;
    vm.headImgUrl=sessionStorage.getItem("headImgUrl");
    vm.openId=sessionStorage.getItem("openId");
    vm.nickName=sessionStorage.getItem("nickName");
    //切换tab
    vm.changeTab = function(a) {
        if (a == 2) {
            vm.haveAccount = false;
        } else {
            vm.haveAccount = true;
        }
    }
    //关闭模态框
    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    //开通会员后的跳转
    vm.sureSuccess1=function(){
          $state.go("main.user.detail");
           vm.cancel();
        }
    //验证图片验证码是否正确
    function verifyImageCode(params,b){
        user.getCaptcha(params).then(function(res) {
            if (res.data.code == 0) {
                if(b==1){
                    vm.checkImageResult=true;
                }else{
                vm.checkImage2Result=true;
                }
            } else {
                vm.checkImageResult=false;
                vm.checkImage2Result=false;
                // console.log(res.data.message);
            }
        })
    }
    //检查手机号是否已经绑定其他微信号
    function verifyAccountLogin(params){
        user.getWechatBindInfo(params).then(function(res){
            if(res.data.code==0){
                //执行成功操作
            }else{
                vm.checkNameResult=true;
                vm.bindMessage=res.data.message;
                // console.log(res.data.message);
            }
        })
    }
    //微信绑定账号登陆
    function wechatBindLogin(params){
        user.postLogin(params).then(function(res) {
            //console.log(res);
            if (res.data.code == 0) {
                //保存cookie
                ipCookie("login2", true, { expires: 60 });
                //console.log( "登陆成功,状态：",ipCookie("cookieS") )
                localStorage.setItem('token',res.data.token);
                location.href = $location.$$absUrl;
                // $state.go($state.current, {code:''}, { reload: true });
                vm.cancel();
            } else {
                console.log(res.data.message);
            }
        });
    }




    /*登录部分，绑定账号部分*/

    //点击忘记密码打开忘记密码模态框
    vm.forgetPassword = function() {
            $rootScope.forgetPassword();
            //设置前一个模态框延迟消失避免页面闪烁
            var setBlur = function() {
                $uibModalInstance.dismiss();
            }
            setTimeout(setBlur, 100);
        }

    //检查账号是否已经被绑定;或者是否存在
    vm.checkName = function(b) {
        if (!b) { //如果表单验证通过,进行请求
        var params={
            os:"web",
            account:vm.name
        }
        params.type=vm.name>0?"mobile":"mail";
        verifyAccountLogin(params)
        }
    }
    //鼠标移入账号输入框去掉错误信息
    vm.focusName=function(){
        vm.checkNameResult=false;
        vm.showError=false;
    }

    //检查图片验证码是否正确
    vm.checkImage = function(b) {
        vm.checkImageResult=false;
        var params = {
            inputValue: vm.imageCode
        }
        //当验证码长度大于3的时候才进行请求
        if(b&&vm.imageCode.length>3){
        verifyImageCode(params,1)
        }
    }
    //鼠标移入输入图片验证码输入框去掉错误信息
    vm.focusImage=function(){
        vm.checkImageResult = true;
    };
    //绑定账号按钮点击
    vm.bindAccount = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
        //console.log(b);
        if (b) {
            //console.log("检查通过");
            var params = {
                openid: vm.openId,
                account: vm.name,
                pwd: vm.password,
                os: "web"
            };
            params.type=vm.name>0?"mobile":"mail";
            wechatBindLogin(params);
        }
    }






    /*注册部分，没有账号完善资料部分*/
    //注册部分

    //判定用户名是否已存在的请求
    function checkAccount2(params,c) {
        user.getVerifyAccount(params).then(function(res) {
            //console.log(res);
            if(res.data.code==0){

            if (res.data.register == true) {
               vm.checkName2Result=true;
            }else{
                getCode2(c.item1,c.item2);
            };
            }else{
                // console.log(res.data.message);
            }

        })
    }
    //判定用户名是否已存在的函数
    vm.checkName2 = function(b,c) {
        if (!b) { //如果表单验证通过,进行请求
            params2={
                openid:vm.name2,
                type:vm.name2>0?"mobile":"mail"
            }
            checkAccount2(params2,c);
        }
    }
    //进入用户名输入框清空错误
    vm.focusName2=function(){
        vm.checkName2Result=false;
        vm.showError2=false;
    }

    //检查图片验证码是否正确
    vm.checkImage2 = function(b) {
        vm.checkImage2Result=false;
        var params = {
            inputValue: vm.imageCode2
        }
        //当验证码长度大于3的时候才进行请求
        if(b&&vm.imageCode2.length>3){
        verifyImageCode(params,2)
        }
    }

    //鼠标移入输入图片验证码输入框去掉错误信息
    vm.focusImage2=function(){
        vm.checkImage2Result = false;
    }
    //请求发送手机验证码的函数
    function sentPhoneCode(params) {
        user.postSendCode(params).then(function(res) {
            if(res.data.code==0){
            }else{
                console.log(res.data.message);
            }
        })
    }
    //请求发送邮箱验证码
    function sentMailCode(params) {
        user.postSendMailCode(params).then(function(res) {
            if(res.data.code==0){
            }else{
                console.log(res.data.message);
            }
        })
    }
    //请求发送语音验证码
    function getVoice(b) {
        //console.log("传入的参数",b);
        user.postSendVoice(b).then(function(res) {
            if(res.data.code==0){
            }else{
                console.log(res.data.message);
            }
        })
    }

    //获取语音验证码
    vm.getVoice = function(b) {
            if (b && vm.name2 > 0) {
                vm.getCode(true, "voice")
            }
        }
    //注册时的请求
    function getRegister(params) {
            //console.log("传入的参数",b);
            user.postRegister(params).then(function(res) {
                //console.log("获得的参数",res);
                if (res.data.code == 0) {
                    vm.login()
                }else{
                    vm.showError2=true;
                    vm.errorMessage2=res.data.message;
                    // console.log(res.data.message)
                }
            })
    }
    //真正的注册函数
    vm.register = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
        vm.registerButton = true;
        if (b && vm.checkImage2Result && !vm.checkName2Result) {
            var params={
                account:vm.name2,
                verify:vm.code,
                pwd:vm.password2,
                openid:vm.openId
            };
            //如果是手机
            if (vm.name2>0){
                params.areaCode = "%2B86";
            };
            getRegister(params);
        }
    }
    //登陆时进行的请求
    function getLogin(params){
        user.postLogin(params).then(function(res) {
                //console.log(res);
                if (res.data.code == 0) {
                    //保存cookie
                    ipCookie("login2", true, { expires: 60 });
                    vm.changeUserDetail();
                }else{
                // console.log(res.data.message);
                }
            })
    }
    //注册成功之后登录的函数
    vm.login=function(){
        var params = {
            account: vm.name2,
            pwd: vm.password2,
            os: "web"
        };
        params.type=vm.name2>0?"mobile":"mail";
        getLogin(params);
    }
    //修改个人资料的请求
    function changeUserInformation(params){
        user.postLogin(params).then(function(res) {
            if(res.data.code==0){
                localStorage.setItem('token',res.data.token);
                location.href = $location.$$absUrl;
                // $state.go($state.current, {}, { reload: true });
                vm.cancel();
            }else{
                console.log(res.data.message);
            }
        })
    }
    //修改个人资料的函数
    vm.changeUserDetail=function(){
        var params = {
            img:vm.headImgUrl,
            alias:vm.nickName
        }
        changeUserInformation(params);
    }

    //获取验证码按钮初始赋值
    vm.getTips = "获取验证码";
    vm.getcode = false;
    vm.voice = false;

    //获取短信验证码
    vm.getCode = function(a, b) {
        vm.codeButton = true;
        var c={
            item1:a,
            item2:b
        };
        if(a){

        vm.checkName2(false,c);
        }
    }
    //获取短信验证码第二部
    function getCode2(a,b){
        if (a) {
            //请求发送语音验证码
            if (b == "voice") {
                console.log("发送语音验证码")
                var params = {
                    areaCode: "+86",
                    mobile: vm.name2,
                    type: "register"
                }
                getVoice(params);

                //发送普通验证码
            } else {

                //如果是手机,发送手机验证码
                if (vm.name2>0) {
                    console.log("发送短信验证码")
                    var params = {
                        areaCode: "+86",
                        mobile: vm.name2,
                        type: "register"
                    };
                    sentPhoneCode(params);

                    //如果不是手机，发送邮箱验证码
                } else {
                    console.log("发送邮箱验证码")
                    var params = {
                        mail: vm.name2,
                        type: "register"
                    }
                    sentMailCode(params);
                }
            };
            $rootScope.timer(vm);
        }
    }

});