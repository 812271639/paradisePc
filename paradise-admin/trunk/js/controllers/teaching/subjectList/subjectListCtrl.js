/**
 * Created by Administrator on 2017\9\1 0001.
 */
'use strict';
angular.module('admin')

     .controller('subjectListCtrl',['$http','$rootScope','$state','teachingService','courseOption',
         function ($http,$rootScope,$state,teachingService,courseOption) {
         var vm = this;
         var log = console.log.bind(console);
         vm.subjectGrade = courseOption.grade;
         vm.subjectStatus = courseOption.status;
         vm.searchParams = $state.params || {};
             vm.searchParams.status = $state.params.status == '' ||$state.params.status == undefined? $state.params.status:parseInt($state.params.status);
             vm.searchParams.gradeDept = $state.params.gradeDept == '' ||$state.params.gradeDept == undefined? $state.params.gradeDept:parseInt($state.params.gradeDept);
             (function () {
                 teachingService.getSubjectList().then(function (res) {
                     res.data.code === 0 ? vm.subjectTotalSize = res.data.data.length:log("异常信息："+res);
                         })
             }());
         //搜索或获取科目列表数据
          vm.getSubjectListData = function () {
              teachingService.getSubjectList(vm.searchParams).then(function (res) {
                      if (res.data.code === 0 && angular.isArray(res.data.data)){
                           vm.subjectListData = res.data.data;
                           vm.subjectCurrentSize = res.data.data.length;
                     }else {
                          $rootScope.alert("异常信息："+res);
                      }
              })
          };

             vm.getSubjectListData();
             vm.search = function () {
                 $state.go($state.current, vm.searchParams, {reload: true});
             };
             //上下架
             vm.changeStatus = function (id,status) {
                 if(status == 1){
                     vm.updown = '上架';
                 }else if(status == 2){
                     vm.updown ='下架';
                 }
                 $rootScope.alert('是否'+vm.updown+'该科目',function () {
                     teachingService.putSubjectUpDowns(id, status).then(function (res) {
                         if (res.data.code === 0) {
                             $rootScope.alert('成功');
                             vm.getSubjectListData();
                         } else if (res.data.code === 4) {
                             $rootScope.alert(res.data.message);
                         } else if (res.data.code === 7) {
                             $rootScope.alert(res.data.message);
                         }else if(res.data.code == -4001){
                             $rootScope.alert(res.data.message);
                         }else {
                             $rootScope.alert(res.data.message);
                         }
                     })
                 })
             };
             //删除
             vm.delete = function (id) {
                 $rootScope.confirm("将删除科目及其下所有内容，是否确认删除?",function () {
                     teachingService.delSubject(id).then(function (res){
                         if(res.data.code === 0){
                             vm.getSubjectListData();
                             vm.subjectTotalSize--;
                             $rootScope.alert("删除成功")
                         }else {
                             $rootScope.alert("删除失败")
                         }
                     })
                 });

             };
             //保存排序
             vm.saveSorting=function(){
                 vm.array=[];
                 angular.forEach(vm.subjectListData,function(data){
                     vm.array.push(data.id)
                 });

                 teachingService.postSubjectSort(JSON.stringify(vm.array)).then(function(res){
                     if(res.data.code === 0){
                         $rootScope.alert("保存排序成功。")
                     }
                 })
             };
             //搜索重置
             vm.rest = function () {
                 vm.searchParams.gradeDept = '';
                 vm.searchParams.status ='';
                 vm.searchParams.subjectName = ''
             }

     }]);
