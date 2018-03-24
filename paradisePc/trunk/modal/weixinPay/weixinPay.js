/**
 * Created by aLeX on 2017/9/16.
 */

angular.module("myApp").controller("ModalWeixinPayCtrl", [
    "$rootScope",
    "$uibModalInstance",
    "items",
    "user",
    "$timeout",
    "$interval",
    "$state",
    'main',
    'special',
    function(
        $rootScope,
        $uibModalInstance,
        items,
        user,
        $timeout,
        $interval,
        $state,
        main,
        special
    ) {
        var vm = this;
        //
        var payW = items;
        vm.payW=items;
        vm.status = 1;
        vm.codeUrl = payW.result.data.codeUrl;
        console.log(payW);

        //保存支付方式
        (function() {
            user.savePayWay(payW.oid, { payWay: 4 }).then(function(res) {
                if (res.data.code == 0) {
                    //console.log("save success");
                } else {
                    console.log(res.data.code);
                }
            });
        })();

        //获取套餐信息

        function getMemberDetail() {
            console.log(payW.targetId);
            user.getMemberDetail(payW.targetId).then(function(res) {
                if (res.data.code == 0) {
                    vm.price = res.data.data.price;
                    vm.discountPrice = res.data.data.discountPrice;
                } else {
                    alert(res.data.message);
                }
            });
        }

        //获取专题详情
        function getSpecialDetail() {
            special.getSpecialDetail(payW.targetId).then(function (res) {
                console.log(res);
                if (res.data.code == 0) {
                    vm.price = res.data.data.price;
                } else {
                    alert(res.data.message);
                }
            })
        }

        if(payW.type==2){
            getSpecialDetail();
        }else {
            getMemberDetail();
        }

        vm.timer = $interval(check, 1000);

        function check() {
            user.getWeixinOrderResult(payW.oid).then(function(res) {
                console.log(res);
                if (res.data.code == 0) {
                    checkStatus(res.data.data.tradeState);
                } else {
                    //console.log(res.data);
                }
            });
        }

        function checkStatus(msg) {
            switch (msg) {
                case "USERPAYING":
                    vm.status = 2;

                    break;
                case "SUCCESS":
                    $interval.cancel(vm.timer);
                    vm.status = 3;
                    console.log(vm.status);
                    vm.saveOrder();
                    break;
                case "PAYERROR":
                    //
                    $interval.cancel(vm.timer);
                    $rootScope.memberActive({ pay: 6 });
                    break;
                case "NOTPAY":
                    break;
                case "REFUND":
                    $interval.cancel(vm.timer);
                    $rootScope.memberActive({ pay: 6 });
                    alert("转入退款");
                    $interval.cancel(vm.timer);
                    break;
                case "CLOSED":
                    $interval.cancel(vm.timer);
                    $rootScope.memberActive({ pay: 6 });
                    //
                    break;
                case "REVOKED":
                    $interval.cancel(vm.timer);
                    $rootScope.memberActive({ pay: 6 });
                    alert("已撤销（刷卡支付）");

                    break;
                default:
                    break;
            }
        }

        vm.cancel = function() {
            $uibModalInstance.dismiss("cancel");
            user.getWeixinOrderResult(payW.oid).then(function(res) {
                if (res.data.code == 0) {
                    if (
                        res.data.data.tradeState != "SUCCESS" ||
                        res.data.data.tradeState != "USERPAYING"
                    ) {
                        $rootScope.memberActive({ pay: 6 });
                    }
                } else {
                    //console.log(res.data);
                }
            });
        };

        vm.saveOrder = function() {

            user.saveOrderDetail(payW.oid, { result: 1 }).then(function(res) {
                console.log(res);
                if (res.data.code == 0) {
                    $interval.cancel(vm.timer);
                    main.getUserMsg().then(function(res) {
                        console.log(res);
                        if (res.data.code === 0) {
                            localStorage.setItem('user',JSON.stringify(res.data.data));
                            $timeout(function() {
                                $uibModalInstance.dismiss("cancel");
                                if (vm.payW.thing=='subject') {
                                    $state.go("main.subject", {code:'',id:$state.params.id}, { reload: true });
                                }else{
                                    $state.go("main.user.detail", { reload: true });
                                }

                            }, 1500);
                        }else {
                            console.log(res.data.message);
                        }
                    })
                } else {
                }
            });
        };
    }
]);
