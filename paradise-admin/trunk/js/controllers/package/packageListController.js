/**
 * Created by WHUTYZY on 2017/6/9.
 */
'use strict';
angular.module('admin')
	.controller('PackageListController',['commonUtil','datePickerUtils','$rootScope','$state','status','packageService',
		function (commonUtil,datePickerUtils,$rootScope,$state,status,packageService){
		/***********
		 * 数据初始化
		 ***********/
		var vm=this;
		vm.searchParams=$state.params||{};
		vm.packageStatus=status;
		/***********
		 * 方法定义
		 ***********/
		//获取列表
		 var getPackageList=function () {
			packageService.packageList(vm.searchParams).then(function (res) {
				if(res.data.code===0){
					vm.packageList=res.data.data;
					vm.totalPage=res.data.totalPage;
					vm.isRecommendExist=res.data.recommendStatus;
                    //console.log(typeof (vm.searchParams.status))
				}
				else{
					$rootScope.alert("网络连接错误",'',true);
				}
			});
		 };
		//搜索
		vm.search=function () {
			$state.go($state.current,vm.searchParams,{reload:true});
		};
		//清空
		vm.clear=function () {
			vm.searchParams=commonUtil.restParms(vm.searchParams);
			/*$state.go($state.current,vm.searchParams,{reload:true});*/
		};
		//删除
		vm.deletePackage=function (id) {
			$rootScope.confirm("删除将下架套餐并删除，确认删除？",function () {
				if($state.params.page!==1&&vm.packageList.length===1){
					vm.searchParams.page--;
				}
				packageService.packageDelete(id).then(function (res) {
					if(res.data.code===0){
						$state.go($state.current,vm.searchParams,{reload:true});
					}else{
						$rootScope.alert(res.data.message,'',true);
					}
				});
			},true)
		};
		//推荐
		vm.changeRecommend=function (id,recommend,btnText) {
			var content;
			var serviceName=recommend===1?"packageCancelRecommend":"packageRecommend";
			if(recommend===1){
				content="确认取消推荐？";
			}
			else {
				content=vm.isRecommendExist?"推荐此套餐将取消已推荐套餐，是否推荐？":"将此套餐设为推荐套餐，是否确认？";
			}
			$rootScope.confirm(content,function () {
				packageService[serviceName](id).then(function () {
					$rootScope.alert(btnText+"成功",'',true);
					$state.go($state.current,vm.searchParams,{reload:true});
				})
			},true)
		};
		//上下架
		vm.changeStatus=function (id,status,text) {
			var content=status==2?"确认上架？":"下架将无法从前台订购该套餐，确认下架？";
			status=status==1?2:1;
			$rootScope.confirm(content,function () {
				packageService.packageStatus(id,status).then(function (res) {
					if(res.data.code===0){
						$rootScope.alert(text+"成功",function () {
							vm.searchParams.status='';
							//下架的同时取消推荐
							packageService.packageCancelRecommend(id).then(function () {
								$state.go($state.current,vm.searchParams,{reload:true});
							});
							
						},true);
					}else{
						$rootScope.alert(res.data.message,'',true);
					}
				})
			},true)
		};
		/*********
		 * 业务逻辑
		 *********/
		getPackageList();
	}]);