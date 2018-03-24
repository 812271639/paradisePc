/**
 * Created by Administrator on 2017\9\15 0015.
 */
'use strict';
myApp.config(httpConfig);
angular.module("myApp")
    .controller("homeCtrl", ["$scope", "$state", "home", '$rootScope', '$location', '$anchorScroll', 'user','$window','$timeout','main',
        function($scope, $state, home, $rootScope, $location, $anchorScroll, user,$window,$timeout,main) {
        var vm = this;
        vm.user=JSON.parse(localStorage.getItem('user'));
        vm.arr = [];
        if(vm.user){
            vm.id = $state.params.id||vm.user.id;
        }
        else{
            vm.id = $state.params.id
        }
        vm.subjectId = $state.params.subjectId;
        vm.gradeDept=$state.params.gradeDept||parseInt(localStorage.getItem("gradeDept"));
        if(!vm.gradeDept){
            vm.gradeDept=1;
        }
            //获取年级部数据
        vm.getSubject = function() {
            home.getSubjectList(vm.gradeDept,{uid:vm.id}).then(function(res) {
                if (res.data.code === 0) {
                    vm.data = res.data.data;
                    console.log(vm.data);
                    vm.status = vm.gradeDept;
                    localStorage.gradeDept = vm.gradeDept;
                    return vm.flag = true;
                }else {
                    res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                }
            })
        };
        if (vm.id && vm.subjectId) {
            vm.getSubject(vm.id);
            window.onload = function() {
                $location.hash('' + vm.subjectId);
                $anchorScroll();
            }

        } else if (vm.id) {
            vm.getSubject(vm.id);

        } else {
            localStorage.gradeDept ? vm.getSubject(localStorage.gradeDept) : vm.getSubject(2);

        }
        //设置banner图跳转的url
        vm.getBanner = function() {
            home.getImgList().then(function(res) {
                if (res.data.code === 0) {
                    vm.bannerList = res.data.data.articleList;

                    for (var i = 0; i < vm.bannerList.length; i++) {
                        if (vm.bannerList[i].type === 2) {
                            continue;
                        }
                        vm.obj = {};
                        if (vm.bannerList[i].bannerType == 1) {
                            vm.obj.type = 1;
                            vm.obj.img = vm.bannerList[i].img;
                            vm.obj.url = vm.bannerList[i].content;
                        } else if (vm.bannerList[i].bannerType == 2) {
                            var c = vm.bannerList[i].content;
                            try {
                                var data = JSON.parse(c);
                            } catch (e) {
                                continue;
                            }
                            var a = c.split(',');
                            switch (a.length) {
                                case 1:
                                    vm.obj.url = 'main.home';
                                    vm.obj.hash = { id: data.gradeDept };
                                    break;
                                case 2:
                                    vm.obj.url = 'main.home';
                                    vm.obj.hash = {id:data.gradeDept, subjectId: data.subjectId };
                                    break;
                                case 3:
                                    vm.obj.url = 'main.subject';
                                    vm.obj.hash = { id: data.lessonId };
                                    break;
                                case 4:
                                    vm.obj.url = 'main.course';
                                    vm.obj.hash = { id: data.periodId };
                                    break;
                                case 5:
                                    vm.obj.url = 'main.course';
                                    vm.obj.hash = { id: data.periodId, taskId: data.taskId };
                                    break;
                            }
                            vm.obj.type = 2;
                            vm.obj.img = vm.bannerList[i].img;
                            vm.obj.content = vm.bannerList[i].content;
                        }
                        vm.arr.push(vm.obj);
                    }
                    setTimeout(function () {
                        $('#carousel').carousel({interval:4000});
                        for (let i=0;i<vm.arr.length;i++){
                            $("#carouselSmallImg").children("div").children("div").eq(i).mouseover(function () {
                                clearInterval(bannerRun);
                                $("#carousel").carousel(i);
                                $("#carousel").carousel('pause');
                                $(".carouselSmallImg").removeClass('home-carousel-newSmall');
                                $("#carouselSmallImg").children("div").children("div").eq(i).addClass('home-carousel-newSmall');
                            });
                        }
                         var bannerRun=setInterval(function () {
                             if($(".carouselSmallImg").length==0){
                                 clearInterval(bannerRun);
                                 return
                             }
                             $(".carouselSmallImg").removeClass('home-carousel-newSmall');
                            var imgName=$(".active").children('img').attr('id');
                            $("."+imgName).addClass('home-carousel-newSmall');
                        },100);
                        $(".banner").mouseover(function () {
                            $("#carousel").carousel('pause');
                            clearInterval(bannerRun);
                        }).mouseout(function () {
                            $('#carousel').carousel({interval:4000});
                            bannerRun=setInterval(function () {
                                if($(".carouselSmallImg").length==0){
                                    clearInterval(bannerRun);
                                    return
                                }
                                $(".carouselSmallImg").removeClass('home-carousel-newSmall');
                                var imgName=$(".active").children('img').attr('id');
                                $("."+imgName).addClass('home-carousel-newSmall');
                            },100);
                        })
                    },1000);


                }else {
                    res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                }
            })
        };
        vm.getBanner();
        //跳转
        vm.state = function(o) {
            console.log(o);
            var obj = o;
            if (obj.type == 1) {
                // location.href = obj.url;
                $window.open(obj.url,'_blank')
            } else if (obj.type == 2) {
                // $state.go(obj.url, obj.hash,{ reload: true });
                var url = $state.href(''+obj.url,obj.hash);
                $window.open(url,'_blank')
            }

        };
        //点击改变科目颜色
        vm.setActive = function($index) {
            vm.select = $index;
        };
            //判断身份进入专题详情页还是专题简介页
            vm.verify = function(lessonId,isLock){
                //isLock 0不收费。能进。  1收费未购买。不能进。(此时前端需要结合用户是否是会员 来决定最终 能不能看)  2已购买，能进。
                if(isLock==0){
                    $state.go('main.subject',{id:lessonId},{reload:true})
                }
                else if(isLock==1){
                    vm.user=JSON.parse(localStorage.getItem('user'));
                    if(!$rootScope.isLogin()){
                        var requestDate = JSON.stringify({
                            lessonId:lessonId,
                            gradeDept:vm.gradeDept,
                        });
                        localStorage.setItem('requestDate',requestDate );
                        $rootScope.login()
                    }
                    else if(vm.user.isMember==1){
                        $state.go('main.subject',{id:lessonId},{reload:true})
                    }
                    else{
                        $state.go('main.subjectIntro',{id:lessonId},{reload:true})
                    }
                }
                else if(isLock==2){
                    $state.go('main.subject',{id:lessonId},{reload:true})
                }
            }
    }]);