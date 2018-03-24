/**
 * Created by Master on 2017/3/13.
 */
'use strict';
angular.module('admin')
    // .constant('fontCollection', {
    //         font: [{
    //             type: 1, name: "苹方",
    //         }, {
    //             type: 2, name: "苹方中粗",
    //         }, {
    //             type: 3, name: "斜体",
    //         }]
    //  })
    //  .filter('fontFilter',function(fontCollection){
    //     return function(type){
    //         if(type){
    //             console.log(fontCollection[type-1]);
    //             console.log(fontCollection);
    //               return fontCollection.font[type-1].name;
    //         }

    //     }
    //  })

.constant('userOptions', {
        sex: [{
                type: '',
                name: "全部"
            },
            {
                type: 0,
                name: "男"
            }, {
                type: 1,
                name: "女"
            }
        ],
    grade: [{
        type: '',
        name: "全部"
    }, {
        type: 1,
        name: "一年级"
    }, {
        type: 2,
        name: "二年级"
    }, {
        type: 3,
        name: "三年级"
    }, {
        type: 4,
        name: "四年级"
    }, {
        type: 5,
        name: "五年级"
    }, {
        type: 6,
        name: "六年级"
    },{
        type: 7,
        name: "初一"
    }, {
        type: 8,
        name: "初二"
    }, {
        type: 9,
        name: "初三"
    }, {
        type: 10,
        name: "高一"
    }, {
        type: 11,
        name: "高二"
    }, {
        type: 12,
        name: "高三"
    }, {
        type: 13,
        name: "未选择"
    }],
        status: [{
            type: '',
            name: "全部"
        }, {
            type: 1,
            name: "正常"
        }, {
            type: 2,
            name: "冻结"
        }],
        changeStatus: [{
            type: 1,
            name: "冻结"
        }, {
            type: 2,
            name: "解冻"
        }]

    })
    .constant('articleOptions', {
        type: [{
            type: 1,
            name: "Banner文章",
        }, {
            type: 2,
            name: "Card文章",
        }],
        status: [{
            type: 1,
            name: "上架",
        }, {
            type: 2,
            name: "下架",
        }],
        stickyBtn: [{
            type: 1,
            name: '置顶'
        }, {
            type: 2,
            name: '取消置顶'
        }]
    })
    .constant('bannerOptions', {
        status: [{
            type: 1,
            name: "上架",
        }, {
            type: 2,
            name: "下架",
        }],
        type: [{
            type: 1,
            name: "链接",
        }, {
            type: 2,
            name: "教材同步",
        }],
        grade: [{
            type: 4,
            name: '小学部'
        },{
            type: 1,
            name: '初中部'
        }, {
            type: 2,
            name: '高中部'
        }, {
            type: 3,
            name: '留学部'
        }],
    })
    .constant('status', {
        1: "上架",
        2: "下架"
    })
    .constant('memberOptions', [{
        type:4,    name: "全部"
        },{
        type:1,    name:'会员'
        }, {
        type:2,    name: "非会员"
            }
    ])
    .constant('memberType',[{
        type:1,name:'会员'
    },{
        type:2,name:'非会员'
    },{
        type:3,name:'游客'
    }])

    .constant('systemType',[{
        type:1,name:'web'
    },{
        type:2,name:'android'
    },{
        type:3,name:'ios'
    }])

    .constant('videoOptions', {
        status: [{
            type: '',
            name: "全部",
        }, {
            type: 1,
            name: "上架",
        }, {
            type: 2,
            name: "下架",
        }],
        type: [{
            type: 1,
            name: "Banner图",
        }, {
            type: 2,
            name: "Card视频",
        }],
        gradeList: [{
            type: '',
            name: "全部"
        }, {
            type: 1,
            name: "初一"
        }, {
            type: 2,
            name: "初二"
        }, {
            type: 3,
            name: "初三"
        }, {
            type: 4,
            name: "高一"
        }, {
            type: 5,
            name: "高二"
        }, {
            type: 6,
            name: "高三"
        }, {
            type: 7,
            name: "国际竞赛"
        }, {
            type: 8,
            name: "SAT 2"
        }],

        subjectList: [{
            type: '',
            name: "全部"
        }, {
            type: 1,
            name: "语文"
        }, {
            type: 2,
            name: "数学"
        }, {
            type: 3,
            name: "英语"
        }, {
            type: 4,
            name: "物理"
        }, {
            type: 5,
            name: "化学"
        }, {
            type: 6,
            name: "生物"
        }, {
            type: 7,
            name: "历史"
        }, {
            type: 8,
            name: "地理"
        }, {
            type: 9,
            name: "政治  "
        }, {
            type: 10,
            name: "AMC10"
        }, {
            type: 11,
            name: "AMC12"
        }, {
            type: 12,
            name: "Euclid"
        }, {
            type: 13,
            name: "Phy Bowl"
        }, {
            type: 14,
            name: "Math level 2"
        }, {
            type: 15,
            name: "Physics"
        }, {
            type: 16,
            name: "Chemistry"
        }],
        gradeDetail: [{
            type: 1,
            name: "初一"
        }, {
            type: 2,
            name: "初二"
        }, {
            type: 3,
            name: "初三"
        }, {
            type: 4,
            name: "高一"
        }, {
            type: 5,
            name: "高二"
        }, {
            type: 6,
            name: "高三"
        }, {
            type: 7,
            name: "国际竞赛"
        }, {
            type: 8,
            name: "SAT 2"
        }],
        subjectDetail: [{
            type: 1,
            name: "语文"
        }, {
            type: 2,
            name: "数学"
        }, {
            type: 3,
            name: "英语"
        }, {
            type: 4,
            name: "物理"
        }, {
            type: 5,
            name: "化学"
        }, {
            type: 6,
            name: "生物"
        }, {
            type: 7,
            name: "历史"
        }, {
            type: 8,
            name: "地理"
        }, {
            type: 9,
            name: "政治"
        }, {
            type: 10,
            name: "AMC10"
        }, {
            type: 11,
            name: "AMC12"
        }, {
            type: 12,
            name: "Euclid"
        }, {
            type: 13,
            name: "Phy Bowl"
        }, {
            type: 14,
            name: "Math level 2"
        }, {
            type: 15,
            name: "Physics"
        }, {
            type: 16,
            name: "Chemistry"
        }],
        rankBtn: [{
            type: 1,
            name: '置顶'
        }, {
            type: 2,
            name: '取消置顶'
        }]
    })
    .constant('postsOptions', {
        type: [{
            type: 2,
            name: '精选'
        }, {
            type: 1,
            name: '普通'
        }],
        grade: [{
            type: 4,
            name: '小学部'
        }, {
            type: 1,
            name: '初中部'
        }, {
            type: 2,
            name: '高中部'
        }, {
            type: 3,
            name: '留学部'
        }],
        sticky: [{
            type: 1,
            name: '普通'
        }, {
            type: 2,
            name: '置顶'
        }],
        digestBtn: [{
            type: 1,
            name: '加精'
        }, {
            type: 2,
            name: '取精'
        }],
        stickyBtn: [{
            type: 1,
            name: '置顶'
        }, {
            type: 2,
            name: '取消置顶'
        }]
    })
    //公告管理
    .constant('noticeOptions', {
        status: { 1: "上架", 2: "下架" }
    })
    //按钮文本
    .constant('btnOptions', {
        recommendBtn: [{
            type: 1,
            name: '推荐'
        }, {
            type: 2,
            name: '取消推荐'
        }],
        stickyBtn: [{
            type: 1,
            name: '置顶'
        }, {
            type: 2,
            name: '取消置顶'
        }]
    })
    //
    .constant('packageOptions', {
        statusContent: { "upStatus": "确认上架", "downStatus": "下架将无法从前台订购该套餐，确认下架？" }
    })
    //卡券管理状态
    .constant('cardStatusType', [
        { id: 1, name: '未使用' },
        { id: 2, name: '已使用' },
        { id: 3, name: '已过期' }
    ])
    //课程管理
    /*修改*/
    .constant('courseOption', {
        grade: [{
                type: '',
                name: '全部'
            },
            {
                type: 4,
                name: '小学部'
            },
            {
                type: 1,
                name: '初中部'
            }, {
                type: 2,
                name: '高中部'
            }, {
                type: 3,
                name: '留学部'
            }
        ],
        addGrade: [
            {
                type: 4,
                name: '小学部'
            },
            {
                type: 1,
                name: '初中部'
            }, {
                type: 2,
                name: '高中部'
            }, {
                type: 3,
                name: '留学部'
            }
        ],
        subjectList: [{
            type: '',
            name: "全部"
        }, {
            type: 1,
            name: "语文"
        }, {
            type: 2,
            name: "数学"
        }, {
            type: 3,
            name: "英语"
        }, {
            type: 4,
            name: "物理"
        }, {
            type: 5,
            name: "化学"
        }, {
            type: 6,
            name: "生物"
        }, {
            type: 7,
            name: "历史"
        }, {
            type: 8,
            name: "地理"
        }, {
            type: 9,
            name: "政治  "
        }],
        status: [{
            type: '',
            name: "全部",
        }, {
            type: 1,
            name: "上架",
        }, {
            type: 2,
            name: "下架",
        }]
    })
    //任务管理
    .constant('taskOption', {
        grade: [{
                type: '',
                name: '全部'
            },
            {
                type: 4,
                name: '小学部'
            },
            {
                type: 1,
                name: '初中部'
            }, {
                type: 2,
                name: '高中部'
            }, {
                type: 3,
                name: '留学部'
            }
        ],
        subjectList: [{
            type: '',
            name: "全部"
        }, {
            type: 1,
            name: "语文"
        }, {
            type: 2,
            name: "数学"
        }, {
            type: 3,
            name: "英语"
        }, {
            type: 4,
            name: "物理"
        }, {
            type: 5,
            name: "化学"
        }, {
            type: 6,
            name: "生物"
        }, {
            type: 7,
            name: "历史"
        }, {
            type: 8,
            name: "地理"
        }, {
            type: 9,
            name: "政治  "
        }],

        taskType: [{
            type: '',
            name: "全部"
        }, {
            type: 1,
            name: "视频"
        }, {
            type: 2,
            name: "习题"
        }],
        status: [{
            type: '',
            name: "全部"
        }, {
            type: 1,
            name: "上架"
        }, {
            type: 2,
            name: "下架"
        }],
        difficultyLevel:[{
            type:'',
            name:"全部"
        },{
            type:1,
            name:"level 1"
        },{
            type:2,
            name:"level 2"
        },{
            type:3,
            name:"level 3"
        },{
            type:4,
            name:"level 4"
        },{
            type:5,
            name:"level 5"
        }],
        specificType:[{
            type:'',
            name:"全部"
        },{
            type:1,
            name:"教学视频"
        },{
            type:2,
            name:"刷题先锋"
        }],
        showLevel:[{
            type:0,
            name:"不展示"
        },{
            type:1,
            name:"展示"
        }],
        //用于过滤任务列表的难度等级
        level:[{
            type:'',
            name:""
        },{
            type:1,
            name:"level 1"
        },{
            type:2,
            name:"level 2"
        },{
            type:3,
            name:"level 3"
        },{
            type:4,
            name:"level 4"
        },{
            type:5,
            name:"level 5"
        }]
    })
    //任务管理(新增视频)
    .constant('radioOption', {
        radioType: [{
            type: 1,
            name: '教学视频'
        }, {
            type: 2,
            name: '刷题先锋'
        }]
    })
    .constant('editType', {
        task: {
            delete: "确定删除该任务",
            up: "是否上架该任务",
            down: "是否下架该任务"
        }
    })
    //内容风格——字体、字号、字色
    .constant('contentStyle',{
            appFontSize:[{
                type:'24px',
                name:'24px'
            },{
                type:'26px',
                name:'26px'
            },{
                type:'28px',
                name:'28px'
            },{
                type:'30px',
                name:'30px'
            },{
                type:'32px',
                name:'32px'
            },{
                type:'36px',
                name:'36px'
            }],
            pcFontSize:[{
                type:'14px',
                name:'14px'
            },{
                type:'16px',
                name:'16px'
            },{
                type:'18px',
                name:'18px'
            },{
                type:'20px',
                name:'20px'
            }],
            font:[{
                type:'1',
                name:'苹方'
            },{
                type:'2',
                name:'苹方中粗'
            },{
                type:'3',
                name:'斜体'
            }],
            fontColor:[{
                type:'#333333',
                name:'#333333'
            },{
                type:'#65a9fc',
                name:'#65a9fc'
            },{
                type:'#e9101b',
                name:'#e9101b'
            },{
                type:'#ffc600',
                name:'#ffc600'
            },{
                type:'#ff7800',
                name:'#ff7800'
            },{
                type:'#cccccc',
                name:'#cccccc'
            },{
                type:'#919191',
                name:'#919191'
            },{
                type:'#999999',
                name:'#999999'
            }]
        })
    //专题新增——字体、字号、字色
    // .constant('contentStyleLesson',{
    //         appFontSize:[{
    //             type:'30px',
    //             name:'30px'
    //         },{
    //             type:'36px',
    //             name:'36px'
    //         },{
    //             type:'54px',
    //             name:'54px'
    //         }],
    //         pcFontSize:[{
    //             type:'30px',
    //             name:'30px'
    //         },{
    //             type:'36px',
    //             name:'36px'
    //         },{
    //             type:'54px',
    //             name:'54px'
    //         }],
    //         font:[{
    //             type:'1',
    //             name:'苹方-简'
    //         },{
    //             type:'2',
    //             name:'苹方-中粗'
    //         },{
    //             type:'3',
    //             name:'平方简体'
    //         },{
    //             type:'4',
    //             name:'平方中黑'
    //         }],
    //         fontColor:[{
    //             type:'#ff0000',
    //             name:'#ff0000'
    //         },{
    //             type:'#4dc4ff',
    //             name:'#4dc4ff'
    //         },{
    //             type:'#333333',
    //             name:'#333333'
    //         }]
    //     })