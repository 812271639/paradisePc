/**
 * Created by Master on 2017/3/16.
 */
'use strict';
angular.module('admin')
	.controller('VideoDetailController', function ($state, $scope, $rootScope, commonUtil, videoService, videoOptions, $filter) {
		var vm = this;
		var tid;
		vm.id = $state.params.id;
		vm.videoOptions = videoOptions;
		vm.disabled = $state.params.disabled;
		vm.gradeList={};
		vm.grade=[];
		if (vm.id) {
			videoService.videoDetail(vm.id).then(function (res) {
				if (res.data.code == 0) {
					vm.params = res.data.data;
					vm.grade=res.data.data.grade||[];
					angular.forEach(vm.params.grade,function (data,index,array) {
						vm.gradeList[data]=true;
					})
				} else {
					commonUtil.showErrMsg(res);
				}
			});
		}
		vm.back=function () {
			history.go(-1);
		};
		vm.cancelUpdate = function () {
			$rootScope.alert("是否取消编辑内容", function () {
				history.go(-1);
			});
		};
		vm.saveUpdate = function () {
			tid=$filter('teacherFilter')(vm.params.teacherName,$rootScope.teacherList);
			vm.grade=commonUtil.objToArray(vm.gradeList);
			var url=commonUtil.concactArrayParam('grade',vm.grade);
			if (vm.id) {
				vm.params.tid = vm.teacher ? JSON.parse(vm.teacher).id : tid;
			} else {
				vm.params.teacherImg = vm.teacher ? JSON.parse(vm.teacher).profilePhoto : vm.params.teacherImg;
				vm.params.teacherName = vm.teacher ? JSON.parse(vm.teacher).name : vm.params.teacherName;
			}
			videoService.videoEdit(vm.id, vm.params,url).then(function (res) {
				if (res.data.code === 0) {
					$rootScope.alert("视频内容保存成功",'',true);
					history.go(-1);
				} else {
					console.log(vm.params);
					$rootScope.alert(res.data.message)
				}
			})
		};
		

	});
	
	