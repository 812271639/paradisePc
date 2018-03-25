/**
 * Created by Master on 2017/4/21.
 */
'use strict'
angular.module('paradiseApp')
    .controller('BindingController', ['textMobile', 'localSession', 'loginServices', '$rootScope', 'bindAleat', '$state', '$timeout', '$location', function (textMobile, localSession, loginServices, $rootScope, bindAleat, $state, $timeout, $location) {
        var vm = this;
        var params = {};
        var options;
        vm.current = $state.params.type;
        vm.both = $state.params.both;
        vm.mobileParams = {
            openid: localSession.get('mobile') || ''
        }
        vm.mailParams = {
            openid: localSession.get('mail') || ''
        }
        vm.mobileOptions = {
            type: 'mobile',
            check: /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/,
            errText: '请输入正确格式的手机号',
            verify: '该手机号已绑定'
        }
        vm.mailOptions = {
            name: '邮箱',
            type: 'mail',
            check: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            errText: '请输入正确格式的邮箱号',
            verify: '该邮箱号已绑定'
        }
        //验证注册手机是否可用
        vm.verify = function (type) {
            if (type == 1) {
                params = {
                    type: 'mobile',
                    openid: vm.mobileParams.openid
                }
                return loginServices.verifyOpenid(params)
            } else {
                params = {
                    type: 'mail',
                    openid: vm.mailParams.openid
                }
                return loginServices.verifyOpenid(params)
            }
        }
        //发送验证码
        vm.getCode = function (type) {
            if (type == 1) {
                params = {
                    type: 'bind',
                    mobile: vm.mobileParams.openid
                }
                return loginServices.mobileCode(params)
            } else {
                params = {
                    type: 'bind',
                    mail: vm.mailParams.openid
                }
                return loginServices.mailCode(params)
            }
        }
        //绑定
        vm.binding = function (type) {
            if (type == 1) {
                params = vm.mobileParams;
                params.type = 'mobile';
                options = vm.mobileOptions;
            } else {
                params = vm.mailParams;
                params.type = 'mail';
                options = vm.mailOptions;
            }
            if (options.check.test(params.openid)) {
                loginServices.binding(params).then(function (res) {
                    if (res.data.code === 0) {
                        vm.bindSuccess = true;

                        $timeout(function () {
                            vm.bindSuccess = false;
                            // $state.go('identity');
                            $location.path('/bound').replace();
                        }, 3000)
                    } else {
                        bindAleat(res.data.message);
                    }
                })
            } else {
                bindAleat(options.errText);
            }
        }
        //缓存输入值
        vm.setSession = function (type) {
            if (type == 1) {
                localSession.set('mobile', vm.mobileParams.openid);
            } else {
                localSession.set('mail', vm.mailParams.openid)
            }
        }
    }])
