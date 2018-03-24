'use strict';
angular.module('admin')

// .filter('taskTypeFilter',function(taskOption){
//          return function (num, key) {
//             var name = '';
//             var state = true;
//             angular.forEach(taskOption[key], function (item) {


//                 console.log(item);
//                 // item.taskType = item.taskType? item.taskType : '';
//                 if (state) {
//                     console.log(num);


// angular.forEach(num, function () {

//                     if (num == item.type) {
//                         name = item.name;
//                         state = false;
//                     }




//                 }
//             });
//             return name
//         }
//     })

    .filter('uniqueTaskType', function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];
            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            angular.forEach(output,function (item) {
                switch(item.taskType){
                    case 1:
                    item.typeWord = "视频";
                    break;
                    case 2:
                    item.typeWord = "习题";
                    break;
                    default:
                     item.typeWord = "视频";
                    break;
                }
            })
            return output;
        }
    })

        .filter('unique', function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];
            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        }
    })
    .filter('userFilter', function (userOptions) {
        return function (num, key) {
            var name = '';
            var state = true;
            angular.forEach(userOptions[key], function (item) {
                if (state) {
                    console.log(num);
                    if (num == item.type) {
                        name = item.name;
                        state = false;
                    }
                }
            });
            return name
        }
    })

    .filter('teacherFilter',function () {
        var id;
        return function (name,list) {
            angular.forEach(list,function (item) {
                if (name&&list&&item.name==name){
                    id = item.id;
                }
            });
            return id;
        }
    })
    .filter('articleFilter', function (articleOptions) {
        return function (num, key) {
            var name = '';
            var state = true;
            angular.forEach(articleOptions[key], function (item) {
                item.type = item.type ? item.type : '';
                if (state) {
                    if (num == item.type) {
                        name = item.name;
                        state = false;
                    }
                }
            });
            return name
        }
    })
    .filter('bannerFilter', function (bannerOptions) {
        return function (num, key) {
            var name = '';
            var state = true;
            angular.forEach(bannerOptions[key], function (item) {
                if (state) {
                    if (num == item.type) {
                        name = item.name;
                        state = false;
                    }
                }
            });
            return name
        }
    })
    .filter('gradeFilter',function (taskOption) {
        return function (num, key) {
            var name;
            angular.forEach(taskOption[key], function (item) {
                if (item.type == num){
                    name = item.name;
                }
            });
            return name;
        }
    })
    .filter('videoFilter', function (videoOptions) {
        return function (num, key) {
            var name = '';
            var state = true;
            angular.forEach(videoOptions[key], function (item) {
                if (state) {
                    if (num == item.type) {
                        name = item.name;
                        state = false;
                    }
                }
            });
            return name
        }
    })
    .filter('postsFilter', function (postsOptions) {
        return function (num, key) {
            var name = '';
            var state = true;
            angular.forEach(postsOptions[key], function (item) {
                if (state) {
                    if (num == item.type) {
                        name = item.name;
                        state = false;
                    }
                }
            });
            return name
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

    .filter('urlCheck', function () {
        return function (url, fmt) {
            var str = url;
            var a;
            var Expression = "^((https|http|ftp|rtsp|mms)?://)"
                + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@
                + "(([0-9]{1,3}\\.){3}[0-9]{1,3}"                                 // IP形式的URL- 199.194.52.184
                + "|"                                                         // 允许IP和DOMAIN（域名）
                + "([0-9a-zA-Z_!~*'()-]+\\.)*"                                 // 域名- www.
                + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\\."                     // 二级域名
                + "[a-zA-Z]{2,6})"                                         // first level domain- .com or .museum
                + "(:[0-9]{1,4})?"                                                     // 端口- :80
                + "((/?)|"
                + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)(." + fmt.toLowerCase() + "|" + fmt.toUpperCase() + ")$";

            var objExp = new RegExp(Expression);
            return a = objExp.test(str)
        }
    })

    .filter('trust',function ($sce) {
        return function (text) {
            if(text){
                return $sce.trustAsHtml(text);
            }
        }
    })
    .filter("urlFilter", function ($sce) {
        return function (url) {
            if (url) {
                return $sce.trustAsResourceUrl(url);
            }
        }
    })
    //未转义字符串
    .filter('to_trusted', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    })
    //卡劵管理状态
    .filter("cardStatusFilter",function (cardStatusType) {
        return function (id) {
            if(id!=undefined&&id!==''){
                return cardStatusType[id-1].name;
            }
        }
    })
    //按钮文本
    .filter('btnContentFilter',function (btnOptions) {
        return function (num, key) {
            var name = '';
            var state = true;
            angular.forEach(btnOptions[key], function (item) {
                item.type = item.type ? item.type : 1;
                if (state) {
                    if (num == item.type) {
                        name = item.name;
                        state = false;
                    }
                }
            });
            return name
        }
    })
    //月数转天数
    .filter('monthFilter',function () {
        return function (month) {
            if(parseFloat(month)){
                return parseFloat(month)*30;
            }
        }
    })
    //张王王
    .filter('serialNumber',function () {
        return function (type,index) {
            if(type==2){
                index++;
                return index;
            }else if (type ==1) {
                return String.fromCharCode((65 + index))
            }
        }
    })
    //任务管理
    .filter('taskFilter', function (taskOption) {
        return function (num, key) {
            var name = '';
            var state = true;
            angular.forEach(taskOption[key], function (item) {
                if (state) {
                    if (num == item.type) {
                        name = item.name;
                        state = false;
                    }
                }});
            return name
        }
    })

/*    .filter('JsonParse', function () {
        return function (Json) {
            if (Json) {
                return JSON.parse(Json)
            }
        }
    })*/
/*    .filter('aa', function () {
        return function (b) {
            /!*
             var aa="[{\"type\":1,\"introduce\":\"《登高》中从时间和空间着笔，表现诗人客居他乡、疾病缠身而漂泊孤独的诗句是：\",\"result\":\"\",\"status\":1,\"paragraph\":0},{\"type\":2,\"introduce\":[],\"result\":\"\",\"status\":2,\"paragraph\":0},{\"type\":2,\"introduce\":[],\"result\":\"\",\"status\":2,\"paragraph\":0}]";
             var bb="[{},{},{},]"
             *!/
            var atest=JSON.stringify(b);
            var ctest=JSON.parse(atest);
            return ctest;

        }
    })*/
;
