'use strict';
angular.module('admin', ['oc.lazyLoad', 'ui.router', 'ngCookies', 'mgcrea.ngStrap', 'dndLists','ui.bootstrap',
    'angular-loading-bar', 'ngMessages', 'angularFileUpload', 'meta.umeditor','ngAnimate','ngSanitize','color.picker'])

    .factory('adminInterceptor', adminInterceptor)
    .config(httpConfig)
    .config(projectRouteConfig)
    .config(lazyLoadConfig)
    .config(loadingBar)
    .run(function ($rootScope, $templateCache, $modal, $cookies, $state, $location, $timeout,memberService) {
        //默认分页参数
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams,memberService) {

            //默认分页参数
            if (toParams.page == undefined) {
                toParams.page = toParams.page || 1;
            }
            if (toParams.size == undefined) {
                toParams.size = toParams.size || 10;
            }
        });


        $rootScope.nowDate = new Date();
        $rootScope.isLogin = function () {
            return !!$cookies.login;
        };
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (!$rootScope.isLogin() && $location.path() !== "/login") {
                $state.go("login");
                return false;
            }
            if ($rootScope.isLogin() && $location.path() === "/login") {
                $state.go("field.dashboard");
                return false;
            }

        });

        $rootScope.$on('$viewContentLoading', function (event) {
            console.log('视图开始加载');
        });
        $rootScope.$on('$viewContentLoaded', function (event) {
            console.log('视图渲染完毕');
        });

        $rootScope.textAlert = function () {
            $rootScope.textContent = {
                content:'',
                open:false
            }
        }
        $rootScope.textAlert();

        //alert confirm notify
        $rootScope.alert = function (content, okFn, hideBtn) {
	        var modal = $modal({
		        html: true,
		        show: false,
		        animation:'am-fade-and-slide-top',
		        templateUrl: '../views/template/grounding-alert.html',
		        controller: function ($scope) {
			        $scope.hideBtn = !hideBtn;
			        $scope.content = content;
			        $scope.ok = function () {
				        typeof okFn == 'function' && okFn();
				        modal.$promise.then(modal.hide);
			        };
			        $scope.off = function () {
				        modal.$promise.then(modal.hide);
			        }
		        }
	        });
            modal.$promise.then(modal.show);
        };
        $rootScope.ChangeScore = function (id) {
            var modal = $modal({
                html: true,
                show: false,
                animation:'am-fade-and-slide-top',
                templateUrl: '../views/template/grounding-ChangeScore.html',
                controller: function ($scope) {
                    $scope.changeScore = function (num) {
                        memberService.addScore(id, {type:num,score:$scope.score}).then(function(res) {
                            if (res.data.code == 0) {
                                modal.$promise.then(modal.hide);
                                var message;
                                num==0?message="逆袭豆扣除成功":message="逆袭豆充值成功";
                                $rootScope.alert(message,function () {
                                    $state.go("field.userDetail",{},{reload:true})
                                },true)
                            } else {
                                modal.$promise.then(modal.hide);
                                $rootScope.alert(res.data.code)
                            }
                        });
                    };
                    $scope.off = function () {
                        modal.$promise.then(modal.hide);
                    }
                }
            });
            modal.$promise.then(modal.show);
        };
        $rootScope.confirm = function (content, okFn, cancelFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: 'views/template/ptteng-confirm-0.0.1.html',
                controller: function ($scope) {
                    $scope.content = content;
                    $scope.ok = function () {
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                    $scope.cancel = function ($scope) {
                        typeof cancelFn == 'function' && cancelFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };

        // 按组合键时新页面打开功能
        $rootScope.navigate = function ($event, to, params) {

            if ($event.metaKey) {
                var url = $state.href(to, params, {absolute: true});
                window.open(url, '_blank');

            } else {
                $state.go(to, params);
            }

        };

    })

    .directive('compile', function ($compile) {
        // directive factory creates a link function
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
                function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);
                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        }
    })
