/**
 * Created by Administrator on 2018/1/29/029.
 */
angular.module('admin')
    .controller('ConstantController', ['constantManage',function (constantManage) {
    var vm = this;
    constantManage.getWxService().then(function (res) {
        if(res.data.code ===0){
            vm.kefuweixin = res.data.data.kefuweixin;
            vm.huiyuanweixin = res.data.data.huiyuanweixin;
        }else {
            $rootScope.alert(res.data.message);
        }
    });
    constantManage.getVipDays().then(function (res) {
        if(res.data.code===0){
            vm.huiyuantianshu = res.data.data.huiyuantianshu;
        }else {
            $rootScope.alert(res.data.message);
        }
    })

}]);