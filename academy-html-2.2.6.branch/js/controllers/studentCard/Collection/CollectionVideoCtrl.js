/**
 * Created by Master on 2017/4/21.
 */
'use strict';
angular.module('paradiseApp')
    .controller('CollectionVideoController', ['userService', '$rootScope','$state', function (userService, $rootScope,$state) {
        var vm = this;
        var params = {size: 10, page: 1};
        vm.userId = $state.params.userId;
        vm.loaded = 1;
        vm.videoList = [];
        vm.bannerList=[];
        getVideoList();
        vm.more = getVideoList;

        //获取收藏视频列表
        function getVideoList() {
            return userService.videoCollection(params,vm.userId).then(function (res) {
                if (res.data.code == 0) {
                    vm.videoList = vm.videoList.concat(res.data.data);
                    params.page++;
                    vm.notfound = (vm.videoList.length == 0);
                    vm.loaded++;
                    return vm.nextPage = res.data.next;
                } else {
                    $rootScope.showTips('网络出现问题');
                    vm.loaded++;
                }

            })
        }

    }]);