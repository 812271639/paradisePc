angular.module('admin').controller('lookOpinionManageCtrl', ['$rootScope','$state','customerService','$timeout', lookOpinionManageCtrl]);

function lookOpinionManageCtrl($rootScope, $state,customerService,$timeout) {
    var vm = this;

    vm.id=$state.params.id;
    customerService.getCustomerDetail(vm.id).then(function(res){
        console.log(res);
        if(res.data.code==0){
            vm.params=res.data.data;
        }
    });

    vm.del=function(){
        customerService.delCustomerDetail(vm.id).then(function(res){
            console.log(res);
            if(res.data.code==0){
                $state.go("field.opinionManage",null,{reload:true})
            }else {
                $rootScope.alert(res.data.message)
            }
        })
    }
}