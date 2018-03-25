/**
 * Created by Master on 2017/4/21.
 */
'use strict';
angular.module('paradiseApp')
    .controller('CollectionArticleController', ['userService','$state', function (userService,$state) {
        var vm = this;
        var params = {size: 10, page: 1};
        vm.userId = $state.params.userId;
        vm.loaded = 1;
        vm.article = [];
        getArticleList();
        vm.more = getArticleList;

        //获取收藏文章列表
        function getArticleList() {
            return userService.documentCollection(params,vm.userId).then(function (res) {
                vm.article = vm.article.concat(res.data.data);
                params.page++;
                vm.notfound = (vm.article.length == 0);
                vm.loaded++;
                return vm.nextPage = res.data.next;
            })
        }
    }]);