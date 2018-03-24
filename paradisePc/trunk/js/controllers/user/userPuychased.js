'use strict';
//下拉滚动时间设置
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 2000);
angular.module('myApp')
    .controller('userPuychased',['main','user','$timeout','$state','$rootScope',function(main, user, $timeout, $state,$rootScope) {
        //参数初始化
        var vm = this;
        vm.end = false;
        vm.showImage = false;
        vm.empty = false;
        var arr = [];
        var getMore = false;
        //获取视频时间
        vm.timeShow = function() {
            $timeout(function() {
                var myVid = document.getElementsByClassName("video");
                var i = 0;
                vm.time = [];
                angular.forEach(myVid, function(data) {
                    var a;
                    var b = data.duration.toFixed(0);
                    if(isNaN(b)){
                        vm.time[i]="";
                    }else{
                    if (b < 60) {
                        a = '00';
                    } else {
                        a = Math.floor(b / 60);
                        if (a < 10) {
                            a = "0" + a;
                        }
                        b = b % 60;
                        if (b < 10) {
                            b = "0" + b;
                        }
                    }
                    vm.time[i] = a + ":" + b;
                    i++;
                }
                })
            }, 1500);
        }
        //进入页面请求数据
        vm.params = {
            page: 1,
            size: 10,
        };

        function getList(params) {
            main.getPuychased().then(function(res) {
                //有效期——validUntil
                if(res.data.code==0){

                }else{
                    res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                }
                vm.items1 = res.data.data;
                vm.showImage = true;
                getMore = true;
                //如果没有数据
                if (res.data.total == 0) {
                    vm.empty = true;
                    getMore = false;
                    //如果是最后一页
                } else if (res.data.page == Math.ceil(res.data.total / 10)) {
                    vm.end = true;
                    getMore = false;
                };
                //如果不是第一页
                if (res.data.page > 1) {
                    arr = arr.concat(vm.items1);
                    vm.lists = arr;
                    vm.timeShow();
                    $timeout(function(){
                        vm.timeShow();
                    },3000);
                    $timeout(function(){
                        vm.timeShow();
                    },6000);

                }
                //如果是第一页
                else {

                    arr = vm.items1;
                    vm.lists = arr;
                    vm.timeShow();
                    $timeout(function(){
                        vm.timeShow();
                    },3000);
                    $timeout(function(){
                        vm.timeShow();
                    },6000);
                }
            })
        };
        getList(vm.params);
        //删除记录
        vm.delete = function(b) {
                var params = {
                    targetType: 3,
                    status: 2
                }
                user.putFavorite(b, params).then(function(res) {
                    if (res.data.code == 0) {
                        //直接从数组中删除，不需要刷新页面
                        angular.forEach(vm.lists, function(item, index, array) {
                            if (item.id == b) {
                                array.splice(index, 1);
                                if(array.length==0){
                                    $state.go($state.current, {}, { reload: true });
                                }
                            }
                        })
                    }else{
                        console.log(res.data.message);
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })
            }
            //分页函数
        vm.myPagingFunction = function() {
            if (getMore) {
                vm.showImage = true;
                vm.params.page += 1;
                getList(vm.params);
            }
        };
        //获取当前时间
        vm.charge= Date.parse(new Date());
        //购买记录跳转判断
        vm.verify = function(time,id){
            let timeNow = Date.parse(new Date());
            if(timeNow > time){

                var red = function() {
                    $state.go('main.subjectIntro',{id:id},{reload:true})
                };

                var blue = function() {};
                console.log(blue,red);
            $rootScope.validity("您购买的专题已过一年有效期，若想学习请重新购买哦~", red, blue);

            }
            else{
               $state.go('main.subject',{id:id});
            }
        }
    }]);