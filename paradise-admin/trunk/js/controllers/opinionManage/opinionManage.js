angular.module('admin').controller('opinionManageCtrl', ['$rootScope', '$state', 'customerService', opinionManageCtrl]);

function opinionManageCtrl($rootScope, $state, customerService) {
    var vm = this;
    vm.params = {
        type: 3,
        name: $state.params.name,
        mail: $state.params.mail,
        startAt: $state.params.startAt,
        endAt: $state.params.endAt,
        page: $state.params.page,
        size: 10
    };
    if ($state.params.startAt) {
        vm.params.startAt = parseInt($state.params.startAt)
    }
    if ($state.params.endAt) {
        vm.params.endAt = parseInt($state.params.endAt)
    }

    //列表
    customerService.getOpinionList(vm.params).then(function(res) {
        console.log(res);
        vm.list = res.data.data;
        vm.totalPage = Math.ceil(res.data.total/res.data.size);
    });

    //删除
    vm.del = function(id) {
        $rootScope.alert("是否删除该意见反馈？", function() {
            customerService.delCustomerDetail(id).then(function(res) {
                console.log(res);
                if (res.data.code == 0) {
                    $state.go("field.opinionManage", null, { reload: true })
                } else {
                    $rootScope.alert(res.data.message)
                }
            })
        });

    };
    //搜索
    vm.search = function() {
        vm.params.page = 1;
        $state.go("field.opinionManage", vm.params, { reload: true })
    };
    //清除
    vm.clear = function() {
        vm.params = {
            type: 3,
            name: "",
            mail: "",
            startAt: "",
            endAt: "",
            page: 1
        };
        $state.go("field.opinionManage", vm.params, { reload: true })
    };

}