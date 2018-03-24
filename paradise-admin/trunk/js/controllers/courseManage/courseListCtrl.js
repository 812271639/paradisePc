angular.module('admin')
.controller('courseListCtrl',['$scope','$state','$rootScope','courseService','courseOption',function
	($scope,$state,$rootScope,courseService,courseOption){
	var vm = this;
	vm.option = courseOption;
	vm.specialGrade = courseOption.grade;
	vm.specialStatus = courseOption.status;
	vm.params = $state.params;
	// console.log($state.params);
	vm.params.size = 10;
	vm.special = {};
	vm.special.specialId = vm.params.id;
	//搜索或获取课程列表数据
	vm.getCourseData = function(){
        courseService.getCourse(vm.params,vm.special.specialId).then(function (res) {
			if (res.data.code === 0 || res.data.code == ''){
				vm.CourseListData = res.data.data;
                vm.totalPage =  res.data.totalPage;
			}else {
                $rootScope.alert(res.data.message);
            }
		})
	};
	vm.getCourseData();
    vm.search = function () {
        vm.params.page = 1;$state.go($state.current, vm.params, {reload: true});
    };
	//上下架
	vm.changeStatus = function(id,status){
	     if(status == 1){
	         vm.updown = '上架';
         }else if(status == 2){
	         vm.updown ='下架';
         }
         $rootScope.alert('是否'+vm.updown+'该课程',function () {
             courseService.putCourseUpDowns(id,status).then(function (res) {
                 if (res.data.code == 0){
                     $rootScope.alert('成功');
                     vm.getCourseData();
                 }else if(res.data.code === 4){
                     $rootScope.alert(res.data.message);
                 }else if(res.data.code === 7){
                     $rootScope.alert(res.data.message);
                 }else if(res.data.code == -4201){
                     $rootScope.alert(res.data.message);
                 }else{
                     $rootScope.alert(res.data.message);
                 }
             })
         })

	};
	//删除
	vm.delete = function(id){

        $rootScope.confirm("将删除课程及其下所有内容，是否确认删除？", function () {
                courseService.delCourse(id).then(function(res) {
                    // console.log(res)
                    if (res.data.code == 0) {
                        vm.getCourseData();
                        $rootScope.alert('删除成功')
                    }else {
                        $rootScope.alert('删除失败')
                    }

                })
            })
	};
	//保存排序
	vm.saveSorting = function(){
		vm.array=[];
		angular.forEach(vm.CourseListData, function(data){
			vm.array.push(data.id)
		});
        courseService.postCourseSort(JSON.stringify(vm.array)).then(function(res){
            if(res.data.code==0){
                $rootScope.alert("保持排序成功。")
            }
        })
	};
	//重置
    vm.rest = function () {
    	vm.params.periodName='';
        vm.params.lessonName = '';
        vm.params.gradeDept = '';
        vm.params.subjectName = '';
        vm.params.status = '';
    }
    //开关拖动排序
    vm.draggable=true;
    if(!vm.params.id){
        vm.draggable=false;
    }
}]);
