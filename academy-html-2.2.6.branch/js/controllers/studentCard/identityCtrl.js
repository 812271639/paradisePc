/**
 * Created by Master on 2017/2/26.
 */
angular.module('paradiseApp')
    .controller('IdentityController', ['$log', '$rootScope', 'identityData', '$scope', 'userService', '$state', 'commonUnit', function ($log, $rootScope, identityData, $scope, userService, $state, commonUnit) {
        var vm = this;
        vm.identityData = identityData;
        vm.loaded = 0;
        vm.userId = $state.params.userId;
        vm.myId = commonUnit.session('userDetail').id;
        //用户信息
        if(vm.userId) {
            userService.otherDetail(vm.userId).then(function (res) {
                if (res.data.code===0){
                    vm.user = res.data.data;
                }else {
                    $rootScope.showTips(res.data.message);
                }
                vm.loaded++;
            })
        }else {
            userService.userDetail().then(function (res) {
                if (res.data.code===0){
                    vm.user = res.data.data;
                    vm.myId = vm.user.id;
                }else {
                    $rootScope.showTips(res.data.message);
                }
                vm.loaded++;
            });
        }

        if (vm.userId) {
            vm.currentUser = vm.userId == vm.myId;
        } else {
            vm.currentUser = true;
        }


        //跳转绑定设置
        vm.bingFn = function () {
            if (!vm.user.mail && !vm.user.mobile) {
                $state.go('binding', {both: 'true', type: 'mobile'});
            } else {
                $state.go('bound');
            }
        };
        //跳转帖子列表
        // vm.postsList = function () {
        //     $state.go('postsList', {userId: vm.userId || vm.myId})
        // }


    }])

    .controller('IdentityCollectionController', ['$location', function ($location) {
        var vm = this;
        vm.clearHistory = function (url) {
            $location.path(url).replace();
        }
    }]);

