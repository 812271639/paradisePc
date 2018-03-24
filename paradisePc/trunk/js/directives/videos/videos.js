angular.module('myApp').directive('videoPlayer', function ($timeout, $rootScope,$compile,$state) {
    return {
        restrict: "C",
        scope:{
          //判断是不是专题简介页面的视频播放器
          mini:'@',
          //判断是否试看
          tryIt:"@",
          //试看结束后传递变量使蒙层显示
          tryOver:"=",
          //判断是否会员
          isVip:"@"

        },
        link: function (scope, ele, attrs) {
            $timeout(function () {
                var idName = attrs.id;
                //$rootScope.player——将player设置为根作用域，每次重新解析videoJs
                if ($rootScope.player) {
                    $rootScope.player.dispose();
                }
                //实例化的过程
                $rootScope.player = videojs(idName, {
                    //音量条竖直
                    controlBar: {
                        volumePanel: {
                            inline: false,
                            CurrentTimeDisplay: true
                        }
                    }
                }, function () {
                    //定义倍速按钮——按照音量模块为模板
                    var newbtn = document.createElement('btn');
                    newbtn.innerHTML = '<div class="vjs-volume-panel vjs-control speedside"><button class="vjs-mute-control vjs-button vjs-vol-3 " type="button"><span id="speed-video">1X</span></button><div class="vjs-volume-control vjs-control vjs-volume-vertical video-bar" id="speedtab"></div></div>';
                    var controlBar = document.getElementsByClassName('vjs-control-bar')[0];
                    var insertBeforeNode = document.getElementsByClassName('vjs-fullscreen-control')[0];

                    controlBar.insertBefore(newbtn, insertBeforeNode);

                    //生成倍速选项、添加点击事件、增加选中样式
                    for (let i = 0, j = 0.75; i < 3; i++) {
                        var newchoose = document.createElement('span');
                        var newtext = document.createTextNode(j + 'x');
                        newchoose.appendChild(newtext);
                        newchoose.className = 'speed';
                        document.getElementById("speedtab").appendChild(newchoose);
                        newchoose.onclick = function () {
                            $rootScope.player.playbackRate(j - 0.25);
                            document.getElementById('speed-video').innerHTML = $rootScope.player.playbackRate() + 'x';
                            var arrs = document.getElementsByClassName('speed');
                            for (let k = 0; k < arrs.length; k++) {
                                arrs[k].className = 'speed';
                            }
                            this.className = 'speed speedsidechoose';
                        };
                        j += 0.25;
                    }

                    //默认1x是选中样式
                    document.getElementsByClassName('speed')[1].className = 'speed speedsidechoose';
                    if (!scope.mini) {
                        $rootScope.player.removeChild('BigPlayButton');//移除开始的大按钮
                    }
                    if(document.body.offsetWidth<1700&&document.body.offsetWidth>1600||document.body.offsetWidth==1579){
                        $(document.getElementById(idName)).css("zoom", "1.25");
                    }
                    $(document.getElementById(idName)).css("width", "100%");
                    $(document.getElementById(idName)).css("height", "100%");
                    $(document.getElementById(idName)).css("position", "relative");
                    $(document.getElementById(idName)).css("height", "100%");

                    if (!scope.mini) {
                        /*让控制面板在视频未开始之前常驻*/
                        $timeout(function () {
                            $(document.getElementById(idName)).addClass("vjs-has-started");
                        }, 100);
                    }

                    //是否Vip
                    //不是vip才会有试看
                    if(scope.isVip!="1"){
                        //试看功能
                        if (scope.tryIt=='true') {
                            //添加模板
                            //创建试看功能html模板
                            var newTry = document.createElement('div');
                            newTry.innerHTML = '<span class="out-round"><span class="inside-round"><img src="../images/icon/vipicon.png"></span></span><span style="padding-left:12px;margin-right: 7px;">您可试看一分钟</span><span style="color:#f1bc03;cursor: pointer;" id="vip">开通VIP观看全集</span><span class="close-btn" id="close"><img style="width: 75%;cursor: pointer;" src="../images/subject&course/course4.png " ></span>';
                            newTry.setAttribute("class", "try-it");
                            //根据屏幕宽度设定试看模板位置
                            $timeout(function(){
                                if(document.body.offsetWidth<1700&&document.body.offsetWidth>1600){
                                    $(document.getElementsByClassName("try-it")[0]).css("left","65px");
                                }
                                else{
                                    $(document.getElementsByClassName("try-it")[0]).css("left","150px");
                                }
                            });

                            //调整VIP试看提示位置——全屏时、播放进度条消失时
                            //全屏
                            $rootScope.player.on("fullscreenchange",function(){
                                console.log('进出全屏事件');
                                //console.log($rootScope.player.isFullscreen());//是否全屏
                                if($rootScope.player.isFullscreen()){
                                    // console.log('宽度');
                                    // console.log(window.innerWidth);
                                    var screenWidth = window.innerWidth;
                                    if(window.innerWidth==1366){
                                        var fitWidth = '382.48px';
                                    }
                                    else if (window.innerWidth==1536){
                                        var fitWidth = '470px';
                                    }
                                    else if(window.innerWidth==1920){
                                        var fitWidth = '661px';
                                    }

                                    $(document.getElementsByClassName("try-it")).css("left",fitWidth);
                                }
                                else{
                                    if(window.innerWidth==1366){
                                        $(document.getElementsByClassName("try-it")).css("left","65px");
                                    }
                                    else{
                                        $(document.getElementsByClassName("try-it")).css("left","150px");
                                    }

                                }
                            });

                            this.el().appendChild(newTry);//试看提示常驻
                            //添加点击X事件——点击关闭
                            var close = document.getElementById("close");
                            close.onclick = function () {
                                newTry.parentNode.removeChild(newTry);
                            };
                            //开通VIP
                            var vip = document.getElementById("vip");
                            vip.onclick = function () {
                                if ($rootScope.isLogin()) {
                                    $state.go('main.newMember')
                                } else {
                                    $rootScope.login()
                                }
                            };

                            //alert('tryIt');——功能
                            var tryfun = function(){
                                //获取当前时间
                                var whereYouAt = $rootScope.player.currentTime();
                                if(whereYouAt>60){
                                    //暂停
                                    $rootScope.player.pause();
                                    //退出全屏
                                    $rootScope.player.exitFullscreen();
                                    //alert('超过试看一分钟');
                                    scope.tryOver = true;
                                    scope.$apply();
                                }
                            };
                            //播放时间改变事件
                            $rootScope.player.on('timeupdate', tryfun);
                        }
                    }
                    //mini
                    if (scope.mini) {
                        //调整大按钮位置——取消，会有明显延迟
                        //     $(document.getElementById(idName)).addClass("vjs-big-play-centered");
                        //点击大播放按钮自动全屏
                        document.getElementById("mediaVideo").onclick=function(){
                            if($.isFunction($rootScope.player.requestFullscreen)){
                                $rootScope.player.requestFullscreen();
                            }
                            else if($.isFunction($rootScope.player.webkitEnterFullscreen)){
                                $rootScope.player.webkitEnterFullscreen();
                            }
                            else if($.isFunction($rootScope.player.mozRequestFullScreen)){
                                $rootScope.player.mozRequestFullScreen();
                            }
                            else{
                                alert('您的浏览器不支持全屏')
                            }
                        };
                        //绑定事件——全屏和退出全屏切换时触发
                        $rootScope.player.on("fullscreenchange", function(){
                            if(!$rootScope.player.isFullscreen()){
                                //alert('非全屏');
                                //初始化播放器——停止
                                $rootScope.player.load();
                            }
                        });
                    }
                });
            })
        }
    }
});