/*5期*/
/*
'use strict';
angular.module('admin')
    .controller('UserListImportController', ['schoolManage', '$log', 'commonUtil', '$rootScope', '$state','FileUploader','userService','packageService', function(schoolManage, $log, commonUtil, $rootScope, $state,FileUploader,userService,packageService) {
        var vm = this;

        //获取账号信息
        vm.manager = angular.fromJson(localStorage.getItem("self"));
        vm.schoolId = vm.manager.manager.schoolId||"";
        //获取学校列表
        vm.params ={
            schoolId:vm.schoolId,
            isMember:2,
            excelUrl:''
        };
        getSchoolList();
        function getSchoolList() {
            schoolManage.getSchoolList({size:10000}).then(function (res) {
                if (res.data.code == 0 ){
                    vm.schoolList = res.data.data;

                }else {
                    $rootScope.alert(res.data.message);
                }

            })
        }
        //上传
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return true;
        };
        vm.uploader = new FileUploader({
            url: "/a/u/file/1"
        });
        vm.uploader.onSuccessItem = function (fileItem, res, status, headers) {
            if (status == 200) {
                if (res.data.img === '') {
                    res.data.img = '123';
                }
                vm.params.excelUrl = res.data.url
            }
        };
        //上传问题
        vm.upload = function (item) {
                item.upload();
        };
        //删除文件
        vm.clearFile = function () {
            vm.params.excelUrl = '';
            vm.uploader.queue = [];
        };



        vm.save = function () {
            vm.params.isMember=vm.params.isMember?1:2;
            if(!vm.schoolId){
                vm.params.schoolId
            }

            userService.userListImport(vm.params).then(function (res) {
                if(res.data.code==0){
                    $rootScope.alert("用户列表导入成功",function () {
                        history.go(-1);
                    })

                }else {
                    var str = '';
                    angular.forEach(res.data.data,function (item) {
                        str+=item.openid+' ';
                    });
                    $rootScope.alert(res.data.message+":"+str);
                    vm.params.isMember = false;
                }
            })
        };
        vm.back = function () {
            $state.go("field.userList");
        };
        //获取上架套餐信息
        function getPackageList() {
            packageService.packageList({page:1,size:10000,status:1}).then(function (res) {
                if (res.data.code==0){
                    vm.PackageList=res.data.data;
                }else {
                    $rootScope.alert('请检查网络链接','',true)
                }
            });
        }
        getPackageList();
    }]);*/
/*4.5期*/
'use strict';
angular.module('admin')
    .controller('UserListImportController', ['schoolManage', '$log', 'commonUtil', '$rootScope', '$state','FileUploader','userService','packageService',
        function(schoolManage, $log, commonUtil, $rootScope, $state,FileUploader,userService,packageService) {
        var vm = this;

        //获取账号信息
        vm.manager = angular.fromJson(localStorage.getItem("self"));
        vm.schoolId = vm.manager.manager.schoolId||"";
        //获取学校列表
        vm.params ={
            schoolId:vm.schoolId,
            isMember:0,
            excelUrl:''
        }
            //获取套餐列表
            getPackageList();
            function getPackageList() {
                packageService.packageList({page:1,size:10000}).then(function (res) {
                    if (res.data.code==0){
                        vm.PackageList=res.data.data;
                        console.log(vm.PackageList)
                    }else {
                        $rootScope.alert('请检查网络链接','',true)
                    }
                });
            }
        getSchoolList();
        function getSchoolList() {
            schoolManage.getSchoolList({size:10000}).then(function (res) {
                if (res.data.code == 0 ){
                    vm.schoolList = res.data.data;

                }else {
                    $rootScope.alert(res.data.message );
                }

            })
        }
        //上传
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return true;
        };
        vm.uploader = new FileUploader({
            url: "/a/u/file/1"
        });
        vm.uploader.onSuccessItem = function (fileItem, res, status, headers) {
            if (status == 200) {
                if (res.data.img === '') {
                    res.data.img = '123';
                }
                vm.params.excelUrl = res.data.url
            }
        };
        //上传问题
        vm.upload = function (item) {
            item.upload();
        };
        //删除文件
        vm.clearFile = function () {
            vm.params.excelUrl = '';
            vm.uploader.queue = [];
        };



        vm.save = function () {
            vm.params.isMember=vm.params.isMember?1:0;
            if(!vm.schoolId){
                vm.params.schoolId
            }
            if(vm.params.isMember){
                vm.params.memberId =  vm.params.memberId;
            }else {
                vm.params.memberId ="";
            }

            userService.userListImport(vm.params).then(function (res) {
                if(res.data.code==0){
                    $rootScope.alert("用户列表导入成功",function () {
                        history.go(-1);
                    })

                }else {
                    var str = '';
                    angular.forEach(res.data.data,function (item) {
                        str+=item.openid+' ';
                    })
                    $rootScope.alert(res.data.message+":"+str );
                    vm.params.isMember = false;
                }
            })
        }
        vm.back = function () {
            $state.go("field.userList");
        }
    }])