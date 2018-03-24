/**
 * Created by Master on 2017/3/22.
 */
'use strict';
angular.module('admin')
//获取媒体时长
    .directive('mediaTime', function ($interval) {
        return {
            restrict: 'A',
            scope: {
                mediaTime: '=',
                videoUrl: '@ngSrc',
                loadSuccess: '=?'
            },

            link: function (scope, ele, attrs) {
                ele[0].addEventListener('durationchange', function () {
                    scope.mediaTime = (Math.floor(this.duration / 60) + "'" + Math.floor(this.duration % 60) + '"');
                });
                scope.$watch('videoUrl', function (n, o) {
                    if (n != o) {
                        $interval.cancel(scope.timer);
                        ele[0].src = n;
                        //console.log(ele[0].src);
                        //周期查询视频是否解析成功
                        scope.timer = $interval(function () {
                            scope.loadSuccess = ele[0].duration;
                            if (scope.loadSuccess) {
                                $interval.cancel(scope.timer);
                            }
                            // console.log(ele[0].duration);
                        }, 500)

                    }
                })
            }
        }
    })

    .directive('limitSection', function () {
        return {
            restrict: 'AE',
            scope: {
                start: '=',
                end: '='
            },
            templateUrl: 'views/template/limit-section.html',
            link: function (scope, ele, attrs) {
                scope.labelName = attrs.labelName;
                scope.start = +scope.start || (scope.start == 0 ? 0 : '');
                scope.end = +scope.end || (scope.end == 0 ? 0 : '');
                scope.changeNum = function (num) {
                    if (scope.start && scope.end||num) {
                        scope.start>0?true:scope.start=0;
                        scope.end = +scope.start > +scope.end ? scope.start : scope.end;
                    }

                }
            }
        }
    })

    .directive('srcSet', function () {
        return {
            restrict: 'A',
            scope: {
                srcSet: '=',
                imgUrl: '=ngModel'
            },
            link: function (scope, ele, attrs) {
                scope.$watch('srcSet', function (n, o) {
                    console.log(typeof n)
                    n && typeof (n) == 'string' ? (ele.context.src = scope.imgUrl = JSON.parse(n).profilePhoto) : ele.context.src = '';
                }, true)
            }
        }
    })
    .directive('strLimit',function ($filter,$rootScope,$timeout) {
        return {
            restrict:'A',
            scope:{
                strLimit:'='
            },
            link: function (scope, ele, attrs) {
                var str;
                strLimit();
                function strLimit() {
                    if (scope.strLimit){
                        str = scope.strLimit;
                        if(scope.strLimit.length>20){
                            scope.strLimit=$filter('limitTo')(scope.strLimit,20)+'···';
                        }
                        ele.text(scope.strLimit);
                        ele.on('click',function () {
                            $rootScope.textContent={
                                open:true,
                                content:str
                            };
                            $rootScope.$apply();
                        });
                    }else {
                        ele.text('该评论已删除');
                        ele.unbind();
                    }
                };
                scope.$watch('strLimit',function (n) {
                    n==''?strLimit():false;
                })
            }
        }
    })
    .directive('uploadImg', function (FileUploader, $rootScope) {
        return {
            restrict: 'AE',
            scope: {
                imgSrc: '=ngModel',
                labelName: '@'
            },
            templateUrl: 'views/template/uploadImg.html',
            link: function (scope, ele, attrs) {

                //上传
                FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
                    return true;
                };
                scope.uploader = new FileUploader({
                    url: "/a/u/img/video"
                });
                scope.uploader.onSuccessItem = function (fileItem, res, status, headers) {
                    if (status == 200) {
                        if (res.data.img === '') {
                            res.data.img = '123';
                        }
                        scope.imgSrc = res.data.url
                    }
                };

                //图片格式验证
                scope.upload = function (item) {
                    // console.log(item)
                    if (item._file.type.indexOf('image') != -1) {
                        item.upload();
                    } else {
                        $rootScope.alert("请上传图片")
                    }
                };
                //删除图片
                scope.clearImg = function () {
                    scope.imgSrc = '';
                    scope.uploader.queue = [];
                };

            }
        }
    })
    .directive('upLoader', function (FileUploader, path) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/upload.html',
        scope: {
            logoUrl: '=ngModel',//图片上传后地址
            labelName: '@'
        },
        replace: 'true',
        link: function (scope, ele, attrs) {
            // scope.class = attrs.class;
            // scope.leftClass = attrs.leftClass||'col-xs-2';
            // scope.labelClass = attrs.labelClass;
            scope.uploader = new FileUploader({//实例化
                url: 'a/u/img/video',
                queueLimit: 1
            });
            scope.clearItem = function () {//清空队列
                scope.uploader.clearQueue()
            };
            scope.remove = function () {
                scope.logoUrl = '';
            }
            scope.getUrl = function (files) {
                scope.fileList = files;
                scope.imgURL = window.URL.createObjectURL(scope.fileList[0]);//考虑性能用后清除
            };
            scope.uploader.onSuccessItem = function (item, response) {//上传成功返回地址
                scope.logoUrl = response.data.url
            }
        }
    }
})
    .directive('paging', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/template/paging.html',
            scope: {
                totalItems: '=',
                currentPage: '=',
                pageChange: '&'
            },
            replace: 'true',
            link: function (scope, ele, attrs) {
                //页数按钮数量 每页显示条目
                scope.maxSize = attrs.maxSize;
                scope.itemsPerPage = attrs.itemsPerPage;
                //当前页数变化执行
                // scope.$watch('currentPage', function (n) {
                //     n ? scope.pageChange() : ''
                // });
                //跳页
                scope.setPage = function () {
                    scope.pageNo <= 0 ? scope.currentPage = scope.pageNo = 1 : '';
                    scope.pageNo > scope.numPages ? scope.currentPage = scope.pageNo = scope.numPages : scope.currentPage = scope.pageNo;
                }
            }
        }
    })
