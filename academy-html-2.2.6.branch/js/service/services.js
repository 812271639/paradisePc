/**
 * Created by Master on 2017/3/1.
 */
'use strict'
angular.module('paradiseApp')
  //拦截器加载动画
  .factory('onLoading', ['$rootScope', function($rootScope) {
    var OnLoading = {
      request: function(config) {
        $rootScope.loading = true;
        return config;
      },
      responseError: function(res) {
        $rootScope.loading = false;
        return res
      },
      response: function(res) {
        $rootScope.loading = false;
        return res;
      }
    }
    return OnLoading
  }])

  //url参数存取操作
  .factory('urlParams', function($location) {
    return function(n, v) {
      return v ? $location.search({
        n: v
      }) : $location.search()[n]
    }
  })
  //参数暂时存储sission
  .factory('localSession', ['$window',function($window) {
    return {
      set: function(key, value) {
        return sessionStorage.setItem(key, JSON.stringify(value))
      },
      get: function(key) {
        return JSON.parse(sessionStorage.getItem(key))
      },
      setObject: function(key, value) { //存储对象，以JSON格式存储
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) { //读取对象
        return JSON.parse($window.localStorage[key] || '{}');
      },
    }
  }])
  //绑定手机、邮箱页面弹窗提示
  .factory('bindAleat', function($timeout, $rootScope) {
    return function(msg) {
      $timeout.cancel($rootScope.timer);
      $('.dialog-mid').fadeIn().text(msg)
      $rootScope.timer = $timeout(function() {
        $('.dialog-mid').fadeOut()
      }, 3000)
    }
  })
  //
  .factory('paramsService', function() {
    var obj = {};
    return {

      set: function(params) {
        obj = params
      },
      get: function() {
        return obj
      },
    }
  })


  .factory('commonUnit', function($rootScope, $filter) {
    return {
      ajaxStatus: function(res) {
        if (res.data.code === 0) {
          return res.data.data;
        } else if (!!res.data.code) {
          $rootScope.showTips(res.data.code);
          return false;
        } else {
          $rootScope.showTips('请检查网络连接')
          return false;
        }
      },
      session: function(key, value) {
        if (angular.isArray(key)) {
          return angular.forEach(key, function(item) {
            return remove(item);
          })
        } else if (!key) {
          return clear();
        } else {
          return value || value === '' || value === 0 ? set() : get();
        }

        function set() {
          return sessionStorage.setItem(key, JSON.stringify(value))
        }

        function get() {
          return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : false;
        }

        function clear() {
          return sessionStorage.clear();
        }

        function remove(key) {
          return sessionStorage.removeItem(key)
        }
      },
      //判断年级类型
      gradeType: function(grade) {
        return grade < 4 || grade == 7 ? 1 : 2;
      },
      //匹配图片src
      imgSRC: function(str) {
        var srcArr = [];
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=['"]?([^'"]*)['"]?/i;
        var arr = str.match(imgReg);
        for (var i = 0; i < arr.length; i++) {
          srcArr.push(arr[i].match(srcReg));
        }
        return srcArr;
      },
      firstSrc: function(str, src) {
        var firstSrc;
        if (src.length > 0) {
          var idx = [];
          var min;
          for (var i = 0; i < src.length; i++) {
            idx[i] = {
              src: src[i],
              idx: str.indexOf(src[i])
            };
          };
          firstSrc = $filter('orderBy')(idx, 'idx')[0];
          return firstSrc.src;
        } else {
          return '';
        }
      }
    }
  })
