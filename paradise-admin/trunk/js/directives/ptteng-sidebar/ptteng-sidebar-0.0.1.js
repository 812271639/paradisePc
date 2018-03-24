'use strict';

angular.module('admin')
    .directive('sidebar', function () {
        return {
            templateUrl: 'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope, $rootScope, $state, $location, roleService, managerService, moduleService, commonUtil, $timeout) {
                $rootScope.log = console.log.bind(console);
                var self = managerService.getSelfDetail();

                if (self == undefined) {
                    $rootScope.alert("您还未登录", function () {
                        $state.go("login");
                    });
                    return false;
                } else {
                    $rootScope.uid = self.role.id;
                    $rootScope.school = self.manager.schoolId;
                }
                roleService.getRole(self.role.id).then(function (res) {
                    if (res.data.code == 0) {
                        //vm.name = res.data.data.role.name;
                        $scope.currentModuleList = res.data.data.role.permissionsSet;
                        localStorage["permissionsSet"] = JSON.stringify(res.data.data.role.permissionsSet);
                        $rootScope.permissionsSet = JSON.parse(localStorage["permissionsSet"]);
                        //console.log($scope.currentModuleList);
                        //console.log(Object.keys($scope.currentModuleList));
                        if (sessionStorage.mineSide == '' || sessionStorage.mineSide == undefined) {
                            moduleService.batchGetModule(Object.keys($scope.currentModuleList)).then(function (res) {
                                $rootScope.log(res);
                                if (res.data.code == 0) {
                                    $scope.sideList = commonUtil.buildTree(res.data.data.moduleList);
                                    console.log($scope.sideList);
                                    //console.log($scope.sideList);
                                } else {
                                    console.log($scope.sideList);
                                }
                            });
                        }
                        else {

                            $scope.sideList = JSON.parse(sessionStorage["mineSide"]);
                            // console.log($scope.sideList);

                        }

                    }
                });


                //刷新后 自动选中刷新前的侧边栏
                $scope.sideClick = function (id, url) {
                    if (url.indexOf('http') != -1 || url.indexOf('https') != -1) {
                        window.open(url)
                    }
                    $rootScope.log(1);
                    console.log($scope.sideList);
                    var stopId = '';
                    angular.forEach($scope.sideList, function (items, index) {
                        angular.forEach(items.nodes, function (item) {
                            if (id == item.id) {
                                $scope.collapseVar = index;
                                item.selected = true;
                                items.se = true;
                                //stopid值是记录了应该展开的模块id
                                stopId = items.id;
                            }
                            else if (stopId != items.id) {
                                item.selected = false;
                                items.se = false;
                            }
                            else if (id != item.id && stopId == items.id) {
                                item.selected = false;
                            }
                        })
                    })
                    sessionStorage.mineSide = JSON.stringify($scope.sideList);
                }

                $scope.collapseVar = -1;

                $scope.getUrl = function (n) {
                    $scope.currentUrl = n.url
                }
            }
        }
    })
;
