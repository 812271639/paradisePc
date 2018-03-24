/**
 * Created by Administrator on 2018/1/29/029.
 */
angular.module('admin')
    .controller('WechateServiceController', ['constantManage','$state',function (constantManage,$state) {
        var vm = this;

        vm.clickSaveWxService = function () {

            constantManage.saveWxService({kefuweixin:vm.qwe,huiyuanweixin:vm.asd}).then(function (res) {
                if(res.data.code===0){
                    $state.go('field.constantList');
                }else {
                    $rootScope.alert(res.data.message);
                }
            });

        }


    }]);