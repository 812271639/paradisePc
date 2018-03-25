/**
 * Created by Master on 2017/3/14.
 */
angular.module('paradiseApp')
    .factory('path', function () {
        return {
            //微信相关
            //获取签名
            wxSignature: '/a/wx/signature',
            //更新、获取token
            wxToken: '/a/wx/token',
            //code获取openid、用户信息
            wxOpenid: '/a/openid',
            //获取微信图片
            wxMedia: '/a/wx/media',

            //用户登录注册
            //发送手机验证码
            mobileCode: '/a/code/send',
            //发送邮箱验证码
            mailCode: '/a/mail/code/send',
            //用户注册
            register: '/a/register',
            //查询openid是否注册
            verifyOpenid: '/a/verify/openid',
            //用户登录
            login: '/a/login',
            //手机/邮箱绑定
            bind: '/a/u/bind',

            //用户
            //签到
            sign: '/a/u/user/sign',
            //用户签到信息
            signDetail: '/a/u/user/sign/list',
            //用户信息|修改
            userDetail: '/a/u/user/detail',
            //其他用户信息
            otherDetail:function (id) {
                return '/a/u/user/detail/'+id;
            },
            //收藏文档/视频
            collection: function (id) {
                return '/a/u/collection/' + id;
            },
            //点赞文档、视频
            like: function (id) {
                return '/a/u/like/' + id;
            },
            //用户收藏文章列表
            documentCollection: function (id) {
              return  id?'/a/u/document/collection/list/'+id:'/a/u/document/collection/list';
            },
            //用户收藏视频列表
            videoCollection: function (id) {
              return  id?'/a/u/video/collection/list/'+id:'/a/u/video/collection/list';
            },
            //文档
            //获得文档详情
            documentDetail: function (id) {
                return '/a/u/document/' + id;
            },
            //按条件获得文档列表
            documentList: '/a/u/document/list',
            //保存文档banner排序
            documentSort: '/a/u/document/sort',

            //视频
            //获得视频详情
            videoDetail: function (id) {
                return '/a/u/video/' + id;
            },
            //按条件获得视频列表
            videoList: '/a/u/video/list',
            //保存视频banner排序
            videoSort: '/a/u/video/sort',
            //科目表
            subjectList: '/a/u/subject/list',

            //留言板
            //置顶帖列表
            postsSticky:'/a/u/post/sticky/list',
            //精华帖列表
            postsDigest:'/a/u/post/digest/list',
            //普通帖列表
            postsList:'/a/u/post/list',
            //用户帖子列表
            postsUserList:function (id) {
               return id?'/a/u/posts/user/list/'+id:'/a/u/posts/user/list';
            },
            //发新帖
            posts:'/a/u/post',
            //删帖
            postsDelete:function (id) {
                return '/a/u/post/'+id;
            },
            //回帖列表
            postsReplyList:function (id) {
                return '/a/u/reply/list/'+id;
            },
            //帖子详情
            postsDetail:function (id) {
                return '/a/u/post/'+id;
            },
            //删回复
            postsReplyDelete:function (id) {
                return '/a/u/reply/'+id;
            },
            //回帖
            postsReply:function (id) {
                return '/a/u/reply/'+id;
            },
            //树洞
            //最热树叶
            treeHoleHot: "/a/u/hollow/list",
            //随机树叶
            treeHoleRandom:"/a/u/hollow/random",
            //初始随机树叶
            treeHoleRandomStart:"/a/u/hollow/randomlist",
            // 添加树叶
            treeHoleAdd:"/a/u/hollow",
            //树叶点赞
            treeHoleUp:function (id) {
                return "/a/u/hollow/bump/"+id;
            },
            //树叶踩
            treeHoleDown:function (id) {
                return "/a/u/hollow/down/"+id;
            },
            //通用
            //文件上传
            fileUpLoad: function (module) {
                return "/a/u/img/" + module;
            },
            //提交版本更新
            version: '/a/version',

            //公告栏
            bulletin:'/a/u/notice/detail',
            //卡卷激活
            cardActivation:'/a/u/coupon/active',
            //套餐列表
            getMemberList:'/a/u/member/online',


            //九、订单
            //1、新建订单
            order: "/a/u/order",
            //1.1、微信订单详情
            wxOrder: function (id) {
                return " /a/wx/pay/info/" + id;
            },
            //2、保存支付方式
            payWay: function (id) {
                return " /a/u/order/pay/" + id;
            },

            //3、保存支付结果、发送邮件/解锁课程课时
            result: function (id) {
                return " /a/u/order/result/" + id;
            },

            //4、会员发送资料接口
            memberEmailData:function(id){
                return " /a/u/member/paper/"+id
            },
        }
    })
