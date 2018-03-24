/**
 * Created by Administrator on 2017\9\24 0024.
 */

angular.module("myApp")
    .factory("_path", function() {
        return {
            //数据埋点
            DataBurialPoint:function(){
                return "/a/pageStatistic"
            },
            //收藏夹 课程列表
            favorites: function() {
                return "/a/u/task/collection/list"
            },
            //购买专题
            puychased: function() {
                return "/a/u/lesson/list/bought"
            },
            //删除单个收藏
            deleteFavorites: function(b) {
                return "/a/u/collection/" + b
            },
            //删除单个学习记录
            deleteSingleHistory: function(b) {
                return "/a/u/collection/" + b
            },
            //删除所有学习记录
            deleteAllHistory: function() {
                return "/a/u/collection/all"
            },
            //学习记录
            studyHistory: function() {
                return "/a/u/task/collection/list"
            },
            //用户登出
            userLoginOut: function() {
                return "/a/u/logout"
            },
            //用户信息
            userMsg: function() {
                return '/a/u/user/detail'
            },

            //签到
            sign: function() {
                return "/a/u/user/sign"
            },
            //签到详情
            signDetail: function() {
                return "a/u/user/sign/list"
            },
            //科目列表
            subjectList: function(gradeDept) {
                return " /a/subject/list/" + gradeDept
            },
            //公告
            notive: function() {
                return " /a/notice/latest"
            },
            //图片列表
            imgList: function() {
                return " /a/article/list"
            },
            //专题详情与课程列表
            special: function(lessonId) {
                return "/a/lesson/period/list/" + lessonId
            },
            //专题简介
            getSubjectIntro:function(lessonId){
                return "/a/lesson/introduction/" + lessonId
            },
            //课程详情
            courseDetail: function(periodId) {
                return " /a/period/" + periodId
            },
            //上一个课程
            previousCourse: function(periodId) {
                return "/a/previous/period/" + periodId
            },
            //下一个课程
            nextCourse: function(periodId) {
                return "/a/next/period/" + periodId
            },
            //任务列表
            taskList: function(periodId) {
                return "/a/task/list/" + periodId
            },
            //任务详情
            practice: function(taskId) {
                return " /a/task/" + taskId
            },
            //获取收藏状态
            collection: function(taskId) {
                return " /a/u/isCollection/" + taskId + '?targetType=3&status=1'
            },
            //更改收藏状态
            changeCollection: function(taskId) {
                return "/a/u/collection/" + taskId
            },
            //登录注册及找回密码
            //注册
            register: function() {
                return " /a/register"
            },
            //普通登录
            login: function() {
                return " /a/login"
            },

            //微信登录
            wxLogin: function() {
                return "/a/wxlogin"
            },
            //获取微信用户信息
            openid:function(){
                return "/a/openid"
            },
            // 验证手机号是否注册
            vifNewPhone:function () {
                return '/a/verify/openid';
            },
            //检测手机号或者邮箱是否已经绑定过微信
            weChatBindInfo:function(){
                return "/a/verify/check"
            },
            //老用户绑定手机/邮箱，新绑定同接口
            bindPhone: function() {
                return "/a/u/bind/"
            },
            /****
             * 个人中心
             */
            //图片上传
            uploadImage:function(){
                return "/a/u/img/avatar"
            },
            //保存个人资料
            saveUserData: function() {
                return " /a/u/user/detail"
            },
            //验证手机是否属于用户
            vifPhone:function () {
                return '/a/u/verify/isowner';
            },
            //验证验证码是否正确
            vifVerify :function () {
                return ' /a/verify/istrue';
            },
            //验证手机
            verifyPhone: function() {
                return "/a/u/verify"
            },
            //验证用户名,验证手机
            verifyAccount: function() {
                return "/a/verify/openid"
            },
            //获取验证码
            captcha: function() {
                return "/a/captcha/verify"
            },
            //修改密码
            mdfPwd: function() {
                return "/a/u/pwd"
            },
            //发送短信验证码
            sendCode: function() {
                return " /a/code/send"
            },
            //发送邮箱验证码
            sendMailCode: function() {
                return "/a/mail/code/send"
            },
            //发送语音验证码
            sendVoice: function() {
                return " /a/code/voice"
            },
            //验证手机
            codeSend: "/a/send/code",
            //验证邮箱
            mailSend: "/a/mail/code/send",
            //忘记密码的修改
            forgetEditCode:'a/password/forget',
            //个人详情
            userDetail: function() {
                return " /a/u/user/detail/"
            },
            //修改个人详情
            userChange: function(params) {
                return " /a/u/user/detail/" + params
            },
            //收藏课程
            favourite: function(id) {
                return " /a/u/favourite/" + id
            },
            //开通会员
            openVip: function() {
                return " /a/user/coupon/active"
            },
            //续费会员
            renewVip: function(userId) {
                return "/a/user/member/" + userId
            },
            //套餐列表 2017.10.6 by aLeX
            member: "a/u/member/online",
            //获取订单
            order: "/a/u/order",
            //获取订单状态
            payStatus: function(id) {
                return "a/u/order/" + id
            },
            //卡券激活
            memberActive: function() {
                return "/a/u/coupon/active"
            },

            //微信支付订单信息
            getWeixinOrder: function(oid) {
                return "/a/wx/pay/info/" + oid
            },
            //手机微信支付订单信息
            mobileGetWeixinOrder: function(oid) {
                return "/a/wx/pay/info/" + oid+'?payType=h5'
            },
            //微信支付结果查询
            getWeixinOrderResult: function(oid) {
                return "/a/wx/pay/result/" + oid
            },
            //保存支付方式
            savePayWay:function(oid){
                return "/a/u/order/pay/" + oid
            },
            //获取单个套餐信息
            getMemberDetail:function(id){
                return "/a/u/member/" + id
            },
            //保存支付结果
            saveOrderDetail:function(oid){
                return "/a/u/order/result/"+oid
            },
            //支付宝APP支付
            //获取私钥
            appKey:function (oid) {
                return " /a/u/order/alipay/key/"+oid
            },
            //查询订单状态
            getOrder:function (oid) {
                return "/a/u/order/" + oid
            }
        }
    });