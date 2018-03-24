angular.module('admin').controller('helpDetailCtrl', ['$rootScope','$state', 'commonUtil', 'helpService','$timeout','$scope','contentStyle', helpDetailCtrl]);

function helpDetailCtrl($rootScope, $state,commonUtil,helpService,$timeout,$scope,contentStyle) {
    var vm = this;
    // var um = UM.getEditor('myEditor');
    //字体风格——字号、字体、字色
    vm.contentStyle = contentStyle;
    //设置默认字号、字体、字色
    vm.id=$state.params.id;
    vm.disabled=$state.params.disableNum;
    //console.log(vm.disabled);
    //设置默认字号、字体、字色
    vm.params = {
        content:{
            appFontSize:'28px',
            pcFontSize:'16px',
            fontColor:'#333333',
            font:'1'
        }
    };
    if(vm.id){
        helpService.helpDetail(vm.id).then(function(res){
            if(res.data.code==0){
                //预处理——老数据

                vm.params=res.data.data.article;
                try{var a = JSON.parse(res.data.data.article.content)}
                catch(e){}
                if(!angular.isObject(a)){
                    vm.params.content={
                        appFontSize:'28px',
                        pcFontSize:'16px',
                        fontColor:'#333333',
                        font:'1',
                        context:res.data.data.article.content
                    }
                }else{
                    try{vm.params.content = JSON.parse(vm.params.content)}
                    catch(e){}

                }

            }else {
                $rootScope.alert(res.data.message)
            }
        })
    }

    vm.back=function () {
        history.go(-1);
    }
//取消
    vm.cancelUpdate = function () {
        $rootScope.alert("是否取消编辑帮助内容", function () {
            history.go(-1);
        });
    };
//保存
    vm.saveUpdate = function () {
        vm.params.img="nothing";//必填的空字段
        vm.params.bannerType=0;
        vm.params.type=2;//2代表新增帮助，1代表新增banner
        vm.params.content  = JSON.stringify(vm.params.content );

        helpService.helpEdit(vm.id, vm.params).then(function (res) {
            if (res.data.code == 0) {
                $rootScope.alert("文章内容保存成功", function () {
                    history.go(-1);
                },true);
            } else {
                $rootScope.confirm(res.data.message)
            }
        })
    };

}