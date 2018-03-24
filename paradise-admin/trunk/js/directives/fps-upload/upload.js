angular.module('admin').directive('upload', function ($timeout, $rootScope) {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            accept: '@',
            upload: '=',
            ngModel: '=',
            ngChange: '&',
            ngError: '&',
            size: '='
        },
        transclude: true,
        template: '<form method="POST" enctype="multipart/form-data">' +
        '<input type="file" name="{{ uploadName }}" multiple style="display: none;" accept="{{accept}}">' +
        '<span class="fake-uploader" readonly="readonly" ng-model="avatar">' +
        '<span ng-transclude></span>' +
        '</span>' +
        '</form>',
        link: function (scope, element, attrs) {
            scope.uploadName = attrs.uploadName || 'file';

            scope.avatar = '';

            //element.find('.fake-uploader').click(function() {
            //    element.find('input[type="file"]').click();
            //});
            element.find('input').change(function (e) {
                var $this = $(this);
                var $form = $this.parents('form');

                if ($this.val() === '') {
                    return false;
                }


                if (scope.size) {
                    if ($this[0].files[0].size > scope.size * 1024) {
                        // $rootScope.alert('图片大小超过限制', function(){});
                        return;
                    }
                }


                $form.attr('action', scope.upload);

                $form.ajaxSubmit({
                    type: 'POST',
                    dataType: 'json',
                    error: function (event, statusText, responseText, form) {
                        $form.removeAttr('action');
                        if (event.status == 413) {
                            alert('图片大小超过限制', function () {

                            });
                        }
                        //console.log(event.getResponseHeader())
                        $timeout(function () {
                            scope.ngError({
                                event: event,
                                responseText: responseText,
                                statusText: statusText,
                                form: form,
                            });
                        });
                    },
                    success: function (responseText) {
                        $form.removeAttr('action');
                        var data = angular.fromJson(responseText);

                        if (data.url !== undefined) {
                            scope.ngModel = data.url;
                        } else {
                            scope.ngModel = e.target.files[0].name;
                        }

                        element.find('input').val('');
                        $timeout(function () {
                            // scope.ngChange(data);//锟睫凤拷锟斤拷效
                            scope.ngChange({data: data});
                        });

                    }
                })
            })
        }
    }
});


