/**
 * Created by WHUTYZY on 2017/6/10.
 */
'use strict';
angular.module('admin')
	.controller('PackageDetailController',['commonUtil','$rootScope','$state','packageService',function (commonUtil,$rootScope,$state,packageService){
		/***********
		 * 数据初始化
		 ***********/
		var vm=this;
		var packageId=$state.params.id;
		vm.params=$state.params||{};
		
		/***********
		 * 方法定义
		 ***********/
		//返回
		vm.back=function () {
			history.go(-1);
		};
		//保存|新增
		vm.saveUpdate=function () {
			var content=packageId?"套餐内容保存成功":"套餐新增成功";
			var method=packageId?"packageEdit":"packageAdd";
				if(packageId){
				packageService.packageEdit(packageId,vm.params).then(function (res) {
					if(res.data.code===0){
						$rootScope.alert(content,function () {
							$state.go("field.packageList",{},{reload:true});
						},true);
					}else {
						$rootScope.alert(res.data.message,'',true);
					}
				});
			}else{
				packageService.packageAdd(vm.params).then(function (res) {
					if(res.data.code===0){
						$rootScope.alert(content,function () {
							$state.go("field.packageList",{},{reload:true});
						},true);
					}else {
						$rootScope.alert(res.data.message,'',true);
					}
				});
			}
			
			
			
		};
		//价格同步  iosAverage  iosPrice
		vm.showPrice=function () {
			if(vm.params.iosDiscountPrice == '.00'){
                vm.params.iosDiscountPrice=undefined;
			}
            if(vm.params.discountPrice == '.00'){
                vm.params.discountPrice=undefined;
            }
			if(vm.params.iosDiscountPrice&&vm.params.discountPrice){
				//alert('都有')
				if(parseInt(vm.params.iosDiscountPrice)<parseInt(vm.params.iosPrice)&&parseInt(vm.params.discountPrice)<parseInt(vm.params.price)){
                    if(vm.params.price&&vm.params.period&&vm.params.discountPrice&&parseInt(vm.params.price)&&parseInt(vm.params.period)&&parseInt(vm.params.discountPrice)){
                       vm.average=(parseInt(vm.params.discountPrice)/parseInt(vm.params.period)).toFixed(2);
                    }
                    else{
                       vm.average=0;
                    }
                    if(vm.params.iosPrice&&vm.params.period&&vm.params.iosDiscountPrice&&parseInt(vm.params.iosPrice)&&parseInt(vm.params.period)&&parseInt(vm.params.iosDiscountPrice)){
                       vm.iosAverage=(parseInt(vm.params.iosDiscountPrice)/parseInt(vm.params.period)).toFixed(2);
                    }
                    else{
                       vm.average=0;
                       vm.iosAverage=0;
                    }
				}
                else {
                    vm.average = 0;
                    vm.iosAverage = 0;
                }
			}
			else{
				if(vm.params.iosDiscountPrice){
					//alert('只有ios')
					if(parseInt(vm.params.iosDiscountPrice)<parseInt(vm.params.iosPrice)){
                        if(vm.params.price&&vm.params.period&&parseInt(vm.params.price)&&parseInt(vm.params.period)){
                           vm.average=(parseInt(vm.params.price)/parseInt(vm.params.period)).toFixed(2);
                        }
                        else{
                           vm.average=0;
                        }
                        if(vm.params.iosPrice&&vm.params.period&&vm.params.iosDiscountPrice&&parseInt(vm.params.iosPrice)&&parseInt(vm.params.period)&&parseInt(vm.params.iosDiscountPrice)){
                            vm.iosAverage=(parseInt(vm.params.iosDiscountPrice)/parseInt(vm.params.period)).toFixed(2);
                        }
                        else{
                           vm.average=0;
                           vm.iosAverage=0;
                        }
					}
					else{
                        vm.average = 0;
                        vm.iosAverage = 0;
					}
				}
				else if(vm.params.discountPrice){
                    //alert('只有安卓')
                    if(parseInt(vm.params.discountPrice)<parseInt(vm.params.price)){
                        if(vm.params.price&&vm.params.period&&vm.params.discountPrice&&parseInt(vm.params.price)&&parseInt(vm.params.period)&&parseInt(vm.params.discountPrice)){
                            vm.average=(parseInt(vm.params.discountPrice)/parseInt(vm.params.period)).toFixed(2);
                        }
                        else{
                            vm.average=0;
                        }
                        if(vm.params.iosPrice&&vm.params.period&&parseInt(vm.params.iosPrice)&&parseInt(vm.params.period)){
                            vm.iosAverage=(parseInt(vm.params.iosPrice)/parseInt(vm.params.period)).toFixed(2);
                        }
                        else{
                            vm.average=0;
                            vm.iosAverage=0;
                        }
                    }
                    else{
                        vm.average = 0;
                        vm.iosAverage = 0;
                    }
				}
				else{
					//alert('都没有')
                    if(vm.params.price&&vm.params.period&&parseInt(vm.params.price)&&parseInt(vm.params.period)){
                    vm.average=(parseInt(vm.params.price)/parseInt(vm.params.period)).toFixed(2);
                    }
                    else{
                    vm.average=0;
                    }
                    if(vm.params.iosPrice&&vm.params.period&&parseInt(vm.params.iosPrice)&&parseInt(vm.params.period)){
                        vm.iosAverage=(parseInt(vm.params.iosPrice)/parseInt(vm.params.period)).toFixed(2);
                    }
                    else{
                        vm.average=0;
                        vm.iosAverage=0;
                    }
				}
			}
		};
		/*********
		 * 业务逻辑
		 *********/
		if(packageId&&packageId!==""){
			packageService.packageDetail(packageId).then(function (res) {
				if(res.data.code===0){
					vm.params=res.data.data;
					if(!vm.params.discountPrice&&!vm.params.iosDiscountPrice){
                        vm.average=(parseInt(vm.params.price)/parseInt(vm.params.period)).toFixed(2);
                        vm.iosAverage=(parseInt(vm.params.iosPrice)/parseInt(vm.params.period)).toFixed(2);
					}
					else if(!vm.params.discountPrice&&vm.params.iosDiscountPrice){
                        vm.average=(parseInt(vm.params.price)/parseInt(vm.params.period)).toFixed(2);
                        vm.iosAverage=(parseInt(vm.params.iosDiscountPrice)/parseInt(vm.params.period)).toFixed(2);
					}
					else if(vm.params.discountPrice&&!vm.params.iosDiscountPrice){
                        vm.average=(parseInt(vm.params.discountPrice)/parseInt(vm.params.period)).toFixed(2);
                        vm.iosAverage=(parseInt(vm.params.iosPrice)/parseInt(vm.params.period)).toFixed(2);
					}
					else if(vm.params.discountPrice&&vm.params.iosDiscountPrice){
                        vm.average=(parseInt(vm.params.discountPrice)/parseInt(vm.params.period)).toFixed(2);
                        vm.iosAverage=(parseInt(vm.params.iosDiscountPrice)/parseInt(vm.params.period)).toFixed(2);
					}
				}
				else {
					$rootScope.alert(res.data.message||"网络连接错误",'',true);
				}
			})
		}
		/***
		 * 保存|新增函数抽象
		 * 获得列表抽象
		 */
		
	}]);