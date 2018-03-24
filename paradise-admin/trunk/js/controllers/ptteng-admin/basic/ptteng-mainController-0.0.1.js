'use strict';
angular.module('admin')
    .controller('MainCtrl', function ($scope, $rootScope, $state) {
        // 是否登录检测，否则跳转到登录页
        /*if (!$rootScope.isLogin()) {
         $rootScope.alert("您还未登录", function() {
         $state.go("login");
         });
         }*/


    });