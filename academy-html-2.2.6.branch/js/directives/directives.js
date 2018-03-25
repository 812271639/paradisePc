/**
 * Created by Master on 2017/2/25.
 */
'use strict';
angular.module('paradiseApp')

//首页地图设置
    .directive('mapScroll', function ($state, localSession, commonUnit,userService,$rootScope,$sce) {
        return {
            restrict: 'A',
            link: function () {
                var currentX = localSession.get('scrollX');
                var myscroll = new IScroll('#mapWrap', {
                    mouseWheel: true,
                    scrollbars: false,//滚动条
                    scrollX: true,//横向滚动
                    scrollY: true,
                    tap: false,
                    click: true,
                    zoom: true,//缩放
                    bounce: false,
                    startX: currentX === 0 ? -1 : currentX || -378//起始位置
                });
                $('#signin').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    $state.go('signin');

                });
                $('#identity').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    $state.go('identity');

                });
                $('#article').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    $state.go('article');

                });
                $('#video').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    $state.go('video');

                });
                $('#playground').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    $state.go('playground');

                });
                $('#dormitory').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    $state.go('dormitory');

                });
                $('#canteen').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    location.href = "https://weidian.com/?userid=231175357&wfr=wechatpo_welcome_shop";
                });
                //公告栏
                $('#bulletin').on('click', function () {
                    $("#nav-sign-menu").hide();
                    localSession.set('scrollX', myscroll.x);
                    userService.bulletin().then(function (res) {
                        if(res.data.code==0){
                            $rootScope.bulletinData = res.data.data.context;
                            $rootScope.bulletinData = JSON.parse($rootScope.bulletinData);
                            $rootScope.bulletinData.content =$rootScope.bulletinData.content.replace(/\n/g, '<br>');
                            $rootScope.bulletinData.content = $sce.trustAsHtml( $rootScope.bulletinData.content);
                            $("#bulletin-box").show();

                        }else {
                            $rootScope.showTips(res.data.message)
                        }
                    })

                });
                //铁柱
                // $('#tieZhu').on('click', function () {
                //     localSession.set('scrollX', myscroll.x);
                //     $rootScope.character=1;
                //     console.log($rootScope.character)
                // });
                $('#messageBoard').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    commonUnit.session('yScroll', 0);
                    $state.go('messageBoardList');
                });
                $('#treeHole').on('click', function () {
                    localSession.set('scrollX', myscroll.x);
                    var aa = commonUnit.session('userDetail').hollowStatus;
                    if (aa==1) {
                        // $location.path('/treeHoleWelcome').replace();
                        $state.go('treeHoleWelcome');
                    } else {
                        $state.go('treeHole',{type:1});
                    }

                });

            }

        };
    })
    .directive('loading',function () {
        return {
            restrict:'E',
            scope:{},
            templateUrl:'js/directives/tpls/loading.html',
            link:function () {

            }
        }
    })
    //滚动选择年级
    .directive('scrollMenu', function (identityData, $timeout) {
        return {
            restrict: 'A',
            scope: {garde: '=ngModel'},
            link: function () {
                $timeout(function () {
                    $(function () {
                        $('.scroll-menu').mobiscroll().select({
                            theme: 'material',
                            display: 'bottom',
                            lang: 'zh',
                            minWidth: 200
                        });

                    });
                })
            }
        }
    })
    //轮播
    .directive('bannerCarousel', function ($timeout) {
        return {
            restrict: 'A',
            scope: {},
            link: function () {
                $timeout(function () {
                    var slider = new fz.Scroll('.ui-slider', {
                        role: 'slider',
                        indicator: true,
                        autoplay: true,
                        interval: 3000
                    });
                })
            }
        }
    })
    //将图片设置为背景
    .directive('backImg', function () {
        return function (scope, ele, attrs) {
            var url = attrs.backImg;
            ele.css({
                'background': 'url("' + url + '")no-repeat center',
                'background-size': 'contain'
            })
        }
    })
    //页面滚动
    // .directive('pageScroll', function ($timeout, $rootScope) {
    //     return function (scope, ele, attr) {
    //         ele.addClass('scroll-wrap');
    //         $timeout(function () {
    //             scroll = new IScroll('.scroll-wrap', {
    //                 mouseWheel: true,
    //                 scrollbars: false,//滚动条
    //                 tap: false,//触摸事件，用以替代click
    //                 bounce: false//触底反弹
    //                 // click:$rootScope.mobile //根据设备类型设置启用click
    //             })
    //         }, 500)
    //     }
    // })

    //加载更多
    .directive('loadMore', function ($rootScope, $timeout) {
        return {
            restrict: 'A',
            scope: {
                moreData: '&',
                nextPage: '=?'
            },
            replace: 'true',
            template: '<div class="more-bar-wrap"><button type="button" class="more-bar">点击加载更多</button><div class="nomore font-18"><p>哎呀 没有了</p><p>别点了</p></div></div>',
            link: function (scope, ele ) {
                // var next;
                var btn = $('.more-bar');
                var tip = $('.nomore');
                ele.on('click', function () {

                    if (!scope.nextPage) {
                        fadeTimeOut();
                    } else {
                        scope.moreData();
                        //     .then(function (res) {
                        //     // next = res;//
                        //     // // btn.attr('disabled', !next);
                        //     // !next ? btn.text('加载完毕') : false;
                        //     // $timeout(function () {
                        //     //     scroll.refresh();
                        //     // },200)
                        //     // event.stopPropagation();
                        // });
                    }

                });

                function fadeTimeOut() {
                    tip.fadeIn();
                    $timeout.cancel(scope.timer);
                    scope.timer = $timeout(function () {
                        tip.fadeOut()
                    }, 3000)
                }

                scope.$watch('nextPage', function (n) {
                    n === false ? btn.text('加载完毕') : btn.text('点击加载更多');
                })
            }
        }
    })

    .directive('moveMore',function ($timeout) {
        return {
            restrict:'A',
            scope:{
               moveMore:'&',
                loadStatu:'='
            },
            link:function (scope, ele) {
                var pageX1, pageY1, pageX2, pageY2, move;
                var that = ele;
                var page = $('.page-wrap');
                that.on('touchstart', function (e) {
                    pageX1 = e.targetTouches[0].pageX;
                    pageY1 = e.targetTouches[0].pageY;
                });
                that.on('touchmove', function (e) {
                    move = true;
                    var touch = e.originalEvent.targetTouches[0];
                    pageX2 = touch.pageX;
                    pageY2 = touch.pageY;

                });
                that.on('touchend', function () {
                    // console.log('滚动+窗口高度'+(page.scrollTop()+page.height()))
                    // console.log('总高度'+that.height())
                    // console.log(page.height())
                    if (move &&(Math.abs((that.height()-page.scrollTop()-page.height())<=5))&& (pageY1-pageY2 > 10)) {
                        $('#loading').fadeIn();
                        if (!scope.moveMore()){
                            $timeout(function () {
                                $('#loading').fadeOut();
                            },500)
                        }
                        scope.$apply();
                    }
                    pageX2 = pageX1;
                    pageY2 = pageY1;
                    move = false;
                });
                scope.$watch('loadStatu',function (n) {
                    if(!n){
                        $('#loading').fadeOut()
                    }
                })
            }
        }
    })
    //视频筛选菜单
    .directive('videoMenu', function (videoData, paramsService, $timeout, localSession) {
        return {
            restrict: 'A',
            scope: {
                gradeValue: '=',
                subjectValue: '=',
                reloadData: '&',
                subjectList: '='
            },
            templateUrl: 'js/directives/tpls/videoMenu.html',
            link: function (scope) {
                scope.grade = false;
                scope.subject = false;
                scope.videoData = videoData;
                scope.currentBtn = '';
                scope.gradeValue = scope.gradeValue == 7 || scope.gradeValue == '' ? '' : scope.gradeValue;
                // scope.gradeValue = scope.subjectValue =1;
                scope.gradeMenu = function () {
                    if(scope.currentBtn!==0) {
                        scope.grade = !scope.grade;
                            scope.currentBtn = 0;
                            scope.subject = false;
                    }else {
                        scope.grade = !scope.grade;
                        scope.currentBtn='';
                        scope.subject = false;
                    }
                };
                scope.subMenu = function () {
                    if(scope.currentBtn!=1){
                        scope.subject = !scope.subject;
                            scope.currentBtn = 1;
                            scope.grade = false;
                    }else {
                        scope.subject = !scope.subject;
                        scope.currentBtn='';
                        scope.grade = false;
                    }
                };

                scope.closeMenu = function () {
                    scope.subject = false;
                        scope.currentBtn = '';
                        scope.grade = false;
                };
                scope.choose = function (type, value) {
                    type ? scope.subjectValue = value : scope.gradeValue = value;
                    scope.grade = scope.subject = false;
                    scope.currentBtn = '';
                    scope.chooseBtn = value;
                    localSession.set('grade', scope.gradeValue);
                    localSession.set('subject', scope.subjectValue);
                    paramsService.set({grade: scope.gradeValue, subject: scope.subjectValue});
                    scope.reloadData().then(function (res) {
                        // $timeout(function () {
                        //     scroll.refresh()
                        // }, 500);
                    });
                }
            }
        }
    })
    //视频预览图
    .directive('videoPoster', function () {
        return {
            restrict: 'A',
            // scope:{Poster:'='},
            link: function (scope, ele, attrs) {
                ele.attr('poster', attrs.videoPoster)
            }
        }
    })

    //文字收起与展开
    .directive('synopsisPucker', function () {
        return {
            restrict: 'A',
            scope: {num: '=ngModel'},
            link: function (scope, ele) {
                // var oWidth = ele['0'].offsetWidth;
                var a = ele.find('a');
                var isOpen = false;
                a.on('click', function () {
                    scope.$apply(scope.num = isOpen ? false : true);
                    isOpen = !isOpen;
                })
            }
        }
    })

    //验证码倒计时
    .directive('countdown', function ($interval, $http, $log, $timeout, bindAleat) {
        return {
            restrict: 'A ',
            scope: {
                options: '=?',//配置验证类型，接口
                verifyFn: '&',//验证
                successFn: '&',
                account: '='
            },
            link: function (scope, ele, attrs) {

                var timer;
                //弹窗提示
                $('.ui-tab').append('<p style="position:fixed; left: 50%; bottom: 100px; margin-left:-100px;border-radius:4px;width: 200px;height:36px;line-height:36px;background-color: rgba(0,0,0,.7);color:white;text-align: center;display: none"></p>');

                //开始验证
                ele.on('click', function () {
                    var options = scope.options;
                    //格式验证
                    options.check.test(scope.account) ? codeSend() : bindAleat(options.errText);

                    //验证通过发送验证码
                    function codeSend() {
                        //验证手机注册情况
                        scope.verifyFn().then(function (res) {
                            if (!res.data.register) {
                                scope.successFn().then(function (res) {
                                    res.data.code == 0 ? (bindAleat('验证码发送成功'), confirmation()) : bindAleat(res.data.message)
                                })
                            } else {
                                bindAleat(options.verify)
                            }

                        })
                    }

                    function confirmation() {
                        var time = attrs.countdown || options.countdown;
                        var inputValue = scope.account;
                        $log.debug(inputValue);

                        ele.attr('disabled', 'disabled');
                        ele.text('重获' + time-- + 's');
                        $interval.cancel(timer);
                        timer = $interval(function () {
                            if (time) {
                                ele.text('重获' + time-- + 's');
                            } else {
                                ele.text('重新获取');
                                ele.removeAttr('disabled');
                                $interval.cancel(timer);
                            }
                        }, 1000);
                    }

                })
            }
        }
    })
    //按钮高亮
    .directive('highLighted', function () {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, ele) {
                var status = false;
                ele.on('click', function () {
                    status = ele.hasClass('active');
                    if (ele[0].dataset.name == 'insertImage') {
                        $('#edit-toolbar>button').removeClass('active');
                        scope.$parent.vm.colorBar = false;
                        scope.$apply();
                    } else {
                        status = !status;
                        status ? ele.addClass('active') : ele.removeClass('active');
                    }
                })
            }
        }
    })
    //编辑器设置样式
    .directive('setStyle',function () {
       return function (scope,ele) {
           ele.on('click',function () {
               document.execCommand(this.dataset.name, false, this.dataset.value);
           })
        }
    })
    //获取点击图片url-用户展示回帖大图
    .directive('showUrl',function () {
           return {
               restrict: 'A',
               scope: {
                   showUrl: '='
               },
               link: function (scope, ele) {
                    ele.on("click",function (e) {
                        if (e.target.tagName == "IMG"){
                            scope.showUrl = e.target.currentSrc;
                            scope.$apply();
                        }
                    })

               }
           }
    })
    //拖动切换展示
    .directive('touchMove', function () {
        return {
            restrict: 'A',
            scope: {
                touchMove: '&'
            },
            link: function (scope, ele) {
                var pageX1, pageY1, pageX2, pageY2, move,isDisabled=false;
                var cc1 = ele;
                cc1.on('touchstart', function (e) {
                    pageX1 = e.targetTouches[0].pageX;
                    pageY1 = e.targetTouches[0].pageY;
                });
                cc1.on('touchmove', function (e) {
                    move = true;
                    var touch = e.originalEvent.targetTouches[0];
                    pageX2 = touch.pageX;
                    pageY2 = touch.pageY;
                });
                cc1.on('touchend', function () {
                    if (!isDisabled&&move && (Math.abs(pageX1 - pageX2) > 10 || Math.abs(pageY1 - pageY2) > 10)) {
                        isDisabled=true;
                        if((pageX1-pageX2)>10){
                            $(ele).find('.textarea-wrap').eq(0).addClass('change-left')
                        }else {
                            $(ele).find('.textarea-wrap').eq(0).addClass('change-right')
                        }


                        // var disappear = {
                        //         top: '40px',
                        //         opacity: '0'
                        //     },
                        //     appear = {
                        //         top: '0',
                        //         opacity: '1'
                        //     };
                        // var firstCard = cc1.children('.card').first();
                        // firstCard.css(disappear);
                        // var x = setTimeout(function () {
                        //     //firstCard.remove();
                        //     firstCard.css(appear);
                        //     // $('.card-container-1').append();
                        // }, 200);

                        setTimeout(function () {
                            scope.touchMove();
                            isDisabled=false;
                        },1000)

                    }
                    pageX2 = pageX1;
                    pageY2 = pageY1;
                    move = false;
                })
            }
        }
    });
