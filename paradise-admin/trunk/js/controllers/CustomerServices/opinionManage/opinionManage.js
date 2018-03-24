angular.module('admin').controller('opinionManageCtrl', ['$rootScope','$state','customerService', opinionManageCtrl]);

function opinionManageCtrl($rootScope, $state,customerService) {
    var vm = this;
    vm.params={
        type:3,
        nick:$state.params.nick,
        mail:$state.params.mail,
        timeLow:$state.params.timeLow,
        timeHigh:$state.params.timeHigh,
        page:$state.params.page,
        size:10
    };
    if($state.params.timeLow){
        vm.params.timeLow=parseInt($state.params.timeLow)
    }
    if($state.params.timeHigh){
        vm.params.timeHigh=parseInt($state.params.timeHigh)
    }

    //列表
    customerService.getCustomerList(vm.params).then(function(res){
        console.log(res);
        vm.list=res.data.data;
        vm.totalPage=res.data.totalPage
    });

    //删除
    vm.del=function(id){
        $rootScope.alert("是否删除该意见反馈？",function(){
            customerService.delCustomerDetail(id).then(function(res){
                console.log(res);
                if(res.data.code==0){
                    $state.go("field.opinionManage",null,{reload:true})
                }else {
                    $rootScope.alert(res.data.message)
                }
            })
        });

    };
    //搜索
    vm.search=function(){
        vm.params.page=1;
        $state.go("field.opinionManage",vm.params,{reload:true})
    };
    //清除
    vm.clear=function(){
        vm.params={
            type:3,
            nick:"",
            mail:"",
            timeLow:"",
            timeHigh:"",
            page:1
        };
        $state.go("field.opinionManage",vm.params,{reload:true})
    };

}