/**
 * Created by Master on 2017/3/21.
 */

angular.module('admin').directive('picker', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/options/options.html',
        scope: {
            options: '=',//传入数据
            selectedValue: '=ngModel',//输出当前选择值
            selectName: '@',//下拉选项名label
            optionClass: '@',//样式
            labelClass: '@',
            formName: '@',//表单名字
            all: '=',
            default: '=?'
        },
        replace: true,
        link: function (scope, ele, attrs) {
            scope.all || scope.default ? scope.selectedValue = +scope.selectedValue || +scope.default||'' : scope.selectedValue = +scope.selectedValue || +scope.default || '';
            attrs.requiredNo ? scope.required = false : scope.required = true;//是否必填
        }
    }
})