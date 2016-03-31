(function library (angular, _) {
    "use strict";

    angular.module("madeasy.auth.loginService", [
        "ui.router",
        "pharmassistApp.config",
        "madeasy.auth.oauth2",
    ])

    .constant("PASSWORD_RESET", "/accounts/password/reset/")
    .constant("PASSWORD_RES_CONFIRM", "/accounts/password/reset/confirm/")
    .constant("PASSWORD_CHANGE", "/accounts/password/change/" )

    .service("madeasy.auth.services.login", login);
    login.$inject = ["$window", "$q", "api.oauth2", "$http",
    "SERVER_URL","USER_INFO_URL", "PASSWORD_RESET", "PASSWORD_RES_CONFIRM",
    "PASSWORD_CHANGE"];
    function login ($window, $q, oauth2, $http, server_url, curUser,
        rUrl, rUrlCon, changePassUrl) {

        var url = {
            curr_user : curUser
        };
        var store_key = "auth.user";
        var store_state = "state.dump";

        var storage = $window.localStorage;

        return {
            changePassword : function changePasswordFunction (obj) {
                return $http.post(changePassUrl, obj);
            },
            clearState : function clearStateFunction () {
                return storage.removeItem(store_state);
            },
            currentUser : function currentUserFunction () {
                return $http.get(server_url + url.curr_user)
                    .success(function dataFunction (data) {
                        storage.setItem(store_key, JSON.stringify(data));
                    });
            },
            dumpState : function dumpStateFunction (state, params) {
                var user = this.getUser();
                if (user) {
                    var state_dump = {
                        "name": state.name,
                        "params": params,
                        "user": user.id
                    };
                    storage.setItem(store_state, JSON.stringify(state_dump));
                }
            },
            getUser : function getUserFunction () {
                return JSON.parse(storage.getItem(store_key));
            },
            isLoggedIn : function isLoggedInFunction () {
                var user = this.getUser();
                var has_token = oauth2.getToken();
                return (!_.isNull(user)) && (!_.isNull(has_token));
            },
            loadState : function loadStateFunction () {
                var user = this.getUser();
                var dump = JSON.parse(storage.getItem(store_state));
                if (user && dump) {
                    if (dump.user === user.id) {
                        return {
                            "name": dump.name,
                            "params": dump.params
                        };
                    }
                }
                return null;
            },
            login : function loginFunction (user) {
                return oauth2.fetchToken(user.username, user.password);
            },
            logout : function logoutFunction () {
                storage.removeItem(store_key);
                return oauth2.revokeToken(oauth2.getToken());
            },
            resetPassword : function resetPasswordFunction (email) {
                return $http.post(rUrl, {email: email});
            },

            resetPasswordConfirm : function resetPasswordConfirmFunc (obj) {
                return $http.post(rUrlCon, obj);
            }
        };
    }
})(angular, _);
