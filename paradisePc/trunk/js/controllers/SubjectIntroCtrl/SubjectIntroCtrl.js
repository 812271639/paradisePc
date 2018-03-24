/**
 * Created by Administrator on 2017/12/31/031.
 */
angular.module("myApp")
    .controller("SubjectIntroCtrl", ["$scope", "$state", "$http", "special", '$timeout','$rootScope','$sce','main',
        function($scope, $state, $http, special,$timeout,$rootScope,$sce,main) {
        var vm = this;
        //购买Vip
        vm.buyVip=function () {
            if($rootScope.isLogin()){
                $state.go('main.newMember')
            }else {
                $rootScope.login()
            }
        };
        //购买专题
        vm.buySubject=function () {
            if($rootScope.isLogin()){
                $rootScope.choosePay(vm.data)//vm.data数据未定义
            }else {
                $rootScope.login()
            }
        };
        //获取专题信息
        vm.user=JSON.parse(localStorage.getItem('user'));
        if(vm.user==null){
            vm.id='';
        }else {
            vm.id=vm.user.id
        }
        special.getSpecialDetail($state.params.id,{userId:vm.id}).then(function(res) {
            if (res.code == null) {
                vm.data = res.data;
                vm.taskNum = 0;
                angular.forEach(vm.data.periodList,function (data) {
                    angular.forEach(data.periodTasks,function (data) {
                        vm.taskNum+=1;
                    })
                })
            } else {
                res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
            }
            //两个开关以便跳出forEach
            var switchIn = 0;
            var switchOut = 0;
            //遍历寻找——专题下第一个课程的第一个视频任务
            angular.forEach(vm.data.periodList,function (data) {
                if(switchOut==0) {
                    angular.forEach(data.periodTasks, function (data) {
                        if(switchIn==0){
                            //TaskType  1 视频       2习题
                            if (data.taskType == 1) {
                                //请求任务详情
                                special.getTaskDetail(data.taskId,{userId:vm.id}).then(function(res) {
                                    vm.posterPic = res.data.data.videoCoverURL;
                                    vm.videoIntro = res.data.unitList[0];
                                    vm.testIntro = res.data.data.taskName;
                                });
                                switchOut = 1;
                                switchIn = 1;
                                return
                            }
                        }
                        else{return}
                    });
                }
                else{return}
            });
        });

        //要注入$sce
        //告诉angular这是安全的
        vm.trust = function(o) {
            //以下代码替换是为了使用cdn加速播放视频资源
            var str = o.resourceLink;
            var strKs3 = 'ks3-cn-beijing.ksyun.com/buttomsup';
            var strCdn = str.replace(strKs3,'buttomsup.dounixue.net');
            var strHttps = 'https';
            var strHttp = strCdn.replace(strHttps,'http');
            //添加防盗链必要参数
            /*十位数当前时间戳*/
            var t = Date.parse(new Date()).toString();
            t = t.substr(0,10);
            /*MD5加密（ptteng+文件名+十位数当前时间戳），取加密串的前16位*/
            // var fileName = o.resourceLink.slice(42,-4);
            var fileNameArr = o.resourceLink.split('/');
            var fileName = fileNameArr[fileNameArr.length-1];
            //反编译为中文
            fileName = decodeURI(fileName);
            var k = md5('ptteng'+ fileName + t);//32位
            k = k.substr(0,16);
            strHttp = strHttp + "?" + "k=" + k + "&" + "t=" +t;
            return $sce.trustAsHtml(strHttp);
        };
        //收费专题简介
        // getSubjectIntro
        special.getSubjectIntro($state.params.id).then(function(res){
            vm.introData = res.data;
            //反序列化
            angular.forEach(vm.introData.introduction,function(item){
                //console.log(item);
                if(item.textContent!=""){
                    item.textContent = JSON.parse(item.textContent);
                }
            });
        })
        //数据埋点
        main.postDataBurialPoint(
            {
                targetId:$state.params.id-0,
                targetType:0,
                subTargetType:1,
                userId:vm.id,
                os:1
            }
        ).then(function(res){
        })
    }]);