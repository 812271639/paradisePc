'use strict';
angular.module('admin')
    .controller('RoleDetailCtrl', function ($state, $scope, $rootScope, commonUtil, roleService, managerService, moduleService) {
        var vm = $scope.vm = {};
        vm.id = $state.params.id;
        vm.selectList = [];
        vm.permissionsSet = [];
        vm.mid_module = {};
        var selectedToArray = function () {
            var result = [];
            angular.forEach(vm.selectList, function (data, index, array) {
                angular.forEach(data.nodes, function (data, index, array) {
                    if (data.use) {
                        result.push(data.id);
                        if (commonUtil.arrayContains(result, data.parentID)) {

                        } else {
                            result.push(data.parentID);
                        }
                    }
                });
            });


            return result.toString();
        };


        // view
        roleService.getRole(vm.id).then(function (res) {
            if (res.data.code == 0) {
                vm.name = res.data.data.role.name;
            } else {
                commonUtil.showErrMsg(res);
            }
        });


        moduleService.getModuleList({size: 65535}).then(function (res) {
            if (res.data.code == 0) {
                moduleService.batchGetModule(res.data.data.ids).then(function (res) {
                    if (res.data.code == 0) {
                        vm.selectList = commonUtil.buildTree(res.data.data.moduleList);

                        if (vm.id) {
                            roleService.getRoleModule(vm.id).then(function (res) {

                                if (res.data.code == 0) {

                                    vm.currentModuleList = res.data.data.mids;


                                    angular.forEach(vm.selectList, function (data, index, array) {

                                        angular.forEach(data.nodes, function (data, index, array) {

                                            var current = data;
                                            console.log(data.id + " get use is " + data.use);
                                            current.use = false;

                                            angular.forEach(vm.currentModuleList, function (data, index, array) {

                                                if (current.id == data) {
                                                    current.use = true;
                                                    console.log(current.id + " is true ");


                                                } else {


                                                }
                                            })


                                        })

                                    })
                                    console.log(JSON.stringify(vm.selectList));


                                }
                                else {

                                }


                            })
                        } else {
                            // create
                            console.log("create new role");
                        }
                    } else {

                        commonUtil.showErrMsg(res);
                    }


                })


            } else {
                commonUtil.showErrMsg(res);
            }

        });


        vm.saveOrUpdate = function () {
            vm.data = {
                id: vm.id,
                name: vm.name,
                permissionsSet: selectedToArray()
            };
            console.log(vm.data)
            roleService.saveOrUpdateRole(vm.id, vm.data, "field.role");


        }


    });