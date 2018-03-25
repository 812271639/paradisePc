/**
 * Created by Master on 2017/2/24.
 */
angular.module('paradiseApp')
  .controller('signinController', ['signinData', 'userService', 'localSession', '$state', '$filter', '$rootScope', '$interval', '$timeout', 'commonUnit', 'human', 'messageBoardService',
    function(signinData, userService, localSession, $state, $filter, $rootScope, $interval, $timeout, commonUnit, human, messageBoardService) {
      var vm = this;
      var time = new Date();
      vm.today = time.getDate();
      vm.isSigned = false;
      vm.signinData = signinData;
      vm.human = human;
      vm.character = 5;
      vm.loaded = 0;

      //等待登录
      vm.timer = $interval(function() {
        if ($rootScope.logined) {
          $interval.cancel(vm.timer);
          getUserDetail();
          getSignDetail();
            $rootScope.wxShare();
          if (!!$state.params.videogo) {
            $rootScope.video = true;
            $state.go('video')
          }
        }
      }, 200);

      //用户详情
      function getUserDetail() {
        userService.userDetail().then(function(res) {
          if (res.data.code === 0) {
            vm.userDetail = res.data.data;
              if (!res.data.data.mobile && !res.data.data.mail){
                  $rootScope.dialog = {
                      status: true,
                      text: '请绑定手机或者邮箱 ',
                      action: function () {
                          $state.go("binding",{both:'true',type:'mobile'});
                          this.status = false;
                      },
                      cancle: false
                  }

              }
            commonUnit.session('userDetail', vm.userDetail);
          } else {
            $rootScope.showTips(res.data.message);
          }
          vm.loaded++;
        })
      }

      //获取签到信息
      function getSignDetail() {
        userService.signDetail(time.getFullYear(), time.getMonth() + 1).then(function(res) {
          if (res.data.code === 0) {
            vm.signDetail = res.data.data;
            vm.signTotal = res.data.data.signTotal;
            vm.signed = $filter('valueArr')(vm.signDetail.androidDayList);
            // console.log(vm.isSigned || !!vm.signDetail.webDayList[vm.today - 1].sign)
          } else {
            $rootScope.showTips(res.data.message)
          }
          vm.loaded++;
        })
      }

      //签到
      vm.signIn = function() {
        vm.isSigned = true;
        vm.show = true;
        vm.signMenu = false;
        return userService.sign().then(function(res) {
          if (res.data.code === 0) {
            vm.score = res.data.data.score;
            $timeout(function() {
              vm.signSuccess = false;
            }, 3000)
            vm.signSuccess = true;
            getUserDetail();
            getSignDetail();
          } else {
            $rootScope.showTips(res.data.message)
          }
          getUserDetail();

          return res.data.code;
        })
      };
      //关闭公告
      vm.closeBlletin = function() {
        $("#bulletin-box").hide();
        $("#nav-sign-menu").show();
        vm.userDetail.isRead = 2;
      };
      //人物对话
      vm.choose = function(num) {
        vm.character = num;
      };
      //监控返回
      // window.addEventListener("popstate", function(e) {
      //   wx.closeWindow();
      // }, false);
    }
  ])
