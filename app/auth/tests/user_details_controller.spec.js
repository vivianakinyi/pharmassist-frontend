"use strict";

describe("Unit Test: madeasy.auth.controllers.userDetails", function () {
    var state, createController, loginService, rootScope;

    beforeEach(function () {
        module("ui.router");
        module("madeasy.auth.services");
        module("madeasy.auth.controllers");
        module("madeasy.common.services.query_adapter");
        module("madeasy.authorization");

        inject(["$controller", "$rootScope", "$state",
            "madeasy.auth.services.login",
            function ($controller, $rootScope, $state, login) {
                state = $state;
                loginService = login;
                rootScope = $rootScope;

                createController = function () {
                    var ctrlData = {
                        "$state": state,
                        "madeasy.auth.services.login": loginService
                    };

                    return $controller("madeasy.auth.controllers.userDetails",
                        ctrlData);
                };
            }
        ]);
    });

    it("should create a login users display name", function () {
        var user = {
            "first_name": "John",
            "last_name": "Doe"
        };
        spyOn(loginService, "getUser").and.returnValue(user);

        var vm = createController();

        expect(vm.displayName).toEqual("John Doe");
    });

    it("should logout a user", function () {
        var user = {
            "person_details" : {
                "first_name": "John",
                "last_name": "Doe"
            }
        };
        spyOn(loginService, "getUser").and.returnValue(user);
        spyOn(state, "go");

        var vm = createController();
        vm.logout();
        expect(state.go).toHaveBeenCalledWith("auth_logout");
    });

    it("should take user to login screen on forbidden", function () {
        var user = {
            "person_details" : {
                "first_name": "John",
                "last_name": "Doe"
            }
        };
        spyOn(loginService, "getUser").and.returnValue(user);
        spyOn(state, "go");
        createController();
        rootScope.$broadcast("http.auth.forbidden");
        expect(state.go).toHaveBeenCalledWith("auth_403");
    });

    it("should logout user on idle timeout when the user is logged in",
        function () {

            spyOn(loginService, "getUser").and.returnValue({});
            spyOn(loginService, "isLoggedIn").and.returnValue(true);
            spyOn(loginService, "logout");
            spyOn(state, "go");

            createController();
            rootScope.$broadcast("IdleTimeout");
            expect(loginService.isLoggedIn).toHaveBeenCalled();
            expect(state.go).toHaveBeenCalled();
        });

    it("should logout user on idle timeout when the are no on the login page",
        function () {

            spyOn(loginService, "getUser").and.returnValue({});
            spyOn(loginService, "isLoggedIn").and.returnValue(false);
            spyOn(loginService, "logout");
            spyOn(state, "go");

            createController();
            rootScope.$broadcast("IdleTimeout");
            expect(loginService.isLoggedIn).toHaveBeenCalled();
            expect(state.go).toHaveBeenCalled();
        });

    it("should listen to idletimeout and do nothing if user is out", function () {

        spyOn(loginService, "getUser").and.returnValue({});
        spyOn(loginService, "isLoggedIn").and.returnValue(false);
        spyOn(loginService, "logout");
        spyOn(state, "go");
        state.current.name = "auth_login";

        createController();
        rootScope.$broadcast("IdleTimeout");
        expect(loginService.isLoggedIn).toHaveBeenCalled();
        expect(state.go).not.toHaveBeenCalled();
        expect(loginService.logout).not.toHaveBeenCalled();
    });
});
