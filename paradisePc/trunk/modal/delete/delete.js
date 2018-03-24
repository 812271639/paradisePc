//删除模态框控制器
myApp.controller("ModalDeleteCtrl",function($uibModalInstance,$scope,items,$rootScope) {
	var vm = this;
	vm.ok = function () {
		//防止重复提交
		$rootScope.doubleClick(vm);
		$uibModalInstance.close();
	};
	vm.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

});