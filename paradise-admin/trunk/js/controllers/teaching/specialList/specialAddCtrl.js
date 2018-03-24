/**
 * Created by Administrator on 2017\9\2 0002.
 */
'use strict';
angular.module("admin")
    .controller("specialCtrl", ["$state", "commonUtil", "FileUploader", "teachingService", "courseOption", "$rootScope", 'contentStyle',
        function ($state, commonUtil, FileUploader, teachingService, courseOption, $rootScope, contentStyle) {
            var vm = this;
            console.log(vm);
            console.log($state.params);

            vm.id = $state.params.id;
            vm.subjectId = $state.params.subjectId;

            vm.params = $state.params || {};
            vm.params.lessonIntroductionList = $state.params.lessonIntroductionList || [];
            vm.params.lesson = {};
            console.log(vm.params.lessonIntroductionList );

            //下面是多格式文本
            vm.contentStyle = contentStyle;

            // vm.params.lessonIntroductionList[0].lessonId=vm.id || '';
            // vm.params.lessonIntroductionList[0].mediaType='';
            console.log(vm.params.lessonIntroductionList);
            //上面A
            if (vm.subjectId) {
                teachingService.getSubjectDetail(vm.subjectId).then(function (res) {
                    if (res.data.code === 0 || res.data.code == '') {
                        vm.SpecialListData = res.data.data;
                        console.log(vm.SpecialListData);
                        vm.params.lesson.gradeDept = vm.SpecialListData.gradeDept;
                        vm.params.lesson.subjectName = vm.SpecialListData.subjectName;
                        vm.params.lesson.subjectId = vm.SpecialListData.subjectId;
                        console.log(vm.params.lesson.subjectId);
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
                // document.getElement
            }
            //编辑 get获取数据
            if (vm.id) {
                teachingService.getSpecialDetail(vm.id).then(function (res) {
                    if (res.data.code == 0) {
                        console.log(res);
                        vm.params = res.data.data;
                        console.log(vm.params);
                        vm.addText = 1;
                        res.data.lessonIntroductionList == undefined ? vm.params.lessonIntroductionList : res.data.lessonIntroductionList
                        console.log(vm.params.lessonIntroductionList);
                        vm.params.lesson.isLock == 1 ? vm.params.lesson.isLock = true : vm.params.lesson.isLock = false;
                        if (vm.params.lessonIntroductionList.length !== 0) {
                            for (var i = 0; i < vm.params.lessonIntroductionList.length; i++) {
                                try {
                                    vm.params.lessonIntroductionList[i].textContent = JSON.parse(vm.params.lessonIntroductionList[i].textContent);
                                } catch (e) {
                                }
                            }

                        }
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            }


            vm.uploader = new FileUploader({
                url: "/a/u/img/article"
            });
            vm.uploader.onSuccessItem = function (fileItem, res, status, headers) {
                if (status == 200) {
                    if (res.data.img === '') {
                        res.data.img = '123';
                    }
                    vm.params.lesson.frontCoverURL = res.data.url
                } else {
                    $rootScope.alert(res.data.message);
                }
            };
            //专题详情页--
            vm.addExercise = function (type) {
                console.log(vm);
                vm.more = {
                    textContent: {
                        appFontSize: '28px',
                        pcFontSize: '16px',
                        fontColor: '#333333',
                        font: '1',
                    },
                    mediaType: type,
                    resourceURL: '',
                    lessonId: vm.id || ''//新增时填空，编辑时填taskid
                };
                console.log(vm.params.lessonIntroductionList);
                vm.params.lessonIntroductionList.push(vm.more);
                // console.log(vm.paramsJson.unitList);
                console.log(vm.params.lessonIntroductionList);
            };

            vm.deleteStep = function (num) {
                vm.params.lessonIntroductionList.splice(num, 1);
            };
            //判断新老数据从而有不同的渲染方式——老数据不是对象
            vm.charge = function (m) {
                // var a =vm.paramsJson.unitList[m].textContent;
                var a = vm.params.lessonIntroductionList[m].textContent;
                return (angular.isObject(a))

            }


            //上面是上传

            //封面图片格式验证
            vm.upload = function (item) {
                if (item._file.type.indexOf('image') != -1) {
                    item.upload();
                } else {
                    $rootScope.alert("请上传图片")
                }
            };
            //封面删除图片
            vm.clearImg = function () {
                vm.params.lesson.frontCoverURL = '';
                vm.uploader.queue = [];
            };
            vm.back = function () {
                $rootScope.alert('是否取消编辑内容', function () {
                    history.go(-1);
                });
            };
            vm.uploaderApp = new FileUploader({
                url: "/a/u/img/article"
            });
            vm.uploaderApp.onSuccessItem = function (fileItem, res, status, headers) {
                if (status == 200) {
                    if (res.data.img === '') {
                        res.data.img = '123';
                    }

                    vm.params.lesson.appCoverURL = res.data.url
                    // console.log("第2个的"+vm.params.frontCoverURL)
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
                m.params.lesson.appCoverURL = '';
                vm.uploader1.queue = [];
            };

            //新增专题

            vm.addSpecial = function () {
                angular.forEach(vm.params.lessonIntroductionList , function (value) {
                    delete value.$$hashKey
                });
                if (vm.params.lesson.isLock != true) {
                    vm.params.lesson.price = 0;
                    vm.params.lesson.iosPrice = 0;
                } else if (vm.params.lesson.iosPrice === 0 || vm.params.lesson.price === 0) {
                    $rootScope.alert("收费金额不能为0");
                    return
                } else if (vm.params.lesson.iosPrice == '' || vm.params.lesson.price == '' || vm.params.lesson.iosPrice == undefined || vm.params.lesson.price == undefined) {
                    $rootScope.alert("请输入收费金额");
                    return
                }
                if (vm.subjectId) {
                    console.log(vm.subjectId);
                    vm.params.lesson.subjectId = vm.subjectId;
                    delete eval(vm.params).isPage;
                    delete eval(vm.params).id;
                    delete eval(vm.params).subjectId;
                    delete eval(vm.params).page;
                    delete eval(vm.params).size;
                    console.log(vm.params);


                }

                vm.params.lesson.isLock == true ? vm.params.lesson.isLock = 1 : vm.params.lesson.isLock = 0;
                vm.params.lesson.price = parseInt(vm.params.lesson.price * 100) / 100;
                vm.params.lesson.iosPrice = parseInt(vm.params.lesson.iosPrice * 100) / 100;

                angular.forEach(vm.params.lessonIntroductionList, function (item) {
                    if (angular.isObject(item.textContent)) {
                        item.textContent = JSON.stringify(item.textContent);
                    }
                    console.log(item.textContent);
                    console.log(typeof(item.textContent));

                })
                console.log(vm.params.lessonIntroductionList.textContent);


                if (vm.id) {
                    console.log(vm.params);
                    console.log(vm.id);
                    teachingService.putEditSpecial(vm.id, vm.params).then(function (res) {
                        if (res.data.code === 0) {
                            console.log("编辑");
                            $rootScope.alert("保存成功");
                            history.go(-1);
                        } else {
                            console.log("报xin~");
                            $rootScope.alert(res.data.message);
                        }
                    });
                    return;
                }
                console.log(vm.params);
                teachingService.postAddSpecial(vm.params).then(function (res) {
                    if (res.data.code === 0) {
                        $rootScope.alert("保存成功");
                        history.go(-1);
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            }

            //切换是否收费
            vm.changeLock = function () {
                if (vm.params.lesson.isLock != true) {
                    vm.params.lesson.iosPrice = '';
                    vm.params.lesson.price = '';
                }
            }



        }]);

