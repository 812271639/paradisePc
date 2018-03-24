angular.module('admin')
    .controller('courseDetailCtrl',['$rootScope','$scope','$state','FileUploader',function($rootScope,$scope,$state,FileUploader){
        var vm = this;
        vm.params = {};
        //图片上传
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function(){
            return true;
        };
        vm.uploader = new FileUploader({
            url:"/a/u/img/article"
        });
        vm.uploader.onSuccessItem = function (fileItem,res,status,headers) {
            if(status == 200){
                if (res.data.img === '') {
                    res.data.img = '123';
                }
                vm.params.img = res.data.url
            }
        };
        //图片格式验证(图片发送至后台)
        vm.upload = function(item){
            if (item._file.type.indexOf('image') != -1) {
                item.upload();
            } else {
                $rootScope.alert("请上传图片")
            }
        };
        //删除图片
        vm.clearImg = function(){
            vm.params.img = '';
            vm.uploader.queue = [];
        };
        vm.back = function(){
            history.go(-1);
        }
        //保存
        vm.saveUpdate = function () {
            articleService.articleEdit(vm.id, vm.params).then(function (res) {
                if (res.data.code == 0) {
                    $rootScope.alert("文章内容保存成功", function () {
                        history.go(-1);
                    },true);
                } else {
                    $rootScope.confirm(res.data.message)
                }
            })
        };
        //取消
        vm.cancelUpdate = function () {
            $rootScope.alert("是否取消编课程内容", function () {
                // $state.go("field.articleList")
                history.go(-1);
            });
        };
    }])
