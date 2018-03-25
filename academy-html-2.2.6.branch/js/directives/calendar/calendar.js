/**
 * Created by Master on 2017/2/24.
 */
angular.module('paradiseApp')
    .directive('calendar', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                signedData: '=',
                signTotal:'=',
                count: '=',
                startSign: '&'
            },
            template: '<div id="calendar" class="calendar"></div>',
            link: function (scope) {
                var that = $("#calendar");
                var today = new Date().getDate();
                scope.signedData = scope.signedData || [];
                var Calendar = {
                    _today: new Date(),
                    _date: new Date().getDate(),
                    _day: new Date().getDay(),
                    _month: new Date().getMonth() + 1,
                    _year: new Date().getFullYear(),
                    setDate: function () {
                        this._date = new Date(this._today).getDate();
                    },
                    setDay: function () {
                        this._day = new Date(this._today).getDay();
                    },
                    setMonth: function () {
                        this._month = new Date(this._today).getMonth() + 1;
                    },
                    setYear: function () {
                        this._year = new Date(this._today).getFullYear();
                    },
                    init: function (curDate) {
                        this._today = new Date(curDate);
                        this.setDate();
                        this.setDay();
                        this.setMonth();
                        this.setYear();
                    },
                    isLeap: function () {
                        var year = this._year;
                        if (year % 4 == 0 && year % 100 > 0) {//闰年
                            return true;
                        }
                        if (year % 400 == 0 && year % 3200 > 0) {//闰年
                            return true;
                        }
                        return false;//平年
                    },
                    getLen: function () {
                        if (this._month == 2) {
                            if (this.isLeap()) {//闰年2月设置29天
                                return 29;
                            }
                            return 28;//平年2月设置29天
                        }
                        if (this._month < 8) { //小于8月 奇数为大月
                            if (this._month % 2 > 0) {
                                return 31;
                            }
                            return 30;
                        }
                        if (this._month % 2 > 0) { //大于8 奇数为小月
                            return 30;
                        }
                        return 31;
                    },
                    getCalendar: function (events) {
                        var len = this.getLen();//该月天数
                        var d = new Date(this._year, this._month - 1, 1);
                        var dfw = d.getDay();//当月一号周几，其值等于列下标
                        var arr = new Array();
                        var tem = 0;
                        var str = "";
                        for (var i = 0; i < 6; i++) {//第1~6行数据
                            arr[i] = new Array();
                            for (var j = 0; j < 7; j++) {//第1~7列数据
                                tem++;
                                if (tem - dfw > 0 && tem - dfw <= len) {//匹配第一行开始列数
                                    arr[i][j] = tem - dfw;
                                } else {
                                    arr[i][j] = "";
                                }
                            }
                        }

                        // str += '<h4>' + this._year + '年' + this._month + '月' + this._date + '日</h4>';//标题
                        str += '<table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">';
                        str += '<thread><tr><th>周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th></tr></thread>';
                        str += '<tbody>';
                        for (var k = 0; k < 6; k++) {
                            if (k == 5 && arr[k][0] == "")
                                continue;
                            str += '<tr>';
                            for (var m = 0; m < arr[k].length; m++) {
                                if (events.contains(arr[k][m])) {
                                    str += '<td class="red_tbg">' + arr[k][m] + '</td>';
                                } else {
                                    //判断是否是当日
                                    if (arr[k][m] == this._date) {
                                        str += '<td class="cur_day">' + arr[k][m] + '</td>';
                                        continue;
                                    }
                                    if (arr[k][m] == "") {
                                        str += '<td class="over">' + arr[k][m] + '</td>';
                                        continue;
                                    }
                                    str += '<td>' + arr[k][m] + '</td>';
                                }
                            }
                            str += '</tr>';
                        }
                        str += '</tbody>';
                        str += '</table>';
                        return str;
                    },
                    nextMonth: function () {
                        if (this._month == 12) {
                            this._year++;
                            this._month = 0;
                        }
                        this._month++;
                    },
                    nextYear: function () {
                        this._year++;
                    },
                    previousMonth: function () {
                        if (this._month == 1) {
                            this._year--;
                            this._month = 13;
                        }
                        this._month--;
                    },
                    previousYear: function () {
                        this._year--;
                    }
                };

                Array.prototype.contains = function (element) {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] == element) {
                            return true;
                        }
                    }
                    return false;
                };

                that.html(Calendar.getCalendar(scope.signedData));


                $timeout(function () {
                    scope.$watch('signedData', function (n, o) {
                        scope.signedData = scope.signedData || [];
                        // console.log(scope.signedData);
                        if (n.length >= 0) {
                            // console.log(scope.signedData.indexOf(today));
                            var bl = (scope.signedData.indexOf(today) >= 0);
                            var str = bl ? '已签到' : '签到';
                            that.html(Calendar.getCalendar(scope.signedData));
                            that.prepend("<h4>当前累计签到天数<span>" + (scope.signTotal || 0 ) + "</span>天</h4>")
                            that.append('<button class="sign-btn" type="button">' + str + '</button>');
                            bl ? ($('.sign-btn').attr('disabled', 'true').addClass('signed-btn')) : false;

                            if (!bl) {
                                that.find('.sign-btn').on('click', function () {
                                    $(this).attr('disabled', 'true')
                                    scope.startSign().then(function (res) {
                                        res == 0 ? $(this).text('已签到') : false
                                    });
                                });
                            }
                        }
                    })
                }, 100)
            }
        }
    })
