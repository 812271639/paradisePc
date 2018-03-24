angular.module('admin').controller('versionManageCtrl', ['$rootScope','$state','customerService', versionManageCtrl]);

function versionManageCtrl($rootScope, $state,customerService) {
    var vm = this;

    customerService.versionDetail().then(function(res){
        if(res.data.code==0){
        	vm.data = res.data.data;
        	vm.android = vm.data.androidVersion
         	vm.ios = vm.data.iosVersion
			vm.android.info=JSON.parse(vm.android.info)
			vm.ios.info=JSON.parse(vm.ios.info)
        }else {
            $rootScope.alert(res.data.message)
        }
    })
}