;
angular.module('admin').directive('simpleUpload', function (uploadFileCustomerService, $rootScope) {

    return {
        restrict: 'AE',
        scope: {
            string: '@',//string
            ngModel: '=',
            accept: '@'
        },
        require: 'ngModel',
        template: '' +
        '<div class="uploader-box2" ng-click="triggerSelect()" ng-if="isAudio2" ><span  style="line-height: 40px;width: 100%;text-align: center;display: inline-block">上传音频</span>' +
        //'<img ng-if="img && isImg" ng-src="{{img}}" />'+
        '<audio style="margin-top: 30px" ng-if=" isAudio2"  src=" {{img | urlFilter}} " ng-src="{{img}}" controls="controls" ></audio>' +
        '<span ng-if="uploadStatus">上传中...</span>' +
        //'<p ng-if="!img">点击上传音频</p>'+
        '</div>' +


        '<div class="uploader-box2" ng-click="triggerSelect()" ng-if="isAudio" ><span  style="line-height: 40px;width: 100%;text-align: center;display: inline-block">上传音频</span>' +
        //'<img ng-if="img && isImg" ng-src="{{img}}" />'+
        '<audio style="margin-top: 30px" ng-if=" isAudio"  src=" {{img | urlFilter}} " ng-src="{{img}}" controls="controls" ></audio>' +
        '<span ng-if="uploadStatus">上传中...</span>' +
        //'<p ng-if="!img">点击上传音频</p>'+
        '</div>' +


        '<div class="uploader-box" ng-click="triggerSelect()" ng-if="isImg"  >' +
        '<img ng-if="img && isImg" ng-src="{{img}}" style="width: 200px"/>' +

        //'<audio style="margin-left: 300px" ng-if="isAudio"  src=" {{img | urlFilter}} " ng-src="{{img}}" controls="controls"></audio>'+
        '<span ng-if="uploadStatus">上传中...</span>' +
        '<p ng-if="!img">点击上传图片</p>' +
        '</div>' +
        '<input class="hidden" type="file" id="fileInput" accept="{{accept}}" onchange="angular.element(this).scope().uploadFile(this.files);">' +
        '',
        link: function (scope, element, attrs, ctrl) {

            // 是否处于上传中状态
            scope.uploadStatus = false;
            scope.isImg = (scope.string == "img");
            scope.isAudio = (scope.string == "music");
            scope.isAudio2 = (scope.string == "music2");
            scope.img = attrs.url;

            // 点击div触发input:file
            scope.triggerSelect = function () {
                if (eval(attrs.disabled)) return;
                element.children('input[type=file]').trigger('click');
            };


            // 上传
            scope.uploadFile = function (files) {
                var file = files[0];
                $('#fileInput').val('');

                var str = scope.string == 'img' ? 'image' : 'audio';

                if (file.type.indexOf(str) == -1) {
                    $rootScope.alert("请选择正确的格式");
                    return;
                }
                var fd = new FormData();
                fd.append("file", file);

                scope.uploadStatus = true;

                uploadFileCustomerService.uploadFile(fd).then(function (res) {
                    scope.img = res.data.data.url;
                    scope.uploadStatus = false;
                    ctrl.$setViewValue(scope.img);
                });
            };


        },
        controller: function ($scope, $element, $attrs) {

        }
    }
});
// Set lazy load module
function lazyLoadConfig($ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        modules: [
            {
                name: 'angularFileUpload',
                files: [
                    'vendor/angular-file-upload/angular-file-upload.min.js',
                    'js/directives/ptteng-uploadThumb/ptteng-uploadThumb-0.0.1.js'
                ]
            },
            {
                name: 'summernote',
                files: [
                    'vendor/summernote/summernote.js',
                    'vendor/summernote/summernote.css',
                    'vendor/summernote/summernote-bs3.css',
                    'vendor/angular-summernote/angular-summernote.js'
                ]
            },
            {
                name: 'datepicker',
                files: [
                    'js/directives/datepicker/datepicker.css',
                    'js/directives/datepicker/datepicker.js'
                ]
            },
            {
                name: 'dndLists',
                files: [
                    'vendor/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js'
                ]
            }
        ]
    });
}

// Loader
function loadingBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 200;
    cfpLoadingBarProvider.includeSpinner = false;
}


function httpConfig($httpProvider) {
    // Set x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


    // Set up global transformRequest function
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
    // 拦截器
    $httpProvider.interceptors.push('adminInterceptor');

}


function adminInterceptor() {
    return {
        request: function (config) {
            return config;
        },

        requestError: function (config) {
            return config;
        },

        response: function (res) {
            return res;
        },

        responseError: function (res) {
            return res;
        }
    }
}


