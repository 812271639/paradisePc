angular.module('admin')
    .controller('radioDetailCtrl', ['$scope', '$state', '$stateParams', 'radioOption', 'FileUploader', 'taskManage', 'courseService', '$rootScope', 'bannerOptions', 'teachingService', 'contentStyle', '$timeout',
        function ($scope, $state, $stateParams, radioOption, FileUploader, taskManage, courseService, $rootScope, bannerOptions, teachingService, contentStyle, $timeout) {
            var vm = this;
            console.log(vm);
            //定义任务详情页面——默认图片地址
            var defaultPic = 'http://learn-10047330.file.myqcloud.com/article/02714f85-32c5-4bc3-a940-af6cb4422c42.png';
            vm.gradeList = bannerOptions.grade;
            //定义接口传参

            vm.paramsJson = {
                task: {},
                answerList: [],
                unitList: [{}],
            };
            vm.searchList = [];
            vm.contentDataList = [];
            vm.contentList = [];
            vm.paramsJson.task.shareToUnlock = false;//初始默认不勾选锁定
            vm.paramsJson.task.isLock = false;//初始默认不勾选锁定
            vm.paramsJson.task.showLevel = false;//初始默认不勾选难度
            //unitList第一项为视频链接
            vm.paramsJson.unitList[0].taskId = $stateParams.id || '';
            vm.paramsJson.unitList[0].mediaType = 5;

            //字体风格——字号、字体、字色
            vm.contentStyle = contentStyle;

            //默认不锁定
            vm.option = radioOption;
            vm.taskChecked = false;//默认不锁定

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
                    vm.paramsJson.task.frontCoverURL = res.data.url;
                    //console.log(vm.img);
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
            };

            //任务详情页封面上传
            vm.uploaderDetail = new FileUploader({
                url: "/a/u/img/article"
            });
            vm.uploaderDetail.onSuccessItem = function (fileItem, res, status, headers) {
                if (status == 200) {
                    if (res.data.img === '') {
                        //res.data.img = '123';
                    }
                    vm.paramsJson.task.videoCoverURL = res.data.url
                }
            };

            //任务详情页封面图片格式验证
            vm.uploader1 = function (item) {
                if (item._file.type.indexOf('image') != -1) {
                    item.upload();
                } else {
                    $rootScope.alert("请上传图片")
                }
            };
            //任务详情页封面删除图片
            vm.clearImgDetail = function () {
                vm.params.detailCoverURL = '';
                vm.uploaderDetail.queue = [];
            };

            //添加题干文本，图片
            vm.addExercise = function (type) {
                vm.more = {
                    textContent: {
                        appFontSize: '28px',
                        pcFontSize: '16px',
                        fontColor: '#333333',
                        font: '1'
                    },
                    mediaType: type,
                    resourceLink: '',
                    taskId: vm.taskId || ''//新增时填空，编辑时填taskid
                };
                vm.paramsJson.unitList.push(vm.more);
                console.log(vm.paramsJson.unitList);
            };

            // 删除题目
            vm.deleteStep = function (num) {
                vm.paramsJson.unitList.splice(num, 1);
            };

            //编辑和新增不同状态的请求渲染
            if ($stateParams.id) {//编辑
                taskManage.getTaskDetail($stateParams.id).then(function (res) {
                    console.log('编辑状态请求', res);
                    vm.paramsJson.task = res.data.data;
                    vm.paramsJson.unitList = res.data.unitList;
                    console.log(vm.paramsJson.unitList);
                    vm.paramsJson.task.shareToUnlock = vm.paramsJson.task.shareToUnlock == 1 ? true : false;
                    vm.paramsJson.task.isLock = vm.paramsJson.task.isLock == 1 ? true : false;
                    vm.paramsJson.task.showLevel = vm.paramsJson.task.showLevel == 1 ? true : false;

                    //vm.paramsJson.unitList从第二个开始遍历转换为JOSN字符串——视频正文内容
                    //先判断一下如果是新数据再遍历转换

                    for (var i = 0; i < vm.paramsJson.unitList.length; i++) {
                        try {
                            vm.paramsJson.unitList[i].textContent = JSON.parse(vm.paramsJson.unitList[i].textContent);
                        } catch (e) {
                        }
                    }

                    vm.paramsJson.task.rcmdContents = JSON.parse(vm.paramsJson.task.rcmdContents);
                    angular.forEach(vm.paramsJson.task.rcmdContents, function (data, index) {
                        vm.contentOnece = {grade: '', subject: '', special: '', course: '', task: '', num: ''};
                        vm.contentDataList.push(vm.contentOnece);
                        vm.contentListOnece = {
                            gradeList: vm.gradeList,
                            subjectList: [],
                            specialList: [],
                            courseList: [],
                            taskList: []
                        };
                        vm.contentList.push(vm.contentListOnece)
                        switch (data.targetType) {
                            case 1:
                                teachingService.getSpecialDetail(data.targetId).then(function (res) {
                                    if (res.data.code == 0) {
                                        vm.contentDataList[index].num = 3;
                                        vm.contentDataList[index].grade = res.data.data.gradeDept;
                                        vm.contentDataList[index].subject = res.data.data.subjectId;
                                        vm.contentDataList[index].special = res.data.data.id;
                                        getList(index)
                                    } else {
                                        $rootScope.alert(res.data.message)
                                    }
                                });
                                break;
                            case 2:
                                courseService.getCourseDetail(data.targetId).then(function (res) {
                                    if (res.data.code == 0) {
                                        vm.contentDataList[index].num = 4;
                                        vm.contentDataList[index].grade = res.data.data.gradeDept;
                                        vm.contentDataList[index].subject = res.data.data.subjectId;
                                        vm.contentDataList[index].special = res.data.data.lessonId;
                                        vm.contentDataList[index].course = res.data.data.id;
                                        getList(index)
                                    } else {
                                        $rootScope.alert(res.data.message)
                                    }
                                });
                                break;
                            case 3:
                                taskManage.getTaskDetail(data.targetId).then(function (res) {
                                    if (res.data.code == 0) {
                                        vm.contentDataList[index].num = 5;
                                        vm.contentDataList[index].grade = res.data.data.gradeDept;
                                        vm.contentDataList[index].subject = res.data.data.subjectId;
                                        vm.contentDataList[index].special = res.data.data.lessonId;
                                        vm.contentDataList[index].course = res.data.data.periodId;
                                        vm.contentDataList[index].task = res.data.data.id;
                                        getList(index)
                                    } else {
                                        $rootScope.alert(res.data.message)
                                    }
                                });
                                break;
                        }

                        function getList(index) {
                            setTimeout(function () {
                                //科目列表
                                teachingService.getSubjectList({
                                    gradeDept: vm.contentDataList[index].grade,
                                    page: 1,
                                    size: 1000000
                                }).then(function (res) {
                                    if (res.data.code == 0) {
                                        vm.contentList[index].subjectList = res.data.data;
                                    } else {
                                        $rootScope.alert(res.message)
                                    }
                                });
                                //专题列表
                                teachingService.getSpecial(vm.contentDataList[index].subject, {
                                    page: 1,
                                    size: 1000000
                                }).then(function (res) {
                                    if (res.data.code == 0) {
                                        vm.contentList[index].specialList = res.data.data;
                                    } else {
                                        $rootScope.alert(res.message)
                                    }
                                });
                                if (vm.contentDataList[index].num >= 3) {
                                    //课程列表
                                    courseService.getCourse({
                                        page: 1,
                                        size: 1000000
                                    }, vm.contentDataList[index].special).then(function (res) {
                                        if (res.data.code == 0) {
                                            vm.contentList[index].courseList = res.data.data;
                                        } else {
                                            $rootScope.alert(res.message)
                                        }
                                    });
                                }
                                ;
                                if (vm.contentDataList[index].num >= 4) {
                                    //任务列表
                                    taskManage.getTaskList(vm.contentDataList[index].course, {
                                        page: 1,
                                        size: 1000000
                                    }).then(function (res) {
                                        if (res.data.code == 0) {
                                            vm.contentList[index].taskList = res.data.data;
                                        } else {
                                            $rootScope.alert(res.message)
                                        }
                                    })
                                }
                            }, 1000 * index)
                        }
                    })
                    //console.log(vm.contentDataList)
                    //console.log(vm.contentList)
                })
            }
            else {//新增
                courseService.getCourseDetail($stateParams.periodId).then(function (res) {
                    //console.log('新增状态请求',res);
                    vm.paramsJson.task = res.data.data;
                })
            }

            //立即上线/草稿
            vm.saveUpdate = function (status) {
                angular.forEach(vm.paramsJson.unitList, function (value) {
                    delete value.$$hashKey
                });
                vm.paramsJson.task.taskType = 1;//默认为视频类型不变
                vm.paramsJson.task.learningProcess = $stateParams.id ? vm.paramsJson.task.learningProcess : 1;//新增时默认未学习状态
                vm.paramsJson.task.status = status;//代入状态
                vm.paramsJson.task.periodId = $stateParams.periodId;//带入课程ID
                vm.paramsJson.task.isAnalysis = 1;//默认不解析
                vm.paramsJson.task.isLock = vm.paramsJson.task.isLock == true ? 1 : 2;
                vm.paramsJson.task.shareToUnlock = vm.paramsJson.task.shareToUnlock == true ? 1 : 2;
                vm.paramsJson.task.showLevel = vm.paramsJson.task.showLevel == true ? 1 : 0;
                //初始化文字风格各参数

                vm.paramsJson.task.difficultyLevel = vm.paramsJson.task.difficultyLevel === null ? "" : vm.paramsJson.task.difficultyLevel
                angular.forEach(vm.paramsJson.unitList, function (item) {
                    if (angular.isObject(item.textContent)) {
                        item.textContent = JSON.stringify(item.textContent);
                    }
                })//将正文相关转化为JOSN对象

                //去除多余字段
                delete eval(vm.paramsJson.task).appCoverURL;
                delete eval(vm.paramsJson.task).sort;

                vm.rcmdContents = [];
                angular.forEach(vm.contentDataList, function (data, index) {
                    vm.rcmdContentsOnce = {targetId: '', targetType: ""};
                    vm.rcmdContents.push(vm.rcmdContentsOnce);
                    switch (data.num) {
                        case 3:
                            vm.rcmdContents[index].targetId = data.special;
                            vm.rcmdContents[index].targetType = 1;
                            break;
                        case 4:
                            vm.rcmdContents[index].targetId = data.course;
                            vm.rcmdContents[index].targetType = 2;
                            break;
                        case 5:
                            vm.rcmdContents[index].targetId = data.task;
                            vm.rcmdContents[index].targetType = 3;
                            break;
                    }
                });
                vm.paramsJson.task.rcmdContents = JSON.stringify(vm.rcmdContents);
                //任务详情页封面——如果没有上传，则上传默认图片
                if (!vm.paramsJson.task.videoCoverURL) {
                    vm.paramsJson.task.videoCoverURL = defaultPic;
                }
                //console.log("请求传参：",vm.paramsJson);
                if ($stateParams.id) {//编辑
                    //console.log(vm.paramsJson);
                    taskManage.editTaskDetail($stateParams.id, vm.paramsJson).then(function (res) {
                        if (res.data.code == 0) {
                            history.go(-1);
                            $rootScope.alert("编辑成功。");
                        }
                        else {
                            alert(res.message)
                        }
                    })
                }
                else {//新增
                    delete eval(vm.paramsJson.task).id;
                    // console.log('保存请求时的参数',vm.paramsJson);
                    taskManage.addTaskDetail(vm.paramsJson).then(function (res) {
                        if (res.data.code == 0) {
                            $rootScope.alert("新增成功。");
                            history.go(-1);
                        }
                        else {
                            alert(res.message)
                        }
                    })
                }
            };


            //添加相关内容
            vm.addContent = function () {
                vm.contentOnece = {grade: '', subject: '', special: '', course: '', task: '', num: ''};
                vm.contentDataList.push(vm.contentOnece);
                vm.contentListOnece = {
                    gradeList: vm.gradeList,
                    subjectList: [],
                    specialList: [],
                    courseList: [],
                    taskList: []
                };
                vm.contentList.push(vm.contentListOnece)
            };
            //年级类别选择
            vm.gradeChoose = function (num, li) {
                teachingService.getSubjectList({gradeDept: li.grade, page: 1, size: 1000000}).then(function (res) {
                    if (res.data.code == 0) {
                        vm.contentList[num].subjectList = res.data.data;
                        vm.contentDataList[num].special = '';
                        vm.contentDataList[num].course = '';
                        vm.contentDataList[num].task = '';
                        vm.contentDataList[num].num = 1;
                        vm.contentList[num].specialList = [];
                        vm.contentList[num].courseList = [];
                        vm.contentList[num].taskList = [];
                    } else {
                        $rootScope.alert(res.message)
                    }
                })
            };
            //科目选择
            vm.subjectChoose = function (num, li) {
                teachingService.getSpecial(li.subject, {page: 1, size: 1000000}).then(function (res) {
                    if (res.data.code == 0) {
                        vm.contentList[num].specialList = res.data.data;
                        vm.contentDataList[num].course = '';
                        vm.contentDataList[num].task = '';
                        vm.contentDataList[num].num = 2;
                        vm.contentList[num].courseList = [];
                        vm.contentList[num].taskList = [];
                    } else {
                        $rootScope.alert(res.message)
                    }
                })
            };
            //专题选择
            vm.specialChoose = function (num, li) {
                courseService.getCourse({page: 1, size: 1000000}, li.special).then(function (res) {
                    if (res.data.code == 0) {
                        vm.contentList[num].courseList = res.data.data;
                        vm.contentDataList[num].task = '';
                        vm.contentDataList[num].num = 3;
                        vm.contentList[num].taskList = [];
                    } else {
                        $rootScope.alert(res.message)
                    }
                })
            };
            //课程选择
            vm.courseChoose = function (num, li) {
                taskManage.getTaskList(li.course, {page: 1, size: 1000000}).then(function (res) {
                    if (res.data.code == 0) {
                        vm.contentDataList[num].num = 4;
                        vm.contentList[num].taskList = res.data.data;
                    } else {
                        $rootScope.alert(res.message)
                    }
                })
            };
            //任务选择
            vm.taskChoose = function (num) {
                vm.contentDataList[num].num = 5;
            };
            //删除相关课程
            vm.delContentList = function (num) {
                vm.contentDataList.splice(num, 1);
                vm.contentList.splice(num, 1)
                //console.log(vm.contentDataList)
                //console.log(vm.contentList)
            }
            // 新增——难度等级
            //当不选中展示的时候清空难度
            // 难度等级表单验证
            vm.difficult = function () {
                if (!vm.paramsJson.task.showLevel) {
                    vm.paramsJson.task.difficultyLevel = null;
                    vm.verify = false;
                }
                else {
                    vm.verify = true;
                }
            }
            //判断新老数据从而有不同的渲染方式——老数据不是对象
            vm.charge = function (m) {
                var a = vm.paramsJson.unitList[m].textContent;
                return (angular.isObject(a))

            }



        }]);
