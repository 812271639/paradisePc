/**
 * Created by Administrator on 2017\9\1 0001.
 */
'use strict';
angular.module('admin')
    .controller('subjectAddCtrl', function ($rootScope, $scope, $state, commonUtil, FileUploader, teachingService, courseOption) {
        var vm = this;
        vm.id = $state.params.id;
        vm.subjectGrade = courseOption.addGrade;
        vm.params = $state.params || {};
        if (vm.id) {
            teachingService.getSubjectDetail(vm.id).then(function (res) {
                console.log(res)
                if (res.data.code === 0) {
                    vm.params = res.data.data;
                    vm.params.fontColour =  res.data.data.fontColour;
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        }else {
            vm.params.fontColour = '#000';
        }
        //上传
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return true;
        };
        vm.uploader = new FileUploader({
            url: "/a/u/img/article"
        });
        vm.uploader.onSuccessItem = function (fileItem, res, status, headers) {
            if (status === 200) {
                if (res.data.img === '') {
                    res.data.img = '123';
                }
                vm.params.frontCoverURL = res.data.url
            }
        };
        //图片格式验证
        vm.upload = function (item) {
            // console.log(item)
            if (item._file.type.indexOf('image') !== -1) {
                item.upload();
            } else {
                $rootScope.alert("请上传图片")
            }
        };
        //删除图片
        vm.clearImg = function () {
            vm.params.frontCoverURL = '';
            vm.uploader.queue = [];
        };
        vm.back=function () {
            $rootScope.alert('是否取消编辑内容',function () {
                history.go(-1);
            });

        };
        //新增科目
        vm.addSubject = function () {

            if (vm.id) {
                teachingService.putEditSubject(vm.id, vm.params).then(function (res) {
                    if(res.data.code === 0){
                        $rootScope.alert("保存成功");
                        history.go(-1);
                    }else{
                        $rootScope.alert(res.data.message);
                    }

                });
                return;
            }
            teachingService.postAddSubject(vm.params).then(function (res) {
                if(res.data.code === 0){
                    $rootScope.alert("保存成功");
                    history.go(-1);
                }else{
                    $rootScope.alert(res.data.message);
                }
            })
        }


        //颜色配置
        vm.colorOptions={
            format:"hex",
            swatchBootstrap:false,
            swatchPos:"right"
        }


    });