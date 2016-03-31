(function () {
    "use strict";

    describe("Test authentication module", function () {

        beforeEach(function () {
            module("ui.router");
            module("madeasy.common.services.query_adapter");
            module("madeasy.authentication");
        });

        describe("Testing pageUserRequired", function () {
            var authConfig, $state;
            beforeEach(function () {
                inject(["madeasy.auth.services.login", "$state",
                    function (ac, _$state_) {
                        authConfig = ac;
                        $state = _$state_;
                    }]);
            });

            it("should allow with user and requireuser is undefined",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    inject(["madeasy.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                data: {}
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should return true if the data object is not defined in the " +
                "state", function () {
                    inject(["madeasy.authentication.pageUserRequired",
                        function (pur) {
                            var params = {};
                            var val = pur.canView(null, params);
                            expect(val).toBe(true);
                        }]);
                });

            it("should allow with user and requireuser is true", function () {
                spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                inject(["madeasy.authentication.pageUserRequired", function (pur) {
                    var params = {
                        data: {
                            requireUser: true
                        }
                    };
                    var val = pur.canView(null, params);
                    expect(val).toBe(true);
                    expect(authConfig.isLoggedIn).toHaveBeenCalled();
                }]);
            });

            it("should allow with user and requireuser is false", function () {
                spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                inject(["madeasy.authentication.pageUserRequired", function (pur) {
                    var params = {
                        data: {
                            requireUser: false
                        }
                    };
                    var val = pur.canView(null, params);
                    expect(val).toBe(true);
                    expect(authConfig.isLoggedIn).toHaveBeenCalled();
                }]);
            });

            it("should allow with user and requireuser is not bool",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    inject(["madeasy.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                data: {
                                    requireUser: "kaa"
                                }
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should deny without user and requireuser is undefined",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["madeasy.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                data: {}
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should deny without user and requireuser is true",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["madeasy.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                data: {
                                    requireUser: true
                                }
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should allow without user and requireuser is false",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["madeasy.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                data: {
                                    requireUser: false
                                }
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should deny without user and requireuser is not bool",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["madeasy.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                data: {
                                    requireUser: "kaa"
                                }
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should test if a checkFailed", function () {
                spyOn($state, "go");
                inject(["madeasy.authentication.pageUserRequired", function (fail) {
                    fail.checkFailed();
                    expect($state.go).toHaveBeenCalledWith("auth_login");
                }]);
            });

            it("should set next state", function () {
                spyOn($state, "go");
                spyOn(authConfig, "dumpState");
                inject(["madeasy.authentication.pageUserRequired", function (fail) {
                    var toState = "some_state";
                    var toParams = {
                        data: {}
                    };
                    fail.checkFailed(toState, toParams);
                    expect($state.go).toHaveBeenCalledWith("auth_login");
                    expect(authConfig.dumpState).toHaveBeenCalledWith(
                        toState, toParams);
                }]);
            });
        });
        describe("madeasy.authentication.isInitial", function () {
            var authConfig, $state;
            beforeEach(function () {
                inject(["madeasy.auth.services.login", "$state",
                    function (ac, _$state_) {
                        authConfig = ac;
                        $state = _$state_;
                    }]);
            });

            it("should allow when user has the ``is_initial`` field as false",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "is_initial": false});
                    inject(["madeasy.authentication.isInitial",
                        function (initial) {
                            var params = {
                                data: {}
                            };
                            var val = initial.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });
            it("should return true if the data object has not been defined in" +
                "the state",function () {
                    inject(["madeasy.authentication.isInitial",
                        function (initial) {
                            var params = {};
                            var val = initial.canView(null, params);
                            expect(val).toBe(true);
                        }]);
                });
            it("should always allow permissions when ``showErrorPage`` is false",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "is_initial": true});
                    inject(["madeasy.authentication.isInitial",
                        function (initial) {
                            var params = {
                                data: {
                                    showErrorPage: false
                                }
                            };
                            var val = initial.canView(null, params);
                            expect(val).toBe(true);
                        }]);
                });
            it("should always deny permissions when ``showErrorPage`` is true" +
            " the user is logged in and ``is_inital`` is true",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "is_initial": true});
                    inject(["madeasy.authentication.isInitial",
                        function (initial) {
                            var params = {
                                data: {
                                    showErrorPage: true
                                }
                            };
                            var val = initial.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });

            it("should deny when user has the ``is_initial`` field as true",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "is_initial": true});
                    inject(["madeasy.authentication.isInitial",
                        function (initial) {
                            var params = {
                                data: {}
                            };
                            var val = initial.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });

            it("should return false if the user is not loggedIn",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["madeasy.authentication.isInitial",
                        function (initial) {
                            var params = {
                                data: {}
                            };
                            var val = initial.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });
            it("test checkFailed: that is should redirect to ``auth_403`` state",
                function () {
                    spyOn($state, "go");
                    inject(["madeasy.authentication.isInitial", function (fail) {
                        fail.checkFailed();
                        expect($state.go).toHaveBeenCalled();
                    }]);
                });
        });
        describe("madeasy.authentication.hasOrganisation", function () {
            var authConfig, $state;
            beforeEach(function () {
                inject(["madeasy.auth.services.login", "$state",
                    function (ac, _$state_) {
                        authConfig = ac;
                        $state = _$state_;
                    }]);
            });

            it("should allow when user has the ``organisation`` field as exists",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "organisation": "org"});
                    inject(["madeasy.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {
                                data: {}
                            };
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });
            it("should return true if the data object is not defined in the state",
                function () {
                    inject(["madeasy.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {};
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                        }]);
                });
            it("should always allow permissions when ``showErrorPage`` is false",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "organisation": "org"});
                    inject(["madeasy.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {
                                data: {
                                    showErrorPage: false
                                }
                            };
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                        }]);
                });
            it("should always deny permissions when ``showErrorPage`` is true" +
            " the user is logged in and ``organisation`` exists",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "organisation": "org"});
                    inject(["madeasy.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {
                                data: {
                                    showErrorPage: true
                                }
                            };
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });

            it("should deny when user has the ``organisation`` field null",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "organisation": null});
                    inject(["madeasy.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {
                                data: {}
                            };
                            var val = organisation.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });

            it("should return true if the user is not loggedIn",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["madeasy.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {
                                data: {}
                            };
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });
            it("test checkFailed: that is should redirect to ``auth_403`` state",
                function () {
                    spyOn($state, "go");
                    inject(["madeasy.authentication.hasOrganisation",
                        function (fail) {
                            fail.checkFailed();
                            expect($state.go).toHaveBeenCalled();
                        }]);
                });
        });
    });

})(angular, window.moment);
