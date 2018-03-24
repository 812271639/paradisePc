'use strict';
angular.module('admin')
    .controller('advertisingDetailCtrl', function ($state, $scope, $rootScope, commonUtil,FileUploader,advertisingService) {
        var vm = this;
        vm.id=$state.params.id;
        vm.params={
            img:'',
            url:'',
            type:3
        };
        //编辑获取详情
        if(vm.id){
            advertisingService.getAdvertisingDetail(vm.id).then(function (res) {
                if(res.data.code==0){
                    vm.params=res.data.data.article;
                    console.log(vm.params)
                }else {
                    $rootScope.alert(res.data.message)
                }
            })
        }

        //上传
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function() {
            return true;
        };
        vm.uploader = new FileUploader({
            url: "/a/u/img/article"
        });
        vm.uploader.onSuccessItem = function(fileItem, res, status, headers) {
            if (status == 200) {
                if (res.data.url === "") {
                    res.data.url = "123";
                }
                vm.params.img = res.data.url;
            }
        };

        //图片格式验证
        vm.upload = function(item) {
            // console.log(item)
            if (item._file.type.indexOf("image") != -1) {
                item.upload();
            } else {
                $rootScope.alert("请上传图片");
            }
        };
        //删除图片
        vm.clearImg = function() {
            vm.params.img = "";
            vm.uploader.queue = [];
        };
        vm.back = function() {
            history.go(-1);
        };

        //编辑或新增
        vm.saveUpdate=function () {
            vm.string={
                type:3,
                url:vm.params.url,
                img:vm.params.img
            };
            if(vm.id){
                advertisingService.changeAdvertising(vm.id,vm.string).then(function (res) {
                    if(res.data.code==0){
                        console.log(res);
                        $state.go("field.advertising")
                    }else {
                        $rootScope.alert(res.data.message)
                    }
                })
            }else {
                advertisingService.addAdvertising(vm.string).then(function (res) {
                    if(res.data.code==0){
                        $state.go("field.advertising")
                    }else {
                        $rootScope.alert(res.data.message)
                    }
                })
            }
        }


    });