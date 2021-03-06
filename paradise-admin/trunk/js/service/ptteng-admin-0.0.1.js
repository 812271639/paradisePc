'use strict';
angular.module('admin')
    .factory('path', function (commonUtil) {
        return {
            //login
            login: "/a/login",
            logout: "/a/logout",
            //manager
            manager: function (mid) {
                if (mid == undefined || mid == "") {
                    return "/a/u/manager";
                } else {
                    return "/a/u/manager/" + mid;
                }

            },
            manager_list: "/a/u/manager/",
            manager_multi_detail: function (params) {
                return "/a/u/multi/manager" + commonUtil.concactArrayParam("ids", params);

            },
            //pwd
            changePwd: "/a/u/pwd",
            //role
            role: function (rid) {

                if (rid == undefined || rid == "") {
                    return "/a/u/role";
                } else {
                    return "/a/u/role/" + rid;
                }

            },
            role_list: "/a/u/role/",
            role_multi_detail: function (params) {
                return "/a/u/multi/role" + commonUtil.concactArrayParam("ids", params);

            },
            role_module: function (rid) {
                return "/a/u/role/" + rid + "/module"
            },
            role_manager: function (rid) {
                return "/a/u/role/" + rid + "/manager"
            },
            //module
            module: function (mid) {
                if (mid == undefined || mid == "") {
                    return "/a/u/module";
                } else {
                    return "/a/u/module/" + mid
                }
            },
            module_list: "/a/u/module/",
            module_multi_detail: function (params) {
                return "/a/u/multi/module" + commonUtil.concactArrayParam("ids", params);

            },

            //article
            article: function (aid) {
                if (aid == undefined || aid == "") {
                    return "/a/u/article";
                } else {
                    return "/a/u/article/" + aid;
                }


            }
        }
    })


    .factory('loginService', function ($http, path) {
        return {
            login: function (params) {
                return $http.post(path.login, params);
            },
            logout: function () {
                return $http.post(path.logout);
            },
            changePwd: function (params) {
                // params: id|password
                return $http.put(path.changePwd, params);
            }
        }
    })

    .factory('pwdService', function ($http, path) {
        return {

            changePwd: function (params) {
                // params: id|password
                return $http.put(path.changePwd, params);
            }


        }
    })
    //账户管理
    .factory('managerService', function ($http, path, commonUtil, $rootScope, $state) {
        return {

            getManager: function (mid) {
                return $http.get(path.manager(mid));
            },
            addManager: function (params) {
                return $http.post(path.manager(), params);
            },
            updateManager: function (mid, params) {
                return $http.put(path.manager(mid), params);
            },
            deleteManager: function (mid) {
                return $http.delete(path.manager(mid));
            },
            getManagerList: function (params) {
                return $http.get(path.manager_list, commonUtil.process4Page(params)).then(function (res) {
                    return commonUtil.processPageResult(res);
                });
            },

            batchGetManager: function (params) {
                return $http.get(path.manager_multi_detail(params));
            },

            saveOrUpdateManager: function (mid, params, url ) {
                if (mid == undefined || mid == "") {
                    this.addManager(params).then(function (res) {
                        if(res.data.code==0){
                            console.log(res)
                            $rootScope.alert("新增成功。");
                            $state.go(url, null, {reload: true});
                        }
                        else {
                            $rootScope.alert("保存失败，错误代码：",res.data.message);
                            $state.go($state.current, {} ,{reload: true});
                        }
                        //commonUtil.showReturnMsg(res,url);
                    });
                } else {
                    this.updateManager(mid, params).then(function (res) {
                        if(res.data.code==0){
                            console.log(res)
                            $rootScope.alert("编辑成功。");
                            $state.go(url, null, {reload: true});
                        }
                        else {
                            $rootScope.alert("保存失败，错误代码：",res.data.message);
                            $state.go($state.current, {} ,{reload: true});
                        }
                        //commonUtil.showReturnMsg(res,url);
                    });

                }

            },

            saveSelfDetail: function (manager) {
                localStorage["self"] = JSON.stringify(manager);

            },

            getSelfDetail: function () {
                if (localStorage["self"] == "undefined" || localStorage["self"] == undefined) {
                    console.log("not get ptteng-paging data ,relogin ");
                    return undefined;
                } else {
                    return JSON.parse(localStorage["self"]);
                }

            },
            clearSelfDetail: function () {
                localStorage["self"] = undefined;
            }


        }
    })
    .factory('roleService', function ($http, path, moduleService, commonUtil, $state) {
        return {
            getRole: function (rid) {
                return $http.get(path.role(rid));
            },
            addRole: function (params) {
                //return $http.post(path.role(), params);

                return $http({
                    url: path.role(),
                    method: "POST",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: JSON.stringify(params),
                    transformRequest: function (data, headersGetter) {
                        return data;
                    }
                });

            },
            updateRole: function (rid, params) {
                //return $http.put(path.role(rid), params);

                return $http({
                    url: path.role(rid),
                    method: "put",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: JSON.stringify(params),
                    transformRequest: function (data, headersGetter) {
                        return data;
                    }
                });
            },
            deleteRole: function (rid) {
                return $http.delete(path.role(rid));
            },
            getRoleList: function (params) {

                return $http.get(path.role_list, commonUtil.process4Page(params)).then(function (res) {
                    return commonUtil.processPageResult(res);
                });
            },
            getRoleModule: function (rid) {
                return $http.get(path.role_module(rid));
            },
            getRoleManager: function (rid) {
                return $http.get(path.role_manager(rid));
            },
            getRoleModuleDetail: function (rid) {
                var res = this.getRoleModule(rid);
                var moduleIDS = res.data;
                return moduleService.batchGetModule(moduleIDS);

            },
            batchGetRole: function (params) {
                return $http.get(path.role_multi_detail(params));
            },
            saveOrUpdateRole: function (mid, params, url) {
                if (mid == undefined || mid == "") {
                    this.addRole(params).then(function (res) {
                        $state.go(url, null, {reload: true});
                        //commonUtil.showReturnMsg(res,url);
                    });
                } else {
                    this.updateRole(mid, params).then(function (res) {
                        $state.go(url, null, {reload: true});
                        //commonUtil.showReturnMsg(res,url);
                    });

                }

            }
        }
    })
    .factory('moduleService', function ($http, path, commonUtil) {
        return {
            getModule: function (mid) {
                return $http.get(path.module(mid));
            },
            addModule: function (params) {
                return $http.post(path.module(), params);

                //return $http({
                //    url: path.module(),
                //    method: "POST",
                //    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                //    data: JSON.stringify(params),
                //    transformRequest: function (data, headersGetter) {
                //        return data;
                //    }
                //});
            },
            updateModule: function (mid, params) {
                return $http.put(path.module(mid), params);
            },
            deleteModule: function (mid) {
                return $http.delete(path.module(mid));
            },
            getModuleList: function (params) {

                return $http.get(path.module_list, commonUtil.process4Page(params)).then(function (res) {
                    return commonUtil.processPageResult(res);
                });
            },
            //batchGetModule:function(params){
            //
            //
            //    return $http.get(path.module_multi_detail(params));
            //},
            batchGetModule: function (params, id) {
                if (id == 1) {
                    return $http.get("js/json/moduleList.json");
                } else {
                    return $http.get(path.module_multi_detail(params));
                }
            },
            saveOrUpdateModule: function (mid, params, url) {
                if (mid == undefined || mid == "") {
                    this.addModule(params).then(function (res) {
                        commonUtil.showReturnMsg(res, url);
                    });
                } else {
                    this.updateModule(mid, params).then(function (res) {
                        commonUtil.showReturnMsg(res, url);
                    });

                }

            }


        }
    })


;


