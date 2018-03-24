/**
 * Created by Master on 2017/5/1.
 */
'use strict';
angular.module('admin')
.controller('PostsListController', ['$state', '$scope', '$rootScope', 'commonUtil', 'postsService', 'postsOptions',
    function ($state, $scope, $rootScope, commonUtil, postsService, postsOptions) {
        var vm = this;
        var str='',status;
        vm.postsOptions = postsOptions;
        vm.params = $state.params;
        vm.params.minAt = +vm.params.minAt||'';
        vm.params.maxAt = +vm.params.maxAt||'';

        //获取帖子数量
        postsCount();
        function postsCount() {
            postsService.postsCount().then(function (res) {
                if(res.data.code===0){
                    vm.postsCount= res.data.data;
                }else {
                    $rootScope.alert(res.data.message||'网络或者接口出现问题','',true);
                }
            })
        }
        //获取帖子列表
        postsList();
        function postsList() {
            postsService.postsList(vm.params).then(function (res) {
                if(res.data.code===0){
                    vm.postsList = res.data.data;
                    vm.totalPage = res.data.totalPage;
                }else {
                    $rootScope.alert(res.data.message||'网络或者接口出现问题','',true);
                }
            })
        }
        //搜索
        vm.search = function () {
            vm.params.page = 1;
            //设置一天结束时间
            if (vm.params.maxAt){
                vm.params.maxAt=+vm.params.maxAt+86399999;
            }
            $state.go($state.current, vm.params, {reload: true});
        };

        //重置
        vm.rest = function () {
            commonUtil.restParms(vm.params);
            $state.go($state.current, vm.params, {reload: true});
        };

        //排序
        vm.sort = function (type) {
            if (type==1){
                vm.params.sort=vm.params.sort==1?2:1;
            }else {
                vm.params.sort=vm.params.sort==3?4:3;
            }
            vm.search();
        };

        //设置精华、取消精华
        vm.setDigest = function (item) {
            if(item.digest==1){
                str = '加精之后该帖会成为精华帖，是否确认加精？';
                status=2;
            }else {
                str = '取精之后该帖将不存在于精华帖中，是否确认取精？';
                status=1;
            }
            $rootScope.alert(str,function () {
                postsService.postsDigest(item.id).then(function (res) {
                    if (res.data.code==0){
                        item.digest=status;
                    }else {
                        $rootScope.alert(res.data.message||'网络或接口出现问题','',true);
                    }
                })
            })
        };
        //置顶与取消
        vm.setSticky = function (item) {
            if(item.sticky==1){
                str = '置顶此条帖子会将该部门最后一条置顶帖顶掉，确认置顶？';
                status=2;
            }else {
                str = '取消置顶之后该帖将不存在于置顶帖中，是否确认取消置顶？';
                status=1;
            }
            $rootScope.alert(str,function () {
                postsService.postsSticky(item.id).then(function (res) {
                    if (res.data.code==0){
                        item.sticky=status;
                        postsList();
                    }else {
                        $rootScope.alert(res.data.message||'网络或接口出现问题','',true);
                    }
                })
            })
        };
        //删除
        vm.delete = function (item) {
            $rootScope.alert('删除之后此条帖子会彻底消失，是否确认删除？',function () {
                postsService.postsDelete(item.id).then(function (res) {
                    if (res.data.code==0){
                        postsList();
                    }else {
                        $rootScope.alert(res.data.message||'网络或接口出现问题','',true);
                    }
                })
            })
        }
    }]);
