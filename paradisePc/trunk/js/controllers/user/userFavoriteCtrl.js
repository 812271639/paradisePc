'use strict';
//下拉滚动时间设置
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 2000);
angular.module('myApp')
    .controller('UserFavoriteCtrl',[ 'main','user','$timeout','$state',function(main, user, $timeout, $state) {
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
            collectType: 2 //2代表收藏记录，3代表学习记录
        }

        function getList(params) {
            main.getFavorites(params).then(function(res) {
                if(res.data.code==0){

                }else{
                    console.log(res.data.message)
                    res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                }
                vm.items = res.data.data;
                console.log(vm.items);
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
                    arr = arr.concat(vm.items);
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

                    arr = vm.items;
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
                        console.log(res.data.message)
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
        }

    }]);