/**
 * Created by Master on 2017/4/29.
 */
'use strict'
angular.module('paradiseApp')
    .directive('editToolbar', function () {
        return {
            restrict: 'E',
            scope: {
                editContent: '='
            },
            template: '<div class="pd-lr-15 edit-wrap"><div class="edit-title-wrap">\
                    <input class="edit-title" type="text" placeholder="输入标题">\
                    </div>\
                    <div class="content-wrap">\
                    <div id="content" style="min-height: 100%" contenteditable></div>\
                    </div>\
                    </div>\
                    <div id="edit-toolbar" class="edit-toolbar">\
                    <button data-name="bold">加粗</button>\
                    <button data-name="italic">斜线</button>\
                    <button data-name="underline">下划线</button>\
                    </div>',
            link: function (scope, ele, attrs) {
                var btn = document.getElementById('edit-toolbar').getElementsByTagName('button');
                for (var i = 0; i < btn.length; i++) {
                    btn[i].onclick = function () {
                        document.execCommand(this.dataset.name, false, this.dataset.value);
                    }
                }
            }
        }
    })
