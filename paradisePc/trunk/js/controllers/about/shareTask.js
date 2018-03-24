/**
 * Created by Administrator on 2018/1/7/007.
 */
angular.module("myApp")
    .controller("ShareTaskCtrl", ["$rootScope", 'main', 'userMsg', '$state','$scope', 'home', 'user', '$location', 'special','$sce',
        function($rootScope, main, userMsg, $state, $scope, home, user, $location,special,$sce) {
        //修改title
            document.title = "逗你学";
            var vm = this;
            vm.jumpTo = function(){
                location.href=vm.trust(vm.data.unitList[0]);
            };
            vm.taskId = $state.params.id;
            special.getTaskDetail(vm.taskId,{userId:vm.id}).then(function(res) {
                vm.data = res.data;
                //所属专题收费
                if(vm.data.data.lessonIsLock==1){
                    special.getSubjectIntro(vm.data.data.lessonId).then(function(res){
                        vm.detail = res.data;
                        console.log(vm.detail);
                        //反序列化
                        angular.forEach(vm.detail.introduction,function(item){
                            //console.log(item);
                            if(item.textContent!=""){
                                try {
                                    item.textContent = JSON.parse(item.textContent);
                                }catch(e) {
                                    item.textContent = item.textContent
                                }
                            }
                        });

                    });
                }
                //所属专题不收费
                else{
                    //创建独立的视频介绍数组
                    vm.context = vm.data.unitList.slice(1);
                    angular.forEach(vm.context,function(item){
                        //需要考虑到新老数据兼容
                        //newData
                        //console.log(typeof((item.textContent)));
                        if(item.textContent!="") {
                            try {
                                item.textContent = JSON.parse(item.textContent);
                            }catch(e) {
                                item.textContent = item.textContent
                            }
                        }
                        if(typeof(item.textContent)=="object"){

                        }
                        //oldData
                        else{
                            vm.oldData = vm.context;
                        }
                    });
                }
                /*猜你薄弱*/
                vm.newRcmdContentList=[];
                angular.forEach(vm.data.rcmdContentList,function (data, index) {
                    data.left=index*236;
                    //vm.width=index*236+210;
                    if(index<3){
                        let i = index-0;
                        vm.newRcmdContentList[i]=data;
                    }

                });
            });

            vm.download =function(){
                var confirm = function() {
                    location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ptteng.happylearn";
                };

                var cancle = function() {};
                $rootScope.appBuy("", confirm, cancle);
            };
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
        }]);
