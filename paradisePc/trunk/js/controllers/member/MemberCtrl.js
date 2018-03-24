 angular.module('myApp')
     .controller('MemberCtrl', function(main) {
         var vm = this;
         main.getUserMsg().then(function (res) {
             if(res.data.code==0){
                 vm.title=res.data.data.isMember==2?"开通会员":"续费会员"
                 vm.src=res.data.data.isMember==2?"images/member-1.png":"images/member-3.png"
             }
             else {
                 res.data.code==-4?$rootScope.loginOut():alert(res.data.message);
             }

         })

     });