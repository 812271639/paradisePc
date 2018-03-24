/**
 * Created by Master on 2017/3/12.
 */
'use strict';
angular.module('admin')
    .directive('paging', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/ptteng-paging/paging.html',
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
                scope.$watch('currentPage', function (n) {
                    n ? scope.pageChange() : ''
                });
                //跳页
                scope.setPage = function () {
                    scope.pageNo <= 0 ? scope.currentPage = scope.pageNo = 1 : '';
                    scope.pageNo > scope.numPages ? scope.currentPage = scope.pageNo = scope.numPages : scope.currentPage = scope.pageNo;
                }
            }
        }
    })