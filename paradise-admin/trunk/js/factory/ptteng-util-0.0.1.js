'use strict';
angular.module('admin')

    .factory('commonUtil', function ($rootScope, $state) {
        return {
            ajaxStatus:function (res) {
                if(res.data.code===0) {
                    return res.data.data;
                }else if(!!res.data.code) {
                    $rootScope.alert(res.data.code,'',true);
                    return false;
                }else {
                    $rootScope.alert('请检查网络连接','',true)
                    return false;
                }
            },
            session: function(key,value){
                if(angular.isArray(key)){
                    return   angular.forEach(key,function (item) {
                        return  remove(item);
                    })
                }else if(!key) {
                    return   clear();
                }else {
                    return value||value===''||value===0?set():get();
                }

                function set() {
                    return sessionStorage.setItem(key, JSON.stringify(value))
                }
                function get() {
                    return  sessionStorage.getItem(key)?JSON.parse(sessionStorage.getItem(key)):false;
                }
                function clear() {
                    return  sessionStorage.clear();
                }
                function remove(key) {
                    return sessionStorage.removeItem(key)
                }
            },
            //判断年级类型
            gradeType:function (grade) {
                return grade<4||grade==7?1:2;
            },
	        //年级多选对象转数组，发送请求时使用
	         objToArray:function (obj) {
	         var arr=[];
	         for(var key in obj){
	         if(obj[key]){
	         arr.push(parseInt(key));
	         }
	         }
	         return arr;
	         },
	         //将年级对象转为年级数组,取数据时用
	        getGradeArray:function (arr,key) {
	         var grade=[];
	         arr.forEach(function (element,index,array) {
	         grade.push(element[key]);
	         });
	         return grade;
	         },
            pageDefault: {page: 1, size: 10, next: true},
            restParms: function (params) {
                angular.forEach(params, function (item, key) {
                    params[key] = '';
                });
                params.page = 1;
                params.size = 10;
                return params
            },
            process4Page: function (params) {
                if (params == undefined) {
                    params = {};
                } else {

                }
                if (params.page == undefined) {
                    params.page = $state.params.page || this.pageDefault.page;
                }
                if (params.size == undefined) {
                    params.size = $state.params.size || this.pageDefault.size;
                }
                if (params.next == undefined) {
                    params.next = $state.params.next || this.pageDefault.true;
                }
                return {"params": params};
            },
            process4Page2: function (params) {
                if (params == undefined) {
                    params = {};
                } else {

                }
                if (params.page == undefined) {
                    params.page = $state.params.page || this.pageDefault.page;
                }

                return {"params": params};
            },
            processPageResult: function (res) {
                $state.params.next = res.data.data.next;
                return res;
            },
            processPageResult2: function (res) {
                $state.params.next = res.data.next;
                return res;
            },
            setPage: function (res) {
                this.page = {current: res.data.data.page, size: res.data.data.size, next: res.data.data.next}
            },
            resetPage: function () {
                this.page = {current: 1, size: 5, next: true}
            },
            page: {current: 1, size: 5, next: true},
            concactArrayParam: function (name, params) {
                var tempUrls = "?";
                angular.forEach(params, function (data, index, array) {
                    tempUrls = tempUrls + name + "=" + data + "&";
                });
                var url = tempUrls.substring(0, tempUrls.length - 1);
                //console.log("url is " + url);
                return url;
            },
            showErrMsg: function (res) {
                if (res.data.code == -5020) {
                    $rootScope.alert(res.data.message, function () {
                        console.log(res.data.code + " get error  message is " + res.data.message);
                        $state.go("login", {}, {reload: true});
                    });
                } else {
                    $rootScope.alert(res.data.message, function () {
                        console.log(res.data.code + " get error  message is " + res.data.message);
                    });
                }


            },
            showReturnMsg: function (res, path) {

                switch (res.data.code) {
                    case 0:
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + " get error  message is " + res.data.message);
                            if (path == undefined) {

                            } else {
                                $state.go(path, {}, {reload: true});
                            }
                        });
                        break;
                    case -5020:
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + " get error  message is " + res.data.message);
                            $state.go("login", {}, {reload: true});
                        });
                        break;
                    default :
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + " get error  message is " + res.data.message);
                        });

                }
            },
            isUpdate: function (id) {
                if (id == undefined) {
                    return false;
                } else {
                    return true;
                }
            },


            // 处理模块列表数据，将map添加进list结果
            buildTree: function (modules) {
                var tree = [];
                return this.buildTreeNode(0, null, tree, modules);
            },
            buildTreeNode: function (pid, node, tree, modules) {
                var now = this;
                angular.forEach(modules, function (data, index, array) {
                    var module = data;
                    if (module.parentID == pid) {
                        tree = now.buildTreeNode(module.id, module, tree, modules);
                        if (pid == 0) {
                            tree.push(module);
                        } else {
                            if (node.nodes == undefined) {
                                node.nodes = [];
                            }
                            node.nodes.push(module);
                        }
                    }
                });
                tree = tree.sort(this.treeSort);
                return tree;
            },
            treeSort: function (a, b) {
                if (a.level < b.level)
                    return -1;
                else if (a.level > b.level)
                    return 1;
                else
                    return 0;
            },


            arrayContains: function (array, obj) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === obj) {
                        return true;
                    }
                }
                return false;
            }
	        

        }
    })

    .factory("datePickerUtils", ["$filter", function ($filter) {
        return {
            //转换时间
            cardTime: function (time) {
                var time = new Date(time).getTime();
                var timeString = String(time);
                var str = timeString.substring(timeString.length - 1, timeString.length);
                if (str != '9') {
                    time = time + 86400000 - 1;
                }
                return time
            },


            isDate: function (obj) {
                return Object.prototype.toString.call(obj) === "[object Date]";
            },

            buildDates: function (date, options) {
                var dates = [],
                    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 3);

                options = options || {};
                date = new Date(date);

                while (date.getDay() !== options.weekStartsOn) {
                    date.setDate(date.getDate() - 1);
                }

                for (var i = 0; i < 42; i++) { // 42 == 6 rows of dates
                    if (options.noExtraRows && date.getDay() === options.weekStartsOn && date > lastDate) break;

                    dates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }

                return dates;
            },

            buildDayNames: function (weekStartsOn) {
                var dayNames = ['日', '一', '二', '三', '四', '五', '六'];

                if (weekStartsOn) {
                    dayNames = dayNames.slice(0);
                    for (var i = 0; i < weekStartsOn; i++) {
                        dayNames.push(dayNames.shift());
                    }
                }
                return dayNames;
            },

            monthCourse: function (start, end) {
                var months = [];
                start = new Date(start);
                end = new Date(end);
                var differ = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
                for (var i = 0; i < differ; i++) {
                    var newMonth = new Date(start.getFullYear(), start.getMonth() + i, 1);
                    months.push($filter('date')(newMonth, 'yyyy-MM'));
                }
                return months;
            },

            getMonthDate: function (year, month) {
                return new Date(year, month + 1, 0).getDate();
            },

            getDateByTime: function (date, time) {
                var year = new Date(date).getFullYear();
                var month = new Date(date).getMonth();
                var day = new Date(date).getDate();
                var hours = new Date(time).getHours();
                var minutes = new Date(time).getMinutes();

                if (!date || !time) {
                    return "";
                } else {
                    return new Date(year, month, day, hours, minutes).getTime();
                }

            }
        };
    }])
;

/**
 * Created by gaogao on 16/11/25.
 */
//防点击
angular.module('admin').directive("hello", function ($timeout) {
    return {
        restrict: 'EA',
        link: function (scope, iElement, attr) {
            iElement.on("click", function () {
                var that = this
                that.disabled = true;
                console.log(this)

                $timeout(function () {
                    that.removeAttribute("disabled")
                    console.log(this)
                }, 1000)
            })

        }
    }
})


