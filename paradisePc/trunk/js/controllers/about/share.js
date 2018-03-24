/**
 * Created by Administrator on 2017\9\19 0019.
 */
'use strict';
angular.module("myApp")
    .controller("shareCtrl", ["$rootScope", 'main', 'userMsg', '$state', 'ipCookie', '$scope', 'home', 'user', '$location', '$timeout',
        function($rootScope, main, userMsg, $state, ipCookie, $scope, home, user, $location,$timeout) {
            var vm = this;

            //去下载
            vm.goToApp=function () {
                location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ptteng.happylearn";
            }
        }]);