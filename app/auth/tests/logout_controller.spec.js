"use strict";

describe("Test logout controller", function () {

    var controller, credz, httpBackend, state, payload, rootScope;

    beforeEach(function () {
        module("madeasy.common.services.query_adapter");
        module("madeasy.auth.controllers");

        inject(["$controller", "$httpBackend", "CREDZ", "$window", "$rootScope",
            "madeasy.auth.services.login", "$state", "api.oauth2",
            function ($controller, $httpBackend, CREDZ, $window, r, l, $state,
                oauth2) {

                credz = CREDZ;
                state = $state;
                httpBackend = $httpBackend;
                rootScope = r;
                spyOn(oauth2, "getToken")
                    .and.returnValue({"access_token": "token"});
                payload =
                    "token=" + "token" +
                    "&client_id=" + credz.client_id +
                    "&client_secret=" + credz.client_secret;
                controller = function () {
                    return $controller("madeasy.auth.controllers.logoutAuth", {
                        "$scope": rootScope.$new()
                    });
                };
            }
        ]);
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("should logout a user on successful revoke of token", function () {
        httpBackend.expectPOST(credz.revoke_url, payload).respond(200, {});
        spyOn(state, "go");
        controller();
        httpBackend.flush();
        expect(state.go).toHaveBeenCalled();
    });

    it("should logout a user on failed revoke of token", function () {
        httpBackend.expectPOST(credz.revoke_url, payload).respond(500,
            {"error": "a"});
        spyOn(state, "go");
        controller();
        httpBackend.flush();
        expect(state.go).toHaveBeenCalled();
    });
});
