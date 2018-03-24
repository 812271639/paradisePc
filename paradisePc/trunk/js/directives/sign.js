/**
 * Created by Administrator on 2017\9\16 0016.
 */
angular.module("myApp")
    .directive("sign", function($state) {
        var vm = this;
        return {
            restrict: "EA",
            template: "<div ng-model='signList'   class='pd-23x' id='myDate'></div>",
            scope: {
                signList: '=',
                c: '@',
                f: '&'
            },
            replace: true,
            transclude: true,
            link: function(scope, element, attrs) {
                ////console.log('111111',scope.signList)
                var items = element;
                var calUtil = {
                    showYear: 2017,
                    showMonth: 1,
                    showDays: 1,
                    number: 1,
                    eventName: "load",
                    _main: function(signList) {
                        ////console.log(signList);
                        calUtil.setMonthAndDay();
                        calUtil.draw(signList);
                        calUtil.calculation(scope.c);
                        calUtil.bindEvent();
                    },
                    draw: function(signList) {
                        var data = calUtil.drawCal(calUtil.showYear, calUtil.showMonth, signList);
                        angular.element(items[0]).append(data);
                    },
                    getDaysInmonth: function(iYear, iMonth) {
                        var dPrevDate = new Date(iYear, iMonth, 0);
                        return dPrevDate.getDate();
                    },
                    //日期数据
                    bulidCal: function(iYear, iMonth) {
                        var aMonth = new Array();
                        aMonth[0] = new Array(7);
                        aMonth[1] = new Array(7);
                        aMonth[2] = new Array(7);
                        aMonth[3] = new Array(7);
                        aMonth[4] = new Array(7);
                        aMonth[5] = new Array(7);
                        aMonth[6] = new Array(7);
                        aMonth[0][0] = "日";
                        aMonth[0][1] = "一";
                        aMonth[0][2] = "二";
                        aMonth[0][3] = "三";
                        aMonth[0][4] = "四";
                        aMonth[0][5] = "五";
                        aMonth[0][6] = "六";

                        var dCalDate = new Date(iYear, iMonth - 1, 1);
                        var isDayOfFirst = dCalDate.getDay();
                        ////console.log(isDayOfFirst);
                        var isDayInMonth = calUtil.getDaysInmonth(iYear, iMonth);
                        var iVarDate = 1;
                        var d, w;
                        for (d = isDayOfFirst; d < 7; d++) {
                            aMonth[1][d] = iVarDate;
                            iVarDate++;
                        }
                        for (w = 2; w < 7; w++) {
                            for (var x = 0; x < 7; x++) {
                                if (iVarDate <= isDayInMonth) {
                                    aMonth[w][x] = iVarDate;
                                    iVarDate++;
                                }
                            }
                        }
                        //            //console.log(aMonth);
                        return aMonth;
                    },
                    //绑定事件
                    bindEvent: function() {
                        $("#sign").click(function() {
                            $.ajax({
                                type: 'PUT',
                                url: '/a/u/user/sign',
                                success: function(res) {
                                    ////console.log(res)
                                    // var res = JSON.parse(rs);
                                    if (res.code === 0) {
                                        var currentDay = $(".color-ffc600");
                                        currentDay.css({ "background-image": "url(../../images/nixi.png)",
                                            "background-repeat":"no-repeat","background-size":"29px 22px",
                                            "background-position":"center","background-color":"white",
                                            "font-size":"0px","line-height":"0px"});
                                        $("#sign").attr("disabled", true).css("background", "#cbcbcb").text("明天再来还可以获得逆袭豆哦~");
                                        $('#number').text("签到成功，奖励 " + calUtil.number + "逆袭豆~");
                                        $('.signOk').show(1500, function() {
                                            $('.signOk').hide(5000)
                                        });
                                        scope.f();
                                        //添加数据埋点
                                        $.ajax({
                                            type: 'POST',
                                            url: '/a/pageStatistic',
                                            data:{
                                                targetType:3,
                                                subTargetType:1,
                                                os:1
                                            },
                                            success: function (res) {
                                                if (res.code === 0) {
                                                    //alert("数据埋点成功");
                                                }
                                            }
                                        })
                                    } else {
                                        console.log(res.message);
                                    }
                                }
                            })

                        })
                    },
                    //计算逆袭豆数量
                    calculation: function(num) {
                        if (num >= 5) {
                            calUtil.number = 5;
                            return calUtil.number;
                        } else if (num < 5) {
                            if (isNaN(parseInt(num))) {
                                calUtil.number = 1
                            } else {
                                calUtil.number = parseInt(num) + 1;
                            }

                            return calUtil.number;
                        }
                        // for (var i = 0; i <5;i--){
                        //     if (calUtil.isSign(signList,calUtil.showDays-1)){
                        //         calUtil.number++;
                        //         calUtil.showDays--;
                        //     }
                        //     else {
                        //         return;
                        //     }
                        // }
                        // return calUtil.number;
                    },
                    // 获取时间
                    setMonthAndDay: function() {
                        switch (calUtil.eventName) {
                            case "load":
                                var currentTime = new Date();
                                calUtil.showYear = currentTime.getFullYear();
                                calUtil.showMonth = currentTime.getMonth() + 1;
                                calUtil.showDays = currentTime.getDate();
                                break;
                        }
                    },
                    // 判断是否签到
                    isSign: function(signList, day) {
                        var flag = false;
                        $.each(signList, function(index, item) {
                            if (item.day == day) {
                                flag = true;
                                return false;
                            }
                        });
                        return flag;
                    },
                    // 把数据封装到HTML结构中
                    drawCal: function(iYear, iMonth, signList) {
                        var aMonth = calUtil.bulidCal(iYear, iMonth);
                        var htmls = new Array();
                        htmls.push("<div class='timeHeader'>" + calUtil.showYear + '年' + calUtil.showMonth + '月' + "</div>");
                        htmls.push("<div class='border-rb'>");
                        for (var i = 0; i < aMonth.length - 1; i++) {
                            htmls.push("<div  class='font-size-0'>");
                            for (var j = 0; j < aMonth[i].length; j++) {
                                var signStatus = calUtil.isSign(signList, aMonth[i][j]);
                                if (aMonth[i][j] != undefined && calUtil.showDays == aMonth[i][j] && !signStatus) {
                                    htmls.push("<div class='inline color-ffc600'>" + aMonth[i][j] + "</div>");
                                } else if (aMonth[i][j] != undefined && signStatus) {
                                    htmls.push("<div class='inline color-cbcbcb'>" + "</div>");
                                } else if (aMonth[i][j] != undefined) {
                                    htmls.push("<div class='inline '>" + aMonth[i][j] + "</div>");
                                } else {
                                    htmls.push("<div class='inline'></div>");
                                }
                            }
                            htmls.push("</div>");
                        }
                        htmls.push("</div>");
                        var signStatu = calUtil.isSign(signList, calUtil.showDays);
                        if (calUtil.showDays !== undefined && signStatu) {
                            htmls.push("<button type='button'  id='sign' disabled='disabled' class='signOkTimeBtn'>明天再来还可以获得逆袭豆哦~</button>");
                        } else {
                            htmls.push("<button type='button' id='sign'  class='timeBtn'>签到</button>");
                        }

                        return htmls.join('');
                    }
                };
                calUtil._main(scope.signList);
            }
        }
    });