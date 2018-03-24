/**
 * Created by Administrator on 2017\9\19 0019.
 */

'use strict';
angular.module("myApp")
    .controller("mainCtrl", ["$rootScope", 'main', 'userMsg', '$state', 'ipCookie', '$scope', 'home', 'user', '$location', '$timeout',
        function($rootScope, main, userMsg, $state, ipCookie, $scope, home, user, $location,$timeout) {
            var vm = this;
            vm.params = {};
            vm.params.size = 5;
            vm.gradeDept=$state.params.gradeDept||parseInt(localStorage.getItem("gradeDept"));
            if(!vm.gradeDept){
                vm.gradeDept=1;
            }
            vm.url=$location.$$path.replace('/','');

            //监听路由
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                vm.url=$location.$$path.replace('/','');
            });
            //学习记录
            vm.studyHistory = function() {
                vm.params.collectType = 3;
                main.getStudyHistory(vm.params).then(function(res) {
                    if (res.data.code === 0) {
                        vm.studyHistoryListData = res.data.data;
                        vm.studyHistoryListData=vm.studyHistoryListData.slice(0,4)
                    }else {
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })
            };
            //收藏
            vm.getFavoritesList = function() {
                var obj = {};
                obj.size = 5;
                obj.collectType = 2;
                main.getFavorites(obj).then(function(res) {
                    if (res.data.code === 0) {
                        vm.favoritesListData = res.data.data;
                    }else {
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })

            };
            // 根据code进行登录请求
            var headimgurl;//初始化容器用于存储微信登陆用户头像
            var nickName;//初始化容器用于纯为微信登陆用户昵称
            var code = $location.search().code;
            //code不存储在url
            if (code){
                vm.code = code;
            };
            //获取openid
            if (vm.code) {
                var params = {
                    code: vm.code,
                };
                home.getOpenid(params).then(function(res) {
                    if (res.data.code == 0) {
                        // //用openId进行登录请求
                        loginByweixin(res.data.data.openid);
                        headimgurl=res.data.data.headimgurl;
                        nickName=res.data.data.nickName;
                    } else {
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })
            } else {
                // //console.log("没有code");
            }

            //使用openid登录
            function loginByweixin(openid) {
                var params = {
                    account: openid,
                    type: "weixin",
                    os: "web"
                }

                user.postLogin(params).then(function(res) {
                    console.log(res);
                    //如果登录成功
                    if (res.data.code == 0) {
                        // alert("登录成功")
                        ipCookie("login2", true, { expires: 1 });
                        ipCookie("login", true, { expires: 1 });
                        localStorage.setItem('token',res.data.token);
                        vm.turnUrl=$location.$$absUrl.split("?")[0];
                        location.href = vm.turnUrl;
                        // $state.go('main.home', {}, { reload: true });
                        //如果登录失败,跳转到绑定账号页面
                    }else if(res.data.code==-2009){
                        alert("登陆失败，账号被冻结")
                    }else {
                        //登录失败执行逻辑-注册云云
                        //存储openId信息
                        sessionStorage.setItem("openId", openid);
                        sessionStorage.setItem("headImgUrl", headimgurl);
                        sessionStorage.setItem("nickName", nickName);
                        $rootScope.afterWeChat();
                    }
                })
            }




            //获取用户信息

            if (ipCookie("login2")) {
                getUserDetail();
                signMsg();
                vm.getFavoritesList();
                vm.studyHistory();
            }






            //签到信息
            vm.signMsg = signMsg;

            function signMsg() {
                var obj = {};
                var d = new Date();
                obj.year = d.getFullYear();
                obj.month = d.getMonth() + 1;

                main.getSignDetail(obj).then(function(res) {
                    if (res.data.code === 0) {

                        vm.data = res.data.data.androidDayList;
                        console.log(vm.data);
                        vm.continue = res.data.data.continue;

                    }else {
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })
            }
            //用户登出
            vm.logout = function() {
                main.postUserLoginOut().then(function(res) {
                    if (res.data.code === 0) {
                        ipCookie.remove("login2");
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        // location.href=location.host+'/home';
                        $state.go('main.home', {code:''}, { reload: true });
                    }else {
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })
            };
            vm.login = function() {
                $rootScope.login()
            };
            vm.register = function() {
                $rootScope.register();
            };

            function getUserDetail() {
                main.getUserMsg().then(function(res) {
                    if (res.data.code === 0) {
                        vm.userMsg = res.data.data;
                        console.log(res.data.data);
                        console.log(vm.userMsg.period);
                        vm.currentDateSecond=new Date().getTime()+vm.userMsg.period*86400000;
                        console.log(vm.currentDateSecond);
                        vm.middleDate=new Date(vm.currentDateSecond);
                        Date.prototype.toLocaleString = function() {
                            return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日";
                         };
                         vm.currentDate=vm.middleDate.toLocaleString();
                         console.log(vm.currentDate);
                        vm.openButton=vm.userMsg.isMember==1?"立即续费":"立即开通";
                        // vm.isOpen=vm.userMsg.isMember==1?"当前已开通":"当前未开通";
                        localStorage.setItem('user',JSON.stringify(res.data.data));
                        vm.name = vm.userMsg.alias
                    }else {
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })
            }
            //调试微信登陆模态框专用,调试完毕记得注释
            //$rootScope.afterWeChat();
            //公告
            vm.noctive = function() {
                var d = new Date();
                vm.year = d.getFullYear();
                vm.month = d.getMonth() + 1;
                vm.day = d.getDate();
                home.getNotive().then(function(res) {
                    if (res.data.code === 0) {
                        try{
                            vm.obj =JSON.parse(res.data.data.context);
                            vm.content = vm.obj.content;
                            console.log(vm.content);
                            vm.pcFontSize=vm.obj.pcFontSize;
                            vm.fontColor=vm.obj.fontColor;
                            vm.fontA=vm.obj.font;
                        }catch(e){
                            vm.content =res.data.data.context;
                        }

                    }else {
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })
            };
            vm.noctive();
            //返回首页
            vm.goHome=function () {
                $state.go("main.home",{gradeDept:parseInt(localStorage.getItem("gradeDept"))},{reload:true})
            }

        }]);