/**
 * Created by Administrator on 2017\9\24 0024..
 */
"use strict";
angular.module("myApp")
    .factory("main", ["$http", "_path", function($http, _path) {
        return {
            //数据埋点
            postDataBurialPoint:function(params){
                return $http.post(_path.DataBurialPoint(),params);
            },
            //收藏夹
            getFavorites: function(params) {
                return $http.get(_path.favorites(), { params: params });
            },
            //购买专题
            getPuychased: function() {
                return $http.get(_path.puychased())
            },
            //学习记录
            getStudyHistory: function(params) {
                return $http.get(_path.studyHistory(), { params: params })
            },
            //用户登出
            postUserLoginOut: function() {
                return $http.post(_path.userLoginOut())
            },
            //用户签到
            putSign: function() {
                return $http.put(_path.sign())
            },
            //用户详情
            getUserMsg: function() {
                return $http.get(_path.userMsg())
            },
            //签到详情
            getSignDetail: function(params) {
                return $http.get(_path.signDetail(), { params: params })
            }
        }
    }])
    .factory("home", ["$http", "_path", function($http, _path) {
        return {
            //科目列表
            getSubjectList: function(gradeDept,params) {
                return $http.get(_path.subjectList(gradeDept),{params:params})
            },
            //图片列表
            getImgList: function() {
                return $http.get(_path.imgList())
            },
            //公告
            getNotive: function() {
                return $http.get(_path.notive())
            },
            //微信用code交换用户信息
            getOpenid: function(params) {
                return $http.get(_path.openid(),{params:params})
            }
        }
    }])
    .factory("user", ["$http", "_path", function($http, _path) {
        return {
            //注册
            postRegister: function(params) {
                return $http.post(_path.register(), params)
            },
            //普通登录
            postLogin: function(params) {
                return $http.post(_path.login(), params)
            },
            //验证手机是否属于当前用户
            getVifPhone:function (params) {
                return $http.get(_path.vifPhone(),{params:params})
            },
            //验证验证码是否正确
            getVifVerify:function (params) {
                return $http.get(_path.vifVerify(),{params:params})
            },

            //微信登录
            postwxLogin: function(params) {
                return $http.post(_path.wxLogin(), params)
            },
            ////检测手机号或者邮箱是否已经绑定过微信
            getWechatBindInfo: function(params) {
                return $http.get(_path.weChatBindInfo(),{params:params})
            },
            // 验证手机号是否注册
            getVifNewPhone:function (params) {
                return $http.get(_path.vifNewPhone(),{params:params});
            },
            //老用户绑定手机
            putBindPhone: function(params) {
                return $http.put(_path.bindPhone(), params)
            },
            //保存个人资料
            postSaveUserData: function(params) {
                return $http.put(_path.saveUserData(), params)
            },
            //上传头像
            uploadImage:function(params) {
                return $http.post(_path.uploadImage(), params)
            },
            //验证手机
            getVerifyPhone: function(params) {
                return $http.get(_path.verifyPhone(), params)
            },
            //验证用户名是否重复
            getVerifyAccount: function(params) {
                return $http.get(_path.verifyAccount(),{params:params})
            },
            //验证图形验证码是否重复
            getCaptcha: function(params) {
                return $http.get(_path.captcha(), { params: params })
            },
            //修改密码
            putMdfPwd: function( params) {
                return $http.put(_path.mdfPwd(), params)
            },
            //忘记密码里面修改密码
            putForgetEditCode: function( params) {
                return $http.put(_path.forgetEditCode, params)
            },
            //发送短信验证码
            postSendCode: function(params) {
                return $http.post(_path.sendCode(), params)
            },
            //发送邮箱验证码
            postSendMailCode: function(params) {
                return $http.post(_path.sendMailCode(), params)
            },
            //发送语音验证码
            postSendVoice: function(params) {
                return $http.post(_path.sendVoice(), params)
            },
            //验证手机
            postCodeSend: function(params) {
                return $http.post(_path.codeSend, params)
            },
            //验证手机
            postMailSend: function(params) {
                return $http.post(_path.mailSend, params)
            },
            //个人详情
            getUserDetail: function(id) {
                return $http.get(_path.userDetail(id))
            },
            //修改个人详情(昵称，年级，头像)
            postUserDetail: function(params) {
                return $http.post(_path.userChange(params))
            },
            //删除收藏课程
            putFavorite: function(id, params) {
                return $http.put(_path.deleteFavorites(id), params)
            },
            //删除学习记录
            deleteSingleHistory: function(id, params) {
                return $http.delete(_path.deleteSingleHistory(id),{params:params})
            },
            //删除所有学习记录
            deleteAllHistory: function(params) {
                return $http.delete(_path.deleteAllHistory(),{params:params})
            },
            //开通会员
            putOpenVip: function(params) {
                return $http.put(_path.openVip(), params)
            },
            //续费会员
            putRenewVip: function(userId, params) {
                return $http.put(_path.renewVip(userId), params)
            },
            //套餐列表
            getMember: $http.get(_path.member),
            //获取订单号
            postOrder: function(params) {
                return $http.post(_path.order, params)
            },
            //获取订单状态
            getPayStatus: function(id) {
                return $http.get(_path.payStatus(id))
            },
            //卡券激活
            putMemberActive: function(params) {
                return $http({
                    url: _path.memberActive(),
                    method: "put",
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            },
            //微信支付订单信息
            getWeixinOrder: function(oid) {
                return $http.get(_path.getWeixinOrder(oid))
            },

          //手机微信支付订单信息
            mobileGetWeixinOrder:function(oid) {
                return $http.get(_path.mobileGetWeixinOrder(oid))
            },
            //微信支付结果查询
            getWeixinOrderResult: function(oid) {
                return $http.get(_path.getWeixinOrderResult(oid))
            },
            //保存支付方式
            savePayWay:function(oid,params){
                return $http.put(_path.savePayWay(oid),params)
            },
            //后去套餐信息
            getMemberDetail:function(id){
                return $http.get(_path.getMemberDetail(id))
            },
            //保存支付结果
            saveOrderDetail:function(oid,params){
                return $http.put(_path.saveOrderDetail(oid),params)
            },
            //支付宝APP支付
            //获取私钥
            appKey:function (oid) {
                return $http.get(_path.appKey(oid))
            },
            //查询订单状态
            getOrder:function (oid) {
                return $http.get(_path.getOrder(oid))
            }
        }
    }])
    .factory("special", ["$http", "_path", function($http, _path) {
        return {
            //专题简介
            getSubjectIntro:function(periodId){
                return $http.get(_path.getSubjectIntro(periodId))
            },
            //专题详情(包含课程列表)
            getSpecialDetail: function(specialId,params) {
                return $http.get(_path.special(specialId),{params:params})
            },
            //课程详情
            getCourseDetail: function(periodId) {
                return $http.get(_path.courseDetail(periodId))
            },
            //上一个课程
            getPreviousCourse: function(periodId) {
                return $http.get(_path.previousCourse(periodId))
            },
            //下一个课程
            getNextCourse: function(periodId) {
                return $http.get(_path.nextCourse(periodId))
            },
            //任务列表
            getTaskList: function(periodId) {
                return $http.get(_path.taskList(periodId))
            },
            //任务详情
            getTaskDetail: function(taskId,params) {
                return $http.get(_path.practice(taskId),{params:params})
            },
            //获取收藏状态
            getisCollection: function(taskId) {
                return $http.get(_path.collection(taskId))
            },
            //改变收藏状态
            changeCollection: function(taskId, params) {
                return $http.put(_path.changeCollection(taskId), params)
            }

        }
    }])