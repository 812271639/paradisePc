/**
 * Created by Master on 2017/3/13.
 */
'use strict';
angular.module('myApp')
     .constant('fontCollection', {
            font: [{
                type: '1', name: "sans-serif",
            }, {
                type: '2', name: "fantasy",
            }, {
                type: '3', name: "serif",
            }]
     })

     .filter('fontFilter',function(fontCollection){
        return function(type){
            if(type){
                  return fontCollection.font[type - 1].name;
            }

        }

     })
    .constant('userMsg',{
        collectType:[{
            //点赞
            type:1
        },
            {
                //收藏
                type:2
            },
            {
                //学习记录
                type:3
            }
        ]
    })
    .constant('userOptions', {
        sex: [{
            type: '', name: "全部"
        },
            {
                type: 0, name: "男"
            }, {
                type: 1, name: "女"
            }],
        grade: [{
            type: '', name: "请选择"
        }, {
            type: 7, name: "一年级"
        },{
            type: 8, name: "二年级"
        },{
            type: 9, name: "三年级"
        },{
            type: 10, name: "四年级"
        },{
            type: 11, name: "五年级"
        },{
            type: 12, name: "六年级"
        },{
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
        }],
        status: [{
            type: '', name: "全部"
        }, {
            type: 1, name: "正常"
        }, {
            type: 2, name: "冻结"
        }],
        changeStatus: [{
            type: 1, name: "冻结"
        }, {
            type: 2, name: "解冻"
        }],
        gradeDept: [{
            type:0,name:'小学部'
        },{
            type:1,name:'初中部'
        },{
            type:2,name: '高中部'
        },{
            type:3,name: '留学部'
        }]

    })
    .constant('articleOptions', {
        type: [{
            type: 1, name: "Banner文章",
        }, {
            type: 2, name: "Card文章",
        }],
        status: [{
            type: 1, name: "上架",
        }, {
            type: 2, name: "下架",
        }],
	    stickyBtn:[{
		    type:1,name:'置顶'
	    },{
		    type:2,name:'取消置顶'
	    }]
    })
     .constant('bannerOptions', {
            status: [{
                type: 1, name: "上架",
            }, {
                type: 2, name: "下架",
            }]
     })
	.constant('status',{
		1:"上架",
		2:"下架"
	})
    .constant('videoOptions', {
        status: [{
            type: '', name: "全部",
        }, {
            type: 1, name: "上架",
        }, {
            type: 2, name: "下架",
        }],
        type: [{
            type: 1, name: "Banner图",
        }, {
            type: 2, name: "Card视频",
        }],
        gradeList: [{
            type: '', name: "全部"
        }, {
            type: 1, name: "一年级"
        },{
            type: 2, name: "二年级"
        },{
            type: 3, name: "三年级"
        },{
            type: 4, name: "四年级"
        },{
            type: 5, name: "五年级"
        },{
            type: 6, name: "六年级"
        },{
            type: 7, name: "初一"
        }, {
            type: 8, name: "初二"
        }, {
            type: 9, name: "初三"
        }, {
            type: 10, name: "高一"
        }, {
            type: 11, name: "高二"
        }, {
            type: 12, name: "高三"
        },{
            type: 13, name: "未选择" +
            ""
        }],

        subjectList: [{
            type: '', name: "全部"
        }, {
            type: 1, name: "语文"
        }, {
            type: 2, name: "数学"
        }, {
            type: 3, name: "英语"
        }, {
            type: 4, name: "物理"
        }, {
            type: 5, name: "化学"
        }, {
            type: 6, name: "生物"
        }, {
            type: 7, name: "历史"
        }, {
            type: 8, name: "地理"
        }, {
            type: 9, name: "政治  "
        }],
        gradeDetail: [{
            type: 7, name: "一年级"
        },{
            type: 8, name: "二年级"
        },{
            type: 9, name: "三年级"
        },{
            type: 10, name: "四年级"
        },{
            type: 11, name: "五年级"
        },{
            type: 12, name: "六年级"
        },{
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
        }],
        subjectDetail: [{
            type: 1, name: "语文"
        }, {
            type: 2, name: "数学"
        }, {
            type: 3, name: "英语"
        }, {
            type: 4, name: "物理"
        }, {
            type: 5, name: "化学"
        }, {
            type: 6, name: "生物"
        }, {
            type: 7, name: "历史"
        }, {
            type: 8, name: "地理"
        }, {
            type: 9, name: "政治"
        }],
	    rankBtn:[{
		    type:1,name:'置顶'
	    },{
		    type:2,name:'取消置顶'
	    }]
    })
    .constant('postsOptions',{
        type:[{
            type:2,name:'精选'
         },{
            type:1,name:'普通'
         }],
        grade: [{
            type:0,name:'小学部'
        },{
            type:1,name:'初中部'
        },{
            type:2,name: '高中部'
        }],
        sticky:[{
            type:1,name:'普通'
        },{
            type:2,name:'置顶'
        }],
        digestBtn:[{
            type:1,name:'加精'
        },{
            type:2,name:'取精'
        }],
        stickyBtn:[{
            type:1,name:'置顶'
        },{
            type:2,name:'取消置顶'
        }]
    })
	//公告管理
	.constant('noticeOptions',{
		status:{1:"上架",2:"下架"}
	})
	//按钮文本
	.constant('btnOptions',{
		recommendBtn:[{
			type:1,name:'推荐'
		},{
			type:2,name:'取消推荐'
		}],
		stickyBtn:[{
			type:1,name:'置顶'
		},{
			type:2,name:'取消置顶'
		}]
	})
	//
	.constant('packageOptions',{
		statusContent:{"upStatus":"确认上架","downStatus":"下架将无法从前台订购该套餐，确认下架？"}
	})
	//卡券管理状态
	.constant('cardStatusType', [
		{id: 1, name: '未使用'},
		{id: 2, name: '已使用'},
		{id: 3, name: '已过期'}
	])
  //课程管理
  .constant('courseOption',{
    grade: [{
      type:'',name:'全部'
    },{
        type:0,name:'小学部'
        },
      {
        type:1,name:'初中部'
    },{
        type:2,name: '高中部'
    }],
    subjectList: [{
        type: '', name: "全部"
    }, {
        type: 1, name: "语文"
    }, {
        type: 2, name: "数学"
    }, {
        type: 3, name: "英语"
    }, {
        type: 4, name: "物理"
    }, {
        type: 5, name: "化学"
    }, {
        type: 6, name: "生物"
    }, {
        type: 7, name: "历史"
    }, {
        type: 8, name: "地理"
    }, {
        type: 9, name: "政治  "
    }],
    status: [{
        type: '', name: "全部",
    }, {
        type: 1, name: "上架",
    }, {
        type: 2, name: "下架",
    }]
  })
  //任务管理
  .constant('taskOption',{
    grade: [{
      type:'',name:'全部'
    },{
        type:0,name:'小学部'
        },
      {
        type:1,name:'初中部'
    },{
        type:2,name: '高中部'
    }],
    subjectList: [{
        type: '', name: "全部"
    }, {
        type: 1, name: "语文"
    }, {
        type: 2, name: "数学"
    }, {
        type: 3, name: "英语"
    }, {
        type: 4, name: "物理"
    }, {
        type: 5, name: "化学"
    }, {
        type: 6, name: "生物"
    }, {
        type: 7, name: "历史"
    }, {
        type: 8, name: "地理"
    }, {
        type: 9, name: "政治  "
    }],
    taskList :[{
      type:'',name:"全部"
    },{
      type:'1',name:"习题"
    },{
      type:'2',name:"视频"
    }],
    status: [{
        type: '', name: "全部",
    }, {
        type: 1, name: "上架",
    }, {
        type: 2, name: "下架",
    }]
  })
  //任务管理(新增视频)
  .constant('radioOption',{
    radioType:[
      {
        type:1, name:'教学视频'
      },{
        type:2, name:'刷题先锋'
      }
    ]
  })
