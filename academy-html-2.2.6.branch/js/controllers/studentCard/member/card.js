/**
 * Created by Master on 2017/2/26.
 */
angular.module('paradiseApp')
    .controller('CardController', ['$log', '$rootScope', 'identityData', '$scope', 'userService',
        function ($log, $rootScope, identityData, $scope, userService) {
            var vm = this;

            //返回
            vm.goBack=function () {
                history.go(-1);
            };
            //激活
            vm.card=function () {
                userService.cardActivation(vm.params).then(function (res) {
                    if(res.data.code==0){
                        vm.result=1;
                    }else {
                        $rootScope.showTips(res.data.message)
                    }
                })
            }

        }]);

