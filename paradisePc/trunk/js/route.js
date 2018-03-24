'use strict';

function projectRouteConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };
    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });
    //更改url格式配置为html5，去掉#号;
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    //头部和底部
        .state('main', {
            url: '',
            templateUrl: 'views/main/main.html',
            controller: 'mainCtrl',
            params: {code: null},
            controllerAs: 'vm',
            abstract: false, // true 表明此状态不能被显性激活，只能被子状态隐性激活,更改
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/main/mainCtrl.js',
                    '../../css/main.css',
                    'modal/publicModalCss/modal.css', //从这行到下面的都是模态框的相关文件
                    'modal/afterWeChat/afterWeChat.js',
                    'modal/forgetPassword/forgetPassword.js',
                    'modal/login/login.js',
                    'modal/register/register.js',
                    'js/directives/agreement/agreement.html',
                    'js/directives/agreement/agreement.css',
                    'js/directives/agreement/agreement.js',
                    'modal/memberActive/memberActive.css',
                    'modal/memberActive/memberActiveModal.js'

                ])
            }
        })
        //首页路由
        .state('main.home', {
            url: '/home?id&subjectId&gradeDept&lessonId&isLock',
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/home/homeCtrl.js',
                    '../../css/home.css'
                ])
            }
        })

        //专题管理
        .state('main.subject', {
            url: '/subject?id',
            templateUrl: 'views/subject/subject.html',
            controller: 'SubjectCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    '../../js/controllers/subject/chapterDetail.js',
                    '../../css/subject.css',
                    'modal/choosePay/choosePay.css',
                    'modal/choosePay/choosePay.js',
                    'modal/pay/memberPayModal.js',
                    'modal/pay/pay.css',
                    'modal/weixinPay/weixinPay.js',
                ])
            }
        })
        //专题简介
        .state('main.subjectIntro', {
            url: '/subjectIntro?id',
            templateUrl: 'views/subjectIntroduce/subjectIntroduce.html',
            controller: 'SubjectIntroCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/SubjectIntroCtrl/SubjectIntroCtrl.js',
                    'css/subject.css',
                    'modal/choosePay/choosePay.css',
                    'modal/choosePay/choosePay.js',
                    'modal/pay/memberPayModal.js',
                    'modal/pay/pay.css',
                    'modal/weixinPay/weixinPay.js',
                    'css/videos.css'

                ])
            }
        })

        //课程管理
        .state('main.course', {
            url: '/course?id&taskId',
            templateUrl: 'views/course/course.html',
            controller: 'CourseCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    '../../js/controllers/course/courseDetail.js',
                    '../../css/course.css',
                    '../../css/videos.css',
                ])
            }
        })

        //开通会员(下面的页面已放弃)
        .state('main.member', {
            url: '/member',
            templateUrl: 'views/member/member.html',
            controller: 'MemberCtrl',
            controllerAs: 'vm',
            abstract: true,
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/member.css',
                    'js/controllers/member/MemberCtrl.js',
                    'js/directives/agreement/agreement.css',
                    'js/directives/agreement/agreement.js',
                    'modal/pay/memberPayModal.js',
                    'modal/pay/pay.css',
                    'modal/weixinPay/weixinPay.js',

                ])
            }
        })

        //测试准备——卡券激活页面
        .state('main.survive', {
            url: '/survive',
            templateUrl: 'views/test-member/survive.html',
            controller: 'MemberActiveCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/survive.css',
                    'js/controllers/member/MemberActiveCtrl.js'
                    // 'modal/bindPhoneOrMail/bindPhoneOrMail.js',
                    // 'modal/bindPhoneOrMail/bindPhoneOrMail.css',
                    // 'modal/changePassword/changePassword.js',
                    // 'modal/changePassword/changePassword.css',
                    // 'modal/changePhoneNumber/changePhoneNumber.js',
                    // // 'modal/changePhoneNumber/changePhoneNumber.css',
                    // 'modal/delete/delete.js',
                    // 'modal/delete/delete.css'

                ])
            }
        })
        //支付页面
        .state('main.pay', {
            url: '/payVip',
            templateUrl: 'views/test-member/pay.html',
            controller: 'MemberPayCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/pay.css',
                    'js/controllers/member/MemberPayCtrl.js',
                    'modal/pay/memberPayModal.js',
                    'modal/pay/pay.css',
                    'modal/weixinPay/weixinPay.js',
                    'modal/pay/memberPayModal.js',
                    'js/directives/agreement/agreement.html',
                    'js/directives/agreement/agreement.css',
                    'js/directives/agreement/agreement.js',
                    'modal/choosePay/choosePay.css',
                    'modal/choosePay/choosePay.js',
                    // 'modal/bindPhoneOrMail/bindPhoneOrMail.js',
                    // 'modal/bindPhoneOrMail/bindPhoneOrMail.css',
                    // 'modal/changePassword/changePassword.js',
                    // 'modal/changePassword/changePassword.css',
                    // 'modal/changePhoneNumber/changePhoneNumber.js',
                    // // 'modal/changePhoneNumber/changePhoneNumber.css',
                    // 'modal/delete/delete.js',
                    // 'modal/delete/delete.css'

                ])
            }
        })
        //会员中心页面
        .state('main.newMember', {
            url: '/newMember',
            templateUrl: 'views/test-member/newMember.html',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/newMember.css',
                ])
            }
        })





        //开通会员卡券激活
        .state('main.member.memberActive', {
            url: '/memberActive',
            templateUrl: 'views/member/memberActive.html',
            controller: 'MemberActiveCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/member/MemberActiveCtrl.js'
                ])
            }
        })
        //开通会员主页
        .state('main.member.memberPay', {
            url: '/memberPay',
            templateUrl: 'views/member/memberPay.html',
            controller: 'MemberPayCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/member/MemberPayCtrl.js',

                    'css/member.css',
                    'js/controllers/member/MemberCtrl.js',
                    'js/directives/agreement/agreement.css',
                    'js/directives/agreement/agreement.js',
                    'modal/pay/memberPayModal.js',
                    'modal/pay/pay.css',
                    'modal/weixinPay/weixinPay.js',
                    // 'js/controllers/article/articleDetailController.js',
                    // 'js/directives/fps-upload/upload.js',
                    // 'js/controllers/teaching/specialList/specialAddCtrl.js'
                ])
            }
        })

        //个人中心
        .state('main.user', {
            url: '/user',
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl',
            controllerAs: 'vm',
            abstract: false,
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/user.css',
                    'js/controllers/user/userCtrl.js',
                    'modal/bindPhoneOrMail/bindPhoneOrMail.js',
                    'modal/bindPhoneOrMail/bindPhoneOrMail.css',
                    'modal/changePassword/changePassword.js',
                    'modal/changePassword/changePassword.css',
                    'modal/changePhoneNumber/changePhoneNumber.js',
                    // 'modal/changePhoneNumber/changePhoneNumber.css',
                    'modal/delete/delete.js',
                    'modal/delete/delete.css'

                ])
            }
        })
        //个人中心个人资料
        .state('main.user.detail', {
            url: '/detail',
            templateUrl: 'views/user/detail.html',
            controller: 'UserDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/user.css',
                    'js/controllers/user/userDetailCtrl.js'
                    // 'js/directives/fps-upload/upload.js',
                    // 'js/controllers/teaching/specialList/specialAddCtrl.js'
                ])
            }
        })
        //个人中心学习记录
        .state('main.user.history', {
            url: '/history',
            templateUrl: 'views/user/history.html',
            controller: 'UserHistoryCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/user.css',
                    'js/controllers/user/userHistoryCtrl.js'
                    // 'js/controllers/article/articleDetailController.js',
                    // 'js/directives/fps-upload/upload.js',
                    // 'js/controllers/teaching/specialList/specialAddCtrl.js'
                ])
            }
        })
        //个人中心收藏夹
        .state('main.user.favorite', {
            url: '/favorite',
            templateUrl: 'views/user/favorite.html',
            controller: 'UserFavoriteCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/user.css',
                    'js/controllers/user/userFavoriteCtrl.js'
                    // 'js/controllers/article/articleDetailController.js',
                    // 'js/directives/fps-upload/upload.js',
                    // 'js/controllers/teaching/specialList/specialAddCtrl.js'
                ])
            }
        })

        //关于我们
        .state('main.about', {
            url: '/about',
            templateUrl: 'views/about/about.html',
            // controller:'AboutCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    '../../css/about.css'
                ])
            }
        })
        //个人中心-已购记录
        .state('main.user.puychased', {
            url: '/puychased',
            templateUrl: 'views/user/puychased.html',
            controller: 'userPuychased',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/puychased.css',
                    'js/controllers/user/userPuychased.js',
                    'modal/validity/validity.js',
                    'modal/validity/validity.css'
                ])
            }
        })
        //联系我们
        .state('main.contact', {
            url: '/contact',
            templateUrl: 'views/about/contact.html',
            // controller:'AboutCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    '../../css/about.css'
                ])
            }
        })
        //分享页面
        .state('share', {
            url: '/share',
            templateUrl: 'views/about/share.html',
            controller: 'shareCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'css/share.css',
                    'js/controllers/about/share.js'
                ])
            }
        })
        //分享视频任务页面
        .state('shareTask', {
            url: '/shareTask?id',
            templateUrl: 'views/about/shareTask.html',
            controller: 'ShareTaskCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/about/shareTask.js',
                    'js/directives/videos/appVideo.js',
                    'modal/appBuy/appBuy.js',
                    'css/shareTask.css',
                    'modal/appBuy/appBuy.css'
                ])
            }
        })
        //家长代付页面
        .state('parentsPay', {
            url: '/parentsPay?uid&userName&price&discountPrice&indentCode&codeUrl&payWay&oid',
            templateUrl: 'views/parentsPay/parentsPay.html',
            controller: 'ParentsPayCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/about/parentsPay.js',
                    'css/parentsPay.css',
                    'css/pay.css',
                    'js/controllers/member/MemberPayCtrl.js',
                    'modal/pay/memberPayModal.js',
                    'modal/pay/pay.css',
                    'modal/weixinPay/weixinPay.js',
                    'modal/pay/memberPayModal.js',
                    'modal/choosePay/choosePay.css',
                    'modal/choosePay/choosePay.js',
                    'modal/surePay/surePay.js',
                    'modal/surePay/surePay.css'
                ])
            }
        })
}