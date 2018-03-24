angular.module('admin')
    .controller('courseAddCtrl', ['$rootScope', '$scope', '$state', 'FileUploader', "courseService", "courseOption", "teachingService",
        function ($rootScope, $scope, $state, FileUploader, courseService, courseOption, teachingService) {

            var vm = this;
            vm.id = $state.params.id;
            vm.lessonId = $state.params.lessonId;
            vm.params = $state.params || {};

            // 新增
            if (vm.lessonId) {
                teachingService.getSpecialDetail(vm.lessonId).then(function (res) {
                    if (res.data.code === 0 || res.data.code == '') {
                        console.log(res.data);
                        vm.SpecialListData = res.data.data;
                        vm.params.gradeDept = vm.SpecialListData.lesson.gradeDept;
                        vm.params.subjectName = vm.SpecialListData.lesson.subjectName;
                        vm.params.lessonName = vm.SpecialListData.lesson.lessonName;
                        vm.params.subjectId = vm.SpecialListData.lesson.subjectId;
                    }else {
                        $rootScope.alert(res.data.message);
                    }
                })
            }
            //编辑
            if (vm.id) {
                courseService.getCourseDetail(vm.id).then(function (res) {
                    if (res.data.code == 0) {
                        vm.params = res.data.data;
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            }
            //图片上传
            FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
                return true;
            };
            vm.uploader = new FileUploader({
                url: "/a/u/img/article"
            });
            vm.uploader.onSuccessItem = function (fileItem, res, status, headers) {
                if (status == 200) {
                    if (res.data.img === '') {
                        res.data.img = '123';
                    }
                    vm.params.frontCoverURL = res.data.url
                }
            };
            //图片格式验证(图片发送至后台)
            vm.upload = function (item) {
                if (item._file.type.indexOf('image') != -1) {
                    item.upload();
                } else {
                    $rootScope.alert("请上传图片")
                }
            };
            //删除图片
            vm.clearImg = function () {
                vm.params.img = '';
                vm.uploader.queue = [];
            };
            vm.back = function () {
                history.go(-1);
            }

            vm.uploaderApp = new FileUploader({
                url: "/a/u/img/article"
            });
            vm.uploaderApp.onSuccessItem = function (fileItem, res, status, headers) {
                if (status == 200) {
                    if (res.data.img === '') {
                        res.data.img = '123';
                    }
                    vm.params.appCoverURL = res.data.url
                }
            };
            //app图片格式验证
            vm.uploadApp = function (item) {
                if (item._file.type.indexOf('image') != -1) {
                    item.upload();
                } else {
                    $rootScope.alert("请上传图片")
                }
            };
            //app删除图片
            vm.clearImgApp = function () {
                vm.params.appCoverURL = '';
                vm.uploader1.queue = [];
            };

            //新增 编辑
            vm.addCourse = function () {
                if (vm.id) {
                    courseService.putEditCourse(vm.id, vm.params).then(function (res) {
                        if(res.data.code === 0){
                            $rootScope.alert("保存成功");
                            history.go(-1);
                        }else {
                            $rootScope.alert(res.data.message);
                        }
                    });
                    return;
                }
                courseService.postAddCourse(vm.params).then(function (res) {
                    if(res.data.code === 0){
                        $rootScope.alert("保存成功");
                        history.go(-1);
                    }else {
                        $rootScope.alert(res.data.message);
                    }
                })
            };
            vm.cancelUpdate = function () {
                $rootScope.alert("是否取消编课程内容", function () {
                    history.go(-1);
                });
            };
        }])
