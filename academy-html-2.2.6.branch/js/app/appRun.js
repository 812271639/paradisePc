/**
 * Created by Master on 2017/3/28.
 */
angular.module('paradiseApp')
    .run(function (path, $http, $rootScope, $state, $location, loginServices, $log, $timeout, localSession, userService, wxServices, commonUnit) {
        //开发本地调试用
        sessionStorage.setItem('openid', "oJCLDwnz4FGQN9BOosQpQ-ubipQ8");
        //缓存openid
        var openid = sessionStorage.getItem("openid");
        if (!openid) {
            wxServices.getOpenid($location.search().code).then(function (res) {
                $rootScope.wxUser = res.data.data;
                sessionStorage.setItem('openid', res.data.data.openid);
                config();
                userRegister()
            })
        } else {
            $rootScope.wxUser = {
                headimgurl: ''
            }
            config();
            userRegister();
        }
        //重置滚动值
        commonUnit.session(['yScroll', 'currentPage', 'postListType']);
        // var type=1;//1开发 2测试 3线上
        var type = window.location.href; //1开发 2测试 3线上
        // if(type==1){
        if (type.indexOf('dev') != -1 || type.indexOf('localhost') != -1) {
            $rootScope.wxOption = {
                appId: 'wxaa0f2f28e0f55c80',
                url: 'http://dev.home.academy.ptteng.com/map?videogo'
            }
            // }else if(type==2){
        } else if (type.indexOf('test') != -1) {

            $rootScope.wxOption = {
                appId: 'wx8c14b4e1a37a6fb1',
                url: 'http://test.home.academy.ptteng.com/map?videogo'
            }
        } else {

            $rootScope.wxOption = {
                appId: 'wxa5cb11911935a401',
                url: 'http://app.xuezhaleyuan.com/map?videogo'
            }
        }
        //弹出框
        tips();
        //设备类型
        mobile();
        //重置所有session值
        // sessionStorage.clear();
        function config() {
            wxServices.wxPort(['getLocation', 'chooseImage', 'uploadImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]);
        }
        // 微信获取用户身份授权
        //开发
        // function authorize() {
        //     var WxURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        //         'appid=' + $rootScope.wxOption.appId +
        //         '&redirect_uri=' + $rootScope.wxOption.url +
        //         '?type=wx' +
        //         '&response_type=code' +
        //         '&scope=snsapi_userinfo' +
        //         '&state=STATE' +
        //         'videogo' +
        //         '#wechat_redirect';
        //     window.location.href = WxURL;
        //     return false;
        // }

        //线上
        // function authorize() {
        //     var WxURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        //         'appid=wxa5cb11911935a401' +
        //         '&redirect_uri=' + 'http://app.xuezhaleyuan.com' +
        //         '?type=wx' +
        //         '&response_type=code' +
        //         '&scope=snsapi_userinfo' +
        //         '&state=STATE' +
        //         '#wechat_redirect';
        //     window.location.href = WxURL
        // }

        //用户资料
        //根据code获取openid进行注册登录


        //用户注册
        function userRegister() {
            var params = {};
            var registerParams;
            params.openid = sessionStorage.getItem('openid');
            params.type = 'weixin';
            registerParams = params;
            //验证openid是否注册过
            loginServices.verifyOpenid(registerParams).then(function (res) {
                //未注册则新用户注册
                if (!res.data.register) {
                    registerParams.img = $rootScope.wxUser.headimgurl;
                    //注册
                    loginServices.register(registerParams).then(function (res) {
                        login(params);
                    });
                } else {
                    login(params);
                }
            })
        }

        //登录
        function login(params) {
            if ($rootScope.mobile != "ios") {
                $timeout(function () {
                    config();
                }, 500)
            }
            loginServices.login(params).then(function (res) {
                if (res.data.code === 0) {
                    $rootScope.logined = true;
                    //强制绑定
                    if (!res.data.mobile && !res.data.mail) {
                        $rootScope.dialog = {
                            status: true,
                            text: '请绑定手机或者邮箱 ',
                            action: function () {
                                $state.go("binding", {both: 'true', type: 'mobile'});
                                this.status = false;
                            },
                            cancle: false
                        }
                    }
                    //获取用户所在地，
                    userLoction();
                    localSession.set('user', res.data);
                    //设置默认年级
                    if (!res.data.grade) {
                        userService.userDetail({
                            grade: 7
                        });
                    }
                    $rootScope.wxShare();
                } else {
                    $rootScope.logined = false;
                    $rootScope.showTips(res.data.message);
                }
            })
        }
        //获取用户所在地，
        function userLoction() {
            wx.ready(function () {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        sessionStorage.setItem("reloadCount", 0)
                        var data = {
                            location: res.latitude + ',' + res.longitude,
                            key: "JYXBZ-5Q3W4-STEUW-DLAEC-ZWSZQ-MUBXU",
                            get_poi: 0
                        };
                        var url = "http://apis.map.qq.com/ws/geocoder/v1/?";
                        data.output = "jsonp";
                        $.ajax({
                            type: "get",
                            dataType: 'jsonp',
                            data: data,
                            jsonp: "callback",
                            jsonpCallback: "success_jsonpCallback",
                            url: url,
                            success: function (json) {
                                var location = json.result.address_component;
                                localSession.set('location', json.result.address_component);
                                location = location.province == location.city ? location.city + location.district : location.province + location.city;
                                userService.userDetail({
                                    location: location
                                });
                            }
                        })
                    }
                });
            })
        }

        //弹窗
        function tips() {
            var tipId = 'a' + new Date().valueOf();
            $('body').append('<p id=' + tipId + ' style="position:fixed; left: 50%; bottom: 100px; margin-left:-100px;border-radius:4px;width: 200px;height:36px;line-height:36px;background-color: rgba(0,0,0,.7);color:white;text-align:center;display: none;z-index:999"></p>')
            $rootScope.showTips = function (msg) {
                $timeout.cancel($rootScope.timer);
                $('#' + tipId).fadeIn().text(msg);
                $rootScope.timer = $timeout(function () {
                    $('p:last').fadeOut()
                }, 3000)
            }
        }

        //路由状态
        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.stateCurrent = $state;
        });

        function _IsAndroid() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/Android/i) == "android") {
                return true;
            } else {
                return false;
            }
        }
        $rootScope.Android = _IsAndroid();
        function stopDrop() {
            var lastY; //最后一次y坐标点
            $(document.body).on('touchstart', function (event) {
                lastY = event.originalEvent.changedTouches[0].clientY; //点击屏幕时记录最后一次Y度坐标。
            });
            $(document.body).on('touchmove', function (event) {
                var y = event.originalEvent.changedTouches[0].clientY;
                var st = $(this).scrollTop(); //滚动条高度
                var wrap = $('.page-wrap').scrollTop();
                var wrap2 = $('.collection-list').scrollTop();
                if (wrap2 == 0 && wrap == 0 && y >= lastY && st <= 10) { //如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
                    lastY = y;
                    event.preventDefault();
                }
                lastY = y;

            });
        }

        //登录之后才调用微信分享接口
        $rootScope.wxShare = function () {
            wx.ready(function () {
                var obj = {
                    title: "学渣乐园~~",
                    desc: '学渣乐园',
                    link: 'http://dev.home.academy.ptteng.com/map',
                    imgUrl: '../../images/Account_03.png',
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                }
                // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareAppMessage(obj);

                // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareTimeline(obj)

                // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareQQ(obj);

                // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareWeibo(obj);

                // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
                wx.onMenuShareQZone(obj);

            });
        }

        stopDrop();
        // $rootScope.preState={
        //     set:false,
        //     prePage:''
        // };
        // window.addEventListener("popstate", function(e) {
        //     //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        //     if ($rootScope.preState.set){
        //         $rootScope.preState.set=false;
        //         $state.go($rootScope.preState.prePage);
        //     }
        //     return false;
        // }, false);

        // //检测设备类型
        // $rootScope.mobile = function detectmob() {
        //     if (navigator.userAgent.match(/Android/i)
        //         || navigator.userAgent.match(/webOS/i)
        //         || navigator.userAgent.match(/iPhone/i)
        //         || navigator.userAgent.match(/iPad/i)
        //         || navigator.userAgent.match(/iPod/i)
        //         || navigator.userAgent.match(/BlackBerry/i)
        //         || navigator.userAgent.match(/Windows Phone/i)
        //     ) {
        //         return true;
        //     }
        //     else {
        //         return false;
        //     }
        // }()

        //   $rootScope.mobile = function detectmob() {
        //     if (navigator.userAgent.match(/iPhone/i)
        //         || navigator.userAgent.match(/iPad/i)
        //         || navigator.userAgent.match(/iPod/i))
        //     {
        //       return true
        //     } else {
        //       return false
        //     }
        // }();
        function mobile() {
            if (navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/iPhone/i)) {
                $rootScope.mobile = "ios"
            } else {
                $rootScope.mobile = "android"
            }
        }
    });
