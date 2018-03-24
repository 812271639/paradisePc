/**
 * Created by Administrator on 2018/1/29/029.
 */
angular.module('admin')
    .controller('InviteRegistController', ['constantManage','$state',function (constantManage,$state) {
        var vm = this;


    vm.clickSaveVipDays = function () {
        vm.huiyuantianshu = {huiyuantianshu:vm.qwe};
        console.log( vm.huiyuantianshu);
        constantManage.saveVipDays(vm.huiyuantianshu ).then(function (res) {
            console.log(res);
            if(res.data.code===0){
                $state.go('field.constantList');
            }else {
                $rootScope.alert(res.data.message);
            }
        });

    }

    }]);