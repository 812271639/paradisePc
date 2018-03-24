/**
 * Created by Administrator on 2017\9\8 0008.
 */
angular.module("admin")
.directive("colorPicker",function () {
    var vm = this;
    var str = {'background':'{{vmColor}}'};
    return{
        restrict:"E",
        replace:true,
        template:'<label class="{{labelClass}}">{{labelName}}' +
        '<span class="{{spanClass}}" id="{{spanId}}" ng-style="str">' +
        '<input ng-model="vmColor" type="text" class="{{inputClass}}" id="{{inputId}}">' +
        '</span></label>',
        scope:{
            labelClass:"@",
            labelName:"@",
            spanId:"@",
            spanClass:"@",
            inputClass:"@",
            inputId:"@",
            vmColor:"="
        },
        link:function (scope, element, attrs) {
            var e = element.children().children();
            $(element.children()).css('background',''+scope.vmColor);
            // console.log(scope.vmColor);
            $(e).colorpicker({
                    target:'#title',
                    success:function(o,color){
                        $("#color").val(color);
                        scope.vmColor = color;
                        $("#setColor").css('background',''+scope.vmColor);
                    },
                    reset:function(o){
                        $("#color").val('');
                    }
                });
        }
    }
});