/**
 * Created by Master on 2017/3/22.
 */
'use strict'
angular.module('admin')
    .controller('TeacherController', function (FileUploader, $state, teacherService, $rootScope,$scope) {
        var tc = this;
        tc.teacher = {};
        var id;

        getList();
        function getList() {
            teacherService.teacherList().then(function (res) {
                $rootScope.teacherList = res.data.data;
            })
        }


        //上传
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return true;
        };
        tc.uploader = new FileUploader({
            url: "/a/u/img/teacher"
        });
        tc.uploader.onSuccessItem = function (fileItem, res, status, headers) {
            if (status == 200) {
                if (res.data.img === '') {
                    res.data.img = '123';
                }
                tc.teacher.photo = res.data.url
            }
        };

        //图片格式验证
        tc.upload = function (item) {
            // console.log(item)
            if (item._file.type.indexOf('image') != -1) {
                item.upload();
            } else {
                $rootScope.alert("请上传图片")
            }
        };
        //删除图片
        tc.clearImg = function () {
            tc.teacher.photo = '';
            tc.uploader.queue = [];
        };

        tc.remove = function (params) {
            if(params){
                $rootScope.alert('确定删除选中内容？', function () {
                    id = JSON.parse(params).id
                    teacherService.teacherEdit(id).then(function (res) {
                        if (res.data.code === 0) {
                            $rootScope.alert('删除成功', function () {
                                $scope.vm.teacher={};
                                tc.teacher = {};
                                getList();
                            },true);
                        } else {
                            $rootScope.alert(res.data.message,'',true)
                        }
                    })
                })
            }else {
                $rootScope.alert('请选择要删除的教师','',true)
            }


        }

        tc.cancelUpdate = function () {
            tc.teacher = {};
        };
        tc.saveUpdate = function () {
            teacherService.teacherEdit('', tc.teacher).then(function (res) {
                if (res.data.code === 0) {
                    $rootScope.alert("保存成功", function () {
                        tc.teacher = {};
                        $state.go('field.videoDetail', {}, {reload: true})
                    },true);
                } else {
                    $rootScope.alert(res.data.message,'',true)
                }
            })
        }
    })