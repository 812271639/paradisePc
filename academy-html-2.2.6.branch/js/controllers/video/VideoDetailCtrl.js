/**
 * Created by Master on 2017/4/21.
 */
'use strict';
angular.module('paradiseApp')
    .controller('VideoDetailController', ['$scope', '$stateParams', 'urlParams', 'videoService', 'userService', '$timeout', '$rootScope', function ($scope, $stateParams, urlParams, videoService, userService, $timeout, $rootScope) {
        var vm = this;
        var id = +$stateParams.id || +urlParams('id');
        var likeStatus, collectionStatus;
        vm.loaded = 0;
        vm.userDetail=JSON.parse(sessionStorage.getItem("userDetail"));
        // console.log(vm.userDetail)
        getDetail();
        function getDetail() {
            return videoService.getVideoDetail(id).then(function (res) {
                if (res.data.code === 0) {
                    vm.video = res.data.data;
                    vm.loaded++;
                    return false;
                } else {
                    $rootScope.showTips(res.data.message);
                    vm.loaded++;
                    return false;
                }
            })
        }

        //点赞
        vm.like = function () {
            likeStatus = vm.video.likeStatus ? 2 : 1
            userService.like(id, {type: 2, status: likeStatus}).then(function (res) {
                if (res.data.code === 0) {
                    getDetail();
                } else {
                    $rootScope.showTips(res.data.message)
                }
            })
        };
        //收藏
        vm.collect = function () {
            collectionStatus = vm.video.collectionStatus ? 2 : 1;
            userService.collection(id, {type: 2, status: collectionStatus}).then(function (res) {
                if (res.data.code === 0) {
                    getDetail().then(function () {
                        tipChange();
                    });

                } else {
                    $rootScope.showTips(res.data.message)
                }
            })
        };
        function tipChange() {
            // $timeout(function () {
            vm.tip = true;
            // },500)

            $timeout.cancel(vm.timer);
            vm.timer = $timeout(function () {
                vm.tip = false;
            }, 3000)
        }

        //获取套餐列表
        userService.getMemberList({page:1,size:1000}).then(function (res) {
            if(res.data.code==0){
                vm.list=res.data.data;
                angular.forEach(vm.list,function (data) {
                    if(data.recommend==1){
                        vm.member=data;
                    }
                })
                $timeout(function () {
                    if(vm.chooseMember==''||vm.chooseMember==undefined){
                        vm.member=vm.list[0];
                    }
                },0)
            }else {
                $rootScope.showTips(res.data.message)
            }
        });
    }]);
