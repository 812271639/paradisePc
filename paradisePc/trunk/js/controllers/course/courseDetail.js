angular.module("myApp")
    .controller("CourseCtrl", ["$scope", "$state", "$rootScope", "special", "$sce", "main", "ipCookie", "userMsg",function($scope, $state, $rootScope, special, $sce, main, ipCookie, userMsg) {
        var vm = this;
        vm.periodId = $state.params.id;
        vm.taskId = $state.params.taskId;
        vm.user=JSON.parse(localStorage.getItem("user"));
        if(vm.user==null){
            vm.id='';
        }else {
            vm.id=vm.user.id
        }
        vm.taskList = [];
        vm.params = {};
        vm.che = [];
        if (ipCookie("login2")) {
            function getUserDetail() {
                main.getUserMsg().then(function(res) {
                    if (res.data.code === 0) {
                        vm.vip = res.data.data.isMember;

                    } else {
                        res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                    }
                })
            }
            getUserDetail();
        }


        //获取课程名称
        vm.getSubject = function() {
            special.getCourseDetail(vm.periodId).then(function(res) {
                if (res.data.code === 0) {
                    vm.course = res.data.data;
                } else {
                    res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
                }
            })
        };
        vm.getSubject();
        //获取上一个课程
        vm.getPrevious = function() {
            special.getPreviousCourse(vm.periodId).then(function(res) {
                if (res.data.code === 0) {
                    vm.prevCourse = res.data.data;

                } else {
                    console.log('接口异常');
                }
            })
        };
        vm.getPrevious();
        //获取下一个课程
        vm.getNext = function() {
            special.getNextCourse(vm.periodId).then(function(res) {
                if (res.data.code === 0) {
                    vm.nextCourse = res.data.data;
                } else {
                    alert(res.data.message);
                }
            })
        };
        vm.getNext();
        //获取任务列表
        vm.getTask = function() {
            special.getTaskList(vm.periodId).then(function(res) {
                if (res.data.code === 0) {
                    vm.taskList=res.data.data;
                    //console.log(vm.taskList);
                    if(vm.taskId){
                        angular.forEach(vm.taskList,function (data,index) {
                            if(vm.taskId==data.id){
                                vm.index=index;
                            }
                        });
                    }else {
                       vm.index=0;
                    }

                    if ((!vm.taskId && vm.taskList.length != 0) ||vm.taskId ==undefined) {
                        vm.taskId = vm.taskList[0].id;
                        vm.getTaskDetail();
                        vm.getCollection();
                    }
                } else {
                    alert(res.data.message);
                }
            })
        };
        vm.getTask();
        //获取任务详情
        vm.getTaskDetail = function() {
            var lessionimg = sessionStorage.getItem("abd");
            special.getTaskDetail(vm.taskId,{userId:vm.id}).then(function(res) {
                if (res.data.code === 0) {
                    vm.data = res.data;
                          for (var i = 1; i < vm.data.unitList.length; i++) {
                            try {
                                vm.data.unitList[i].textContent = JSON.parse(vm.data.unitList[i].textContent);
                            }catch(e){
                            }
                        }
                    vm.unitList=vm.data.unitList;
                    vm.purchased=vm.data.data.isLock;
                    vm.showLevel=vm.data.data.showLevel;
                    vm.difficultyLevel=vm.data.data.difficultyLevel;
                    angular.forEach(vm.data.rcmdContentList,function (data, index) {
                        data.left=index*236;
                        vm.width=index*236+210;
                    });
                    vm.trueNum=0;
                    angular.forEach(vm.data.answerList,function (data, index) {
                        if(data.standardAnswer=="true"){
                            vm.trueNum++;
                        }
                    });
                    vm.isLock = res.data.data.isLock;
                    vm.share = res.data.data.shareToUnlock;
                    //获取任务详情的专题ID用于页面上端跳转到专题页面
                    vm.lessonId = res.data.data.lessonId;
                    vm.standardAnswer = [];
                    angular.forEach(vm.data.answerList, function(data, index) {
                        //习题，填空题
                        if (vm.data.data.taskType == 2 && vm.data.data.specificType == 2) {
                            data.introduce = JSON.parse(data.introduce);
                            data.standardAnswer = JSON.parse(data.standardAnswer);
                            vm.standardAnswer = vm.standardAnswer.concat(data.standardAnswer);
                            //习题，选择题
                        } else if (vm.data.data.taskType == 2 && vm.data.data.specificType == 1) {
                            if (data.standardAnswer == "true") {

                            }
                        }

                    });
                    //答案解析
                    vm.analysis = [];
                    angular.forEach(vm.data.unitList, function(data, index) {
                        if (data.mediaType == 6 || data.mediaType == 7) {
                            vm.analysis.push(data);

                        }
                          // console.log(vm.analysis);
                    })
                } else {
                    alert(res.data.message);
                }

            })

        };


        //获取是否收藏
        if (ipCookie("login2")) {
            vm.flag = true;
        }
        vm.getCollection = function() {
            if (ipCookie("login2")) {
                special.getisCollection(vm.taskId).then(function(res) {
                    if (res.data.code === 0) {
                        vm.collectionStatus = res.data.isCollection;

                    } else {
                        alert(res.data.message);
                    }
                })
            }
        };

        if(vm.taskId){
            vm.getTaskDetail();
            vm.getCollection();
        }
        //通过点击修改收藏状态
        vm.changeCollection = function() {
            if (ipCookie("login2")) {
                vm.params.targetType = 3;
                vm.params.status = 3 - vm.collectionStatus;
                special.changeCollection(vm.taskId, vm.params).then(function(res) {
                    if (res.data.code === 0) {
                        vm.getCollection();
                        //数据埋点
                        main.postDataBurialPoint(
                            {
                                targetId:$state.params.taskId-0,
                                targetType:1,
                                subTargetType:2,
                                userId:vm.id,
                                os:1
                            }
                        ).then(function(res){
                        })
                    } else {
                        alert(res.data.message);
                    }

                })
            } else {
                $rootScope.login();
            }
        };
        //取消隐藏头部
        vm.hideHeader = function() {
                $('#header').css('display', 'none');
                $(' #fillinheader ').css('display', 'none');
                $(' #choiceheader').css('display', 'none');
            },
            //跳转到登陆页面
            vm.load = function() {
                $rootScope.login();
            },
            //跳转到注册页面
            vm.register = function() {
                $rootScope.register();
            },
            //点击跳转开通会员
            vm.openvip = function() {
                if (ipCookie("login2")) {
                    $state.go('main.newMember');
                } else {
                    $rootScope.login();
                }
            }

        //提交

        vm.submit = function() {
            $('#deletebutton').css('display', 'none');
            $('#deletebtn').css('display', 'none');
            vm.analysisShow = 1;
            vm.answer = vm.data.answerList;
            vm.numberPattern = vm.data.answerList[0].numberPattern;
            //填空题
            vm.userAsr = [];
            if (vm.data.data.taskType == 2 && vm.data.data.specificType == 2) {
                angular.forEach(vm.answer, function(data, index) {
                    angular.forEach(data.introduce, function(ctrl) {
                        if (ctrl.status == 2) {
                            ctrl.compact = ctrl.result;
                            vm.userAsr.push(ctrl.compact);
                        }
                    })

                });

                if (vm.userAsr.toString() == vm.standardAnswer.toString()) {
                    vm.compactStatus = true;
                } else {
                    vm.compactStatus = false;
                }
                //console.log(vm.userAsr, vm.standardAnswer);
                //for循环对比答案，给答案赋予不同的颜色
                for (var i = 0; i < vm.standardAnswer.length; i++) {
                    if (vm.userAsr[i] === vm.standardAnswer[i]) {
                        $("#fillExercises input:eq(" + i + ")").css("color", "#86ce2f");
                    } else {
                        $("#fillExercises input:eq(" + i + ")").css("color", "#ff6600");
                    }
                }
                //填空题答案样式不一样
                angular.forEach(vm.data.answerList, function(item) {
                        item.standardAnswer = item.standardAnswer.join("; ");
                    })
            }
            //选择题控制
            else if (vm.data.data.taskType == 2 && (vm.data.data.specificType == 1 || vm.data.data.specificType == 4)) {
                //获取答案数组
                vm.ans = [];
                vm.ind = [];

                angular.forEach(vm.data.answerList, function(obj, index) {
                        obj.standardAnswer = !!obj.standardAnswer;
                        vm.ans.push(obj.standardAnswer); //单个选项是否正确数组
                        if (obj.standardAnswer) {
                            vm.ind.push(index + 1); //标准答案序号数组
                        }
                    })
                    console.log('标准答案：', vm.ans);

                var input = document.getElementsByName('sex');
                var inputChecked = [];
                //自己的答案数组
                angular.forEach(input, function(obj) {
                        inputChecked.push(obj.checked);
                    })
                    //console.log('自己答案：', inputChecked);
                vm.chooseAnswer = inputChecked.toString();

                //对比答案，显示正确错误框
                if (inputChecked.toString() == vm.ans.toString()) {
                    vm.right = true;
                }
                console.log("inputChecked=="+inputChecked);
                if (vm.data.answerList[0].mediaType == 2 || (vm.data.data.specificType == 4)) {
                    for (var i = 0; i < vm.ans.length; i++) {
                        if (inputChecked[i] != vm.ans[i] && inputChecked[i]) {
                            $(".labelP").eq(i).css({ "border": "#ff6600 3px solid" });
                        }
                        if (vm.ans[i]) {
                            $(".labelP").eq(i).css({ "border": "#86c12f 3px solid" });
                            $(".choiceTrue").eq(i).css("display",'block');
                        }
                        if (!vm.ans[i]) {
                            $(".choiceFalse").eq(i).css("display",'block');
                            $(".labelP").eq(i).css({ "border": "#ff6600 3px solid" });
                        }
                    }
                } else if (vm.data.answerList[0].mediaType == 1 || (vm.data.data.specificType == 4)) {
                    for (i = 0; i < vm.ans.length; i++) {

                        if (inputChecked[i] != vm.ans[i] && inputChecked[i]) {
                            $(".choicetag").eq(i).css("color", "#ff6600");
                            $(".labelC").css('border', 'none')
                        }
                        if (vm.ans[i]) {
                            $(".choiceTrue").eq(i).css("display",'block');
                            $(".choicetag").eq(i).css("color", "#86CE2F");
                        }
                        if (!vm.ans[i]) {
                            $(".choiceFalse").eq(i).css("display",'block');
                            $(".choicetag").eq(i).css("color", "#ff6600");
                        }
                    }
                }
                //单独判断题
                if (vm.data.data.specificType == 4) {
                    $(".labelC").css('border', 'none')
                    for (i = 0; i < vm.ans.length; i++) {
                        //console.log("111");
                        if (inputChecked[i] != vm.ans[i] && inputChecked[i]) {
                            $(".choiceFalse").eq(i).css("display",'block');
                            $(".choicetag").eq(i).css("color", "#ff6600");
                        }

                        if (vm.ans[i]) {
                            $(".choiceTrue").eq(i).css("display",'block');
                            $(".choicetag").eq(i).css("color", "#86CE2F");
                        }
                        if (!vm.ans[i]) {
                            $(".choiceFalse").eq(i).css("display",'block');
                            $(".choicetag").eq(i).css("color", "#ff6600");
                        }
                    }
                }
                console.log(vm.ind)
                if(vm.numberPattern == 1){
                    vm.choosePattern = [];
                    angular.forEach(vm.ind,function (item) {
                        vm.choosePattern.push(String.fromCharCode((64 + item)));
                        console.log(vm.choosePattern)
                    });
                    vm.chooseAnswer = '选项：' + vm.choosePattern.toString();
                }else {
                    vm.chooseAnswer = '选项：' + vm.ind.toString();
                }

                console.log(vm.chooseAnswer);

            }

        };
        vm.analyse = function(a) {
            vm.url = $sce.trustAsHtml(a);

        };



        vm.trust = function(o) {

            //以下代码替换是为了使用cdn加速播放视频资源
            var str = o.resourceLink;
            var strKs3 = 'ks3-cn-beijing.ksyun.com/buttomsup';
            var strCdn = str.replace(strKs3,'buttomsup.dounixue.net');
            var strHttps = 'https';
            var strHttp = strCdn.replace(strHttps,'http');
            console.log(strHttp);

            //添加防盗链必要参数
            /*十位数当前时间戳*/
            var t = Date.parse(new Date()).toString();
            t = t.substr(0,10);
            console.log('t=',t);

            /*MD5加密（ptteng+文件名+十位数当前时间戳），取加密串的前16位*/
            // var fileName = o.resourceLink.slice(42,-4);\
            var fileNameArr = o.resourceLink.split('/');
            var fileName = fileNameArr[fileNameArr.length-1];

            //反编译为中文(解码)
            console.log('未解码=',fileName);
            fileName = decodeURI(fileName);
            console.log('解码=',fileName);
            var k = md5('ptteng'+ fileName + t);//32位
            console.log('k=',k);
            k = k.substr(0,16);

            strHttp = strHttp + "?" + "k=" + k + "&" + "t=" +t;
            console.log(strHttp);
            return $sce.trustAsHtml(strHttp);
        };

        vm.left=0;
        vm.goLeftRight=function (num) {
            if(num==1){
                $("#width").animate({left:'-=236px'});
                vm.left=vm.left-236
            }else {
                $("#width").animate({left:'+=236px'});
                vm.left=vm.left+236;
            }
        }

        vm.goOther=function (data) {
            switch (parseInt(data.targetType)){
                case 1:
                    $state.go("main.subject",{id:data.lessonId},{reload:true});
                    break;
                case 2:
                    if(data.isLock==1){
                        $state.go("main.subject",{id:data.lessonId},{reload:true});
                    }else {
                        $state.go("main.course",{id:data.periodId,taskId:''},{reload:true});
                    }
                    break;
                case 3:
                    if(data.isLock==1){
                        $state.go("main.subject",{id:data.lessonId},{reload:true});
                    }else {
                        $state.go("main.course",{id:data.periodId,taskId:data.taskId},{reload:true});
                    }
                    break;
            }
        }


        //判断新or老对象(需在上面将vm.data.unitList[m].)
         vm.charge=function(m){
            try {
            vm.data.unitList[m].textContent = JSON.parse(vm.data.unitList[m].textContent);
            // vm.data.answerList[m].introduce = JSON.parse(vm.data.answerList[m].introduce);
             }catch(e){}
            return (angular.isObject(vm.data.unitList[m].textContent));
        }
        vm.charge1=function(m){
             try {
            vm.data.answerList[m].introduce = JSON.parse(vm.data.answerList[m].introduce);
             }catch(e){}
            return (angular.isObject( vm.data.answerList[m].introduce));
        }
        //下面是多选题文字部分
        console.log(vm.analysis);
        vm.charge2=function(m){
             try {
            vm.analysis[m].textContent = JSON.parse(vm.analysis[m].textContent);
             }catch(e){}
            return (angular.isObject( vm.analysis[m].textContent));
        }

         // console.log(vm.course.frontCoverURL);
        vm.charge3=function(m){
             try {
            vm.analysis[m].textContent = JSON.parse(vm.analysis[m].textContent);
             }catch(e){}
            return (angular.isObject( vm.analysis[m].textContent));
        };
        //开通vip
        vm.buyVip=function () {
            if($rootScope.isLogin()){
                $state.go('main.newMember')
            }else {
                $rootScope.login()
            }
        };
        //数据埋点
        main.postDataBurialPoint(
            {
                targetId:$state.params.taskId-0,
                targetType:1,
                subTargetType:1,
                userId:vm.id,
                os:1
            }
        ).then(function(res){
        })
    }]);