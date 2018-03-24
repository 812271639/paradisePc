'use strict';
//mock为false时，用假数据，为true时，用接口数据
var mock = true;
angular.module('admin')


//用户服务
.factory('userService', function($http, _path) {
    return {
        //用户列表
        userList: function(params) {
            return $http.get(_path.userList(), { params: params });
        },
        //用户详情
        userDetail: function(id) {
            return $http.get(_path.userDetail(id));
        },
        //修改用户状态
        userStatus: function(id, params) {
            return $http.put(_path.userStatus(id), params);
        },
        //批量导入用户
        userListImport:function (params) {
            return $http.post(_path.userListImport(),params);
        }
    }
})

.factory('articleService', function($http, _path) {
        return {
            //文章列表
            articleList: function(params) {
                return $http.get(_path.articleList(), { params: params });
            },
            //文章详情
            articleDetail: function(id) {
                return $http.get(_path.articleDetail(id));
            },
            //文章编辑修改|新增
            articleEdit: function(id, params) {
                return id ? $http.put(_path.articleDetail(id), params) : $http.post(_path.articleDetail(), params)
            },
            //文章状态
            articleStatus: function(id, status) {
                return $http.put(_path.articleStatus(id), { params: { id: id, status: status } });
            },
            //文章排序
            artlcleSort: function(params) {
                return $http.post(_path.articleSort(), params)
            },
            //文章置顶
            articleSticky: function(id) {
                return $http.put(_path.articleSticky(id))
            }
        }
    })
    .factory('bannerService', function($http, _path) {
        return {
            //banner列表
            bannerList: function(params) {
                return $http.get(_path.bannerList(), { params: params });
            },
            //banner详情
            bannerDetail: function(id) {
                return $http.get(_path.bannerDetail(id));
            },
            //banner编辑修改|新增
            bannerEdit: function(id, params) {
                return id ? $http.put(_path.bannerEdit(id), params) : $http.post(_path.bannerEdit(), params)
            },
            //banner状态
            bannerStatus: function(id, status) {
                return $http.put(_path.bannerStatus(id ,status));
            },
            //banner排序
            bannerSort: function(params) {
                return $http({
                    url: _path.bannerSort(),
                    method: "POST",
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                    data: JSON.stringify(params),
                    transformRequest: function (data, headersGetter) {
                        return data;
                    }
                });
            },
            //banner删除
            bannerDelete: function(id) {
                return $http.delete(_path.bannerDelete(id))
            }
        }
    })
    .factory('helpService', function($http, _path) {
        return {
            //帮助列表
            helpList: function(params) {
                return $http.get(_path.helpList(), { params: params });
            },
            //help删除
            helpDelete: function(id) {
                return $http.delete(_path.helpDelete(id))
            },
            //help详情
            helpDetail: function(id) {
                return $http.get(_path.helpDetail(id));
            },
            //help编辑修改|新增
            helpEdit: function(id, params) {
                return id ? $http.put(_path.helpEdit(id), params) : $http.post(_path.helpEdit(), params)
            },
        }
    })
    .factory('videoService', function($http, _path) {
        return {
            //视频列表
            videoList: function(params) {
                return $http.get(_path.videoList(), { params: params });
            },
            //视频详情
            videoDetail: function(id) {
                return $http.get(_path.videoDetail(id));
            },
            //视频编辑修改|新增
            videoEdit: function(id, params, url) {
                return id ? $http.put(_path.videoDetail(id) + url, params) : $http({
                    url: _path.videoDetail() + url,
                    method: 'POST',
                    // headers: {'Content-Type': 'text/html; charset=utf-8'},
                    data: params
                })
            },
            //视频状态
            videoStatus: function(id, status) {
                return $http.put(_path.videoStatus(id), { params: { id: id, status: status } });
            },
            //视频排序
            artlcleSort: function(params) {
                return $http.post(_path.videoSort(), params)
            },
            //视频置顶
            videoRank: function(id) {
                return $http.put(_path.videoRank(id));
            }
        }
    })
    //教师
    .factory('teacherService', function($http, _path) {
        return {
            //视频列表
            teacherList: function(params) {
                return $http.get(_path.teacherList(), { params: params });
            },
            //视频详情
            teacherDetail: function(id) {
                return $http.get(_path.teacherDetail(id));
            },
            //视频编辑修改|新增
            teacherEdit: function(id, params) {
                return id ? $http.delete(_path.teacherDetail(id)) : $http.post(_path.teacherDetail(), params)
            },
            //视频状态
            teacherStatus: function(id, status) {
                return $http.put(_path.teacherStatus(id), { params: { id: id, status: status } });
            },
            //视频排序
            artlcleSort: function(params) {
                return $http.post(_path.teacherSort(), params)
            }
        }
    })
    //帖子管理
    .factory('postsService', function($http, _path) {
        return {
            //帖子列表
            postsList: function(params) {
                return $http.get(_path.postsList(), { params: params });
            },
            //帖子数量
            postsCount: function() {
                return $http.get(_path.postsCount());
            },
            //帖子详情
            postsDetail: function(id) {
                return $http.get(_path.postsDetail(id));
            },
            //帖子回复
            postsReply: function(id, params) {
                return $http.get(_path.postsReply(id), { params: params });
            },
            //删除回复
            postsReplyDelete: function(id) {
                return $http.delete(_path.postsReplyDelete(id));
            },
            //帖子加精华、取消精华
            postsDigest: function(id) {
                return $http.put(_path.postsDigest(id));
            },
            //置顶与取消
            postsSticky: function(id) {
                return $http.put(_path.postsSticky(id));
            },
            //删除帖子
            postsDelete: function(id) {
                return $http.delete(_path.postsDetail(id));
            }
        }
    })
    //树洞管理
    .factory('treeHoleService', function($http, _path) {
        return {
            treeHoleList: function(params) {
                return $http.get(_path.treeHoleList(), { params: params });
            },
            treeHoleDelete: function(id) {
                return $http.delete(_path.treeHoleDelete(id));
            }
        }
    })
    //公告管理
    .factory('noticeService', function($http, _path) {
        return {
            noticeList: function(params) {
                return $http.get(_path.noticeList(), { params: params });
            },
            //公告列表
            // noticeList: function (params) {
            //  return $http.get(_path.noticeList(), {params: params});
            // },
            noticeDelete: function(nid) {
                return $http.delete(_path.noticeDelete(nid));
            },
            noticeEdit: function(params, id) {
                return $http.put(_path.noticeEdit(id), params);
            },
            // noticeEdit: function(params,id) {
            //     return $http({
            //         url: _path.noticeEdit(id),
            //         method: "PUT",
            //         headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            //         data: JSON.stringify(params),
            //         transformRequest: function(data, headersGetter) {
            //             return data;
            //         }
            //     });
            // },
            noticeStatus: function(nid, status) {
                return $http.put(_path.noticeStatus(nid, status));
            },
            // noticeAdd: function(params) {
            //     return $http.post(_path.noticeDetail(), params)
            // },
            noticeAdd: function(params) {
                return $http({
                    url: _path.noticeDetail(),
                    method: "POST",
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            },
            noticeDetail: function(nid) {
                return $http.get(_path.noticeDetail(nid));
            }
        }
    })
    //套餐管理
    .factory('packageService', function($http, _path) {
        return {
            packageList: function(params) {
                return $http.get(_path.packageList(), { params: params });
            },
            packageDelete: function(nid) {
                return $http.delete(_path.packageDelete(nid));
            },
            packageEdit: function(id, params) {
                return $http.put(_path.packageEdit(id), params);
            },
            packageStatus: function(nid, status) {
                return $http.put(_path.packageStatus(nid, status));
            },
            packageAdd: function(params) {
                return $http.post(_path.packageDetail(), params)
            },
            packageDetail: function(nid) {
                return $http.get(_path.packageDetail(nid));
            },
            packageRecommend: function(id) {
                return $http.put(_path.packageRecommend(id))
            },
            packageCancelRecommend: function(id) {
                return $http.put(_path.packageCancelRecommend(id));
            }
        }
    })
    //卡卷管理
    .factory('cardService', function($http, _path) {
        return {
            //卡券列表
            getCardList: function(params) {
                return $http.get(_path.getCardList, { params: params })
            },
            //生成卡劵
            createCard: function(params) {
                return $http.post(_path.createCard, params)
            },
            //导出EXL
            toExport: function() {
                return $http.get(_path.toExport)
            }
        }
    })
    //教学管理
    .factory('teachingService', function($http, _path) {
        return {
            //科目列表
            getSubjectList: function(params) {
                return $http.get(_path.subjectList, { params: params });
            },
            //统计页面科目列表请求
            // getsubjectListStatic: function(params) {
            //     return $http.get(_path.subjectListStatic, { params: params });
            // },
            //科目详情
            getSubjectDetail: function(subjectId) {
                return $http.get(_path.subjectDetail(subjectId));
            },
            //新增科目
            postAddSubject: function(params) {
                return $http.post(_path.addSubject, params);
            },
            //编辑科目
            putEditSubject: function(subjectId, params) {
                return $http.put(_path.editSubject(subjectId), params);
            },
            // //保存编辑科目
            // putSaveEditSubject:function (subjectId) {
            //
            // },
            //删除科目
            delSubject: function(subjectId) {
                return $http.delete(_path.deleteSubject(subjectId));
            },
            //科目上下架
            putSubjectUpDowns: function(subjectId, status) {
                return $http.put(_path.subjectUpDowns(subjectId, status));
            },
            //科目排序
            postSubjectSort: function(params) {
                return $http({
                        method: "POST",
                        url: _path.subjectSort(),
                        data: params,
                        headers: { "Content-Type": "application/json" },
                        transformRequest: function(data) {
                            return data
                        }
                    })
                    // return $http.post(_path.subjectSort(),params);
            },

            //专题列表
            getSpecial: function(id, params) {
                return $http.get(_path.special(id), { params: params });
            },
            //统计专用
            getSpecialStatic: function(params) {
                return $http.get(_path.special(), { params: params });
            },
            //专题详情
            getSpecialDetail: function(specialId) {
                return $http.get(_path.specialDetail(specialId));
            },
            //新增专题
            postAddSpecial: function(params) {
                // return $http.post(_path.addSpecial, params);
                return $http({
                    url: _path.addSpecial(),
                    method: "POST",
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            },
            //编辑专题
            putEditSpecial: function(specialId, params) {
                // return $http.put(_path.editSpecial(specialId), params);

                return $http({
                    url: _path.editSpecial(specialId),
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });

                // return $http({
                //     url:_path.editSpecial(specialId),
                //     method:'put',
                //     headers:{'Content-Type':'application/json';'charset=utf-8'},
                //     data:JSON.stringify(params),
                //     transformRequest:function(data,headersGetter){
                //         return data;
                //     }
                // })
            },



            //删除专题
            delSpecial: function(specialId) {
                return $http.delete(_path.deleteSpecial(specialId));
            },
            //专题上下架
            putSpecialUpDowns: function(specialId, status) {
                return $http.put(_path.specialUpDowns(specialId, status));
            },
            //科目排序
            postSpecialSort: function(params) {
                return $http({
                    method: "POST",
                    url: _path.specialSort(),
                    data: params,
                    headers: { "Content-Type": "application/json" },
                    transformRequest: function(data) {
                        return data
                    }
                })
            },
        }
    })

//课程管理
.factory('courseService', function($http, _path) {
    return {

        //课程列表
        getCourse: function(params, id) {
            console.log(id);
            return $http.get(_path.course(id), { params: params });
        },

        // getCourse: function(id,params) {
        //     console.log(id);
        //     return $http.get(_path.course(id), { params: params });
        // },


        //课程详情
        getCourseDetail: function(courseId) {
            return $http.get(_path.courseDetail(courseId));
        },


        //新增课程
        postAddCourse: function(params) {
            return $http.post(_path.addCourse, params);
        },
        //编辑课程
        putEditCourse: function(taskId, params) {
            return $http.put(_path.editCourse(taskId), params);
        },
        //删除课程
        delCourse: function(courseId) {
            return $http.delete(_path.deleteCourse(courseId));
        },
        //课程上下架
        putCourseUpDowns: function(courseId, status) {
            return $http.put(_path.courseUpDowns(courseId, status));
        },
        //课程排序
        postCourseSort: function(params) {
            return $http({
                method: "POST",
                url: _path.courseSort(),
                data: params,
                headers: { "Content-Type": "application/json" },
                transformRequest: function(data) {
                    return data
                }
            })
        },
    }
})

//学校管理

.factory('schoolManage', function($http, _path) {
    return {
        //学校列表
        getSchoolList: function(params) {
            return $http.get(_path.schoolList(), { params: params });
        },
        editSchool: function(id, params) {
            return id ? $http.put(_path.editSchool(id), params) : $http.post(_path.editSchool(id), params);
        }
    }
})

//任务管理
.factory('taskManage', function($http, _path) {
        return {
            //任务详情
            getTaskDetail: function(id) {
                return $http.get(_path.taskDetail(id));
            },
            //任务列表 2017.9.27  by aLeX
            // getTaskList: function(id,params) {
            //     return id ? $http.get(_path.taskList(id), { params: params }) : $http.get(_path.taskList(), { params: params });
            // },


            //任务列表 2017.9.27  by aLeX
            getTaskList: function(id,params) {
                return id ? $http.get(_path.taskList(id), { params: params }) : $http.get(_path.taskList(), { params: params });
            },
            // 统计用--任务列表
             gettaskListStatic: function(params) {
                return $http.get(_path.taskListStatic(), { params: params });
            },
            //任务排序
            getTaskSorting: function(params) {
                return $http({
                    url: _path.taskSort(),
                    method: "POST",
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            },
            //任务上下架
            putTaskUpDowns: function(id, status) {
                return $http.put(_path.taskUpDowns(id, status));
            },
            //新增任务
            addTaskDetail: function(params) {
                //return $http.post(pathProject.addTask,params)
                return $http({
                    url: _path.addTask(),
                    method: "POST",
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            },
            //编辑任务
            editTaskDetail: function(id, params) {
                //return $http.post(pathProject.addTask,params)
                return $http({
                    url: _path.editTask(id),
                    method: "put",
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            },
            deleteTask: function(id) {
                return $http.delete(_path.deleteTask(id));
            }
        }
    })
    .factory('customerService', function($http, _path) {
        return {

            //版本详情列表
            versionDetail: function() {
                return $http.get(_path.versionManage)
            },
            //更新版本详情
            changeVersionDetail: function(id, params) {
                return $http.put(_path.changeVersionManage(id), params)
            },
            newVersion: function(params) {
                return $http.post(_path.newVersionManage, params)
            },
            //意见管理列表
            getOpinionList: function(params) {
                return $http.get(_path.opinionList(),{params:params});
            },
            //查看意见详情
            getCustomerDetail: function(id) {
                return $http.get(_path.opinionManager(id));
            },
            //删除意见
            delCustomerDetail: function(id) {
                return $http.delete(_path.deleteOpinion(id));
            }
        }
    })
    .factory('memberService', function($http, _path) {
        return {

            //会员详情
            getMemberDetail: function(id) {
                return $http.get(_path.memberDetail(id))
            },
            //往期重置
            getOrderList: function(params) {
                return $http.get(_path.orderList(), { params: params })
            },
            //登陆记录
            getLoginRecord: function(id) {
                return $http.get(_path.loginRecord(id))
            },
            //学习记录
            getStudyRecord: function(params) {
                return $http.get(_path.StudyRecord(), { params: params })
            },
            //购买记录
            getPayRecord:function(params){
                return $http.get(_path.getPayRecord(), { params: params })
            },
            //增加逆袭豆
            addScore: function(id,params) {
                return $http.put(_path.addScore(id), params)
            },
            //换手机
            changePhone: function(id,params) {
                return $http.put(_path.changePhone(id), params)
            }
        }
    })

    .factory('advertisingService', function($http, _path) {
        return {

            //广告列表
            getAdvertisingList: function(params) {
                return $http.get(_path.getAdvertisingList,{params:params})
            },
            //广告详情
            getAdvertisingDetail: function(id) {
                return $http.get(_path.getAdvertisingDetail(id))
            },
            //编辑广告
            changeAdvertising: function(id,params) {
                return $http.put(_path.changeAdvertising(id), params)
            },
            //新增广告
            addAdvertising: function(params) {
                return $http.post(_path.addAdvertising, params)
            },
            //删除广告
            deleteAdvertising: function(id) {
                return $http.delete(_path.deleteAdvertising(id))
            },
            //上下广告
            updownAdvertising: function(id,status) {
                return $http.put(_path.updownAdvertising(id,status))
            },

        }
    })

    .factory('pageStatic', function($http,_path){
        return {
            //专题详情统计
            lessonDetailStatic:function(params){
               return $http.get(_path.lessonDetailStatic(),{params:params})
            },
            //任务详情统计
            taskDetailStatic:function(params){
                return $http.get(_path.taskDetailStatic(),{params:params})
            },
            pageDetailStatic:function(params){
                return $http.get(_path.pageDetailStatic(),{params:params})
            }
        }
    })
    //常量管理
    .factory('constantManage',function ($http,_path) {
        return {
            //微信客服管理详情
            getWxService:function () {
                return $http.get(_path.getWxService())
            },
            //保存微信客服管理
            saveWxService:function (params) {
                return $http.put(_path.saveWxService(),params)
            },
            //赠送会员天数详情
            getVipDays:function () {
                return $http.get(_path.getVipDays())
            },
            //保存赠送会员天数
            saveVipDays:function (params) {
                return $http.put(_path.saveVipDays(),params)
            },
            //注册统计
            registrationStatistics:function () {
                return $http.get(_path.registrationStatistics())
            }
        }

    });



/*editSchool:function (id,params) {
 return id?$http.put(_path.editSchool(id),params):$http.post(_path.editSchool(id),params);
 }*/


//图片上传
angular.module('admin').factory('uploadFileCustomerService', function($http) {
    return {
        uploadFile: function(formData) {
            return $http.post('/a/u/img/task', formData, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        }
    }
});