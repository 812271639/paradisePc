/**
 * Created by Master on 2017/4/24.
 */
'use strict'
angular.module('paradiseApp')
    .controller('MessageBoardDetailController', ['messageBoardService', 'commonUnit', '$state', '$log', '$timeout', '$scope', '$rootScope','wxServices',
        function (messageBoardService, commonUnit, $state, $log, $timeout, $scope, $rootScope,wxServices) {
            var vm = this;
            var page=1;
            vm.list=[];
            vm.imgList = [];
            vm.loading=false;
            vm.loaded=0;
            vm.imgViewShow = false;
            //帖子id
            var id = $state.params.id;
            //帖子作者id
            vm.uid = $state.params.uid;
            vm.currentUid=commonUnit.session('user').uid;
            vm.grade = $state.params.grade;
            //是否为当前用户
            vm.currentUser = vm.currentUid == vm.uid;
            //调用图片上传接口
            if ($rootScope.mobile == "android") {
                $timeout(function () {
                    wxServices.wxPort(['chooseImage','uploadImage']);
                },1000);
            }

            //获取帖子详情
            postsDetail();
            function postsDetail() {
                messageBoardService.postsDetail(id).then(function (res) {
                    if (res.data.code===0){
                        vm.params = res.data.data;

                    }else {
                        $rootScope.showTips(res.data.message);
                    };
                    vm.loaded++;
                })
            }
            //下拉加载
            vm.loadMore=function () {
                if(vm.nextPage){
                    vm.loading=true;
                    page++;
                    postsReply();
                }else {
                    return false;
                }
            };
            //回帖列表
            postsReply();
            function postsReply(type) {
                //倒序
                type?page=1:false;
                messageBoardService.postsReplyList(id,{sort:1,page:page}).then(function (res) {
                    if (res.data.code===0){
                        if(type){
                            angular.forEach(res.data.data,function (item) {
                                try{
                                    item.content = angular.fromJson(item.content);
                                }catch (e){
                                    item.content = {
                                        text:item.content,
                                        imgList:[]
                                    }
                                }
                            })
                            vm.list=res.data.data;

                        }else {
                            angular.forEach(res.data.data,function (item) {
                                try{
                                    item.content = angular.fromJson(item.content);
                                }catch (e){
                                    item.content = {
                                        text:item.content,
                                        imgList:[]
                                    }
                                }
                            })
                            vm.list = vm.list.concat(res.data.data);
                        }
                        vm.nextPage=res.data.next;
                        vm.total = res.data.total;
                    }else {
                        $rootScope.showTips(res.data.message);
                    };
                    vm.loaded++;
                })
            }

            //帖子删除
            vm.deletePosts = function () {
                $rootScope.dialog = {
                    status: true,
                    text: '是否确认删除此条帖子',
                    action: function () {
                        messageBoardService.postsDelete(id).then(function (res) {
                            $rootScope.dialog.status=false;
                            history.go(-1);
                        })
                    },
                    cancle: function () {
                        this.status = false
                    }
                }
            }
            //评论删除
            vm.delete = function (item) {
                $rootScope.dialog = {
                    status: true,
                    text: '是否确认删除评论',
                    action: function () {
                        messageBoardService.postsReplyDelete(item.id).then(function (res) {
                            if (res.data.code===0){
                            item.deleteStatus = 2;
                        }else {
                            $rootScope.showTips(res.data.message);
                            }
                        });
                        this.status = false;
                    },
                    cancle: function () {
                        this.status = false
                    }
                }
            }
            //帖子回复
            vm.sendReply = function () {
                if(vm.replyContent || vm.imgList.length>0){
                    //拼接回复+文字存json
                    var content = {
                        text: vm.replyContent,
                        imgList:vm.imgList
                    }
                    vm.imgViewShow = false;

                    messageBoardService.postsReply(id,{content:angular.toJson(content)}).then(function (res) {
                        if (res.data.code===0){
                            vm.start=false;
                            page=1;
                            postsReply(1);
                            vm.params.repliesCount++;
                            vm.replyContent='';
                            document.querySelector('#textarea').rows=1;
                            vm.imgList = [];
                            //跳转至回复
                            document.getElementById("reply").scrollIntoView(true);

                        }else {
                            $rootScope.showTips(res.data.message);
                        }
                    })
                }else {
                    $rootScope.showTips("请输入评论内容");
                }
            }
            vm.openImgView = function () {
                vm.imgViewShow = !vm.imgViewShow;
            }
            vm.rmItem = function (n) {
                vm.imgList.splice(n,1);
            }
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
                                            vm.imgList.push(res.data.data.url);
                                            // //第一次上传图片
                                            // if(i===0){
                                            //     $('#content').append('<img src="'+imgArr[i]+'">');
                                            // }else {
                                            //     document.execCommand('insertImage', false, imgArr[i]);
                                            // }
                                            // i++;
                                            // vm.placeholder=false;
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




            //返回
            vm.back =function () {
                history.go(-1);
            }

            //回复框设置高度、页面置底，
            vm.restScroll = function () {
                $timeout(function () {
                    vm.start=true;
                },1000);
                //安卓延迟等待键盘弹出
                if ($rootScope.Android) {
                    $timeout(function () {
                        $('.page-wrap').scrollTop('100000000');
                    }, 400)
                } else {
                    $('.page-wrap').scrollTop('100000000');
                }
            };
            vm.start=true;
            document.querySelector('#textarea').onscroll = function () {
                if(vm.start==true){
                    this.rows++;
                }
                $('.page-wrap').scrollTop('100000000');
            }
            vm.imgHide = function () {
                vm.imgUrl = false;
            }
            // var i = -1;
            // window.addEventListener("popstate", function(e) {
            //
            //     if (vm.imgUrl) {
            //         alert("111+ " +i )
            //         vm.imgUrl = false;
            //         i--;
            //         e.preventDefault();
            //         e.stopPropagation();
            //
            //         $scope.$apply();
            //     }else {
            //         alert("222 + "+i)
            //         history.go(i);
            //     }
            //
            //     //     //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
            //     //     if ($rootScope.preState.set){
            //     //         $rootScope.preState.set=false;
            //     //         $state.go($rootScope.preState.prePage);
            //     //     }
            //     //     return false;
            //     // }, false);
            // },false);
        }])