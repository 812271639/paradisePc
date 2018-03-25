/**
 * Created by Master on 2017/4/24.
 */
'use strict';
angular.module('paradiseApp')
    .controller('MessageBoardAddController', ['messageBoardService', 'commonUnit', '$state', '$log', '$timeout', '$scope', '$rootScope','wxServices',
        function (messageBoardService, commonUnit, $state, $log, $timeout, $scope, $rootScope,wxServices) {
            var vm = this;
            var btn = document.getElementById('edit-toolbar').getElementsByTagName('button');
            var gradeBar = $('.mb-grade-bar');
            var imgArr=[];
            vm.mobile = $rootScope.mobile;
            vm.placeholder=true;
            var i = 0;
            vm.colorBar = false;
            vm.gradeBarStatus = false;
            vm.tip={
                status:false,
                text:''
            };
            //调用图片上传接口
            if ($rootScope.mobile == "android") {
                $timeout(function () {
                    wxServices.wxPort(['chooseImage','uploadImage']);
                },1000);
            }


            //初始化编辑
            editInit();
            vm.params = {grade: $state.params.grade};
            //选择板块
            vm.setGrade = function (num) {
                //记录年级为当前选中
                commonUnit.session('currentPage',num);
                vm.gradeBarStatus ? gradeBar.fadeOut() : gradeBar.fadeIn();
                num ? vm.params.grade = num : false;
                vm.gradeBarStatus = !vm.gradeBarStatus;
            };

            //提交编辑
            vm.posting = function () {
                vm.params.content = $('#content').html();
                if (imgArr.length>0){
                    vm.params.firstImg=commonUnit.firstSrc(vm.params.content,imgArr);
                }
                $timeout.cancel(vm.timer);
                if (!vm.params.title) {
                    vm.tip.status=true;
                    vm.tip.text = '请输入标题';
                    vm.timer=$timeout(function () {
                        vm.tip.status=false;
                    },3000);
                    // $rootScope.showTips('请输入标题')
                } else if (vm.params.title.length>20||!vm.params.content) {
                    vm.tip.status=true;
                    vm.tip.text = vm.params.content?'标题不能超过20个字符哦':'请输入正文';
                    vm.timer=$timeout(function () {
                        vm.tip.status=false;
                    },3000);
                    // $rootScope.showTips('请输入正文')
                } else {

                    // commonUnit.session('posts', vm.params);
                    messageBoardService.posts(vm.params).then(function (res) {
                        if (res.data.code===0){
                            //切换列表为所有
                            commonUnit.session('postListType',2);
                            history.go(-1);
                        }else {
                            $rootScope.showTips(res.data.message);
                        }
                    })
                }
            };
            //插入图片
            vm.insertImage = function () {
                wx.ready(function () {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds;
                            if (localIds.indexOf("wxlocalresource") != -1) {
                                localIds = localIds.replace("wxlocalresource", "wxLocalResource");
                            }// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            uploadImg(localIds);
                        },
                        fail: function () {
                        }
                    });
                    function uploadImg(localIds) {
                        $timeout(function () {
                            wx.uploadImage({
                                localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    // res.serverId;// 返回图片的服务器端ID
                                    wxServices.getMedia(res.serverId).then(function (res) {
                                        if (res.data.code === 0) {
                                            imgArr[i]=res.data.data.url;
                                            //第一次上传图片
                                            if(i===0){
                                                $('#content').append('<img src="'+imgArr[i]+'">');
                                            }else {
                                                document.execCommand('insertImage', false, imgArr[i]);
                                            }
                                            i++;
                                            vm.placeholder=false;
                                        } else {
                                            $rootScope.showTips(res.data.message);
                                        }
                                    })
                                }
                            })
                        }, 100)
                    }
                })
            };


            function editInit() {
                for (var i = 0; i < btn.length; i++) {
                    btn[i].onclick = function () {
                        document.execCommand(this.dataset.name, false, this.dataset.value);
                        $scope.$apply();
                    }
                }
            }
            // vm.setScrollTop=function () {
            //     $timeout(function () {
            //
            //         $('.page-wrap').css('bottom', $('body').scrollTop()+20+'px')
            //         // $('#content').text( $('body').scrollTop())
            //         // // $('.page-wrap').css('-webkit-overflow-scrolling';);
            //         // alert( $('.page-wrap').scrollTop())
            //     },1000)
            //
            //
            // }
            //编辑器菜单显示隐藏
            // function toolBarStatus() {
            //     $('#edit-toolbar')
            // }
            //编辑器为空？
            $('#content').on('input propertychange',function () {
                vm.params.content = $(this).html();
                if(vm.params.content = $(this).html().length==0){
                    vm.placeholder=true;
                }else {
                    vm.placeholder=false;
                }
                $scope.$apply();
            })
        }]);
