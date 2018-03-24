/**
 * Created by aLeX on 2017/9/16.
 */

angular.module("myApp").controller("ModalMemberActiveCtrl", [
    "$rootScope",
    "$uibModalInstance",
    "items",
    "$timeout",
    "$state",
    "user",
    function ($rootScope, $uibModalInstance, items, $timeout, $state, user) {
        var vm = this;
        console.log(items);
        vm.ok = function () {
            ////console.log(vm.name,vm.password);
            $uibModalInstance.close();
        };
        vm.cancel = function () {
            $uibModalInstance.dismiss("cancel");
            if($state.params.id && items.pay===2){
                $state.go("main.subject",{id: $state.params.id}, {reload: true});
            }
        };
        vm.type = items.pay;
        //console.log(vm.type);
        vm.sureSuccess = function () {
            // $state.go("main.user.detail");
            if($state.params.id && items.pay===2){
                $state.go("main.subject",{id: $state.params.id}, {reload: true});

            }else {
                $state.go("main.user.detail");
            }

            vm.cancel();
        }

        switch (vm.type) {
            case 0:
                vm.success = true;
                vm.tips = "会员激活成功";
                vm.failImg = "images/member-success.png";
                vm.tipBtn = "确定";
                $timeout(function () {
                    vm.cancel();
                    $state.go("main.user.detail");
                }, 1000);

                break;
            case 1:
                vm.success = false;
                vm.tips = "会员激活失败";
                vm.failImg = "images/member-attention.png";
                vm.tipBtn = "重新激活";
                vm.tipHelp = "如支付遇到问题,请呼叫客服大白：";
                vm.again = vm.cancel;
                break;
            case 2:
                vm.success = true;
                vm.tipBtn = "确定";
                if($state.params.id){
                    vm.tips = " 开通专题成功";
                    console.log(items.oid);
                    //订单完成后调取 保存支付结果接口
                    user.saveOrderDetail(items.oid, { result: 1 }).then(function (res) {
                        console.log(res);
                    })
                }else {
                    vm.tips = "开通会员成功";
                }
                vm.failImg = "images/member-success.png";
                // $timeout(function() {
                //   vm.cancel();
                //   $state.go("main.user.detail");
                // }, 1000);
                vm.sureSuccess1 = function () {
                    console.log("跳转");
                    vm.cancel();
                    $state.go("main.user.detail");

                }
                break;
            case 3:
                vm.success = false;
                vm.tips = "开通会员失败";
                vm.failImg = "images/member-attention.png";
                vm.tipBtn = "重新支付";
                vm.tipHelp = "如支付遇到问题,请呼叫客服大白：";
                vm.again = vm.cancel;
                break;
            case 4:
                vm.success = true;
                vm.tips = "修改密码成功,请重新登录";
                vm.failImg = "images/seccess.png";
                $timeout(function () {
                    vm.cancel();
                    $rootScope.login();
                }, 1000);
                break;
            case 5:
                vm.success = true;
                vm.tips = "重置密码成功,请牢记你的密码";
                vm.failImg = "images/seccess.png";
                $timeout(function () {
                    vm.cancel();
                    //console.log("自动登录")
                }, 1000);
                break;
            case 6:
                vm.success = false;
                vm.tips = "支付失败";
                vm.failImg = "images/failure.png";
                vm.tipBtn = "重新支付";
                vm.tipHelp = "如支付遇到问题,请呼叫客服大白：";
                vm.again = vm.cancel;
                break;
        }
    }
]);
