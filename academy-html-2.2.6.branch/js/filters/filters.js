/**
 * Created by Master on 2017/2/25.
 */
'use strict'
angular.module('paradiseApp')
    .filter('paramConvert', function () {
        return function (obj, constant, attr) {
            var value = '';
            if (obj!=undefined) {
                angular.forEach(constant[attr], function (item) {
                    if (!value) {
                        if (obj[attr] === item.type || obj === item.type) {
                            value = item.name;
                        }
                    }
                })
            }
            return value
        }
    })
    //课程转换
    .filter('subjectConvert', function () {
        return function (id, constant) {
            var value = '';
            if (id!=undefined) {
                angular.forEach(constant, function (item) {
                    if (!value) {
                        if (id === item.id) {
                            value = item.name;
                        }
                    }
                })
            }
            return value
        }
    })

    //字符截取省略号替换
    .filter('textLimit', function () {
        var text = '';
        return function (txt, num) {
            return text = txt && txt.length > num ? txt.slice(0, num) + '...' : txt;
        }
    })
    //换行
    .filter('newLine', function () {
        return function (str, num) {
            var arr = str.split('');
            for (var i = num - 1; i < arr.length; i += num) arr[i] += '\n';
            return arr.join('');
        }
    })

    //返回时间转换
    .filter('dateConvert', function ($filter) {
        var time;
        var nowDate = new Date().valueOf();
        return function (oldDate) {
            oldDate = +oldDate;
            time = (nowDate - oldDate) > 0 ? nowDate - oldDate : 3600000;
            return time < 86400000 ? Math.ceil(time / 3600000) + '小时前' : $filter('date')(oldDate, 'yyyy-MM-dd HH:mm:ss')
        }
    })
    //添加url信任
    .filter('secService', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url)
        }
    })
    .filter('trust', function ($sce) {
        return function (url) {
            return $sce.trustAsHtml(url);
        }
    })
    //返回签到数组值数组
    .filter('valueArr', function () {
        return function (arr) {
            var list = [];
            angular.forEach(arr, function (item) {
                list.push(+item.day)
            })
            return list;
        }
    })
    //生成长度数组
    .filter('creatArr', function () {
        return function (num) {
            if (num) {
                var arr = [];
                for (var i = 0; i < num; i++) {
                    arr.push(i)
                }
                return arr;
            }
        }
    })
    //年级
    .filter('gradeType', function () {
        return function (num) {
            return num == 2 ? '高中部' : '初中部';
        }
    })
    //保留2位小数
    .filter('fundFilter2',function(){

        return function (num) {
            if(num<0){
                num=0;
            }
            if(num !== undefined && num !== ''){
                return (Number(num).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            }
            return num;
        }
    })

    //未转义字符串
    .filter('to_trusted', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    })

    // .filter("trusted", ["$sce", function ($sce) {
    //     return function (html) {
    //         if (typeof html== 'string')   //判断类型为字符串
    //             return $sce.trustAsHtml(html);
    //         return html;
    //     }
    // }]);