/**
 * Created by WHUTYZY on 2017/6/10.
 */
'use strict';
angular.module('admin')
	.controller('NoticeListController',['commonUtil','$rootScope','$state','noticeOptions','noticeService',function (commonUtil,$rootScope,$state,noticeOptions,noticeService){
		/***********c
		 * 数据初始化
		 ***********/
		var vm=this;
		vm.noticeStatus=noticeOptions.status;
		vm.searchParams = $state.params || {};
		/***********
		 * 方法定义
		 ***********/
		//获取公告列表
		var getNoticeList=function () {
			noticeService.noticeList(vm.searchParams).then(function (res) {
				if (res.data.code === 0) {
					vm.noticeList = res.data.data;
					vm.totalPage = res.data.totalPage;
				} else {
					$rootScope.alert('请检查网络链接','',true)
				}
			})
		};
		//清空
		vm.clear=function () {
			commonUtil.restParms(vm.searchParams);
		};
		//搜索
		vm.search = function () {
			vm.searchParams.page = 1;
			$state.go($state.current, vm.searchParams, {reload: true});
		};
		//上下架
		vm.changeStatus=function (id,status,statusText) {
			var content=status==2?"上架该公告会下架正在上架的公告,是否上架?":"下架之后该公告将不显示在公告栏中,是否下架?";
			status=status===1?2:1;
			$rootScope.confirm(content,function () {
				noticeService.noticeStatus(id,status).then(function (res) {
					if (res.data.code === 0) {
						$rootScope.alert("公告" + statusText + "成功", function () {
							vm.searchParams.status="";
							$state.go($state.current,vm.searchParams,{reload:true});
						},true);
					} else {
						$rootScope.alert(res.data.message,'',true)
					}
				});
				
			},true);
		};
		//删除
		vm.delete=function (id,status) {
			//判断上下架状态
			if(status===1){
				$rootScope.alert("该公告正在前台进行展示，请先下架",'',true);
			}else{
				$rootScope.confirm("是否彻底删除该公告",function () {
					if($state.params.page!==1&&vm.noticeList.length===1){
						vm.searchParams.page--;
					}
					noticeService.noticeDelete(id).then(function (res) {
						if(res.data.code===0){
							$rootScope.alert("删除成功",function () {
								$state.go($state.current,vm.searchParams,{reload:true})
							},true)
						}
						else{
							$rootScope.alert(res.data.message,'',true);
						}
					})
				},true);
			}
		};
		
		/*********
		 * 业务逻辑
		 *********/
		 getNoticeList();
		
	}]);