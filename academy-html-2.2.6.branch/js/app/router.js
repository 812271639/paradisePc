/**
 * Created by Master on 2017/2/23.
 */

angular.module('paradiseApp', ['ui.router', 'oc.lazyLoad'/*,'angular-carousel'*/])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $ocLazyLoadProvider) {
        // var _lazyLoad=function ($ocLazyLoad) {
        //     return function (fileList) {
        //      return   $ocLazyLoad.load(fileList)
        //     }
        // };
        //设置版本
        var version = "2.0.0";
        serVersion(version);
        //路由
        $urlRouterProvider.otherwise('/map');
        $stateProvider
            .state('map', {
                url: '/map?videogo&quit',
                templateUrl: 'views/firstMap/map.html?ver=' + version,
                controller: 'signinController as vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/firstMap/signinCtrl.js?ver=' + version,
                            'js/directives/calendar/calendar.js?ver=' + version,
                            'js/directives/calendar/calendar.css?ver=' + version,
                            'js/directives/announcement/announcement.js?ver=' + version,
                            'js/directives/announcement/announcement.css?ver=' + version
                        ])
                    }
                }
            })

            /**********学生证***********/
            .state('identity', {
                url: '/identity?userId',
                templateUrl: 'views/studentCard/identity.html?ver=' + version,
                controller: 'IdentityController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/studentCard/identityCtrl.js?ver=' + version
                        ])
                    }
                }
            })
            .state('identityEdit', {
                url: '/identityEdit?',
                templateUrl: 'views/studentCard/identityEdit.html?ver=' + version,
                controller: 'IdentityEditController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/studentCard/IdentityEditCtrl.js?ver=' + version,
                            'styles/mobiscroll.min.css?ver=' + version,
                            'libs/mobiscroll.min.js?ver=' + version
                        ])
                    }
                }
            })

            //收藏
            .state('collection', {
                abstract: true,
                url: '/collection',
                templateUrl: 'views/studentCard/identityCollection.html?ver=' + version,
                controller: 'IdentityCollectionController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/studentCard/identityCtrl.js?ver=' + version
                        ])
                    }
                }
            })
            //收藏文章
            .state('collection.article', {
                url: '/article?userId',
                templateUrl: 'views/studentCard/user/CollectionArticle.html?ver=' + version,
                controller: 'CollectionArticleController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/studentCard/Collection/CollectionArticleCtrl.js?ver=' + version
                        ])
                    }
                }
            })
            //收藏视频
            .state('collection.video', {
                url: '/video?userId&videogo',
                templateUrl: 'views/video/video.html?ver=' + version,
                controller: 'CollectionVideoController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/studentCard/Collection/CollectionVideoCtrl.js?ver=' + version
                        ])
                    }
                }
            })
            //绑定
            .state('binding', {
                url: '/binding?type&both',
                templateUrl: 'views/studentCard/identityBinding.html?ver=' + version,
                controller: 'BindingController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/studentCard/Binding/BindingCtrl.js?ver=' + version
                        ])
                    }
                }
            })

            .state('bound', {
                url: '/bound',
                templateUrl: 'views/studentCard/bound.html?ver=' + version,
                controller: 'BoundController as vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/studentCard/Binding/boundCtrl.js?ver=' + version)
                    }
                }
            })
            .state('postsList', {
                url: '/postsList?userId',
                templateUrl: 'views/studentCard/user/postsList.html?ver=' + version,
                controller: 'PostsListController as vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controllers/studentCard/user/postsListCtrl.js?ver=' + version)
                    }
                }
            })


            /*************文学部**************/
            .state('article', {
                url: '/article',
                templateUrl: 'views/article/article.html?ver=' + version,
                controller: 'ArticleController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/article/articleCtrl.js?ver=' + version
                        ])
                    }
                }
            })
            .state('articleDetail', {
                url: '/articleDetail?id',
                templateUrl: 'views/article/articleDetail.html?ver=' + version,
                controller: 'ArticleDetailController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/article/ArticleDetailCtrl.js?ver=' + version
                        ])
                    }
                }
            })

            /*************影像部**************/
            .state('video', {
                url: '/video',
                templateUrl: 'views/video/video.html?ver=' + version,
                controller: 'VideoController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/video/videoCtrl.js?ver=' + version
                        ])
                    }
                }
            })
            .state('videoDetail', {
                url: '/videoDetail?id',
                templateUrl: 'views/video/videoDetail.html?ver=' + version,
                controller: 'VideoDetailController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/video/VideoDetailCtrl.js?ver=' + version
                            // 'libs/Video.js5.16/css/video-js.min.css',
                            // 'libs/Video.js5.16/js/video.min.js',
                        ])
                    }
                }
            })
            /*留言板列表*/
            .state('messageBoardList', {
                url: '/messageBoardList?grade&type&page',
                templateUrl: 'views/messageBoard/messageBoardList.html?ver=' + version,
                controller: 'MessageBoardListController as vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/messageBoard/messageBoardListCtrl.js?ver=' + version
                        ])
                    }
                }
            })
            .state('messageBoardDetail', {
                url: '/messageBoardDetail?id&grade&uid',
                templateUrl: 'views/messageBoard/messageBoardDetail.html?ver=' + version,
                controller: 'MessageBoardDetailController as vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/messageBoard/messageBoardDetailCtrl.js?ver=' + version,

                            // 'js/directives/edit/edit.css',
                        ])
                    }
                },
                // onExit:function () {
                //     window.removeEventListener("popstate");
                // }
            })
            .state('messageBoardAdd', {
                url: '/messageBoardAdd?grade',
                templateUrl: 'views/messageBoard/messageBoardAdd.html?ver=' + version,
                controller: 'MessageBoardAddController as vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/messageBoard/messageBoardAddCtrl.js?ver=' + version,
                            // 'js/directives/edit/edit.js',
                            // 'js/directives/edit/edit.css',
                        ])
                    }
                }
            })

            /*树洞*/
            .state('treeHole', {
                url: '/treeHole?type',
                templateUrl: 'views/treeHole/treeHole.html?ver=' + version,
                controller: 'TreeHoleController as vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/treeHole/TreeHoleCtrl.js?ver=' + version,
                            // 'js/directives/switch/switch.js',
                            'js/directives/switch/switch.css'
                        ])
                    }
                }
            })
            .state('treeHoleWelcome', {
                url: '/treeHoleWelcome',
                templateUrl: 'views/treeHole/treeHoleWelcome.html?ver=' + version,
                controller: function ($scope, $location, commonUnit, $state) {
                    $scope.jump = function () {
                        $location.path('/treeHole').replace();
                    }
                    // if (!commonUnit.session('welcome')) {
                    //
                    //     commonUnit.session('welcome', true);
                    // } else {
                    //     history.go(-1);
                    // }
                },
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/treeHole/TreeHoleCtrl.js?ver=' + version
                        ])
                    }
                }
            })
            /*树叶*/
            .state('leaves', {
                url: '/leaves?type',
                templateUrl: 'views/treeHole/leaves.html?ver=' + version,
                controller: 'LeavesController as vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/treeHole/LeavesCtrl.js?ver=' + version,
                        ])
                    }
                }
            })
            //购买会员
            .state('buyMember', {
                url: '/buyMember?id',
                templateUrl: 'views/studentCard/member/buyMember.html?ver=' + version,
                controller: 'BuyMemberController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/studentCard/member/buyMember.js?ver=' + version
                        ])
                    }
                }
            })
            //卡劵
            .state('card', {
                url: '/card',
                templateUrl: 'views/studentCard/member/card.html?ver=' + version,
                controller: 'CardController',
                controllerAs: 'vm',
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/studentCard/member/card.js?ver=' + version
                        ])
                    }
                }
            })

            .state('playground', {
                url: '/playground',
                templateUrl: 'views/playground/playground.html?ver=' + version
                // controller: 'VideoDetailController',
                // controllerAs: 'vm',
                // resolve: {
                //     loadFile: function ($ocLazyLoad) {
                //         return $ocLazyLoad.load([
                //             'js/controllers/video/videoCtrl.js',
                //             // 'libs/Video.js5.16/css/video-js.min.css',
                //             // 'libs/Video.js5.16/js/video.min.js',
                //         ])
                //     }
                // }
            })
            .state('canteen', {
                url: '/canteen',
                templateUrl: 'views/canteen/canteen.html?ver=' + version
                // controller: 'VideoDetailController',
                // controllerAs: 'vm',
                // resolve: {
                //     loadFile: function ($ocLazyLoad) {
                //         return $ocLazyLoad.load([
                //             'js/controllers/video/videoCtrl.js',
                //             // 'libs/Video.js5.16/css/video-js.min.css',
                //             // 'libs/Video.js5.16/js/video.min.js',
                //         ])
                //     }
                // }
            })
            .state('dormitory', {
                url: '/dormitory',
                templateUrl: 'views/dormitory/dormitory.html?ver=' + version
                // controller: 'VideoDetailController',
                // controllerAs: 'vm',
                // resolve: {
                //     loadFile: function ($ocLazyLoad) {
                //         return $ocLazyLoad.load([
                //             'js/controllers/video/videoCtrl.js',
                //             // 'libs/Video.js5.16/css/video-js.min.css',
                //             // 'libs/Video.js5.16/js/video.min.js',
                //         ])
                //     }
                // }
            });


        // $httpProvider.interceptors.push('onLoading');
        //默认请求头、参数转化
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = function (data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };

        function serVersion(v) {
            //css部分
            var head = document.getElementsByTagName("head")[0];
            // var body = document.getElementsByTagName("body")[0];
            var styleList = ["public", "Main", "module"],
                scriptList = [
                    "service/AjaxService",
                    "app/appRun",
                    "constants/constants",
                    "service/ajaxAddress",
                    "service/services",
                    "filters/filters",
                    "/directives/directives"];
            for (var i = 0, len = styleList.length; i < len; i++) {
                var tag = document.createElement("link");
                tag.href = "styles/" + styleList[i] + ".css?ver=" + v;
                tag.rel = "stylesheet";
                head.appendChild(tag);
            }
            // //js部分
            // for (var j=0,len = scriptList.length;j<len;j++) {
            //     var script = document.createElement("script");
            //     script.src = "js/" + scriptList[j] + ".js?ver="+v;
            //     body.appendChild(script);
            // }
            // $rootScope.$apply();
        }
    })
