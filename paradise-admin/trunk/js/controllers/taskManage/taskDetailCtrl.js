angular.module('admin')
    .controller('taskDetailCtrl', ['$scope', '$state', '$stateParams', 'taskManage', 'courseService', 'taskOption', '$timeout', '$rootScope','contentStyle',
        function ($scope, $state, $stateParams, taskManage, courseService, taskOption, $timeout, $rootScope,contentStyle) {

            //定义vm
            var vm = this;

            //任务类型
            var taskType = 2;

            //是否启用解析;0为不用，1为启用zz
            var isAnalysis = 0;

            //是否锁定;2为不锁定,1为锁定
            //上面写反了1.11
            var isLock = 1;

            //视频封面地址;test代表必填，随意填什么都可以
            var frontCoverURL = "test";

            //学习进度;1未学习，2学习中，3已学习
            var learningProcess = 1;

            // 序号类型;1字母，2数字，3自定义
            vm.numberPattern = 1;

            //字体风格——字号、字体、字色
            vm.contentStyle = contentStyle;

            //路由所传的参数
            vm.taskId = $stateParams.id;
            vm.periodId = $stateParams.periodId;
            vm.title = vm.id ? "编辑任务" : "新增任务";


            //三种题型
            vm.fillAnswer = [];
            vm.judgeAnswer = [];
            vm.chooseAnswer = [];

            //初始参数
            vm.params = {
                task: {
                    taskType: taskType,
                    isAnalysis: isAnalysis,
                    isLock: isLock,
                    frontCoverURL: frontCoverURL,
                    learningProcess: learningProcess
                },
                unitList: [],
                answerList: []
            };
            //提干数组
            vm.unitList = [];

            //解析内容数组
            vm.tipList = [];




            //判断新老数据从而有不同的渲染方式——老数据不是对象
             vm.charge = function(m) {
             //题目部分
             var a = vm.unitList[m].textContent;
             try {
             vm.unitList[m].textContent = JSON.parse(vm.unitList[m].textContent);
             }
             catch (e) {}
             return (angular.isObject(a));
             }

             vm.charge1 = function(m){
             //答案部分
             var b = vm.params.answerList[m].introduce;
             try {
             vm.params.answerList[m].introduce = JSON.parse(vm.params.answerList[m].introduce);
             }
             catch (e) {}
             return (angular.isObject(b));
             }
             vm.charge2 = function(m){
             //解析解析
             var c = vm.tipList[m].textContent;
             try{
             vm.tipList[m].textContent = JSON.parse(vm.tipList[m].textContent);
             }
             catch (e){}
             return (angular.isObject(c));
             }




            function check() {
                if (vm.unitList.length == 0 || vm.params.answerList.length == 0) {
                    vm.flag = true;
                    return;
                } else {
                    //内容未填 返回true
                    for (var i = 0; i < vm.unitList.length; i++) {
                        if(vm.unitList[i].resourceLink == '' || vm.unitList[i].resourceLink == undefined){
                            if(angular.isObject(vm.unitList[i].textContent)) {
                                if (vm.unitList[i].textContent.textContent == '' || vm.unitList[i].textContent.textContent == undefined) {
                                    vm.flag = true;
                                    return;
                                }
                            }
                            else if(vm.unitList[i].textContent == '' || vm.unitList[i].textContent == undefined){
                                vm.flag = true;
                                return;
                            }

                        }
                        else {
                            vm.flag = false;
                        }
                    }
                    //答案未填 返回true
                    for (var o = 0; o < vm.params.answerList.length; o++) {
                        //exerciseType == 1 验证选择题
                        if (vm.params.answerList[o].exerciseType == 1) {

                            if ((vm.params.answerList[o].resourceLink == '' || vm.params.answerList[o].resourceLink == undefined) && (vm.params.answerList[o].introduce == '' || vm.params.answerList[o].introduce == undefined)) {
                                vm.flag = true;
                                return;
                            } else {
                                vm.flag = false;
                            }
                            //exerciseType == 2 验证填空题
                        } else if (vm.params.answerList[o].exerciseType == 2) {
                            var introduceArr = vm.params.answerList[o].introduce;
                            if (introduceArr.length == 0) {
                                vm.flag = true;
                                return;
                            }
                            for (var x = 0; x < introduceArr.length; x++) {
                                if (introduceArr[x].introduce == '' || introduceArr[x].introduce == undefined) {
                                    vm.flag = true;
                                    return;
                                } else {
                                    vm.flag = false;
                                }
                            }
                        }

                    }
                    //验证解析
                    if (vm.tipList.length > 0 || vm.params.task.isAnalysis == 1) {
                        if (vm.tipList.length == 0) {
                            vm.flag = true;
                            return;
                        }
                        for (var t = 0; t < vm.tipList.length; t++) {

                            if(vm.tipList[t].resourceLink == '' || vm.tipList[t].resourceLink == undefined){
                                if(angular.isObject(vm.tipList[t].textContent)) {
                                    if (vm.tipList[t].textContent.textContent == '' || vm.tipList[t].textContent.textContent == undefined) {
                                        vm.flag = false;
                                        return;
                                    }
                                }
                                else if(vm.tipList[t].textContent == '' || vm.tipList[t].textContent == undefined){
                                    vm.flag = false;
                                    return;
                                }
                            }
                            else{
                                vm.flag = false;
                            }
                        }
                    }
                    // 验证多选框 必须选一个  填空题无需验证
                    var arr = [];
                    for (var s = 0; s < vm.params.answerList.length; s++) {
                        if (vm.params.answerList[s].exerciseType == 2) {
                            return;
                        }
                        if (vm.params.answerList[s].standardAnswer == '' || vm.params.answerList[s].standardAnswer == undefined) {

                        } else {
                            arr.push(vm.params.answerList[s].standardAnswer);
                        }
                        if (arr.length < 1) {
                            vm.flag = true;
                        } else {
                            vm.flag = false;
                        }
                    }
                }
                return vm.flag;
            }


            //新增

            vm.add = function (b) {
                check();
                if (vm.flag) {
                    $rootScope.alert("请正确填写.注意段落文本、视频、图片、音频、内容、答案、选项、不能为空");
                    return;
                }
                //上下架状态
                vm.params.task.status = b;

                //防止重复提交
                vm.addDisable = 1;
                $timeout(function () {
                    vm.addDisable = 0;//两秒之后可以点击
                }, 2000);

                //根据是否有解析内容  把题干数组和解析内容数组合为unitlist
                if (vm.params.task.isAnalysis == 1) {
                    vm.params.unitList = vm.unitList.concat(vm.tipList);
                } else {
                    vm.params.unitList = vm.unitList;
                }

                //填空题---introduce转json字符,result转json字符---//并且把introduce中的填空题的答案push到standardanswer

                if (vm.params.task.specificType == 2) {
                    angular.forEach(vm.params.answerList, function (item) {
                        var result = [];
                        angular.forEach(item.introduce, function (itemClid) {
                            if (itemClid.type == 2) {
                                result.push(itemClid.introduce);
                            }
                        })
                        item.standardAnswer = JSON.stringify(result);
                        item.introduce = JSON.stringify(item.introduce);
                    });
                    angular.forEach(vm.params.unitList, function (item) {
                        if(angular.isObject(item.textContent)) {
                            item.textContent = JSON.stringify(item.textContent);
                        }
                        })
                }
                //选择题---转josn字符
                if (vm.params.task.specificType == 1) {
                    angular.forEach(vm.params.unitList, function (item) {
                        item.textContent = JSON.stringify(item.textContent);
                    });
                    //答案部分
                    angular.forEach(vm.params.answerList,function(item){
                       item.introduce = JSON.stringify(item.introduce);
                    });
                }
                //判断题
                if (vm.params.task.specificType == 4) {
                    angular.forEach(vm.params.unitList, function (item) {
                        if(angular.isObject(item.textContent)){
                            item.textContent = JSON.stringify(item.textContent);
                        }

                    })
                }

                //真正的上传
                if (vm.taskId) {
                    //清空alpha这个无用的参数
                    angular.forEach(vm.params.answerList, function (item, index, array) {
                        if (item.alpha) {
                            delete array[index].alpha;
                        }
                        if(item.exerciseType==2){
                           item.mediaType=1;
                        }
                    });
                    console.log(vm.params);

                    taskManage.editTaskDetail(vm.taskId, vm.params).then(function (res) {
                        if (res.data.code == 0) {
                            $rootScope.alert("编辑成功");
                            history.go(-1);
                            //成功后返回上一步

                        } else {
                            $rootScope.alert(res.data.message)
                        }
                    })
                } else {
                    //console.log("新增测试");
                    /*清除无用参数*/
                    clearParms(vm.params);
                    //console.log("传入的参数：", vm.params);
                    taskManage.addTaskDetail(vm.params).then(function (res) {
                        console.log("获得的参数：", res)
                        if (res.data.code == 0) {
                            $rootScope.alert("新增成功");
                            history.go(-1);
                            //成功后返回上一步

                        } else {
                            $rootScope.alert(res.data.message)
                        }

                    })
                }
            }


            //编辑习题
            if (vm.taskId) {
                taskManage.getTaskDetail(vm.taskId).then(function (res) {
                    if (res.data.code == 0) {
                        // 渲染页面
                        //新旧数据做兼容
                        vm.params.task = res.data.data;
                        vm.params.answerList = res.data.answerList;
                        //把unitList拆分为题干和解析内容
                        vm.unitLists = res.data.unitList;
                        vm.unitList = [];
                        vm.tipList = [];

                        //把填空题字符进行转义
                        if (vm.params.task.specificType == 2) {//填空
                            angular.forEach(vm.params.answerList, function (item) {
                                item.introduce = JSON.parse(item.introduce);
                            });
                            angular.forEach(vm.unitLists, function (item) {
                                try{
                                    item.textContent = JSON.parse(item.textContent);
                                }catch(e){

                                }

                            });
                        }
                        //把选择题字符进行转义
                        if (vm.params.task.specificType == 1) {//选择
                            angular.forEach(vm.params.answerList, function (item) {
                                try{
                                    item.introduce = JSON.parse(item.introduce);
                                }catch(e){

                                }
                            });
                        }


                        //把判断题字符进行转义
                        if (vm.params.task.specificType == 4) {//判断
                            angular.forEach(vm.unitLists, function (item) {
                                try {
                                    item.textContent = JSON.parse(item.textContent);
                                }
                                catch(e){}
                            });
                        }
                        //检查是否有内容解析
                        vm.params.task.isAnalysis = 0;
                        angular.forEach(vm.unitLists, function (item) {
                            if (item.mediaType > 5) {
                                vm.tipList.push(item);
                                vm.params.task.isAnalysis = 1;
                            }
                            else {
                                vm.unitList.push(item);
                            }
                        })
                    }
                    ;
                })
                //新增习题
            } else if (vm.periodId) {
                courseService.getCourseDetail(vm.periodId).then(function (res) {
                    if (res.data.code == 0) {
                        // 渲染列表
                        vm.params.task.subjectName = res.data.data.subjectName;
                        vm.params.task.lessonName = res.data.data.lessonName;
                        vm.params.task.periodName = res.data.data.periodName;
                        // 设置task参数
                        vm.params.task.gradeDept = res.data.data.gradeDept;
                        vm.params.task.periodId = res.data.data.id;
                        vm.params.task.lessonId = res.data.data.lessonId;
                        vm.params.task.subjectId = res.data.data.subjectId;
                    }
                    ;
                })
            }
            //添加题干文本，图片，音频，视频，以及内容解析的文本和图片
            vm.addExercise = function (type) {

                vm.more = {
                    textContent: {
                        appFontSize:'28px',
                        pcFontSize:'16px',
                        fontColor:'#333333',
                        font:'1'
                    },
                    mediaType: type,
                    resourceLink: '',
                    taskId: vm.taskId || '',//新增时填空，编辑时填taskid
                    imageLink: ''//视频封面链接

                };
                //添加到内容解析
                if (type > 5) {
                    vm.tipList.push(vm.more);
                }
                //添加到题干
                else {
                    vm.unitList.push(vm.more);
                    //console.log(vm.params.unitList)
                }

            };


            // 删除题目
            vm.deleteStep = function (num, type) {
                if (type) {
                    vm.tipList.splice(num, 1);
                }
                else {
                    vm.unitList.splice(num, 1);
                }
            };

            //填空题答案 添加段落
            vm.addParagraph = function () {
                vm.params.answerList.push(
                    {
                        exerciseType: 2,//1选择，2填空，4判断
                        introduce: [],
                        standardAnswer: [],
                        numberPattern: vm.numberPattern,
                        resourceLink: "",
                        taskId: vm.taskId,
                        paragraph: vm.params.answerList.length
                    }
                );
            };

            // 删除段落
            vm.deleteParagraph = function (num) {
                vm.params.answerList.splice(num, 1);
            }

            //填空题答案：添加文本 添加答案
            vm.addFill = function (type, $index, status) {
                vm.params.answerList[$index].introduce.push({
                    type: type,
                    introduce: [],
                    result: '',
                    status: status,
                    paragraph: $index
                })

            };

            //删除填空答案
            vm.deleteFill = function (paragraph, num) {
                vm.params.answerList[paragraph].introduce.splice(num, 1);
            };

            // 添加选择题答案
            vm.addChoice = function (type, index) {
                //console.log(index);
                //查看
                vm.params.answerList.push({
                    taskId: vm.taskId,
                    exerciseType: 1,//1选择，2填空，4判断
                    numberPattern: vm.numberPattern,
                    mediaType: type,
                    standardAnswer: '',
                    //修改——error
                    introduce: {
                        appFontSize:'28px',
                        pcFontSize:'16px',
                        fontColor:'#333333',
                        font:'1'
                    },
                    resourceLink: '',
                    paragraph: 0,//选择题不需要填段落
                    alpha: (String.fromCharCode((65 + index)))
                })
                vm.choiceLength++;
            };

            //添加判断题答案;
            vm.addJudge = function (type) {
                if (vm.taskId) {
                    vm.params.answerList[0].introduce = type == 1 ? '√' : '是';
                    vm.params.answerList[1].introduce = type == 1 ? '×' : '否';

                } else {
                    vm.params.answerList = [];
                    vm.params.answerList.push({
                            taskId: vm.taskId,
                            exerciseType: 4,//1选择，2填空，4判断
                            numberPattern: vm.numberPattern,
                            resourceLink: '',
                            paragraph: 0,//判断题不需要填段落
                            introduce: type == 1 ? '√' : '是',
                            alpha: (String.fromCharCode(65)),
                            standardAnswer: '',
                            type: 1
                        },
                        {
                            taskId: vm.taskId,
                            exerciseType: 4,//1选择，2填空，4判断
                            numberPattern: vm.numberPattern,
                            resourceLink: '',
                            paragraph: 0,//判断题不需要填段落
                            introduce: type == 1 ? '×' : '否',
                            alpha: (String.fromCharCode(66)),
                            standardAnswer: '',
                            type: 1
                        })
                }
                ;
                vm.judgeType = 1;//根据judgeType渲染不同的表格内容
            };
            //删除选择答案
            vm.deleteChoice = function (num) {
                vm.params.answerList.splice(num, 1);
                for (var h = 0; h < vm.params.answerList.length; h++) {
                    vm.params.answerList[h].alpha = (String.fromCharCode((65 + h)))
                }
                vm.choiceLength--;
            };
            //添加判断题自定义答案;
            vm.addJudge2 = function () {
                vm.judgeType = 3;
                vm.params.answerList = [];
                vm.params.answerList.push({
                        taskId: vm.taskId,
                        exerciseType: 4,//1选择，2填空，4判断
                        numberPattern: vm.numberPattern,
                        resourceLink: '',
                        introduce: '',
                        alpha: (String.fromCharCode(65)),
                        standardAnswer: '',
                        type: 1
                    },
                    {
                        taskId: vm.taskId,
                        exerciseType: 4,//1选择，2填空，4判断
                        numberPattern: vm.numberPattern,
                        resourceLink: '',
                        introduce: '',
                        alpha: (String.fromCharCode(66)),
                        standardAnswer: '',
                        type: 1
                    })
            };
            //判断题不需要删除答案

            //清除空无用參數、替换错误参数
            function clearParms(params) {
                //console.log("过滤之前的参数", vm.params)
                var deleteParams = ['sort', 'createAt', 'updateAt', 'lessonName', 'periodName', 'subjectName',
                    'updateBy', 'taskID', 'length', '$$hashKey', 'alpha', 'type', 'appCoverURL', 'createBy',
                    'frontCoverURL', 'introText'];
                //前面是需要替代的名称，后面是替代的名称（把id替换成periodId)
                var replaceParams = {
                    id: 'periodId'
                };
                angular.forEach(params, function (item) {
                    if (!angular.isArray(item)) {
                        angular.forEach(item, function (val, key, itemChild) {
                            if (deleteParams.indexOf(key) >= 0) {
                                delete itemChild[key];
                            } else if (key in replaceParams) {
                                itemChild[replaceParams[key]] = val;
                                delete itemChild[key];
                            }

                        })
                    } else {
                        clearParms(item);
                    }
                })
            }

            //获取视频地址
            addVideo();
            function addVideo() {
                var videoUrl = [];
                for (var i = 0; i < 30; i++) {
                    videoUrl.push({url: ''})
                }
                vm.videoUrl = videoUrl;
            }

            vm.getVideo = function (num, url) {
                vm.videoUrl[num].url = url;
                vm.unitList[num].resourceLink = url;
            };

            //console.log(vm.params.task.isAnalysis)
            return;


            vm.orderType = 1;
            vm.tip = false;
            vm.params = {
                unitList: [],
                answerList: []
            };
            vm.unitList = [];
            vm.tipList = [];

            //添加题干图片，音频，文本项
            vm.addExercise = function (type) {

                vm.more = {
                    link: '',
                    mediaType: type,
                    introduce: ''
                };
                if (type > 5) {
                    vm.tipList.push(vm.more);
                }
                else {
                    vm.unitList.push(vm.more);
                }


            };


            // 删除题目
            vm.deleteStep = function (num, type) {
                if (type) {
                    vm.tipList.splice(num, 1);
                }
                else {
                    vm.unitList.splice(num, 1);
                }

            };

            //填空题 添加段落
            vm.addParagraph = function () {
                vm.params.answerList.push(
                    {
                        type: 1,
                        introduce: [],
                        result: [],
                        status: status,
                        paragraph: vm.params.answerList.length
                    }
                );
            };
            //添加图片 添加文字
            vm.addFill = function (type, $index, status) {
                vm.params.answerList[$index].introduce.push({
                    type: type,
                    introduce: [],
                    result: '',
                    status: status,
                    paragraph: $index
                })

            };
            // 添加选择题
            vm.addChoice = function (type, index) {
                //console.log(index);
                //查看
                vm.params.answerList.push({
                    type: type,
                    result: '',
                    introduce: '',
                    alpha: (String.fromCharCode((65 + index)))
                })
                vm.choiceLength++;
            };
            //添加判断题
            vm.addJudge = function (type) {
                if (vm.taskId) {
                    vm.params.answerList[0].introduce = type == 1 ? '√' : '是';
                    vm.params.answerList[1].introduce = type == 1 ? '×' : '否';

                } else {
                    vm.params.answerList = [];
                    vm.params.answerList.push({
                            introduce: type == 1 ? '√' : '是',
                            alpha: (String.fromCharCode(65)), result: '', type: 1
                        },
                        {
                            introduce: type == 1 ? '×' : '否',
                            alpha: (String.fromCharCode(66)), result: '', type: 1
                        })
                }
                ;
                vm.judgeType = 1;
            };
            vm.addJudge2 = function () {
                vm.judgeType = 3;
                vm.params.answerList = [];
                vm.params.answerList.push({
                        introduce: '',
                        alpha: (String.fromCharCode(65)), result: '', type: 1
                    },
                    {
                        introduce: '',
                        alpha: (String.fromCharCode(66)), result: '', type: 1
                    })
            };
            //删除选择答案
            vm.deleteChoice = function (num) {
                vm.params.answerList.splice(num, 1);
                for (var h = 0; h < vm.params.answerList.length; h++) {
                    vm.params.answerList[h].alpha = (String.fromCharCode((65 + h)))
                }
                vm.choiceLength--;
            };
            //删除填空答案
            vm.deleteFill = function (paragraph, num) {
                vm.params.answerList[paragraph].introduce.splice(num, 1);
            };
            // 删除段落
            vm.deleteParagraph = function (num) {
                vm.params.answerList.splice(num, 1);
            };
        }]);
