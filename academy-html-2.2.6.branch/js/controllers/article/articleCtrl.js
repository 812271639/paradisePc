/**
 * Created by Master on 2017/3/1.
 */
angular.module('paradiseApp')
    .controller('ArticleController', ['$rootScope', '$scope', 'articleService',
        function ($rootScope, $scope, articleService) {
        var vm = this;
        vm.nextPage = true;
        vm.loaded = 0;
        vm.article = [];
        var params = {size: 10, page: 1, type: 2};

        getBannerList();
        getArticleList();
        //获取banner列表
        function getBannerList() {
            return articleService.getArticleList({type: 1}).then(function (res) {
                if (res.data.code === 0) {
                    vm.bannerList = res.data.data;
                } else {
                    $rootScope.showTips(res.data.message)
                }
                vm.loaded++;
            })
        }

        vm.more = getArticleList;

        //获取文章列表
        function getArticleList() {
            return articleService.getArticleList(params).then(function (res) {
                if (res.data.code === 0) {
                    vm.article = vm.article.concat(res.data.data);
                    params.page++;
                    vm.notfound = vm.article.length == 0;
                    vm.loaded++;
                    return vm.nextPage = res.data.next;
                }else {
                    $rootScope.showTips(res.data.message);
                    vm.loaded++;
                }
            })
        }
    }]);
