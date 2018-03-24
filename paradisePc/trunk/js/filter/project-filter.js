'use strict';
angular.module('myApp')
    .filter('fontFilter',function(fontCollection){
        return function(num,font){
            var name='';
            var state=true;
            angular.forEach(fontCollection.font, function (item) {
                if(state){
                    if(num==item.type){
                       name=item.name;
                       state=false;
                    }
                }
            })
            return name
        }
     })


    .filter('userFilter', function (userOptions) {
        return function (num, key) {
            var name = '';
            var state = true;
            angular.forEach(userOptions[key], function (item) {
                if (state) {
                    if (num == item.type) {
                        name = item.name;
                        state = false;
                    }
                }
            });
            return name;
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
    .filter('gradeDeptFilter',function (userOptions) {
        return function (num, key) {
            var name;
            angular.forEach(userOptions[key], function (item) {
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
    .filter('trustUrl', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])
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
            if(text){
                return $sce.trustAsHtml(text);
            }
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
		    if(parseFloat(month)%12==0){
                return parseFloat(month)*365/12;
            }
			else {
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
	//置顶状态

    .filter("urlFilter", function ($sce) {
        return function (url) {
            if (url) {
                return $sce.trustAsResourceUrl(url);
            }
        }

    })

    .filter("dataFil",function($filter){
        return function(data){
            if(data==""){
                return "永久有效"
            }
            else{
                data = $filter('date')(data,"yyyy-MM-dd");
                return "有效期至"+data
            }
        }
    })
    //未转义字符串
    // .filter('to_trusted', function ($sce) {
    //     return function (text) {
    //         return $sce.trustAsHtml(text);
    //     }
    // })
    //邮箱以及手机号加密
    .filter("hideFilter",function(){
        return function(b){
            if(b){
            var name;
            if(b>0){
                name=b.substring(0,3)+"****"+b.substring(8,12);
                return name;
            }else{
                var c=b.indexOf("@");
                if(c<=1){
                    name=b;
                }else if(c<6){
                    var d="*";
                    for(var i=0;i<c-2;i++){
                        d+="*";
                    }
                    name=b.substr(0,1)+d+b.substring(c,b.length);
                }else{
                    var e=b.substring(0,c-4);
                    name=e+"****"+b.substring(c,b.length);
                };
                return name;
            }

            }

        }
    })

;
