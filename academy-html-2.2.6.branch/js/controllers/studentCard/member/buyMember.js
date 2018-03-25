/**
 * Created by Master on 2017/2/26.
 */
angular.module('paradiseApp')
    .controller('BuyMemberController', ['$log', '$rootScope', 'identityData', '$scope', 'userService', '$state', 'commonUnit','orderService','$timeout',
        function ($log, $rootScope, identityData, $scope, userService, $state, commonUnit, orderService,$timeout) {
            var vm = this;
            vm.userId=$state.params.userId;

            //获取用户详情
            // vm.user=JSON.parse(sessionStorage.getItem("userDetail"));
            userService.userDetail().then(function (res) {
                if (res.data.code===0){
                    vm.user = res.data.data;
                    commonUnit.session('userDetail',vm.user);

                    if(vm.user.isMember==1){
                        vm.period=vm.user.period;
                        vm.now= Date.parse(new Date());
                        vm.lessDay=Math.ceil((vm.period-vm.now)/(24*60*60*1000));
                    }
                }else {
                    $rootScope.showTips(res.data.message);
                }
            });
            //获取套餐列表
            userService.getMemberList({page:1,size:1000}).then(function (res) {
                if(res.data.code==0){
                    vm.list=res.data.data;
                    angular.forEach(vm.list,function (data) {
                        if(data.recommend==1){
                            vm.chooseMember=data.id;
                            vm.pay=data.price;
                        }
                    })
                    $timeout(function () {
                       if(vm.chooseMember==''||vm.chooseMember==undefined){
                           vm.chooseMember=vm.list[0].id;
                           vm.pay=vm.list[0].price;
                       }
                    },0)
                }else {
                    $rootScope.showTips(res.data.message)
                }
            });
            //返回
            vm.goBack=function () {
                history.go(-1);
            };
            //选择套餐
            vm.choose=function (li) {
                vm.chooseMember=li.id;
                vm.pay=li.price;

            };


            //新建订单
            vm.order = function () {
                orderService.order({
                    targetId: vm.chooseMember,
                    type: 6,
                }).then(function (res) {
                    if (res.data.code == 0) {
                        //console.log(res);
                        // console.log("创建订单成功");
                        vm.oid = res.data.data.oid;
                        //保存支付方式
                        vm.savePayWay();
                    }
                    else {
                        alert(res.data.message);
                    }
                });

            };

            //保存支付方式
            vm.savePayWay = function () {
                orderService.payWay(vm.oid, {
                    payWay: 4,
                }).then(function (res) {
                    if (res.data.code == 0) {
                        //console.log(res);
                        // console.log("保存支付方式成功");
                        //获取微信订单信息
                        vm.wxOrder();
                    } else {
                        alert(res.data.message);
                    }
                });
            };


            //获取微信支付订单参数
            vm.wxOrder = function () {
                orderService.wxOrder(vm.oid).then(function (res) {
                    if (res.data.code == 0) {
                        // console.log(res);
                        // alert(JSON.stringify(res.data.data))
                        localStorage.nonceStr = res.data.data.nonceStr;
                        localStorage.paySign = res.data.data.paySign;
                        localStorage.package = res.data.data.package;
                        localStorage.timeStamp = res.data.data.timeStamp;
                        vm.wxPay();

                    } else {
                        alert(res.data.message);
                    }
                });
            };

            //保存支付结果
            vm.payResult = function (result) {
                orderService.result(vm.oid, {
                    result: result,//1：支付成功 2：支付失败
                }).then(function (res) {
                        if (res.data.code == 0) {
                            $state.go("buyMember", {}, {reload: true});
                        }
                        else {
                            alert(res.data.message);
                        }
                    }
                );
            };


            //微信支付
            vm.wxPay = function () {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": $rootScope.wxOption.appId,
                        "timeStamp": localStorage.timeStamp,
                        "nonceStr": localStorage.nonceStr,
                        "package": localStorage.package,
                        "signType": "MD5",
                        "paySign": localStorage.paySign
                    },
                    function (res) {
                        // alert(res.err_msg);
                        // console.log(res.err_code + "  " + res.err_desc + "  " + res.err_msg);
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            // alert("支付成功");
                            //保存支付结果
                            vm.payResult(1);
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("用户取消支付");
                        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                            // alert("支付失败");
                            vm.payResult(2);
                        }
                    }
                );
            };



        }]);

