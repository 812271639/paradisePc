/**
 * Created by aLeX on 2017/9/16.
 */

angular.module('myApp')
    .controller('ModalMemberPayCtrl', ['$rootScope', '$uibModalInstance', 'items', 'user', '$timeout', function($rootScope, $uibModalInstance, items, user, $timeout) {
        var vm = this;
        //
        var payX = items;
        ////console.log(payX);

        //请求订单支付状态
        vm.PayStatus = function() {
            user.getPayStatus(items.id).then(function(res) {
                console.log(res)
                if (res.data.code == 0) {
                    if (res.data.data.status == 3) {
                        payX.pay = 2;
                    } else {
                        payX.pay = 3;
                    }
                    $uibModalInstance.dismiss('cancel');
                    // console.log(payX);
                    ////console.log(payX.pay);
                    $rootScope.memberActive(payX);
                }
            })
        };

        vm.payStatus = function() {
            //防止重复提交
            $rootScope.doubleClick(vm);
            vm.PayStatus();
        }
        vm.cancel = vm.payStatus;
    }])