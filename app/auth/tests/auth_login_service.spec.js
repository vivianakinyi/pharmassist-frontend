"use strict";

describe("Test auth login service: ", function () {
    var url, resetUrlConfirm, resetUrl;

    beforeEach(function () {
        module("madeasy.config");
        module("madeasy.auth.services");
        module("madeasy.common.services.query_adapter");
        module("madeasy.authorization");
        module("madeasy.common.errorMessages");
    });

    beforeEach(inject(["SERVER_URL", "PASSWORD_RESET",
        "PASSWORD_RES_CONFIRM",function (s, resUrl, resCon) {
            url = s;
            resetUrl = resUrl;
            resetUrlConfirm = resCon;
        }
    ]));

    afterEach(function () {
        inject(["$window", function ($window) {
            $window.localStorage.removeItem("auth.user");
            $window.localStorage.removeItem("state.dump");
        }]);
    });

    it("should have auth login service defined",
    inject(["madeasy.auth.services.login", function (loginService) {
        expect(loginService).toBeDefined();
    }]));

    it("should have all the methods defined",
    inject(["madeasy.auth.services.login", function (loginService) {
        expect(angular.isFunction (loginService.login)).toBeTruthy();
        expect(angular.isFunction (loginService.currentUser)).toBeTruthy();
        expect(angular.isFunction (loginService.isLoggedIn)).toBeTruthy();
    }]));
    it("should send user details to login Api: successfully",
    inject(["api.oauth2", "madeasy.auth.services.login",
        function (oauth2, loginService) {
        var test_data = {
            password: "owaga",
            username: "owagaantony@gmail.com"
        };
        spyOn(oauth2, "fetchToken").and.returnValue({});

        var response = loginService.login(test_data);

        expect(response).toEqual({});
    }]));

    it("should post a user email to the server", function () {
        inject(["$httpBackend","madeasy.auth.services.login",
                function ($httpBackend, loginService) {
                    var test_email = {email: "email@email.com"};
                    $httpBackend.expectPOST(resetUrl, test_email)
                                        .respond({});
                    var response = loginService.resetPassword(test_email.email);
                    response.then(function (data) {
                        expect(data.data).toEqual({});
                    });
                    $httpBackend.flush();
                }

        ]);

    });
    it("should post a user email to the server", function () {
        inject(["$httpBackend","madeasy.auth.services.login",
                function ($httpBackend, loginService) {
                    var test_data = {
                        new_password1: "obj.new_password1",
                        new_password2: "obj.new_password2",
                        token: "obj.token",
                        uid: "obj.uid"
                    };
                    $httpBackend.expectPOST(resetUrlConfirm, test_data)
                        .respond({});
                    var response = loginService
                                        .resetPasswordConfirm(test_data);

                    response.then(function (data) {
                        expect(data.data).toEqual({});
                    });
                    $httpBackend.flush();
                }
        ]);
    });
    it("should send user details to login Api: successfully",
    inject(["$httpBackend","madeasy.auth.services.login",
        function ($httpBackend, loginService) {
        var test_data = {
            email: "owagaantony@gmail.com",
            username: "owaga"
        };
        var test_response = JSON.stringify(test_data);
        $httpBackend.expect(
            "GET",url + "/me/").respond(
            200, test_response);
        var response = loginService.currentUser();
        response.then(function (data) {
            expect(data.data).toEqual(test_data);
        });
        $httpBackend.flush();
    }]));

    it("should call isLoggedIn method",
    inject(["madeasy.auth.services.login", "api.oauth2", "$window",
        function (loginService, oauth2, $window) {
            $window.localStorage.setItem("auth.user", "{}");
            spyOn(oauth2, "getToken").and.returnValue({});
            var response = loginService.isLoggedIn();
            expect(response).toEqual(true);
        }
    ]));
    it("should call isLoggedIn method: logged in is null",
    inject(["madeasy.auth.services.login", "api.oauth2",
        function (loginService, oauth2) {
            spyOn(oauth2, "getToken").and.returnValue({});
            var response = loginService.isLoggedIn();
            expect(response).toEqual(false);
        }
    ]));
    it("should call isLoggedIn method: getToken is null",
    inject(["madeasy.auth.services.login", "api.oauth2", "$window",
        function (loginService, oauth2, $window) {
            $window.localStorage.setItem("auth.user", "{}");
            spyOn(oauth2, "getToken").and.returnValue(null);
            var response = loginService.isLoggedIn();
            expect(response).toEqual(false);
        }
    ]));
    it("should call isLoggedIn method: getToken and isLoggedIn are null",
    inject(["madeasy.auth.services.login", "api.oauth2", "$window",
        function (loginService, oauth2) {
            spyOn(oauth2, "getToken").and.returnValue(null);
            var response = loginService.isLoggedIn();
            expect(response).toEqual(false);
        }
    ]));
    it("should test getUser method",
    inject(["madeasy.auth.services.login", "$window",
        function (loginService, $window) {
            var user = {password : "owaga", username: "antony"};
            $window.localStorage.setItem("auth.user", JSON.stringify(user));
            var result = loginService.getUser();
            expect(result).toEqual(user);
        }
    ]));

    it("should send user details to login Api: successfully",
    inject(["api.oauth2", "madeasy.auth.services.login",
        function (oauth2, loginService) {
        var test_data = {
            password: "owaga",
            username: "owagaantony@gmail.com"
        };
        spyOn(oauth2, "fetchToken").and.returnValue({});

        var response = loginService.login(test_data);

        expect(response).toEqual({});
    }]));

    it("should test logout method",
    inject(["madeasy.auth.services.login", "$window", "api.oauth2",
        function (loginService, $window, oauth2) {
            $window.localStorage.setItem("auth.user", "{}");
            spyOn(oauth2, "revokeToken").and.returnValue({});
            var response = loginService.logout();
            expect(response).toEqual({});
            expect(oauth2.revokeToken).toHaveBeenCalled();
            expect(JSON.parse($window.localStorage.getItem("auth.user")))
                .toBe(null);
        }
    ]));

    it("should not load state without user", function () {
            inject(["madeasy.auth.services.login", "$window",
                function (loginService, $window) {
                    $window.localStorage.setItem("state.dump", "{}");
                    expect(loginService.loadState()).toBe(null);
                }
            ]);
        });

    it("should load state", function () {
        inject(["madeasy.auth.services.login", "$window",
            function (loginService, $window) {
                $window.localStorage.setItem("state.dump", "{\"user\":\"23\"}");
                $window.localStorage.setItem("auth.user", "{\"id\":\"23\"}");
                expect(loginService.loadState())
                    .toEqual({name: undefined, params: undefined});
            }
        ]);
    });

    it("should not load state from another user", function () {
        inject(["madeasy.auth.services.login", "$window",
            function (loginService, $window) {
                $window.localStorage.setItem("state.dump", "{\"user\":\"3\"}");
                $window.localStorage.setItem("auth.user", "{\"id\":\"2\"}");
                expect(loginService.loadState()).toEqual(null);
            }
        ]);
    });

    it("should not dump state without user", function () {
        inject(["madeasy.auth.services.login", "$window",
            function (loginService, $window) {
                loginService.dumpState("name", {"param": "one"});
                expect(JSON.parse(
                    $window.localStorage.getItem("state.dump"))).toBe(null);
            }
        ]);
    });

    it("should dump state", function () {
        inject(["madeasy.auth.services.login", "$window",
            function (loginService, $window) {
                $window.localStorage.setItem("auth.user", "{\"id\":\"23\"}");
                loginService.dumpState({"name": "name"}, {"param": "one"});
                expect(JSON.parse($window.localStorage.getItem("state.dump")))
                    .toEqual({
                        "name": "name",
                        "params": {
                            "param": "one"
                        },
                        "user": "23"
                    });
            }
        ]);
    });

    it("should clear state", function () {
        inject(["madeasy.auth.services.login", "$window",
            function (loginService, $window) {
                $window.localStorage.setItem("state.dump", "{}");
                loginService.clearState();
                expect(JSON.parse($window.localStorage
                    .getItem("state.dump"))).toBe(null);
            }
        ]);
    });

    it("should start timeout if user is loggedin", function () {
        inject(["madeasy.auth.services.login", function (loginService) {
            spyOn(loginService, "isLoggedIn").and.returnValue(true);
            loginService.startTimeout();
        }]);
    });

    it("should not start timeout if user is not loggedin", function () {
        inject(["madeasy.auth.services.login", function (loginService) {
            spyOn(loginService, "isLoggedIn").and.returnValue(false);
            loginService.startTimeout();
        }]);
    });

    it("should stop timeout", function () {
        inject(["madeasy.auth.services.login", function (loginService) {
            loginService.stopTimeout();
        }]);
    });
});
