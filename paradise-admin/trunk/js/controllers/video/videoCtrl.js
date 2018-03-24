/**
 * Created by Master on 2017/3/16.
 */
'use strict';
angular.module('admin')
    .controller('VideoController', function ($state, $scope, $rootScope, commonUtil, videoService, videoOptions) {
        var vm = this;
        var upBanner=false;
        vm.videoOptions = videoOptions;
        vm.searchParam = $state.params || {};

        getList(vm.searchParam);
        allUpBanner();
        vm.search = function () {
            vm.searchParam.page = 1;
            $state.go($state.current, vm.searchParam, {reload: true});
        };

        //rest
        vm.rest = function () {
            commonUtil.restParms(vm.searchParam);
            $state.go($state.current, vm.searchParam, {reload: true});
            getList();
        };
        //上下架
        vm.changeStatus = function (id, status,type,obj) {
            allUpBanner(obj.grade,obj.subject);
            $rootScope.alert("是否" + status + "该视频？", function () {
                if (status=='上架'&&type==1&&!upBanner){
                    $rootScope.alert('当前已有8条上架banner视频，继续将自动下架当前第一条banner视频，确认上架吗？',function () {
                        con
                    	videoService.videoStatus(id).then(function (res) {
                            if (res.data.code == 0) {
                                // getList();
                                $rootScope.alert("视频" + status + "成功", function () {
                                    $state.go($state.current,vm.searchParam,{reload:true});
                                },true);
                            } else {
                                $rootScope.alert(res.data.message)
                            }
                        });
                    });
                }else {
                    videoService.videoStatus(id).then(function (res) {
                        if (res.data.code == 0) {
                            // getList();
                            $rootScope.alert("视频" + status + "成功", function () {
                                $state.go($state.current,vm.searchParam,{reload:true});
                            },true);
                        } else {
                            $rootScope.alert(res.data.message)
                        }
                    });
                }
            });
        };
        //视频置顶
	    vm.setSticky = function (id,sticky) {
	    	// var str;
		    // str=sticky==2?"置顶此条帖子会将该部门最后一条置顶帖顶掉，确认置顶？":"取消置顶之后该帖将不存在于置顶帖中，是否确认取消置顶？";
	    	// sticky=sticky==1?2:1;
		    // $rootScope.alert(str,function () {
			   videoService.videoRank(id).then(function (res) {
			       if (res.data.code==0){
                       $rootScope.alert("置顶成功",function () {
                           $state.go($state.current,vm.searchParam,{reload:true});
                       },true);
                   }else {
                       $rootScope.alert(res.data.message)
                   }
			   });
		    // })
	    };
        //请求视频列表
        function getList(params) {
            videoService.videoList(params).then(function (res) {
                if (res.data.code == 0) {
                    vm.list = res.data.data.video;
                    // console.log(vm.list[0].rank);
                    vm.totalPage = res.data.totalPage;
                    var gradeList=groupArrayList(res.data.data.grade,'videoId','grade');
                    // console.log(gradeList);
                    angular.forEach(vm.list,function (data,index,array) {
	                    data.grade=gradeList[data['id']];
                    });
                    // console.log(vm.list);
	                
                } else {
                    $rootScope.alert('请检查接口或网络链接')
                }
            })
        }
        //已上架banner数
       function allUpBanner(grade,subject) {
            var count=0;
           videoService.videoList({size:10000,type:1,grade:grade,subject:subject}).then(function (res) {
                angular.forEach(res.data.data,function (item) {
                    if(item.status===1){
                        count++
                    }
                });
               upBanner=(count<8);
           })
       }
       //年级分组
	    function groupArrayList(arr,key,value) {
        	var groupList={};
		    arr.forEach(function (element,index,array) {
			    if(groupList[element[key]]){
			        groupList[element[key]].push(element[value]);
			    }else{
				    groupList[element[key]]=[];
				    groupList[element[key]].push(element[value]);
			    }
		    });
		    return groupList;
	    }
	    
	    //
	    
     
     
    });

	