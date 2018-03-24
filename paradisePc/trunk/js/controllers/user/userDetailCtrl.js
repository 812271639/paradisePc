'use strict';
angular.module('myApp')
    .controller('UserDetailCtrl',['userOptions','$rootScope','$uibModal', '$log','$document','main','user','FileUploader','$scope','$state','$location',
        function(userOptions, $rootScope, $uibModal, $log, $document, main, user, FileUploader, $scope, $state,$location) {
        var vm = this;
        //存在哈希值则去除后缀（支付完成返回时）
        if ($location.search().buyer_id) {
            $state.go($state.current, {}, { reload: true });
        }
        vm.gradeOption = userOptions.grade;
        vm.crown = true; //是否是会员
        vm.changeName = false; //是否点击了改变昵称
        vm.changeGrade = false;
        vm.grade = 1;
        //进入页面请求个人资料
        function getUserDetail() {
            main.getUserMsg().then(function(res) {
                vm.params = res.data.data;
                    if(res.data.code==0){
                    }else{
                        console.log(res.data.message)
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
            })
        }
        getUserDetail();
        vm.getInfo = function() {
                vm.changeName = false;
                vm.changeGrade = false;
                getUserDetail();
            }
            //点击设置输入框焦点
        vm.changeGrade1 = function() {

            vm.changeGrade = true;
            vm.changeName = false;

            function setBlur() {
                $("#grade").focus();
                if (vm.params.grade = "") {
                    vm.params.grade = 1;
                }
            };
            setTimeout(setBlur, 200);
        }
        vm.changeName1 = function() {
                vm.changeName = true;
                vm.changeGrade = false;

                function setBlur() {
                    $("#nickName").focus()
                };
                setTimeout(setBlur, 200);
            }
            //失焦保存
        vm.changeGrade2 = function() {
            var params = {
                grade: vm.params.grade
            }
            console.log(vm.params.grade)
            user.postSaveUserData(params).then(function(res) {
                ////console.log(res);
                if (res.data.code == 0) {
                    vm.changeGrade = false;
                }else{
                    console.log(res.data.message)
                    res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                }
            })
        }
        vm.changeName2 = function() {
                if (vm.params.alias === "") {
                    getUserDetail();
                } else {
                    var params = {
                        alias: vm.params.alias
                    }
                    user.postSaveUserData(params).then(function(res) {
                        ////console.log(res);
                        if (res.data.code == 0) {
                            vm.changeName = false;
                            $state.go('main.user.detail',{},{reload:true})
                        }else{
                            console.log(res.data.message)
                            res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                        }
                    })
                }
            }
            //修改头像
        var uploader = $scope.uploader = new FileUploader({
            url: '/a/u/img/task',
            queueLimit: 1,
            removeAfterUpload: true,
            autoUpload: true
        });
        vm.clearItems = function() { //重新选择文件时，清空队列，达到覆盖文件的效果
                uploader.clearQueue();
            }
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            //如上过上传图片成功，请求修改头像
            if (response.code == 0) {
                var params = {
                    img: response.data.url
                }
                user.postSaveUserData(params).then(function(res) {
                    if (res.data.code == 0) {
                        getUserDetail();
                    } else {
                        console.log(res.data.message)
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })

            } else {
                console.log(response.message);
            }
        };

        //打开登录模态框
        vm.login = function() {
            $rootScope.login();
        }
        vm.afterWeChat = function() {
            $rootScope.afterWeChat();
        }
        vm.changePhoneNumber = function() {
            $rootScope.changePhoneNumber();
        }
        vm.bindPhoneOrMail = function(type) {
            $rootScope.bindPhoneOrMail(type);
        }
        vm.changePassword = function() {
            // $rootScope.changePassword("setting");
            $rootScope.changePassword("change");
        }
        //数据埋点
        main.postDataBurialPoint(
            {
                targetType:2,
                subTargetType:1,
                userId:'',
                os:1
            }
        ).then(function(res){
        })
    }]);