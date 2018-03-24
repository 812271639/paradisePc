/**
 * Created by aLeX on 2017/9/15.
 */



angular.module('myApp')
    .controller('MemberPayCtrl', ['$rootScope', 'user', '$location', '$state', '$stateParams', 'main',function($rootScope, user, $location, $state, $stateParams,main) {
        var vm = this;
        console.log(vm.status);
        //存在哈希值则去除后缀（支付完成返回时）
        if ($location.search().buyer_id) {
            $state.go($state.current, {}, { reload: true });
        }
        //协议默认不选中
        vm.payAgreement = false;
        //提示信息
        vm.tip = false;

        //跳转模态框传参
        var payX = {
            pay: '',
            url: '',
            price: '',
            id: ''
        }

        //点击支付
        vm.payBtn = function() {

            var params = {
                targetId: vm.status, //套餐对应ID
                type: 6 ,//固定
                os:'web'

            }
            //支付宝直接弹窗，后面修改地址，避免被拦截。

            //检查是否勾选协议
            if (vm.payAgreement == false) {
                vm.tip = true;
            } else {
                if(vm.ali){
                    var aliPayUrl=window.open();
                }
                vm.tip = false;
                //请求订单号并跳转支付链接
                user.postOrder(params).then(function(res) {
                    console.log(res);

                    if (res.data.code == 0) {
                        if(vm.ali){
                            payX.id = res.data.data.orderNo;
                            $rootScope.pay(payX);
                            //aliPayUrl.location("http://dev.pc.academy.ptteng.com/pay/aliPay?indentCode=" + res.data.data.orderNo + "&payFrontUrl=/user/detail");
                            aliPayUrl.location="/pay/aliPay?indentCode=" + res.data.data.orderNo + "&payFrontUrl=/user/detail"
                        }else{
                            vm.oid =res.data.data.oid;
                            //微信支付时
                            user.getWeixinOrder(vm.oid).then(function(wres){
                                var payW = {
                                    oid:vm.oid,
                                    targetId:vm.status,
                                    result:wres.data
                                }
                                $rootScope.weixinPay(payW)
                            })
                        }
                    }
                    else {
                        console.log(res.data.message)
                    }
                })
            }
        }
        // var c=document.getElementById("data2");
        // c.setAttribute("checked", "true");
        $('#data2').css("checked", "true");

        //套餐列表渲染
        user.getMember.then(function(res) {
            //console.log('渲染套餐列表',res);
            if(res.data.code==0){
                vm.list = res.data.data;
                console.log(vm.list);
                console.log(vm.list[2].id);
                console.log(vm.status);
                //默认套餐选中
                angular.forEach(vm.list, function(data, index) {
                    if (data.recommend == 1) {
                        vm.status = data.id;
                    }
                })
            }else {
                alert(res.data.message)
            }
        });
        console.log(window)
        //数据埋点
        main.postDataBurialPoint(
            {
                targetType:4,
                subTargetType:1,
                userId:vm.id,
                os:1
            }
        ).then(function(res){
            //alert('数据埋点');
        })
    }])