/**
 * Created by Master on 2017/10/9.
 */
angular
    .module("admin")
    .controller("UserDetailController", [
        "$rootScope",
        "$scope",
        "$state",
        "userService",
        "memberService",
        "courseOption",
        userDetailController
    ]);

function userDetailController(
    $rootScope,
    $scope,
    $state,
    userService,
    memberService,
    courseOption
) {
    var vm = this;
    vm.id = $state.params.id;
    vm.typeChoose = 1;
    vm.isChangeMobile = 0;
    //获取会员详情

    function getUserDetail() {
        userService.userDetail(vm.id).then(function(res) {
            if (res.data.code == 0) {
                vm.userData = res.data.data;
                vm.changeMobileNum = vm.userData.mobile;
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }
    getUserDetail();
    getMemberDetail(vm.id);

    function getOrderList(params) {
        memberService.getOrderList(params).then(function(res) {
            if (res.data.code == 0) {
                vm.OrderList = res.data.data;
            } else {
                vm.OrderList = {};
            }
        });
    }

    function getMemberDetail(id) {
        memberService.getMemberDetail(id).then(function(res) {
            if (res.data.code == 0) {
                vm.memberDetail = res.data.data;
            } else {
                vm.memberDetail = {
                    memberName: "非会员",
                    price: 0
                };
            }
        });
    }

    function getLoginRecord(id) {
        memberService.getLoginRecord(id).then(function(res) {
            if (res.data.code == 0) {
                vm.loginRecord = res.data.data;
            } else {
                vm.loginRecord = {};
            }
        });
    }

    function getStudyRecord(id) {
        var params = {
            uid: id,
            collectType: 3,
            size: 99999
        };
        memberService.getStudyRecord(params).then(function(res) {
            if (res.data.code == 0) {
                vm.StudyRecord = res.data.data;
                vm.totalPage = res.data.totalPage;
                console.log(res.data.data);
            } else {
                vm.StudyRecord = {};
            }
        });
    }
    //新增——购买记录
    function getPayRecord(id) {
        var params = {
            userId: id,
            size: 99999
        };
        memberService.getPayRecord(params).then(function(res) {
            if (res.data.code == 0) {
                vm.PayRecord = res.data.data;
                vm.totalPage = res.data.totalPage;
                console.log(res.data.data);
            } else {
                vm.PayRecord = {};
            }
        });
    }

    //切换表单
    vm.change = function(num) {
        switch (num) {
            case 1:
                getMemberDetail(vm.id);
                break;
            case 2:
                getOrderList({ id: vm.id });
                break;
            case 3:
                getLoginRecord(vm.id);
                break;
            case 4:
                getStudyRecord(vm.id);
                break;
            case 5:
                getPayRecord(vm.id);
                break;
            default:
                getMemberDetail(vm.id);
                break;
        }
        vm.typeChoose = num;
    };
    vm.change(1);
    //修改手机
    vm.changeMobile = function(id) {
            var params = {
                mobile: vm.userData.mobile,
            };
            memberService.changePhone(id, params).then(function(res) {
                if (res.data.code == 0) {
                    vm.isChangeMobile = 0;
                    $rootScope.alert("修改手机成功")
                } else {
                    $rootScope.alert(res.data.code)
                }
            });
        }


    //调出充值逆袭豆模态框
    vm.isChangeScore = function() {
        $rootScope.ChangeScore(vm.id);
    }

}