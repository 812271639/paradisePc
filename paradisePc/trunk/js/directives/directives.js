angular.module('myApp')
	.directive('top',[function(){
		return{
			templateUrl:'views/directive/toTop.html',
			restrict:'EA',
			link: function($scope,$element,$attrs) {
				$scope.backTop = function () {
				       window.scrollTo(0, 0);
				   };
				$scope.backBottom = function () {
				    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
				   };
				   //滚动回顶部按钮
				   $('#scrollTop').hide();
				   $scope.scrollBtnState = function () {
				       var scrollTopBtn = $('#scrollTop');
				       var scrollBottomBtn = $('#scrollBottom');
				       var position = document.body.scrollTop || document.documentElement.scrollTop;
				       var height = document.body.scrollHeight || document.documentElement.scrollHeight;
				       if (position > 10) {
				           scrollTopBtn.show();
				       } else {
				           scrollTopBtn.hide();
				       }
				       if (position + document.documentElement.clientHeight + 10 > height) {
				           scrollBottomBtn.hide();
				       } else {
				           scrollBottomBtn.show();
				       }

				   };

				   $(window).scroll(function () {
				       $scope.scrollBtnState();
				   });
			}
		}
	}])