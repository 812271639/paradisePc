angular.module('myApp')
	.directive('agreement',[function(){
		return{
			templateUrl:'js/directives/agreement/agreement.html',
			restrict:'A'
		};
	}]);