/**
 * Created by WHUTYZY on 2017/6/13.
 */
angular.module('admin').controller('CardListController', ['$rootScope','$state','datePickerUtils','cardStatusType', 'cardService','packageService','commonUtil',cardController]);

function cardController($rootScope, $state,datePickerUtils,cardStatusType,cardService,packageService,commonUtil) {
	var vm = this;
	vm.params=$state.params;
	vm.params.effectBegin=parseInt(vm.params.effectBegin)||undefined;
	vm.params.effectEnd=parseInt(vm.params.effectEnd)||undefined;
	vm.params.invalidBegin=parseInt(vm.params.invalidBegin)||undefined;
	vm.params.invalidEnd=parseInt(vm.params.invalidEnd)||undefined;
	vm.cardStatusType=cardStatusType;

	//卡劵列表
	function getCard() {
		cardService.getCardList(vm.params).then(function (res) {
			if(res.data.code==0){
				vm.list=res.data.data.list;
				vm.totalPage=res.data.data.totalPage;
			}else {
				$rootScope.alert('请检查网络链接','',true)
			}
		});
	}
	//获取套餐列表
	function getPackageList() {
		packageService.packageList({page:1,size:10000}).then(function (res) {
			if (res.data.code==0){
				vm.PackageList=res.data.data;
			}else {
				$rootScope.alert('请检查网络链接','',true)
			}
		});
	}
	//生成
	vm.toCreate=function (num) {
		vm.generate=num;
	};
	//确认生成
	vm.createCardList=function () {
		vm.string.deadline=datePickerUtils.cardTime(vm.string.deadline);
		cardService.createCard(vm.string).then(function (res) {
			vm.generate=0;
			if (res.data.code==0){
				$state.go("field.cardList","",{reload:true})
			}else {
				$rootScope.alert(res.data.message,'',true)
			}
		})
	};
	//导出EXL
	vm.toOut=function () {
		$rootScope.alert("是否导出列表？",function () {
			vm.params.excel="excel";
			cardService.getCardList(vm.params).then(function (res) {
				if(res.data.code==0){
					 vm.url=res.data.url;
					if(location.host=="localhost:1011"){
						vm.host="dev.admin.academy.ptteng.com"
					}else {
						vm.host=location.host
					}

					 window.location.href="http://"+vm.host+vm.url;
				}else {
					$rootScope.alert(res.data.message)
				}
			});
		})
	};
	//查询
	vm.search = function () {
		$state.go($state.current, vm.params, {reload: true});
	};
	//清除
	vm.clear = function () {
		commonUtil.restParms(vm.params);
		$state.go($state.current, vm.params, {reload: true});
	};

	getPackageList();
	getCard();
}

