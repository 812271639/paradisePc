/**
 * Created by Master on 2017/4/24.
 */
'use strict';
angular.module('paradiseApp')
    .controller('MessageBoardListController', ['messageBoardService', 'commonUnit', '$state', '$log', '$timeout','$rootScope',
        function (messageBoardService, commonUnit, $state, $log, $timeout,$rootScope) {
        var vm = this;
        var user = commonUnit.session('userDetail');
        var grade = commonUnit.session('currentPage');
        var postListType = commonUnit.session('postListType');
        vm.loading=false;
        vm.loaded = 0;
        //默认初中、所有帖子
        vm.params = {grade: user.grade || 1, type: commonUnit.session('postListType') || 2};

        vm.params.grade = grade || commonUnit.gradeType(user.grade);

        //
        // getPostsList()
        //年级类型切换 1初中 2高中
        vm.changeGrade = function (num) {
            vm.nextPage=true;
            commonUnit.session('currentPage', num);
            vm.params.grade = num;
            commonUnit.session('yScroll', 0);
            vm.params.type = 2;
            reloadPosts();
            postsSticky();
            // $state.go($state.current,vm.params,{relade:true}).replace()
        };
        //1精华 2所有
        //精华帖所有帖切换
        vm.changePage = function (num) {
            vm.nextPage=true;
            commonUnit.session('postListType', num);
            vm.params.type = num;
            reloadPosts();
        };
        vm.messageBoardDetail = function (item) {
            commonUnit.session('yScroll', $('.page-wrap').scrollTop());
            $state.go('messageBoardDetail', {id: item.id, grade: vm.params.grade,uid:item.uid});
        };

        //获取置顶帖
        postsSticky();
        function postsSticky() {
            messageBoardService.postsSticky({grade:vm.params.grade}).then(function (res) {
                if (res.data.code===0){
                    vm.postsStickyList = res.data.data;
                    vm.loaded++;
                }else {
                    $rootScope.showTips(res.data.message);
                }
            })
        }

        //刷新或者更改条件时加载
        reloadPosts();
        function reloadPosts() {
            vm.postsList=[];
            vm.params.page=1;
            getPostsList();
        }
        //下拉加载
        vm.loadMore=function () {
            if(vm.nextPage){
                vm.loading=true;
                vm.params.page++;
                getPostsList();
            }else {
                return false;
            }
        };

        //获取帖子列表
        function getPostsList(type) {
            vm.params.type==1?postsDigest(type):postsCommon(type);
        }

        //获取精华帖
        function postsDigest(type) {
            messageBoardService.postsDigest({grade:vm.params.grade,page:vm.params.page}).then(function (res) {
                if (res.data.code===0){
                    vm.postsList = vm.postsList.concat(res.data.data);
                    vm.nextPage = res.data.next;
                }else {
                    $rootScope.showTips(res.data.message);
                }
                vm.loading=false;
                vm.loaded++;
            })
        }
        //获取普通帖
        function postsCommon(type) {
            messageBoardService.postsList({grade:vm.params.grade,page:vm.params.page}).then(function (res) {
                if (res.data.code===0){
                    vm.postsList = vm.postsList.concat(res.data.data);
                    vm.nextPage = res.data.next;
                }else {
                    $rootScope.showTips(res.data.message);
                }
                vm.loading=false;
                vm.loaded++
            })
        }
        


        //设置滚动位置
        $timeout(function () {
            $('.page-wrap').scrollTop(commonUnit.session('yScroll'))
        });
        $log.debug(history)
    }]);
