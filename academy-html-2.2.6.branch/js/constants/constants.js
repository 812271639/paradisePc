/**
 * Created by Master on 2017/2/25.
 */
'use strict'
angular.module('paradiseApp')
    .constant('signinData', {
        sign: [{
            type: 0, name: '签到'
        }, {
            type: 1, name: '已签到'
        }]

    })

    .constant('identityData', {
        grade: [{
            type: 7, name: "未选择"
        }, {
            type: 1, name: "初一"
        }, {
            type: 2, name: "初二"
        }, {
            type: 3, name: "初三"
        }, {
            type: 4, name: "高一"
        }, {
            type: 5, name: "高二"
        }, {
            type: 6, name: "高三"
        }]
    })
    .constant('videoData', {
        grade: [{
            type: 1, name: '初一'
        }, {
            type: 2, name: '初二'
        }, {
            type: 3, name: '初三'
        }, {
            type: 4, name: '高一'
        }, {
            type: 5, name: '高二'
        }, {
            type: 6, name: '高三'
        }, {
            type: 7, name: '国际竞赛'
        }, {
            type: 8, name: 'SAT 2'
        }, {
            type: '', name: '全部'
        }],
        subject: [{
            type: 1, name: '数学'
        }, {
            type: 2, name: '语文'
        }, {
            type: 3, name: '英语'
        }, {
            type: 4, name: '物理'
        }, {
            type: 5, name: '化学'
        }, {
            type: 6, name: '生物'
        }],

    })
    .constant('textMobile', {
        name: '手机：',
        tip1: "同学，输入一个能接收验证码的手机号",
        tip2: '请输入手机验证码',
        tipsFmtErr: "请输入正确格式的手机号",
        tipsHas: "该手机号已绑定",
        codeErr: '验证码错误',
        codeSent: '验证码已发送',
        codeFail: '验证超过3次，请明日再试',
        success: '绑定成功'
    })
    .constant('textMail', {
        name: '邮箱：',
        tip1: "请输入真实的邮箱账号",
        tip2: '请输入邮箱验证码',
        tipsFmtErr: "请输入正确格式的邮箱",
        tipsHas: "该邮箱已绑定",
        codeErr: '验证码错误',
        codeSent: '验证码已发送',
        codeFail: '验证超过3次，请明日再试',
        success: '绑定成功'
    })
    .constant('human', [
        {name:'铁柱：',word:'我原本玉树凌风，是中了魔法才变成这样的，需要小姐姐的亲亲才能恢复。'},
        {name:'张小花：',word:'点我其实没什么功能，你再点一下我就消失了。'},
        {name:'橙大白：',word:'劳逸结合才是学习之根本，我看你是有缘人，我这里有本《抱佛脚300天》你要不要看看？'},
        {name:'大科学家牛炖：',word:'少侠，你不去学习在这里瞎点我做什么。'},
    ]);
