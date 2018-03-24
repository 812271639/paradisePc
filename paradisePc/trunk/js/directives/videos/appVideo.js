/**
 * Created by Administrator on 2018/1/8/008.
 */
angular.module('myApp').directive('appVideo',function($timeout){
   return{
       restrict:"C",
       scope:{
           //判断是否试看
           tryIt:"@",
           //试看结束后传递变量使蒙层显示
           tryOver:"="
        },
       link:function(scope,ele,attrs){
           $timeout(function(){
               var idName = attrs.id;
               player = videojs(idName,{
                    controlBar:{
                        volumePanel:false
                    }
               },function(){
                   $(document.getElementById(idName)).css("width", "100%");
                   $(document.getElementById(idName)).css("height", "100%");
                   //试看功能
                   if(scope.tryIt=='1'){
                       var newTry = document.createElement('div');
                       newTry.innerHTML = '<span class="out-round"><span class="inside-round"><img src="../images/icon/vipicon.png"></span></span><span style="margin-left: 28px;"><span style="color: #fff">您可试看一分钟</span><span style="color: #ddac00;padding-left: 5px">开通VIP观看全集</span></span>';
                       newTry.setAttribute("class", "try-it");
                       this.el().appendChild(newTry);//试看提示常驻
                       //alert('tryIt');——功能
                       var tryfun = function(){
                           //获取当前时间
                           var whereYouAt = player.currentTime();
                           if(whereYouAt>60){
                               //暂停
                               player.pause();
                               //在安卓7.0以下不能调用此方法
                               if($.isFunction(player.exitFullscreen)){
                                   player.exitFullscreen();
                                   player.supportsFullScreen()
                               }
                               else if($.isFunction(player.webkitCancelFullScreen)){
                                   player.webkitCanclFullScreen();
                               }
                               else if($.isFunction(player.mozCancelFullScreen)){
                                   player.mozRequestFullScreen();
                               }
                               player.exitFullscreen();
                               player.exitFullWindow();//退出全屏。
                               player.exitFullScreen();//退出全屏
                               player.reset();//重置播放器
                               //player.dispose();//清除videoJs

                               scope.tryOver = true;
                               scope.$apply();
                           }
                       };
                       //播放时间改变事件
                       player.on('timeupdate', tryfun);
                       player.on('play',function(){
                           newTry.parentNode.removeChild(newTry);
                       })
                   }
               })
           })
       }
   }
});