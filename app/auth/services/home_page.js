(function library (angular, _) {
    "use strict";

    angular.module("madeasy.auth.homePageService", [])

    .factory("madeasy.auth.services.homePage", homePage);
    homePage.$inject = ["AVAILABLE_HOMEPAGES", "VIEW_ACT",
    "madeasy.auth.services.login"];
    function homePage (homePages, viewAct, loginServ) {
        /**
         * @description A service that use the actions that a user has to
         * determine the homepage for a user. The service performs a cascade
         * starting with the common actions as in moves to the rare ones
         */

        var determineHomePage = function determineHomePageFunc () {
            if (loginServ.isLoggedIn()) {
                var currUser = loginServ.getUser();
                var actions = currUser.actions;
                for ( var i = 0; i < homePages.length; i++) {
                    var homePageActs = viewAct[homePages[i]];
                    var result = _.intersection(homePageActs, actions);
                    if (!_.isEmpty(result)) {
                        return homePages[i];
                    }
                }
                return "auth_403";
            }
            return "auth_login";
        };

        return {
            "determineHomePage": determineHomePage
        };
    }
})(angular, _);
