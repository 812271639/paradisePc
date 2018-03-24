/**
 * Created by aLeX on 2017/9/15.
 */
angular.module('myApp')
    .controller('MemberActiveCtrl', ['$rootScope', 'user', '$state','main',function($rootScope, user ,$state,main) {
        var vm = this;
        var payX = { pay: '' };
        vm.params = {};
        vm.activeBtn = function() {
            //防止重复提交
            $rootScope.doubleClick(vm);
            if (!vm.params.number || !vm.params.pwd) {
                payX.pay = 1;
                $rootScope.memberActive(payX); //分别执行模态框，
            } else {
                user.putMemberActive(vm.params).then(function(res) {
                    if (res.data.code == 0) {
                        payX.pay = 0;
                        vm.params = {}; //成功后清空表单
                    } else {
                        res.data.code==-4?$rootScope.loginOut():payX.pay = 1;;

                    }
                    $rootScope.memberActive(payX);
                })
            }
        };
        //数据埋点
        main.postDataBurialPoint(
            {
                targetType:5,
                subTargetType:1,
                userId:vm.id,
                os:1
            }
        ).then(function(res){
        })
    }]);