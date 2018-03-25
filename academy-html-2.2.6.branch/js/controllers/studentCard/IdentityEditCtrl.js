/**
 * Created by Master on 2017/4/21.
 */
angular.module('paradiseApp')
    .controller('IdentityEditController', ['$scope', 'userService', 'wxServices', 'identityData', '$rootScope', 'localSession', 'userService', '$timeout', 'wxServices', '$state', '$location',
        function ($scope, userService, wxServices, identityData, $rootScope, localSession, userService, $timeout, wxServices, $state, $location) {
            //不记录当前页面

            var vm = this;
            var openid = sessionStorage.getItem('openid');
            vm.menu = false;
            vm.loaded = 0;
            vm.identityData = identityData;
            //调用wx接口失败计数

            // //接口调用失败强制刷新页面（IOS，安卓暂无此情况）
            // $timeout(function () {
            //     // alert('test')
            //     wxServices.wxPort(['chooseImage','uploadImage']);
            //     wx.error(function (res) {
            //         $location.replace();
            //         // wxServices.wxPort(['chooseImage','uploadImage']);
            //         // if (!localSession.get('errorCount')) {
            //         //     localSession.set('errorCount', 1);
            //         //     // location.reload();
            //         //     wxServices.wxPort(['chooseImage', 'uploadImage']);
            //         // } else {
            //         //     $rootScope.showTips('签名无效，将无法上传头像');
            //         //     // $location.replace();
            //         // }
            //     })
            // },1000);

            getUser();
            //获取用户信息
            function getUser() {
                userService.userDetail().then(function (res) {
                    if(res.data.code===0){
                        vm.identityDetail = res.data.data
                    }else {
                        $rootScope.showTips(res.data.message);
                    }
                    vm.loaded++;
                })
            }

            vm.saveChange = function () {
                if (/^[A-Za-z]/.test(vm.identityDetail.alias) && vm.identityDetail.alias.length < 2 || !vm.identityDetail.alias || !/^[a-zA-Z\u4e00-\u9fa5]+$/g.test(vm.identityDetail.alias)) {
                    $rootScope.showTips('请输入不含特殊字符的正确名称')
                } else if (vm.identityDetail.alias) {
                    userService.userDetail(vm.identityDetail).then(function (res) {
                        if (res.data.code === 0) {
                            $rootScope.showTips('保存成功');
                            sessionStorage.removeItem('errorCount');
                            // $state.go('identity');
                            $location.path('/identity').replace();
                            // $state.go($state.current,{},{reload:true})
                            // getUser();
                        } else {
                            $rootScope.showTips(res.data.message)
                        }
                    })
                }

            }

            //调用相机、相册
            vm.useCamere = function () {
                if ($rootScope.mobile == "android") {
                   wxServices.wxPort(['getLocation','chooseImage','uploadImage','']);
                }


                // wx.ready(function () {
                $timeout(function () {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            uploadImg(localIds);
                        },
                        fail: function () {

                        }
                    });
                },1000);

            };

            //图片上传至微信服务器
            function uploadImg(localIds) {
                $timeout(function () {
                    wx.uploadImage({
                        localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            // res.serverId;// 返回图片的服务器端ID
                            wxServices.getMedia(res.serverId).then(function (res) {
                                if (res.data.code === 0) {
                                    vm.identityDetail.img = res.data.data.url;
                                } else {
                                    $rootScope.showTips(res.data.message)
                                }
                            })
                        }
                    })
                }, 100)
            }
        }])