angular.module('myApp')
    .controller('surePayCtrl', ['$rootScope', '$uibModalInstance', 'items', 'user', '$timeout',
        function ($rootScope, $uibModalInstance, items, user, $timeout) {
            var vm = this;
            vm.data = items;
            vm.userName = vm.data.userName;
            vm.discountPrice = vm.data.discountPrice;
            vm.price = vm.data.price;
            vm.payWay = vm.data.payWay;
            vm.codeUrl = vm.data.codeUrl;
            vm.payCode = false;
            vm.oid = vm.data.oid;
            vm.yes = function () {
                //订单号
                var indentCode = vm.data.indentCode;
                //支付宝支付
                if (vm.payWay == 1) {

                    var aliPayUrl = "/pay/aliPay?serviceName=QUICK_WAP_WAY&indentCode=" + indentCode
                        + "&payFrontUrl=/parentsPay?discountPrice=" + vm.discountPrice + "&price=" + vm.price + "&userName=" + vm.userName;
                    window.open(aliPayUrl, '_self');

                }
                else if (vm.payWay == 2) {
                    //微信支付
                    user.mobileGetWeixinOrder(vm.oid).then(function (res) {
                        if (res.data.code == 0) {
                            window.open(res.data.data.mwebUrl, '_self');
                            $uibModalInstance.dismiss('cancel');
                        } else {
                            alert(res.data.message)
                        }
                    });
                } else {
                    alert("您已付款")
                }


            };


            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }


        }]);