"use strict";

describe("Unit Test: madeasy.auth.controllers.passwordReset", function () {
    var scope, state, createController, loginService, rootScope, httpBackend;
    var resetUrl;
    beforeEach(function () {
        module("ui.router");
        module("madeasy.auth.services");
        module("madeasy.auth.controllers");
        module("madeasy.common.services.query_adapter");
        module("madeasy.auth.formly.reset_email");
        module("madeasy.authorization");
        module("madeasy.common.errorMessages");

        inject(["$controller", "$rootScope", "$state",
            "madeasy.auth.services.login", "$httpBackend", "PASSWORD_RESET",
            function ($controller, $rootScope, $state, login, $httpBackend,
                resUrl) {

                state = $state;
                loginService = login;
                rootScope = $rootScope;
                scope = rootScope.$new();
                httpBackend = $httpBackend;
                resetUrl = resUrl;

                createController = function () {
                    var ctrlData = {
                        "$scope": scope,
                        "$state": state,
                        "madeasy.auth.services.login": loginService
                    };

                    return $controller("madeasy.auth.controllers." +
                            "passwordReset", ctrlData);
                };
            }
        ]);
    });

    it("should prompt user to correct an invalid form", function () {
        scope.resetForm = {};
        createController();

        scope.resetForm.$valid = false;
        scope.submitEmail();
        var err = "Please correct the errors on" +
            " the form to reset your password";
        expect(scope.alert.msg[0].Error).toEqual(err);
    });

    it("should post the users email", function () {
        spyOn(state, "go");
        scope.resetForm = {};
        createController();
        var test_data = {
            email: "you@me.com"
        };
        httpBackend.expectPOST(resetUrl)
            .respond(200, test_data);

        scope.resetForm.$valid = true;

        scope.resetModel = test_data;
        scope.submitEmail();
        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith("auth_login", {
            reset_password: true
        });
    });
    it("should call backend and post users email: fail",
        function () {
            scope.resetForm = {};
            createController();
            scope.resetForm.$valid = true;
            scope.resetModel = {
                email: "you@me.com"
            };
            scope.submitEmail();
            httpBackend.expectPOST(resetUrl).respond(400,
                new Error());

            httpBackend.flush();
            expect(scope.alert.msg[0].Error).not.toEqual("");
        }
    );

});
