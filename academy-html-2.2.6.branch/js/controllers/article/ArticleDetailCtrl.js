/**
 * Created by Master on 2017/4/21.
 */
angular.module('paradiseApp')
    .controller('ArticleDetailController', ['$stateParams', 'urlParams', 'articleService', 'userService', '$timeout', '$rootScope', function ($stateParams, urlParams, articleService, userService, $timeout, $rootScope) {
        var vm = this;
        var done = true;
        vm.loaded = 0;
        var id = $stateParams.id || urlParams('id');
        var likeStatus, collectionStatus;

        //获取文章详情
        getDetail();
        function getDetail() {
            return articleService.getArticleDetail(id).then(function (res) {
                if (res.data.code === 0) {
                    vm.article = res.data.data;
                    vm.loaded++;
                    return true;
                } else {
                    $rootScope.showTips(res.data.message);
                    vm.loaded++;
                    return false;
                }
            })
        }

        //点赞
        vm.like = function () {
            if (done) {
                done = false;
                likeStatus = vm.article.likeStatus ? 2 : 1;
                userService.like(id, {type: 1, status: likeStatus}).then(function (res) {
                    if (res.data.code === 0) {
                        getDetail();
                    } else {
                        $rootScope.showTips(res.data.message)
                    }
                    done = true;
                })
            }
        };
        //收藏
        vm.collect = function () {
            collectionStatus = vm.article.collectionStatus ? 2 : 1;
            userService.collection(id, {type: 1, status: collectionStatus}).then(function (res) {
                if (res.data.code === 0) {
                    getDetail().then(function () {
                        tipChange();
                    });

                } else {
                    $rootScope.showTips(res.data.message)
                }
            })
        };
        function tipChange() {
            vm.tip = true;
            $timeout.cancel(vm.timer);
            vm.timer = $timeout(function () {
                vm.tip = false
            }, 3000)
        }
        vm.back =function () {
            history.go(-1);
        }
    }]);