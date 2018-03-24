/**
 * Created by Master on 2017/3/12.
 */
'use strict';
angular.module('admin')
    .controller('UserController', ['userService', '$log', 'commonUtil', 'userOptions', '$rootScope', '$state', 'schoolManage', 'memberOptions', 'packageService', 'managerService', function(userService, $log, commonUtil, userOptions, $rootScope, $state, schoolManage, memberOptions, packageService, managerService) {
        var vm = this;
        vm.userOptions = userOptions;
        //会员
        vm.memberOptions = memberOptions;
        console.log(vm.memberOptions);

        //初始值非学校
        vm.isSchool = false;
        vm.searchParams = $state.params || {};

        //请求存储的用户信息
        vm.data = managerService.getSelfDetail();
        console.log(vm.data);
        if (vm.data.role.name == '学校') {
            vm.searchParams.schoolId = vm.data.role.id;
            vm.isSchool = true;

        }


        var str, freeze;

        getList(vm.searchParams);
        vm.pageChanged = getList;
        vm.freeze = function(id, status) {
            str = status == 1 ? '冻结后将无法登录，是否冻结该用户？' : '解冻后该用户可正常登录使用，是否解冻该用户？';
            $rootScope.alert(str, function() {
                userService.userStatus(id, { id: id, status: (status == 1 ? 2 : 1) }).then(function(res) {
                    if (res.data.code == 0) {
                        getList(vm.searchParams);
                        $rootScope.alert(status == 1 ? '冻结成功' : '解冻成功', '', true)
                    }
                });
            });
        };
        vm.search = function() {
            vm.searchParams.page = 1; $state.go($state.current, vm.searchParams, { reload: true })
        };

        //rest
        vm.rest = function() {

            $state.go($state.current,  commonUtil.restParms(vm.searchParams), { reload: true })

            }
        function getList(params) {
            userService.userList(params).then(function(res) {
                if (res.data.code == 0) {
                    console.log(res);
                    vm.data = res.data;
                    vm.userList = res.data.data;
                    vm.totalPage = res.data.totalPage;
                    console.log(vm.userList);
                }

            })
        }
        getSchoolList();

        function getSchoolList() {
            schoolManage.getSchoolList({ size: 10000 }).then(function(res) {
                if (res.data.code == 0) {
                    vm.schoolList = res.data.data;

                } else {
                    $rootScope.alert(res.data.message);
                }

            })
        }
        //会员列表
        getMemberList();

        function getMemberList() {
            packageService.packageList({ size: 10000 }).then(function(res) {
                if (res.data.code == 0) {
                    vm.memberOptions = vm.memberOptions

                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
    }])