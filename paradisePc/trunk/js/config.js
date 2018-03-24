var myApp = angular.module('myApp', [
    'ui.router',
    'oc.lazyLoad',
    'ui.bootstrap',
    'ngAnimate',
    'ngMessages',
    'ipCookie',
    'infinite-scroll',
    'angularFileUpload',
    'monospaced.qrcode',]);

myApp.factory('adminInterceptor', adminInterceptor);

myApp.config(projectRouteConfig);

myApp.config(httpConfig);


myApp.run(function($rootScope, $uibModal, $log, $document, $state, $stateParams, ipCookie, $templateCache, $location, $timeout, $interval,main) {
    //获取用户信息
    main.getUserMsg().then(function(res) {
        if (res.data.code === 0) {
            console.log(res);
            localStorage.setItem('user',JSON.stringify(res.data.data));
        }else {
            console.log(res.data.message);
        }
    });
    $rootScope.player = null;
    var modal = function(ctrl, templateUrl, data, fun1, fun2) {
        if (!data) { //如果要注入fun1,fun2,必须注入data
            data = "";
        }
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: templateUrl,
            controller: ctrl,
            controllerAs: 'vm',
            size: 'sm',
            resolve: {
                items: function() {
                    return data;
                }
            }
        });
        modalInstance.result.then(function() {
            if (fun1) {
                fun1();
            }
        }, function() {
            if (fun2) {
                fun2();
            }
        });

    };
    //登录全局
    $rootScope.login = function(items, fun1, fun2) {
        modal('ModalLoginCtrl', 'modal/login/login.html', items, fun1, fun2);
    };
    //注册全局
    $rootScope.register = function(items, fun1, fun2) {
        modal('ModalRegisterCtrl', 'modal/register/register.html', items, fun1, fun2);
    };
    //忘记密码全局
    $rootScope.forgetPassword = function(items, fun1, fun2) {
        modal('ModalForgetPasswordCtrl', 'modal/forgetPassword/forgetPassword.html', items, fun1, fun2);
    };
    //更换手机号全局
    $rootScope.changePhoneNumber = function(items, fun1, fun2) {
        modal('ModalChangePhoneNumberCtrl', 'modal/changePhoneNumber/changePhoneNumber.html', items, fun1, fun2);
    };
    //绑定手机号或者邮箱全局
    $rootScope.bindPhoneOrMail = function(items, fun1, fun2) {
        modal('ModalBindPhoneOrMailCtrl', 'modal/bindPhoneOrMail/bindPhoneOrMail.html', items, fun1, fun2);
    };
    //设置密码或者修改密码全局
    $rootScope.changePassword = function(items, fun1, fun2) {
        modal('ModalChangePasswordCtrl', 'modal/changePassword/changePassword.html', items, fun1, fun2);
    };
    //微信登录之后绑定账号全局
    $rootScope.afterWeChat = function(items, fun1, fun2) {
        modal('ModalAfterWeChatCtrl', 'modal/afterWeChat/afterWeChat.html', items, fun1, fun2);
    };
    //支付全局
    $rootScope.pay = function(items, fun1, fun2) {
        modal('ModalMemberPayCtrl', 'modal/pay/pay.html', items, fun1, fun2);
    };
    //会员激活全局
    $rootScope.memberActive = function(items, fun1, fun2) {
        modal('ModalMemberActiveCtrl', 'modal/memberActive/memberActive.html', items, fun1, fun2);
    };
    //删除全局
    $rootScope.delete = function(items, fun1, fun2) {
        modal('ModalDeleteCtrl', 'modal/delete/delete.html', items, fun1, fun2);
    };
    //微信支付
    $rootScope.weixinPay = function(items, fun1, fun2) {
        modal('ModalWeixinPayCtrl', 'modal/weixinPay/weixinPay.html', items, fun1, fun2);
    };
    //弹框
    $rootScope.alert = function(items, fun1, fun2) {
        modal('alertCtrl', 'modal/alert/alert.html', items, fun1, fun2);
    };
    //判断是否登录
    $rootScope.isLogin = function() {
        return !!ipCookie("login2");
    };
    //选择支付方式
    $rootScope.choosePay=function (items, fun1, fun2) {
        modal('choosePayCtrl', 'modal/choosePay/choosePay.html', items, fun1, fun2);
    };
    //分享代付确认支付
    $rootScope.surePay = function (items, fun1, fun2) {
        modal('surePayCtrl', 'modal/surePay/surePay.html', items, fun1, fun2);
    }
    //强制登出弹框
    $rootScope.loginOut=function (items, fun1, fun2) {
        modal('loginOutCtrl', 'modal/loginOut/loginOut.html', items, fun1, fun2);
    };
    //避免点击两次
    $rootScope.doubleClick=function(vm){
        vm.doubleClick=true;
        $timeout(function(){
            vm.doubleClick=false;
        },2000);
    };

    //监听路由
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        ////console.log('切换路由,现在状态：',ipCookie("login2"));
        ////console.log('切换路由,现在状态：',$rootScope.isLogin() );
        if (!$rootScope.isLogin()) {
            
            if ($location.path() === "/member/memberPay" || $location.path() === "/member/memberActive" || $location.path() === "/user/detail" || $location.path() === "/user/history" || $location.path() === "/user/favorite") {
                $state.go("main.home",{},{reload:true});
                return false;
            }
        }
        $rootScope.url=$location.$$path.replace('/','');
    });
    //获取验证码，大部分可以共用！
    $rootScope.timer = function(vm) {
        var second = 59;
        var timerHandler;
        vm.time = second + 1 + "s后重新获取";
        vm.getcode = true;
        vm.canClickVoice = true;
        vm.canClick = true;
        timerHandler = $interval(function() {
            if (second <= 0) {
                $interval.cancel(timerHandler); //当执行的时间59s结束时，取消定时器 ，cancle方法取消
                vm.canClick = false; //禁止点击。因为 ng-disabled属于布尔值，设置按钮可以点击，可点击发送
                vm.canClickVoice = false;//禁止点击语音
                //暂时禁用语音获取验证码功能
                // vm.voice = true;//语音提示框
                vm.nameChange = false;//账户框是否变动
                vm.getcode = false;//点击切换状况框
                //console.log(vm.step2);
            } else {
                vm.time = second + "s后重新获取";
                second--;
            }
        }, 1000) //每一秒执行一次$interval定时器方法
    };
    $rootScope.timer2 = function(vm) {
        var second = 59;
        var timerHandler;
        vm.time2 = second + 1 + "s后重新获取";
        vm.canClick2 = true;
        vm.canClickVoice2 = true;
        vm.getcode2 = true;
        timerHandler = $interval(function() {
            if (second <= 0) {
                $interval.cancel(timerHandler); //当执行的时间59s结束时，取消定时器 ，cancle方法取消
                vm.canClick2 = false; //因为 ng-disabled属于布尔值，设置按钮可以点击，可点击发送
                vm.canClickVoice2 = false;
                vm.getcode2 = false;
                // vm.voice2 = true;暂时禁用语音验证码功能
                vm.nameChange2 = false;
            } else {
                vm.time2 = second + "s后重新获取";
                second--;
            }
        }, 1000) //每一秒执行一次$interval定时器方法

    }


});

function httpConfig($httpProvider) {
    // Set x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.common['token'] = localStorage.getItem("token");
    $httpProvider.defaults.headers.common['os'] = "web";
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Set up global transformRequest function
    $httpProvider.defaults.transformRequest = function(data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
    // 拦截器
    $httpProvider.interceptors.push('adminInterceptor');
}

function adminInterceptor() {
    return {
        request: function(config) {
            return config;
        },

        requestError: function(config) {
            return config;
        },

        response: function(res) {
            return res;
        },

        responseError: function(res) {
            return res;
        }
    }
}