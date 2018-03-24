angular.module('admin').controller('versionManageDetailCtrl', ['$rootScope','$state','customerService','FileUploader', versionManageDetailCtrl]);

function versionManageDetailCtrl($rootScope,$state,customerService,FileUploader) {
    var vm = this;
    //新增或编辑
    vm.addbol = false;
    //获取版本并判断显示内容
    customerService.versionDetail().then(function(res){

        if(res.data.code==0){
           vm.params=res.data.data;

           angular.forEach(vm.params, function (data) {
               if(data.id == $state.params.id){
                vm.params = data;
                
               }
           })

            if(vm.params.info==""){
                vm.params.info=[{introduce:""}]
            }else {
                vm.params.info=JSON.parse((vm.params).info);
            }
        }else {
            $rootScope.alert(res.data.message)
        }
    })

    //新增
    vm.add=function () {
        if(vm.params.info){
            var arr = vm.params.info;
            console.log(vm.params.info)
            for(i=0;i<arr.length;i++){
                if(arr[i].introduce.length == 0){
                    vm.delList(i)
                    console.log(vm.params.info)
                }
            }
            vm.params.info = JSON.stringify(vm.params.info);
        }else{
            vm.params.info = JSON.stringify([{introduce:''}]);
        }
        vm.params.isForceUpdate=!!vm.params.isForceUpdate
        customerService.newVersion(vm.params).then(function (res) {
            
            if(res.code===0){
                $state.go("field.versionManage",{reload:true})
            }else{
                
                $rootScope.alert(res.data.message,function () {
                })
                $state.go("field.versionManage",{reload:true})
            }
        })
    }


    //修改
    vm.update=function(){
        for(i=0;i<vm.params.info.length;i++){
            if(vm.params.info[i].introduce.length == 0){
                vm.delList(i)
            }
        }
        vm.par
        vm.params.info=JSON.stringify(vm.params.info);
        customerService.changeVersionDetail(vm.params.id,vm.params).then(function(res){
            
            if(res.data.code==0){
                $state.go("field.versionManage")
            }else {
                $rootScope.alert(res.data.message)
            }
        })
    };

    //添加版本信息列表
    vm.addList=function () {
        vm.listEach=  {introduce:""};
        vm.params.info.push(vm.listEach)
    };
    //删除版本信息列表
    vm.delList=function (num) {
        vm.params.info.splice(num,1);
    };
    //检查平台和版本是否修改
    vm.check=function () {
        if( vm.params.os !== $state.params.os ){
            vm.addbol = true
        }else if(vm.params.versionCode !== $state.params.versionCode ){
            vm.addbol = true
        }else{
            vm.addbol = false
        }
    }


}