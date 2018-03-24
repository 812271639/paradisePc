/**
 * Created by Master on 2017/5/1.
 */
'use strict';
angular.module('admin')
.controller('PostsDetailController', ['$state', '$scope', '$rootScope', 'commonUtil', 'postsService','$location',
    function ($state, $scope, $rootScope, commonUtil, postsService,$location) {
        var vm = this;
        vm.params=$state.params;
        vm.currentPage=+$location.hash();
        //获取帖子详情
        postsDetail();
        function postsDetail() {
            postsService.postsDetail(vm.params.id).then(function (res) {
                if(res.data.code==0){
                    vm.postsDetail=res.data.data;
                }else {
                    $rootScope.alert(res.data.message||'网络或帖子接口出现问题','',true);
                }
            })
        }
        //获取回帖列表
        vm.pageChange = postsReplyList;
        postsReplyList();
        function postsReplyList(page) {
            $location.hash(page);
            postsService.postsReply(vm.params.id,{page:$location.hash()||1}).then(function (res) {
                if (res.data.code===0){
                    vm.replyList = res.data.data;
                    vm.totalPage=res.data.totalPage;
                }else {
                    $rootScope.alert(res.data.message||'网络或回帖接口出现问题','',true);
                }
            })
        }
        //评论删除
        vm.delete = function (item) {
            $rootScope.alert('确认删除？',function () {
                postsService.postsReplyDelete(item.id).then(function (res) {
                    if(res.data.code===0){
                        item.content='';
                    }else {
                        $rootScope.alert(res.data.message||'网络或删除接口出现问题','',true);
                    }
                })
            })
        }

    }]);
