//登录模态框控制器
myApp.controller('ModalLoginCtrl', function($uibModalInstance, $scope, $rootScope, ipCookie, $timeout, $state, user,$location,home) {
    //初始化参数
    var vm = this;
    vm.params = {};
    vm.title = '用户登录';
    vm.showError = false;
    vm.showError2 = false;
    //判断是否有已保存的用户名cookie,有就渲染
    //console.log(ipCookie());
    // console.log(ipCookie("cookieName"));
    var saveName=ipCookie("cookieName")
    if (saveName) {
        //console.log("有用户名")
        // vm.params.account = ipCookie("cookieName");
        vm.params.account = saveName;
    }

    //登陆
    vm.ok = function(b) {
        //防止重复提交
        $rootScope.doubleClick(vm);
        if (b) {
            ////console.log(vm.name, vm.password);
            //检查是否是手机号
            var reg = /^1[34578]\d{9}$/;
            if (reg.test(vm.params.account)) {
                vm.params.type = "mobile";
                ////console.log("手机号")
            } else {
                vm.params.type = "mail";
                ////console.log("邮箱");
            }
            vm.params.os = "web";
            user.postLogin(vm.params).then(function(res) {
                if (res.data.code == 0) {
                    localStorage.setItem('token',res.data.token);
                    //请求成功后保存用户名，未勾选则移除
                    if (vm.remember) {
                        ipCookie("cookieName", vm.params.account, { expires: 60 });
                    } else {
                        ipCookie.remove("cookieName");
                    }
                    ipCookie("login2", true, { expires: 1 });
                    if (localStorage.getItem('requestDate')) {
                        var requestDate = localStorage.getItem('requestDate');
                        console.log(requestDate);
                        requestDate = JSON.parse(requestDate);
                        console.log(requestDate.gradeDept);
                        //不是会员
                        if(res.data.isMember==2){
                            //再判断是否购买过此专题
                            home.getSubjectList(requestDate.gradeDept,{uid:res.data.uid}).then(function(res) {
                                vm.data=res.data.data;
                                var isLock;
                                console.log(vm.data);
                                angular.forEach(vm.data, function (item) {
                                    angular.forEach(item.lessonList, function (value) {
                                        if (value.lessonId == requestDate.lessonId) {
                                            isLock = value.isLock
                                        }
                                    })
                                });

                                if(isLock==2){
                                    localStorage.removeItem('requestDate');
                                    // $state.go('main.subject',{id:requestDate.lessonId})
                                    if($location.$$absUrl.indexOf("?") == -1){
                                        $location.$$absUrl=$location.$$absUrl.replace("home","subject?id="+requestDate.lessonId);
                                        location.href = $location.$$absUrl;
                                    }
                                    else{
                                        $location.$$absUrl=$location.$$absUrl.replace("home","subject");
                                        $location.$$absUrl=$location.$$absUrl.replace("gradeDept","id");
                                        $location.$$absUrl=$location.$$absUrl.replace(requestDate.gradeDept,requestDate.lessonId);
                                        location.href = $location.$$absUrl;
                                    }
                                }
                                else{
                                    localStorage.removeItem('requestDate');
                                    // $state.go('main.subjectIntro',{id:requestDate.lessonId})
                                    if($location.$$absUrl.indexOf("?") == -1){
                                        $location.$$absUrl=$location.$$absUrl.replace("home","subjectIntro?id="+requestDate.lessonId);
                                        location.href = $location.$$absUrl;
                                    }
                                    else{
                                        $location.$$absUrl=$location.$$absUrl.replace("home","subjectIntro");
                                        $location.$$absUrl=$location.$$absUrl.replace("gradeDept","id");
                                        $location.$$absUrl=$location.$$absUrl.replace(requestDate.gradeDept,requestDate.lessonId);
                                        location.href = $location.$$absUrl;
                                    }
                                }
                            })
                        }
                        else{
                            localStorage.removeItem('requestDate');
                            // $state.go('main.subject',{id:requestDate.lessonId})
                            if($location.$$absUrl.indexOf("?") == -1){
                                $location.$$absUrl=$location.$$absUrl.replace("home","subject?id="+requestDate.lessonId);
                                location.href = $location.$$absUrl;
                            }
                            else{
                                $location.$$absUrl=$location.$$absUrl.replace("home","subject");
                                $location.$$absUrl=$location.$$absUrl.replace("gradeDept","id");
                                $location.$$absUrl=$location.$$absUrl.replace(requestDate.gradeDept,requestDate.lessonId);
                                location.href = $location.$$absUrl;
                            }
                        }
                    }
                    else{
                        location.href = $location.$$absUrl;
                    }
                    // vm.cancel();
                    // $state.go($state.current, {}, { reload: true });
                } else if(res.data.code==-2009) {
                    vm.showError2 = true;
                }else{
                    vm.showError= true;
                }
            })

        } else {
            ////console.log("表单有问题")
        }
        // $uibModalInstance.close();
    };

    //关闭按钮函数
    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };


    //忘记密码
    vm.forgetPassword = function() {
        $rootScope.forgetPassword();
        //设置前一个模态框延迟消失避免页面闪烁
        var setBlur = function() {
            $uibModalInstance.dismiss();
        }
        setTimeout(setBlur, 100);
    }


    //立即注册
    vm.register = function() {
        $rootScope.register();
        //设置前一个模态框延迟消失避免页面闪烁
        var setBlur = function() {
            $uibModalInstance.dismiss();
        }
        setTimeout(setBlur, 100);
    }




    //获取微信二维码
    vm.wechatLogin = function() {
        vm.codeLogin = true;
        vm.title = "微信账号登录";
        $timeout(function() {
            var obj = new WxLogin({
                id: "wechat",
                appid: "wx8c69cecc71b37160",
                scope: "snsapi_login",
                redirect_uri: "http://www.dounixue.net/home",
                state: "",
                style: "",
                href: "data:text/css;base64,LmltcG93ZXJCb3ggLmluZm8gewogIGRpc3BsYXk6IG5vbmU7IH0KCi5pbXBvd2VyQm94IC50aXRsZSB7CiAgZGlzcGxheTogbm9uZTsgfQoKLmltcG93ZXJCb3ggLnFyY29kZSB7CiAgd2lkdGg6IDE4NXB4OwogIGJvcmRlcjogbm9uZTsgfQ"
            });
            ////console.log("complete");
            $("iframe").css({ "width": "230px", "height": "230px" });
        }, 2000);
    }


    //普通登录
    vm.normalLogin = function() {
        vm.codeLogin = false;
        vm.title = "用户登录";
    }
});