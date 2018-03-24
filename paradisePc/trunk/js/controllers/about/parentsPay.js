/**
 * Created by Administrator on 2018/1/31/031.
 */
angular.module("myApp")
    .controller("ParentsPayCtrl",
        ["$rootScope", 'main', 'userMsg', '$state', '$timeout', function ($rootScope, main, userMsg, $state, $timeout) {
                var vm = this;

                //支付方式
                // vm.payWay = 2; //微信为2

                // vm.data = $location.search();
                vm.payWay = $state.params.payWay;
                vm.price = $state.params.price;
                vm.indentCode = $state.params.indentCode;//支付宝订单号
                vm.codeUrl = $state.params.codeUrl;//微信codeURL
                vm.userName = decodeURIComponent($state.params.userName);//用户名解码

                if ($state.params.discountPrice) {
                    vm.discountPrice = $state.params.discountPrice;
                } else {
                    vm.discountPrice = $state.params.price;//没有优惠价就用原价
                }

                var payData = {
                    indentCode: vm.indentCode,
                    codeUrl: vm.codeUrl,
                    discountPrice: vm.discountPrice,
                    payWay: $state.params.payWay,
                    price: $state.params.price,
                    userName: $state.params.userName,
                    oid:$state.params.oid
                };



                vm.pay = function () {
                    if (vm.payWay) {
                        $rootScope.surePay(payData);
                    } else {
                        bootbox.alert({
                            message: "<div style='    padding: 90px;\n" + "font-size: 30px;text-align: center!important;color: #03A9F4'>您已经购买过该产品了 </div>",
                            backdrop:false,
                            buttons: {
                                ok: {
                                    label: '确定',
                                    className: 'btn-success'
                                }
                            },
                        });
                        $timeout(function () {
                            bootbox.hideAll();
                        },3000);

                    }

                };

            //判断是否为微信浏览器
            vm.show = false;
            if(isWeixinBrowser()){
                vm.show = true;
            }
            function isWeixinBrowser() {
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/micromessenger/i) == 'micromessenger'){
                    return true;
                }else{
                    return false;
                }

            }


        }]);
