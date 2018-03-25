/**
 * Created by Master on 2017/3/3.
 */
'use strict'
angular.module('paradiseApp')
  ////////////
  //视频列表
  ////////////
  .controller('VideoController', ['$scope', 'videoService', '$rootScope', '$state', 'paramsService', 'userService', 'localSession', '$timeout',
    function($scope, videoService, $rootScope, $state, paramsService, userService, localSession, $timeout) {
      var vm = this;
      //监控返回键，从视频入口返回主页
      // window.addEventListener("popstate", function(e) {
      //   $state.go('map')
      // }, false);
      //
      // $(function() {
      //   var bool = false;
      //   setTimeout(function() {
      //     bool = true;
      //   }, 1000);
      //
      //
      //   function pushHistory() {
      //     var state = {
      //       title: "title",
      //       url: "#"
      //     };
      //     window.history.pushState(state, "title", "#");
      //   }
      // });
      // document.addEventListener(“backbutton”, onBackKeyDown, false);
      //
      // function onBackKeyDown() {
      //   // 获取当前view
      //   var currentView = myApp.getCurrentView();
      //   if (currentView.history.length > 1) {
      //     currentView.router.back({}); //非首页返回上一级
      //   } else {
      //     navigator.app.exitApp(); //首页点返回键退出应用
      //   }
      //
      // }
      window.addEventListener("popstate", function(e) {
        if(!!$rootScope.video){
          $rootScope.video=null;
          wx.closeWindow();
        }
      }, false);

      var params;
      var bannerParams;
      vm.loaded = 0;
      var userDetail = localSession.get('userDetail');
      vm.video = {
        size: 10,
        page: 1,
        grade: '',
        subject: localSession.get('subject') || '',
        type: 2
      };
      //用户详细信息
      // userService.userDetail().then(function (res) {
      //     userDetail = res.data.data
      // })
      //获取设置的年级信息
      if (localSession.get('grade')) {
        vm.video.grade = localSession.get('grade');
        getvideoList(vm.video); //获取视频
      } else {
        userService.userDetail().then(function(res) {
          userDetail = res.data.data;

          vm.video.grade = userDetail.grade == 7 || userDetail.grade == '' ? '' : userDetail.grade;
          getvideoList(vm.video); //获取视频
        })
      }
      subjectList(); //获取科目

      vm.videoList = [];
      //加载更多
      vm.more = getvideoList;
      //筛选搜索
      vm.getData = function() {
        vm.loaded = 0;
        params = paramsService.get();
        vm.video.page = 1;
        vm.loading = true;
        return getvideoList(params);

      }

      //获取视频列表
      function getvideoList(data) {
        // vm.loading=true;
        params = data || vm.video;
        bannerParams = angular.copy(params);
        data ? banrerList(bannerParams) : false;
        //card视频
        params.type = 2;
        return videoService.getVideoList(params).then(function(res) {
          if (res.data.code == 0) {
            if (data) {
              vm.videoList = [];
              vm.videoList = vm.videoList.concat(res.data.data);
              vm.notfound = vm.videoList.length == 0;
              vm.video.page++;
              vm.loading = false;
            } else {
              vm.videoList = vm.videoList.concat(res.data.data);
              vm.notfound = vm.videoList.length == 0;
              vm.video.page++;
              vm.loading = false;
            }
          } else {
            vm.loading = false;
            vm.notfound = true;
          }
          vm.loaded++;
          //这里后台返回为size和total
          return vm.nextPage = res.data.next;
        })
      }

      //banner视频
      function banrerList(params) {
        params.type = 1;
        vm.reload = false;
        videoService.getVideoList(params).then(function(res) {
          if (res.data.code === 0) {
            vm.bannerList = res.data.data;
            //重置轮播
            $timeout(function() {
              vm.reload = true
            })
          } else {
            $rootScope.showTips(res.data.message)
          }
          vm.loaded++;
        });
      }

      //科目
      function subjectList() {
        videoService.getSubjectList().then(function(res) {
          if (res.data.code == 0) {
            vm.subjectList = res.data.data;
            vm.subjectList.push({
              id: '',
              name: '全部',
              haveVideo: 1
            })
          }
        })
      }
    }
  ])
