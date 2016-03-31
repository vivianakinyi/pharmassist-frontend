(function () {
    "use strict";

    describe("Testing authorization module :", function () {

        beforeEach(module("madeasy.authorization"));
        beforeEach(module("madeasy.common.services.query_adapter"));
        beforeEach(module("madeasy.auth.services"));

        describe("test authorization.loggedin :", function () {
            var authConfig;

            beforeEach(
                inject(["madeasy.auth.services.login", function(ac) {
                    authConfig = ac;
                }])
            );

            it("should grant access on a successfull login attempts", function () {
                spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                inject(["madeasy.authorization.loggedin", function(li) {
                    expect(li.hasPermissions()).toBeTruthy();
                    expect(authConfig.isLoggedIn).toHaveBeenCalled();
                }]);
            });

            it("should deny access on a failed login attempts", function () {
                spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                inject(["madeasy.authorization.loggedin", function(li) {
                    expect(li.hasPermissions()).toBeFalsy();
                    expect(authConfig.isLoggedIn).toHaveBeenCalled();
                }]);
            });
        });

        describe("test authorization.hasPerm :", function () {

            describe("with user details :", function () {
                beforeEach(
                    module(["$provide", function(p) {
                        p.value("madeasy.auth.services.login", {
                            getUser : function() {
                                return {
                                    actions: ["eat", "drink", "sleep"]
                                };
                            }
                        });
                    }])
                );

                it("should grant access", function () {
                    inject(["madeasy.authorization.hasPerm", function(hp) {
                        expect(hp.hasPermissions(
                            [{name: "eat"}, {name: "drink"}])
                        ).toBeTruthy();
                    }]);
                });

                it("should deny access", function () {
                    inject(["madeasy.authorization.hasPerm", function(hp) {
                        expect(hp.hasPermissions(
                            [{name: "eat"}, {name: "drink"}, {name: "poop"}])
                        ).toBeFalsy();
                    }]);
                });
            });
            describe("without user details :", function () {
                beforeEach(
                    module(["$provide", function(p) {
                        p.value("madeasy.auth.services.login", {
                            getUser : function() { return null; }
                        });
                    }])
                );
                it("should deny access", function () {
                    inject(["madeasy.authorization.hasPerm", function(hp) {
                        expect(hp.hasPermissions(
                            [{name: "eat"}, {name: "drink"}, {name: "poop"}])
                        ).toBeFalsy();
                    }]);
                });
            });
        });

        describe("test authorization.actionChecker :", function () {
            var hasPerm, injector;

            beforeEach(function () {
                angular.module("kkkl", [])
                .constant("ASA", {})
                .constant("ASB", {"action": ""})
                .constant("ASC", {"action": 23})
                .constant("AS", {"action": "view_stuff"});

                module("kkkl");
                inject([function () {}]);
            });

            beforeEach(function () {
                inject(["$injector", "madeasy.authorization.hasPerm",
                    function (ij, ia, hp) {
                        injector = ij;
                        hasPerm = hp;
                    }
                ]);
            });

            it("should define functions", function () {
                inject(["madeasy.authorization.actionChecker", function(ac) {
                    expect(angular.isFunction(ac.canPerform)).toBe(true);
                }]);
            });

            it("should not complain if action permission is not found",
                function () {
                    spyOn(injector, "has").and.callThrough();
                    spyOn(injector, "get").and.callThrough();
                    inject(["madeasy.authorization.actionChecker", function (ac) {
                        expect(ac.canPerform("ASA")).toBe(true);
                        expect(injector.has).toHaveBeenCalledWith("ASA");
                        expect(injector.get).toHaveBeenCalledWith("ASA");
                    }]);
                });

            it("should complain if an action is not found", function () {
                spyOn(injector, "has").and.callThrough();
                spyOn(injector, "get").and.callThrough();
                inject(["madeasy.authorization.actionChecker", function (ac) {
                    var fxn = function () {
                        ac.canPerform("not_there");
                    };
                    expect(fxn).toThrow(new Error(
                        "[madeasy.authorization:actionChecker.badaction]" +
                        " ImproperlyConfigured : " +
                        "no action like : 'not_there'"
                    ));
                    expect(injector.has).toHaveBeenCalledWith("NOT_THERE");
                    expect(injector.get).not.toHaveBeenCalledWith("NOT_THERE");
                }]);
            });

            it("should complain if an action permission is not a string",
                function () {
                    spyOn(injector, "has").and.callThrough();
                    spyOn(injector, "get").and.callThrough();
                    inject(["madeasy.authorization.actionChecker", function (ac) {
                        var fxn = function () {
                            ac.canPerform("ASC");
                        };
                        expect(fxn).toThrow(
                            new Error(
                                "[madeasy.authorization:actionChecker.badperm]" +
                                " ImproperlyConfigured : " +
                                "Action permission: 'ASC' " +
                                "should be a non-empty string"
                            )
                        );
                        expect(injector.has).toHaveBeenCalledWith("ASC");
                        expect(injector.get).toHaveBeenCalledWith("ASC");
                    }]);
                });

            it("should complain if an action permission is an empty string",
                function () {
                    spyOn(injector, "has").and.callThrough();
                    spyOn(injector, "get").and.callThrough();
                    inject(["madeasy.authorization.actionChecker", function (ac) {
                        var fxn = function () {
                            ac.canPerform("ASB");
                        };
                        expect(fxn).toThrow(
                            new Error(
                                "[madeasy.authorization:actionChecker.badperm]" +
                                " ImproperlyConfigured : " +
                                "Action permission: 'ASB' should be a" +
                                " non-empty string"
                            )
                        );
                        expect(injector.has).toHaveBeenCalledWith("ASB");
                        expect(injector.get).toHaveBeenCalledWith("ASB");
                    }]);
                });

        });
    });
})();
