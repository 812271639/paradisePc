'use strict';
angular.module('admin')
    .controller('ArticleController', function ($state, $scope, $rootScope, commonUtil, articleService, articleOptions) {
        var vm = this;
        var upBanner=false;
        vm.articleOptions = articleOptions;
        vm.searchParam = $state.params || {};
        getList(vm.searchParam);
        allUpBanner();
        // search
        vm.search = function () {
            vm.searchParam.page = 1;
            $state.go($state.current, vm.searchParam, {reload: true});
        };

        //rest
        vm.rest = function () {
            commonUtil.restParms(vm.searchParam);

            $state.go($state.current, vm.searchParam, {reload: true});
            // getList();
        };
        //上下架
        vm.changeStatus = function (id, status,type) {
            $rootScope.alert("是否" + status + "该文章？", function () {
                if (status=='上架'&&type==1&&!upBanner) {
                    $rootScope.alert('当前上架banner文章已超过8条，请先下架部分banner文章后再执行上架操作');
                }else {
                    articleService.articleStatus(id).then(function (res) {
                        if (res.data.code == 0) {
                            getList(vm.searchParam);
                            $rootScope.alert("文章" + status + "成功", function () {
                                $state.go("field.articleList");
                            },true);
                        } else {
                            $rootScope.alert(res.data.message)
                        }
                    });
                }
            });
        };
		//置顶
	    //置顶与取消
	    vm.setSticky = function (id,sticky,btnText) {
		    var str;
		    str=sticky==2?"置顶此条帖子会将该部门最后一条置顶文章顶掉，确认置顶？":"取消置顶之后该帖将不存在于置顶文章中，是否确认取消置顶？";
		    sticky=sticky==1?2:1;
		    $rootScope.alert(str,function () {
			    articleService.articleSticky(id).then(function () {
				    $rootScope.alert(btnText+"成功",function () {
					    $state.go($state.current,vm.searchParam,{reload:true});
				    },true);
			    });
		    })
	    };

        function getList(params) {
            articleService.articleList(params).then(function (res) {
                if (res.data.code == 0) {
                    vm.list = res.data.data;
                    vm.totalPage = res.data.totalPage
                } else {
                    $rootScope.alert('请检查网络链接')
                }
            })
        }
        function allUpBanner() {
            var count=0;
            articleService.articleList({size:10000,type:1}).then(function (res) {
                angular.forEach(res.data.data,function (item) {
                    if(item.status===1){
                        count++
                    }
                });
                upBanner=(count<8);
            })
        }

    });