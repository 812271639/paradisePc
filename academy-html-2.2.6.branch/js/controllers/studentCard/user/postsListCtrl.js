/**
 * Created by Master on 2017/4/30.
 */
'use strict';
angular.module('paradiseApp')
    .controller('PostsListController', ['$state', 'commonUnit','messageBoardService','$rootScope',
        function ($state, commonUnit,messageBoardService,$rootScope) {
        var vm = this;
        vm.id =$state.params.userId;
        var page=1;
        vm.loaded = 0;
        vm.postsList = [];
        vm.myId = commonUnit.session('userDetail').id;
        if(vm.id){
            vm.currentUser=(vm.id==vm.myId);
        }else {
            vm.currentUser=true;
        }
        //下拉加载
        vm.loadMore=function () {
            if(vm.nextPage){
                vm.loading=true;
                page++;
                postsList();
            }else {
                return false;
            }
        };
        //获取用户帖子
        postsList();
        function postsList() {
            messageBoardService.postsUserList(vm.id,{page:page}).then(function (res) {
                if (res.data.code===0){
                    vm.postsList = vm.postsList.concat(res.data.data);
                    vm.nextPage = res.data.next;
                }else {
                    $rootScope.showTips(res.data.message);
                }
                vm.loaded++;
            })
        }
        vm.messageBoardDetail = function (item) {
            commonUnit.session('yScroll', $('.page-wrap').scrollTop());
            $state.go('messageBoardDetail', {id: item.id});
        }
        vm.back = function () {
            history.go(-1);
        }
    }]);
