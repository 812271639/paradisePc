'use strict';

function projectRouteConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
    var _lazyLoad = function(loaded) {
        return function($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, { serie: true });
        }
    };

    $ocLazyLoadProvider.config({ debug: false, events: true });
    //更改url格式配置为html5，去掉#号;
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('field', {
        url: '',
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
        resolve: {
            loadMyFile: _lazyLoad(['js/controllers/admin/mainController.js', 'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.js', 'js/directives/ptteng-user/ptteng-user-0.0.1.js', 'js/directives/options/options.js', 'js/directives/communityDirectives.js'])
        }
    }).state('field.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html'
    })

    //登录
    .state('login', {
        url: '/login',
        templateUrl: 'views/admin/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _lazyLoad('js/controllers/admin/loginController.js')
        }
    })

    /*************
     * 内容管理
     * *******************/

    //文章管理
    .state('field.articleList', {
        url: '/articleList?page&size&type&title&author&status&minLike&maxLike&maxCollection&minCollection',
        templateUrl: 'views/article/article.html',
        controller: 'ArticleController',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _lazyLoad(['js/controllers/article/articleController.js'])
        }
    }).state('field.articleDetail', {
        url: '/articleDetail?id&disabled',
        templateUrl: 'views/article/articleDetail.html',
        controller: 'ArticleDetailCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _lazyLoad(['js/controllers/article/articleDetailController.js', 'js/directives/fps-upload/upload.js', 'vendor/umeditor/themes/default/css/umeditor.min.css', 'vendor/umeditor/umeditor.min.js', 'vendor/umeditor/umeditor.config.js'])
        }
    })

    //视频管理
    .state('field.videoList', {
            url: '/video?page&size&title&type&grade&subject&maxLike&minLike&maxCollection&minCollection&teacherName&status ',
            templateUrl: 'views/video/video.html',
            controller: 'VideoController as vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/video/videoCtrl.js'])
            }
        }).state('field.videoDetail', {
            url: '/videoDetail?id&disabled',
            templateUrl: 'views/video/videoDetail.html',
            controller: 'VideoDetailController as vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/video/videoDetailCtrl.js',
                    'js/directives/fps-upload/upload.js',
                    'vendor/umeditor/themes/default/css/umeditor.min.css',
                    'vendor/umeditor/umeditor.min.js',
                    'vendor/umeditor/umeditor.config.js',
                    'js/controllers/video/teacherCtrl.js'

                ])
            }
        })
        //教师管理

        //常量管理
        .state('field.constantList',{
            url:'/constantList',
            templateUrl:'views/constants/constant.html',
            controller:'ConstantController',
            controllerAs:'vm',
            resolve:{
                loadMyFile: _lazyLoad('js/controllers/constant/constantController.js')
            }
        })
        //微信客服管理
        .state('field.wechateService',{
            url:'/wechateService',
            templateUrl:'views/constants/wechateService.html',
            controller:'WechateServiceController',
            controllerAs:'vm',
            resolve:{
                loadMyFile: _lazyLoad('js/controllers/constant/wechateServiceController.js')
            }
        })
        //邀请注册赠送会员管理
        .state('field.inviteRegist',{
            url:'/inviteRegist',
            templateUrl:'views/constants/inviteRegist.html',
            controller:'InviteRegistController',
            controllerAs:'vm',
            resolve:{
                loadMyFile: _lazyLoad('js/controllers/constant/inviteRegistController.js')
            }
        })

    //用户管理
    .state('field.userList', {
            url: '/userList?page&size&alias&grade&status&mail&location&mobile&scoreStart&scoreEnd&schoolId&className&isMember',
            templateUrl: 'views/user/user.html',
            controller: 'UserController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/user/userController.js')
            }
        })
        //用户管理详情
        .state('field.userDetail', {
            url: '/userDetail/:id&selected&page&size&',
            templateUrl: 'views/user/userDetail.html',
            controller: 'UserDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/user/userDetailController.js'

                ])
            }
        })
        //批量注册用户
        .state('field.userListImport', {
            url: '/userListImport',
            templateUrl: 'views/user/userListImport.html',
            controller: 'UserListImportController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/user/userListImportController.js'])
            }
        })
        //帖子管理
        .state('field.postsList', {
            url: '/postsList?&page&size&title&author&type&grade&minAt&maxAt&sort',
            templateUrl: 'views/posts/postsList.html',
            controller: 'PostsListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/posts/PostsListController.js'])
            }
        }).state('field.postsDetail', {
            url: '/postsDetail/:id',
            templateUrl: 'views/posts/postsDetail.html',
            controller: 'PostsDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/posts/PostsDetailController.js'])
            }
        })
        //树洞管理
        .state('field.treeHoleList', {
            url: '/treeHoleList?page&size&minAt&maxAt&minHotLevel&maxHotLevel&minBumpCount&maxBumpCount&maxDown&minDownCount&maxDownCount',
            templateUrl: 'views/treeHole/treeHoleList.html',
            controller: 'TreeHoleListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/treeHole/TreeHoleListController.js'])
            }
        })
        //套餐列表
        .state('field.packageList', {
            url: '/packageList/search?page&size&name&minPeriod&maxPeriod&status&minPrice&maxPrice&minIOSPrice&maxIOSPrice',
            templateUrl: 'views/package/packageList.html',
            controller: 'PackageListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/package/packageListController.js'])
            }
        })
        //套餐详情
        .state('field.packageDetail', {
            url: '/packageDetail/:id',
            templateUrl: 'views/package/packageDetail.html',
            controller: 'PackageDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/package/packageDetailController.js'])
            }
        })
        //公告列表
        .state('field.noticeList', {
            url: '/noticeList?page&size&title&status',
            templateUrl: 'views/notice/noticeList.html',
            controller: 'NoticeListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/notice/noticeListController.js'])
            }
        })
        //公告详情
        .state('field.noticeDetail', {
            url: '/noticeDetail/:disabled/:id',
            templateUrl: 'views/notice/noticeDetail.html',
            controller: 'NoticeDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/notice/noticeDetailController.js', 'vendor/umeditor/themes/default/css/umeditor.min.css', 'vendor/umeditor/umeditor.min.js', 'vendor/umeditor/umeditor.config.js'])
            }
        })
        //帮助管理
        .state('field.helpList', {
            url: '/helpList?title&size&page$type',
            templateUrl: 'views/help/helpList.html',
            controller: 'helpListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/help/helpList.js'
                    // 'js/controllers/help/helpList.js'
                    // 'css/CustomerServices/helpManage.css'
                ])
            }
        })

    //帮助详情
    .state('field.helpDetail', {
            url: '/helpDetail?id&disableNum',
            templateUrl: 'views/help/helpDetail.html',
            controller: 'helpDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'vendor/umeditor/themes/default/css/umeditor.min.css',
                    'vendor/umeditor/umeditor.min.js',
                    'vendor/umeditor/umeditor.config.js',
                    'js/controllers/help/helpDetail.js'
                    // 'js/controllers/CustomerServices/helpManage/detailsHelpManage.js',
                    // 'css/CustomerServices/helpManage.css'
                ])
            }
        })
        //banner管理
        .state('field.bannerList', {
            url: '/bannerList?url&status&type',
            templateUrl: 'views/banner/bannerList.html',
            controller: 'bannerListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/banner/bannerList.js'
                    // 'css/CustomerServices/bannerManage.css'
                ])
            }
        })

    //banner详情
    .state('field.bannerDetail', {
            url: '/bannerDetail?id&disableNum',
            templateUrl: 'views/banner/bannerDetail.html',
            controller: 'bannerDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/directives/fps-upload/upload.js',
                    'js/controllers/banner/bannerDetail.js'
                    // 'css/CustomerServices/bannerManage.css'
                ])
            }
        })
        //卡券管理
        .state('field.cardList', {
            url: '/cardlist/search?page&size&number&minPeriod&maxPeriod&effectBegin&effectEnd&invalidBegin&invalidEnd&status&memberId',
            templateUrl: 'views/card/cardList.html',
            controller: 'CardListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/card/cardListController.js'])
            }
        })
        //意见管理
        .state('field.opinionManage', {
            url: '/opinionManage?name&mail&startAt&endAt&page&size',
            templateUrl: 'views/CustomerServices/opinionManage/opinionManage.html',
            controller: 'opinionManageCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/opinionManage/opinionManage.js',
                    // 'css/CustomerServices/opinionManage.css'
                ])
            }
        })
        //查看意见
        .state('field.lookOpinionManage', {
            url: '/lookOpinionManage?id',
            templateUrl: 'views/CustomerServices/opinionManage/lookOpinionManage.html',
            controller: 'lookOpinionManageCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/opinionManage/lookOpinionManage.js',
                    // 'css/CustomerServices/opinionManage.css'
                ])
            }
        })
        /***********
         * 后台管理
         * ***************/
        //密码修改
        .state('field.pwd', {
            url: '/pwd',
            templateUrl: 'views/backstageManagement/pwd.html',
            controller: 'pwdCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/backstageManagement/pwd.js', 'css/backstageManagement/backstage.css'])
            }
        })

    //账户管理
    .state('field.manager', {
            url: '/manager?page&size',
            templateUrl: 'views/backstageManagement/manager/manager.html',
            controller: 'managerCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/backstageManagement/manager/manager.js', 'css/backstageManagement/backstage.css'])
            }
        })
        //账户详情
        .state('field.managerDetail', {
            url: '/managerDetail?id',
            templateUrl: 'views/backstageManagement/manager/managerDetail.html',
            controller: 'managerDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/backstageManagement/manager/managerDetail.js', 'css/backstageManagement/backstage.css'])
            }
        })

    //角色管理
    .state('field.role', {
            url: '/role?page&size',
            templateUrl: 'views/backstageManagement/role/role.html',
            controller: 'roleCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/backstageManagement/role/role.js', 'css/backstageManagement/backstage.css'])
            }
        })
        //角色详情
        .state('field.roleDetail', {
            url: '/roleDetail?id',
            templateUrl: 'views/backstageManagement/role/roleDetail.html',
            controller: 'roleDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/backstageManagement/role/roleDetail.js', 'css/backstageManagement/backstage.css'])
            }
        })

    //模块管理
    .state('field.module', {
        url: '/module?size&page',
        templateUrl: 'views/backstageManagement/module/module.html',
        controller: 'moduleCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _lazyLoad(['js/controllers/backstageManagement/module/module.js', 'css/backstageManagement/backstage.css'])
        }
    })

    //模块详情
    .state('field.moduleDetail', {
            url: '/moduleDetail?id',
            templateUrl: 'views/backstageManagement/module/moduleDetail.html',
            controller: 'moduleDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/backstageManagement/module/moduleDetail.js', 'css/backstageManagement/backstage.css'])
            }
        })
        //科目管理
        .state('field.SubjectList', {
            url: '/SubjectList?id&subjectName&gradeDept&status',
            templateUrl: 'views/teaching/subjectList/subjectList.html',
            controller: 'subjectListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/teaching/subjectList/subjectListCtrl.js'])
            }
        })
        //科目新增、编辑
        .state('field.subjectAdd', {
            url: '/subjectAdd?id',
            templateUrl: 'views/teaching/subjectList/subjectAdd.html',
            controller: 'subjectAddCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    // 'js/controllers/article/articleDetailController.js',
                    'js/directives/fps-upload/upload.js',
                    'js/controllers/teaching/subjectList/subjectAddCtrl.js'
                ])
            }
        })
        //专题管理
        .state('field.specialList', {
            url: '/specialList?id&page&size&name&gradeDept&subjectName&status',
            templateUrl: 'views/teaching/specialList/specialList.html',
            controller: 'specialListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/teaching/specialList/specialListCtrl.js'])
            }
        })
        //专题新增、编辑
        .state('field.specialAdd', {
            url: '/specialAdd?id&subjectId&isPage',
            templateUrl: 'views/teaching/specialList/specialAdd.html',
            controller: 'specialCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/article/articleDetailController.js',
                    'js/directives/fps-upload/upload.js',
                    'js/controllers/teaching/specialList/specialAddCtrl.js',
                    'js/directives/numberic/numberic.js'
                ])
            }
        })
        //课程管理(列表)
        .state('field.courseList', {
            url: '/courseList?id&page&size&periodName&gradeDept&subjectName&lessonName&status',
            templateUrl: 'views/courseManage/courseList.html',
            controller: 'courseListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/courseManage/courseListCtrl.js'])
            }
        })
        //课程管理(新增编辑)
        .state('field.courseAdd', {
            url: '/courseAdd?id&lessonId',
            templateUrl: 'views/courseManage/courseAdd.html',
            controller: 'courseAddCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/courseManage/courseAddCtrl.js'])
            }
        })
        //任务管理(列表)
        .state('field.taskList', {
            url: '/taskList?status&taskName&gradeDept&subjectName&lessonName&periodName&taskType&id&size&page&difficultyLevel&specificType',
            templateUrl: 'views/taskManage/taskList.html',
            controller: 'taskListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/taskManage/taskListCtrl.js'])
            }
        })
        //任务管理(新增编辑任务)
        .state('field.taskDetail', {
            url: '/taskDetail/:periodId/:id',
            templateUrl: 'views/taskManage/taskDetail.html',
            controller: 'taskDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/taskManage/taskDetailCtrl.js'])
            }
        })
        //任务管理(新增编辑视频)
        .state('field.radioDetail', {
            url: '/radioDetail/:periodId/:id',
            templateUrl: 'views/taskManage/radioDetail.html',
            controller: 'radioDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/taskManage/radioDetailCtrl.js'])
            }
        })
        //客服管理 2017-9-1 18:14:12 by aLeX


    //版本管理
    .state('field.versionManage', {
            url: '/versionManage',
            templateUrl: 'views/CustomerServices/versionManage.html',
            controller: 'versionManageCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/CustomerServices/versionManage.js'

                ])
            }
        })
        //版本详情
        .state('field.versionManageDetail', {
            url: '/versionManageDetail?os&isForceUpdate&versionCode&url&info&id&code',
            templateUrl: 'views/CustomerServices/versionManageDetail.html',
            controller: 'versionManageDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/CustomerServices/versionManageDetail.js',
                    'css/CustomerServices/opinionManage.css',
                    'js/directives/numberic/numberic.js'
                ])
            }
        })
        //注册统计
        .state('field.charts', {
            url: '/charts',
            templateUrl: 'js/directives/charts/charts.html',
            resolve: {
                loadMyFile: _lazyLoad(['js/directives/charts/charts.js'])
            }
        })
        //访问量统计
        .state('field.statistic',{
            url:'/statistic',
            templateUrl: 'js/directives/statistic/statistic.html',
            controller: 'statisticCtrl',
            controllerAs: 'vm',
            resolve:{
                loadMyFile:_lazyLoad([
                        'js/directives/statistic/statistic.js',
                        'js/directives/statistic/statistic.css',
                        'js/directives/statistic/maxSorting.js'
                    ])
            }
        })
       //访问量-专题详情页面
        .state('field.statistic.subjectDetail',{
            url:'/subjectDetail?page',
            templateUrl: 'views/static/subjectDetail.html',
        })
       //访问量-个人中心页面
        .state('field.statistic.personcenter',{
            url:'/personcenter?targetType',
            templateUrl: 'views/static/personcenter.html',
        })
         //访问量-任务详情页统计
        .state('field.statistic.taskpage',{
            url:'/taskpage?targetType?page',
            templateUrl: 'views/static/taskpage.html',
        })
         //访问量-签到页统计
        .state('field.statistic.signpage',{
            url:'/signpage?targetType',
            templateUrl: 'views/static/signpage.html',
        })
        //访问量-开通会员统计
        .state('field.statistic.openmember',{
            url:'/openmember?targetType',
            templateUrl: 'views/static/openmember.html',
        })
        //访问量-卡券激活统计
        .state('field.statistic.cardactive',{
            url:'/cardactive?targetType',
            templateUrl: 'views/static/cardactive.html',
        })

    //学校管理列表 2017.9.23 by aLeX 修改
    .state('field.school', {
            url: '/school?page&size?name&id',
            templateUrl: 'views/CustomerServices/schoolManage/school.html',
            controller: 'schoolCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/CustomerServices/school/schoolCtrl.js'
                ])
            }
        })
        //新增/编辑学校
        .state('field.new-school', {
            url: '/new-school?id&name',
            templateUrl: 'views/CustomerServices/schoolManage/new-school.html',
            controller: 'newSchoolCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/CustomerServices/school/newSchoolCtrl.js'
                ])
            }
        })
        //APP开机广告列表
        .state('field.advertising', {
            url: '/advertising?url&status&page&size',
            templateUrl: 'views/advertising/advertising.html',
            controller: 'advertisingCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/advertising/advertising.js'
                ])
            }
        })
        //APP开机广告详情
        .state('field.advertisingDetail', {
            url: '/advertisingDetail?id',
            templateUrl: 'views/advertising/advertisingDetail.html',
            controller: 'advertisingDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/advertising/advertisingDetail.js'
                ])
            }
        });


}