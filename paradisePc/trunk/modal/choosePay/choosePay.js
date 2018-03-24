angular.module('myApp')
    .controller('choosePayCtrl', ['$rootScope', '$uibModalInstance', 'items', 'user', '$timeout',
        function ($rootScope, $uibModalInstance, items, user, $timeout) {
            var vm = this;
            vm.data = items;
            // console.log(vm.data);
            //跳转模态框传参
            var payX = {
                pay: '',
                url: '',
                price: '',
                id: '',
                oid:''
            }
            // vm.payWay = 1;
            vm.payWay = 2;
            //请求订单支付状态
            vm.pay = function () {
                var params = {
                    targetId: vm.data.data.id, //套餐对应ID
                    type: 1 //固定
                };
                //支付宝直接弹窗，后面修改地址，避免被拦截。
                if (vm.payWay == 1) {
                    var aliPayUrl = window.open();
                }
                //请求订单号并跳转支付链接
                user.postOrder(params).then(function (res) {

                    if (res.data.code == 0) {
                        if (vm.payWay == 1) {
                            payX.id = res.data.data.orderNo;
                            payX.oid = res.data.data.oid;
                            $rootScope.pay(payX);

                            //aliPayUrl.location("http://dev.pc.academy.ptteng.com/pay/aliPay?indentCode=" + res.data.data.orderNo + "&payFrontUrl=/user/detail");

                            // aliPayUrl.location = "/pay/aliPay?indentCode=" + res.data.data.orderNo + "&payFrontUrl=/user/detail"; //修改前2018.2.25
                            //2018.2.25 修改
                            if (vm.data.data.id) {
                                //支付成功后跳转到专题
                                aliPayUrl.location = "/pay/aliPay?indentCode=" + res.data.data.orderNo + "&payFrontUrl=/subject?id="+ vm.data.data.id;
                            } else {
                                aliPayUrl.location = "/pay/aliPay?indentCode=" + res.data.data.orderNo + "&payFrontUrl=/user/detail";
                            }

                            $uibModalInstance.dismiss('cancel');//2018.2.25添加

                        } else {
                            vm.oid = res.data.data.oid;
                            //微信支付时
                            user.getWeixinOrder(vm.oid).then(function (wres) {

                                var payW = {
                                    oid: vm.oid,
                                    targetId: vm.data.data.id,
                                    result: wres.data,
                                    type: 2,
                                    thing: 'subject'
                                };
                                console.log(payW);
                                vm.cancel();
                                $rootScope.weixinPay(payW)
                            })
                        }
                    }
                    else {
                        console.log(res.data.message)
                    }
                })
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
        }]);