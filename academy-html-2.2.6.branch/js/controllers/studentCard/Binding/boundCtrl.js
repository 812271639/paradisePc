/**
 * Created by Master on 2017/3/31.
 */
'use strict'
angular.module('paradiseApp')
    .controller('BoundController', ['$log', 'userService', 'commonUnit', '$rootScope', bound])
function bound($log, userService, commonUnit, $rootScope) {
    var vm = this;
    vm.load = false;
    $rootScope.loading = true;
    userService.userDetail().then(function (res) {
        vm.user = commonUnit.ajaxStatus(res);
        vm.load = true;
        $rootScope.loading = false;

    })

}