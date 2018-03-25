/**
 * Created by Master on 2017/2/28.
 */
'use strict'
angular.module('paradiseApp')
    .factory('wxServices', function ($http, path, $location, $rootScope,$timeout) {
        return {
            //获取签名
            getSignature: function (url) {
                return $http.get(path.wxSignature, {params: {url: url}})
            },
            //更新、获取token 
            token: function (n) {
                return n ? $http.get(path.wxToken) : $http.put(path.wxToken);
            },
            //code获取openid、用户信息
            getOpenid: function (code) {
                return $http.get(path.wxOpenid, {params: {code: code}});
            },
            //获取微信图片
            getMedia: function (id) {
                return $http.get(path.wxMedia, {params: {mediaId: id}});
            },

            wxPort: function (api) {
                var wxAPI = api;
                // wxAPI.push(api)
                function wxSignature() {
                    // alert($location.absUrl().split('#')[0])
                    var count=sessionStorage.getItem("reloadCount");
                    count?true:count=0;
                    return $http.get('/a/wx/signature', {params: {url:$location.absUrl().split('#')[0]}})
                        .then(function (res) {
                        if (res.data.code == 0) {
                            var respanse = res.data.data;
                            wx.config({
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                //线上
                                // appId: 'wxa5cb11911935a401', // 必填，公众号的唯一标识
                                //开发
                                appId: $rootScope.wxOption.appId,
                                timestamp: respanse.timestamp, // 必填，生成签名的时间戳
                                nonceStr: respanse.nonceStr, // 必填，生成签名的随机串
                                signature: respanse.signature,// 必填，签名，见附录1
                                jsApiList: wxAPI// 必填，需 要使用的JS接口列表，所有JS接口列表见附录2
                            });
                            wx.error(function(res){
                                //iosSDK配置出问题执行刷新，尝试2次
                                if($rootScope.mobile == "ios"){
                                    if(count<2){
                                        location.reload();
                                        sessionStorage.setItem("reloadCount",++count);
                                    }else {
                                        alert("SKD config error");
                                        sessionStorage.setItem("reloadCount",0);
                                    }
                                }
                            });

                        } else {
                            $rootScope.showTips('请检查网络问题')
                        }
                    })
                }

                return wxSignature()
            }
        }
    })

    // .factory('wxPort',function ($http,$location) {
    //     return function (api) {
    //         return $http.get('/a/wx/signature', {
    //             params: {url: $location.absUrl().split('#')[0]}
    //         }).then(function (res) {
    //             var respanse = res.data.data;
    //             wx.config({
    //                 debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //                 appId: 'wx8c14b4e1a37a6fb1', // 必填，公众号的唯一标识
    //                 timestamp: respanse.timestamp, // 必填，生成签名的时间戳
    //                 nonceStr: respanse.nonceStr, // 必填，生成签名的随机串
    //                 signature: respanse.signature,// 必填，签名，见附录1
    //                 jsApiList: api// 必填，需 要使用的JS接口列表，所有JS接口列表见附录2
    //             });
    //         })
    //     }
    // })

    //用户登录注册
    .factory('loginServices', function ($http, path) {
        return {
            //发送手机验证码
            mobileCode: function (params) {
                return $http.post(path.mobileCode, params)
            },
            //发送邮箱验证码
            mailCode: function (params) {
                return $http.post(path.mailCode, params)
            },
            //用户注册
            register: function (params) {
                return $http.post(path.register, params)
            },
            //查询openid是否注册
            verifyOpenid: function (params) {
                return $http.get(path.verifyOpenid, {params: params})
            },
            //用户登录
            login: function (params) {
                return $http.post(path.login, params)
            },
            //手机/邮箱绑定
            binding: function (params) {
                return $http.put(path.bind, params)
            }

        }
    })

    //用户资料
    .factory('userService', function ($http, path) {
        return {
            identityInfo: function () {
                return $http.get('../js/constants/package.json')
            },
            //获取|修改用户资料
            userDetail: function (params) {
                return params ? $http.put(path.userDetail, params) : $http.get(path.userDetail);
            },
            //其他用户资料
            otherDetail:function (id) {
              return $http.get(path.otherDetail(id));
            },
            //收藏文档、视频
            collection: function (id, params) {
                return $http.put(path.collection(id), params)
            },
            //点赞文档、视频
            like: function (id, params) {
                return $http.put(path.like(id), params)
            },
            //用户收藏文章列表
            documentCollection: function (params,id) {
                return $http.get(path.documentCollection(id), {params: params})
            },
            //用户收藏视频列表
            videoCollection: function (params,id) {
                return $http.get(path.videoCollection(id), {params: params})
            },
            //签到
            sign: function () {
                return $http.put(path.sign)
            },
            //用户签到信息
            signDetail: function (y, m) {
                return $http.get(path.signDetail, {params: {year: y, month: m}})
            },
            //公告栏
            bulletin:function () {
                return $http.get(path.bulletin)
            },
            //卡劵激活
            cardActivation:function (params) {
                return $http.put(path.cardActivation,params)
            },
            //套餐列表
            getMemberList:function (params) {
                return $http.get(path.getMemberList,{params:params})
            }

        }
    })
    //文学部
    .factory('articleService', function ($http, path) {
        return {
            //获取文章列表
            getArticleList: function (params) {
                return $http.get(path.documentList, {params: params})
            },
            //获取文章详情
            getArticleDetail: function (id) {
                return $http.get(path.documentDetail(id))
            }
        }
    })
    //影像部
    .factory('videoService', function ($http, path) {
        return {
            //获取视频列表
            getVideoList: function (params) {
                return $http.get(path.videoList, {params: params})
            },
            //获取视频详情
            getVideoDetail: function (id) {
                return $http.get(path.videoDetail(id))
            },
            //获取科目列表
            getSubjectList: function () {
                return $http.get(path.subjectList)
            }
        }
    })
    //留言板
    .factory('messageBoardService', function ($http, path) {
        return {
            //获取帖子列表
            postsList: function (params) {
                return $http.get(path.postsList, {params: params});
            },
            //用户帖子列表
            postsUserList:function (id,params) {
                return $http.get(path.postsUserList(id),{params:params});
            },
            // //其他用户帖子列表
            // postsOtherUser:function (id) {
            //     return $http.get(path.postsOtherUser(id));
            // },
            //置顶帖列表
            postsSticky:function (params) {
                return $http.get(path.postsSticky,{params:params});
            },
            //精华帖列表
            postsDigest: function (params) {
                return $http.get(path.postsDigest,{params:params});
            },
            //发新帖
            posts:function (params) {
                return $http.post(path.posts,params);
            },
            //删帖
            postsDelete:function (id) {
                return $http.delete(path.postsDelete(id));
            },
            //帖子详情
            postsDetail:function (id) {
              return $http.get(path.postsDetail(id))
            },
            //回帖列表
            postsReplyList:function (id,params) {
                return $http.get(path.postsReplyList(id),{params:params});
            },
            //删回复
            postsReplyDelete:function (id) {
                return $http.delete(path.postsReplyDelete(id));
            },
            //回帖
            postsReply:function (id,params) {
                return $http.post(path.postsReply(id),params);
            },
        }
    })

    //九、订单
    .factory('orderService', function ($http, path) {
            return {
                //新建订单
                order: function (params) {
                    return $http.post(path.order, params)
                },
                //获取微信支付订单参数
                wxOrder: function (id) {
                    return $http.get(path.wxOrder(id))
                },
                //保存支付方式
                payWay: function (id, params) {
                    return $http.put(path.payWay(id), params)
                },
                //保存支付结果
                result: function (id, params) {
                    return $http.put(path.result(id), params)
                },
                //会员发送资料接口
                memberEmailData:function(id,params){
                    return $http.post(path.memberEmailData(id),params)
                }
            }
    })
    //树洞
    .factory('treeHoleService',function ($http, path) {
        return {
            //最热树叶
            treeHoleHot:function () {
                return $http.get(path.treeHoleHot)
            },
            //初始随机树叶
            treeHoleRandomStart:function () {
                return $http.get(path.treeHoleRandomStart)
            },
            //随机树叶
            treeHoleRandom:function () {
                return $http.get(path.treeHoleRandom)
            },
            //添加树叶
            treeHoleAdd:function (params) {
                return $http.post(path.treeHoleAdd,params)
            },
            //点赞树叶
            treeHoleUp:function (id) {
                return $http.put(path.treeHoleUp(id));
            },
            //踩树叶
            treeHoleDown:function (id) {
                return $http.put(path.treeHoleDown(id));
            }
        }
    });


// .factory('getArticle', function ($http) {
//     return {
//         identityInfo: function () {
//             return $http.get('../js/constants/package.json')
//         }
//     }
// })
// .factory('getVideo', function ($http) {
//     return {
//         videoList: function () {
//             return $http.get('../js/constants/package.json')
//         }
//     }
// })
