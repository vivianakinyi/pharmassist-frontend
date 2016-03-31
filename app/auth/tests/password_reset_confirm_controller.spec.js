"use strict";

describe("Unit Test: madeasy.auth.controllers.passwordResetConfirm", function () {
    var scope, state, createController, loginService, rootScope, httpBackend;
    var resetUrlConfirm;
    beforeEach(function () {
        module("ui.router");
        module("madeasy.common.services.query_adapter");
        module("madeasy.auth.services");
        module("madeasy.auth.controllers");
        module("madeasy.authorization");
        module("madeasy.common.errorMessages");

        inject(["$controller", "$rootScope", "$state",
            "madeasy.auth.services.login", "$httpBackend",
            "PASSWORD_RES_CONFIRM",
            function ($controller, $rootScope, $state, login, $httpBackend,
                resCon) {

                state = $state;
                loginService = login;
                rootScope = $rootScope;
                scope = rootScope.$new();
                httpBackend = $httpBackend;
                resetUrlConfirm = resCon;

                createController = function () {
                    var ctrlData = {
                        "$scope": scope,
                        "$state": state,
                        "madeasy.auth.services.login": loginService
                    };

                    return $controller("madeasy.auth.controllers." +
                            "passwordResetConfirm", ctrlData);
                };
            }
        ]);
    });

    it("should prompt user to correct an invalid form", function () {
        scope.passwordForm = {};
        createController();

        scope.passwordForm.$valid = false;
        scope.submitPassword();
        var err = "Please correct the errors on" +
            " the form to reset your password";
        expect(scope.alert.msg[0].Error).toEqual(err);
    });

    it("should post the new password to the backend", function () {
        spyOn(state, "go");
        scope.passwordForm = {};
        createController();
        state.token = "obj.token";
        state.uid = "obj.uid";
        var test_data = {
            new_password1: "obj.new_password1",
            new_password2: "obj.new_password2",
            token: "obj.token",
            uid: "obj.uid"
        };
        httpBackend.expectPOST(resetUrlConfirm)
            .respond(200, test_data);

        scope.passwordForm.$valid = true;

        scope.passwordModel = {
            new_password1: "obj.new_password1",
            new_password2: "obj.new_password2"
        };
        scope.submitPassword();
        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith("auth_login", {
            reset_password_confirm: true
        });
    });
    it("should call backend and post new passwords: fail",
        function () {
            scope.passwordForm = {};
            createController();
            scope.passwordForm.$valid = true;
            scope.passwordModel = {
                new_password1: "obj.new_password1",
                new_password2: "obj.new_password2"
            };
            scope.submitPassword();
            httpBackend.expectPOST(resetUrlConfirm).respond(400,
                new Error());

            httpBackend.flush();
            expect(scope.alert).not.toEqual("");
        }
    );

});
