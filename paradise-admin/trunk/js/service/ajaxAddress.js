var mock = true;
angular.module("admin").factory("_path", function (commonUtil) {
    return {
        //用户管理
        //用户详情
        userDetail: function (id) {
            return "/a/u/user/" + id;
        },
        //用户状态
        userStatus: function (id) {
            return "/a/u/freeze/user/" + id;
        },
        //用户列表
        userList: function () {
            return "/a/u/user/list";
            // return "json/package.json" ;
        },
        //批量导入用户
        userListImport: function () {
            return "/a/u/user/bulkimport";
        },
        //获取学习记录
        StudyRecord: function () {
            return " /a/u/task/collection/list/";
        },
        //获取购买记录
        getPayRecord: function () {
            return "/a/u/lesson/list/bought";
        },
        //内容管理
        //文章管理
        //文章编辑、详情|新增
        articleDetail: function (id) {
            return id ? "/a/u/document/" + id : "/a/u/document";
        },
        //文章上下架
        articleStatus: function (did) {
            return "/a/u/document/" + did + "/status";
        },
        //文章列表
        articleList: function () {
            return "/a/u/document/list";
            // return "json/package2.json" ;
        },
        //文章排序
        articleSort: function () {
            return "/a/u/document/sort";
        },
        //文章置顶
        articleSticky: function (id) {
            return "/a/u/document/rank/" + id;
        },
        //banner管理
        //banner列表
        bannerList: function () {
            return "/a/u/article/list";
            // return "json/package2.json" ;
        },
        //banner上下架
        bannerStatus: function (id, status) {
            return "/a/u/article/" + id + "/status/" + status;
        },
        //banner详情
        bannerDetail: function (id) {
            return "/a/u/article/" + id;
        },
        //banner删除
        bannerDelete: function (id) {
            return "/a/u/article/" + id;
        },
        //banner编辑|新增
        bannerEdit: function (id) {
            return id ? "/a/u/article/" + id : "/a/u/article";
        },
        //banner排序
        bannerSort: function () {
            return "/a/u/article/sort";
        },
        //help管理
        //help列表
        helpList: function () {
            return "/a/u/article/list";
            // return "json/package2.json" ;
        },
        //help删除
        helpDelete: function (id) {
            return "/a/u/article/" + id;
        },
        //help详情
        helpDetail: function (id) {
            return "/a/u/article/" + id;
        },
        //help编辑|新增
        helpEdit: function (id) {
            return id ? "/a/u/article/" + id : "/a/u/article";
        },
        //视频管理
        //视频编辑、详情|新增
        videoDetail: function (id) {
            return id ? "/a/u/video/" + id : "/a/u/video";
        },
        //视频上下架
        videoStatus: function (aid) {
            return "/a/u/video/" + aid + "/status";
        },
        //视频列表
        videoList: function () {
            return "/a/u/video/list";
            // return "json/tsconfig.json"
        },
        //视频排序
        videoSort: function () {
            return "/a/u/video/sort";
        },
        //视频置顶
        videoRank: function (id) {
            return "/a/u/video/rank/" + id;
        },
        //教师管理
        //教师编辑、删除、详情|新增
        teacherDetail: function (id) {
            return id ? "/a/u/teacher/" + id : "/a/u/teacher";
        },
        //教师列表
        teacherList: function () {
            return "/a/u/teacher/list";
        },
        /////////
        //帖子管理
        /////////
        //帖子数量
        postsCount: function () {
            return "/a/u/post/num";
        },
        //帖子列表
        postsList: function () {
            return "/a/u/post/list";
        },
        //帖子详情
        postsDetail: function (id) {
            return "/a/u/post/" + id;
        },
        //回帖列表
        postsReply: function (id) {
            return "/a/u/reply/list/" + id;
        },
        //删除回帖
        postsReplyDelete: function (id) {
            return "a/u/reply/" + id;
        },
        //帖子加精与取精
        postsDigest: function (id) {
            return "/a/u/post/digest/" + id;
        },
        //置顶与取消
        postsSticky: function (id) {
            return "/a/u/post/sticky/" + id;
        },
        //树洞
        //树叶列表
        treeHoleList: function () {
            return "/a/u/hollow/list";
        },
        //删除树叶
        treeHoleDelete: function (id) {
            return "a/u/hollow/" + id;
        },
        /**********
         *公告管理
         **********/
        //获取公告列表
        noticeList: function () {
            return "/a/u/notice/search";
        },
        //公告查看|新增
        noticeDetail: function (nid) {
            return nid ? "/a/u/notice/" + nid : "/a/u/notice";
        },
        //公告编辑
        noticeEdit: function (id) {
            return "/a/u/notice/" + id;
        },
        //公告删除
        noticeDelete: function (nid) {
            return "/a/u/notice/" + nid;
        },
        //公告上下架
        noticeStatus: function (nid, status) {
            return "/a/u/notice/id/" + nid + "/status/" + status;
        },
        /*********
         * 套餐管理
         *********/
        //获取套餐列表
        packageList: function () {
            return "/a/u/member/search";
        },
        //套餐查看|新增
        packageDetail: function (nid) {
            return nid ? "/a/u/member/" + nid : "/a/u/member/";
        },
        //套餐编辑
        packageEdit: function (id) {
            return "/a/u/member/" + id;
        },
        //套餐删除
        packageDelete: function (nid) {
            return "/a/u/member/" + nid;
        },
        //套餐上下架
        packageStatus: function (nid, status) {
            return "/a/u/member/" + nid + "/status/" + status;
        },
        //套餐推荐
        packageRecommend: function (id) {
            return "/a/u/recommend/" + id;
        },
        //取消推荐会员套餐
        packageCancelRecommend: function (id) {
            return "/a/u/recommend/cancel/" + id;
        },
        /****
         * 教学管理
         ******/
        //科目列表
        subjectList: "/a/u/subject/list/",
        //新增科目
        addSubject: "/a/u/subject",
        //编辑科目
        editSubject: function (subjectId) {
            return "/a/u/subject/" + subjectId;
        },
        //科目上下架
        subjectUpDowns: function (subjectId, status) {
            return "/a/u/subject/" + subjectId + "/status/" + status;
        },
        // 删除科目
        deleteSubject: function (subjectId) {
            return "/a/u/subject/" + subjectId;
        },
        //科目详情
        subjectDetail: function (subjectId) {
            return "/a/u/subject/" + subjectId;
        },
        //科目排序
        subjectSort: function () {
            return "/a/u/subject/sort";
        },

        /*****
         * 专题管理
         ****/
        //专题列表
        special: function (id) {
            return id ? "/a/u/lesson/list/" + id : "/a/u/lesson/list";
        },
        // 纯粹统计用
        specialStatic: function (params) {
            return "/a/u/lesson/list/" + params;
        },
        //专题上下架
        specialUpDowns: function (specialId, status) {
            return "/a/u/lesson/" + specialId + "/status/" + status;
        },
        //删除专题
        deleteSpecial: function (specialId) {
            return "/a/u/lesson/" + specialId;
        },
        //新增专题
        addSpecial: function () {
            return "/a/u/lesson";
        },
        //编辑专题
        editSpecial: function (specialId) {
            return "/a/u/lesson/" + specialId;
        },
        //专题详情
        specialDetail: function (specialId) {
            return "/a/u/lesson/" + specialId;
        },
        specialSort: function () {
            return "/a/u/lesson/sort";
        },

        /*********
         * 课程管理
         *********/
        //课程列表
        course: function (id) {
            console.log(id);
            return id ? "/a/u/period/list/" + id : "/a/u/period/list";
        },
        //根据id获取的课程列表
        courseId: function (id) {
            return "/a/u/period/list/" + id;
        },
        //课程上下架
        courseUpDowns: function (courseId, status) {
            return "/a/u/period/" + courseId + "/status/" + status;
        },
        //删除课程
        deleteCourse: function (courseId) {
            return "/a/u/period/" + courseId;
        },
        //新增课程
        addCourse: "/a/u/period",
        //编辑课程
        editCourse: function (courseId) {
            return "/a/u/period/" + courseId;
        },
        //课程详情
        courseDetail: function (taskId) {
            return "/a/u/period/" + taskId;
        },
        courseSort: function () {
            return "/a/u/period/sort";
        },

        /*********
         * 卡券管理
         *********/
        //卡券列表
        getCardList: "/a/u/coupon/search",
        //生成卡券
        createCard: "/a/u/coupon",
        //导出卡券
        toExport: "/a/u/coupon/search?excel=excel",

        //获取学校列表 2017.9.23 by aLeX
        schoolList: function () {
            return "/a/u/school/list";
        },
        //新增/编辑学校
        editSchool: function (id) {
            return id ? "/a/u/school/" + id : "/a/u/school";
        },

        //任务习题详情 2017.9.25 by aLeX
        taskDetail: function (id) {
            return "/a/u/task/" + id;
        },
        //任务列表，2017.9.27  by aLeX
        taskList: function (id) {
            console.log(id);
            return id ? "/a/u/task/list/" + id : "/a/u/task/list/";
        },
        // 统计用--任务列表
        taskListStatic: function () {
            return "/a/u/task/list/";
        },
        //任务排序
        taskSort: function () {
            return "/a/u/task/sort";
        },
        //任务课程上下架
        taskUpDowns: function (id, status) {
            return "/a/u/task/" + id + "/status/" + status;
        },
        //编辑练习
        editTask: function (id) {
            return "/a/u/task/" + id;
        },
        //删除练习
        deleteTask: function (id) {
            return "/a/u/task/" + id;
        },
        //新增练习
        addTask: function () {
            return "/a/u/task/";
        },
        //意见管理列表
        opinionList: function () {
            return "/a/u/opinion/list";
        },
        //查看意见
        opinionManager: function (id) {
            return "/a/opinion/" + id;
        },
        //删除意见
        deleteOpinion: function (id) {
            return "/a/opinion/" + id;
        },
        //版本详情
        versionManage: "/a/version",
        //版本新增
        newVersionManage: "/a/u/version",
        //修改详情
        changeVersionManage: function (id) {
            return "/a/u/version/" + id;
        },
        memberDetail: function (id) {
            return "/a/u/user/member/" + id;
        },
        orderList: function () {
            return "/a/u/order/list/";
        },
        loginRecord: function (id) {
            return "/a/u/user/login/" + id;
        },
        changePhone: function (id) {
            return "/a/u/user/phone/" + id;
        },
        addScore: function (id) {
            return "/a/u/user/score/" + id;
        },
        getStudyRecord: function () {
            return "/a/u/task/collection/list";
        },
        //广告列表
        getAdvertisingList: "a/u/article/list",
        //广告详情
        getAdvertisingDetail: function (id) {
            return "/a/u/article/" + id;
        },
        //编辑广告
        changeAdvertising: function (id) {
            return "/a/u/article/" + id;
        },
        //新增广告
        addAdvertising: "/a/u/article",
        //删除广告
        deleteAdvertising: function (id) {
            return "/a/u/article/" + id;
        },
        //上下广告
        updownAdvertising: function (id, status) {
            return "/a/u/article/" + id + "/status/" + status;
        },
        //数据埋点——各页面的数据统计
        //专题详情页面埋点
        lessonDetailStatic: function () {
            return "/a/u/lesson/stat/list"
        },
        //任务详情页埋点
        taskDetailStatic: function () {
            return "/a/u/task/stat/list"
        },
        //各分页
        pageDetailStatic: function () {
            return "/a/u/common/stat/list"
        },

        /**
         *常量管理
         *
         *********/
        //微信客服管理详情
        getWxService: function () {
            return " /a/u/constant/weixin"
        },
        //保存微信客服管理
        saveWxService: function () {
            return " /a/u/constant/weixin"
        },
        //赠送会员天数详情
        getVipDays: function () {
            return "/a/u/constant/days"
        },
        //保存赠送会员天数
        saveVipDays: function () {
            return " /a/u/constant/days"
        },

        /**
         * 注册统计
         *
         * ******/
        registrationStatistics:function () {
            return " /download/registrationStatistics.json"
        }



        /*//版本列表
                    versionManage: '/a/version'*/
    };
});