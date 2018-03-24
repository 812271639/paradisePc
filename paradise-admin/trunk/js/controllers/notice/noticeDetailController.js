/**
 * Created by WHUTYZY on 2017/6/10.
 */
'use strict';
angular.module('admin')
	.controller('NoticeDetailController',['commonUtil','$rootScope','$state','noticeService','contentStyle',function (commonUtil,$rootScope,$state,noticeService,contentStyle){
		/***********
		 * 数据初始化
		 ***********/
		var vm=this;
        //字体风格——字号、字体、字色
        vm.contentStyle = contentStyle;
		vm.disabled=$state.params.disabled;
        vm.params = {
            context:{
                appFontSize:'28px',
                pcFontSize:'16px',
                fontColor:'#333333',
                font:'1'
			}
		};


		var noticeId=$state.params.id;
		/***********
		 * 方法定义
		 ***********/
		//编辑
		vm.update=function () {
			vm.disabled=false;
		};
		//返回
		vm.back=function () {
			$state.go('field.noticeList',{},{reload:true});
		};
		//保存|新增
		vm.saveUpdate=function () {

			//保存
			if(noticeId&&noticeId!==""){
                vm.params.context=JSON.stringify(vm.params.context);
				noticeService.noticeEdit(vm.params,noticeId).then(function (res) {
					if(res.data.code===0){
						$rootScope.alert("公告内容保存成功",function () {
							vm.params.disabled=true;
							vm.back();
						},true);
					}else {
						$rootScope.alert(res.data.message,'',true);
					}
				});
			}
			//新增
			else{
				vm.params.context=JSON.stringify(vm.params.context);
                noticeService.noticeAdd(vm.params).then(function (res) {
					if(res.data.code===0){
						$rootScope.alert("公告新增成功",function () {
							vm.params.status=2;
							$state.go('field.noticeList',{},{reload:true});
						},true);
					}else {
						$rootScope.alert(res.data.message,'',true);
					}
				});

			}
		};
		//取消编辑
		vm.cancelUpdate=function () {
			vm.back();
		};
		 if($state.params.id&&$state.params.id!==""){
		 	//编辑
			 noticeService.noticeDetail($state.params.id).then(function (res) {
				 if(res.data.code===0){

					 //兼容老数据——预处理
				 	vm.preproccess = res.data.data;
				 	try {
                        vm.preproccess.context = JSON.parse(vm.preproccess.context);
                    }catch(e){
						//老数据是html，用正则表达式获取html里的内容
                        vm.preproccess.context = vm.preproccess.context.replace(/<\/?[^>]*>/g,'');
                        vm.preproccess.context = {
                                appFontSize:'28px',
                                pcFontSize:'16px',
                                fontColor:'#333333',
                                font:'1',
								content:vm.preproccess.context
						}
						vm.params = vm.preproccess;
					}
                     vm.params=res.data.data;

				 }else{
				 	$rootScope.alert('请检查网络链接','',true);
				 }
			 })
		 }
		
	}]);

