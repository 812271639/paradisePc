"use strict";
angular
  .module("admin")
  .controller("bannerDetailCtrl", function(
    $state,
    $rootScope,
    bannerService,
    commonUtil,
    bannerOptions,
    FileUploader,
    teachingService,
    courseService,
    taskManage
  ) {
    //初始化参数
    var vm = this;
    vm.id = $state.params.id;
    vm.params = {};
    vm.params.type = 1; //1代表新增banner；2代表新增帮助
    vm.lists = {}; //包含各种id的对象，用于渲染下拉框;
    vm.bannerOptions = bannerOptions;
    vm.show = -1; //控制下拉列表的显示和隐藏的参数
    //过滤参数，只保留上架的内容
    function statusFilter(b){
      var arr=[];
      angular.forEach(b,function(item){
          if(item.status==1){
            arr.push(item);
          }
      });
      return arr;
    }

    vm.getSubject = function(a) {
      vm.show = 0;
      var params = {
        gradeDept: a,
        size: 999999
      };
      teachingService.getSubjectList(params).then(function(res) {
        vm.bannerOptions.subject = statusFilter(res.data.data);
      });


    };
    vm.getLesson = function(a) {
      vm.show = 1;
      var params = {
        size: 999999
      };
      teachingService.getSpecial(a, params).then(function(res) {
        vm.bannerOptions.lesson = statusFilter(res.data.data);
      });
    };
    vm.getPeriod = function(a) {
      vm.show = 2;
      var params = {
        size: 999999
      };
      courseService.getCourse(params,a).then(function(res) {
        vm.bannerOptions.period = statusFilter(res.data.data);
        // vm.bannerOptions
      });
    };
    vm.getTask = function(a) {
      vm.show = 3;
      var params = {
        size: 999999
      };
      taskManage.getTaskList(a, params).then(function(res) {
        vm.bannerOptions.task = statusFilter(res.data.data);
        // vm.bannerOptions
      });
    };
    vm.getShow = function(a) {
      vm.show = 4;
    };
    //渲染下拉菜单进行请求的函数
    // function getList(a, b) {
    //   switch (a) {
    //     case 0:
    //       vm.params.gradeDept = b;
    //       vm.getSubject(b);
    //       break;
    //     case 1:
    //     vm.params.subjectId = b;
    //       vm.getLesson(b);
    //       break;
    //     case 2:
    //     vm.params.lessonId = b;
    //       vm.getPeriod(b);
    //       break;
    //     case 3:
    //     vm.params.periodId = b;
    //       vm.getTask(b);
    //       break;
    //     case 4:
    //     vm.params.taskId = b;
    //       break;
    //     default:
    //       console.log("textContent  Wrong");
    //   }
    // }
    // 如果有id，进行请求渲染列表
    if (vm.id) {
      bannerService.bannerDetail(vm.id).then(function(res) {
        if (res.data.code == 0) {
          vm.params = res.data.data.article;
          //如果是教材同步
          if (vm.params.bannerType == 2) {
            vm.lists = JSON.parse(vm.params.content);
            var arr = [];
            angular.forEach(vm.lists, function(value, key) {
              arr.push(value);
            });

            //渲染下拉菜单
            for (var i = 0; i < arr.length; i++) {
              getList(i, arr[i]);
            }
          }
        } else {
          commonUtil.showErrMsg(res);
        }
      });
      //如果没有id,进行参数处理
    } else {
    }

    //上传
    FileUploader.FileSelect.prototype.isEmptyAfterSelection = function() {
      return true;
    };
    vm.uploader = new FileUploader({
      url: "/a/u/img/article"
    });
    vm.uploader.onSuccessItem = function(fileItem, res, status, headers) {
      if (status == 200) {
        if (res.data.url === "") {
          res.data.url = "123";
        }
        vm.params.img = res.data.url;
      }
    };

    //图片格式验证
    vm.upload = function(item) {
      // console.log(item)
      if (item._file.type.indexOf("image") != -1) {
        item.upload();
      } else {
        $rootScope.alert("请上传图片");
      }
    };
    //删除图片
    vm.clearImg = function() {
      vm.params.img = "";
      vm.uploader.queue = [];
    };


      vm.uploaderApp = new FileUploader({
          url: "/a/u/img/article"
      });
      vm.uploaderApp.onSuccessItem = function (fileItem, res, status, headers) {
          if (status == 200) {
              if (res.data.url === '') {
                  res.data.url = '123';
              }
              vm.params.appImg = res.data.url
          }
      };
      //app图片格式验证
      vm.uploadApp = function (item) {
          if (item._file.type.indexOf('image') != -1) {
              item.upload();
          } else {
              $rootScope.alert("请上传图片")
          }
      };
      //app删除图片
      vm.clearImgApp = function () {
          vm.params.appImg = '';
          vm.uploaderApp.queue = [];
      };
    vm.back = function() {
      history.go(-1);
    };
    //取消
    vm.cancelUpdate = function() {
      $rootScope.alert("是否取消编辑banner内容", function() {
        history.go(-1);
      });
    };
    //保存之前对id数组进行处理,传入vm.show,返回最后一项选中的文本值;
    function setList(b) {
      function test(a) {
        return $("#option" + a + " option:selected").text();
      }
      var c;
      switch (b) {
        case 0:
          c = test(b);
          delete vm.lists.subjectId;
          delete vm.lists.lessonId;
          delete vm.lists.periodId;
          delete vm.lists.taskId;
          break;
        case 1:
          c = test(b);
          delete vm.lists.lessonId;
          delete vm.lists.periodId;
          delete vm.lists.taskId;
          break;
        case 2:
          c = test(b);
          delete vm.lists.periodId;
          delete vm.lists.taskId;
          break;
        case 3:
          c = test(b);
          delete vm.lists.taskId;
          break;
        case 4:
          c = test(b);
          break;
      }
      return c;
    }
    //保存
    vm.saveUpdate = function() {
      vm.params.url = setList(vm.show);
      if(vm.params.bannerType==2){
        vm.lists = {};
        vm.lists.gradeDept = vm.params.gradeDept;
        vm.lists.subjectId = vm.params.subjectId;
        vm.lists.lessonId = vm.params.lessonId;
        vm.lists.periodId = vm.params.periodId;
        vm.lists.taskId = vm.params.taskId;
        vm.params.content = JSON.stringify(vm.lists);
      }
      if(vm.params.bannerType==1){
        vm.params.url = vm.params.content
      }

      bannerService.bannerEdit(vm.id, vm.params).then(function(res) {
        if (res.data.code == 0) {
          $rootScope.alert(
            "banner内容保存成功",
            function() {
              history.go(-1);
            },
            true
          );
        } else {
          $rootScope.confirm(res.data.message);
        }
      });
    };
  });
