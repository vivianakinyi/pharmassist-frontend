(function () {
    "use strict";

    describe("Testing actions module :", function () {
        beforeEach(module("madeasy.actions"));
        beforeEach(module("madeasy.common.services.query_adapter"));

        it("should define settings constants", function () {
            inject(["APP_ACTION_RESTRICT", "APP_ACTION_CHECKERS",
                function (aar, aac) {
                    expect(aar).toEqual("ACTIONS.RESTRICT");
                    expect(aac).toEqual("ACTIONS.CHECKERS");
                }]);
        });

        it("should define canPerform function", function () {
            inject(["madeasy.actions.actionChecker", function (ac) {
                expect(angular.isFunction(ac.canPerform)).toBe(true);
            }]);
        });

        it("should define hasAction function", function () {
            inject(["madeasy.actions.hasAction", function (ac) {
                expect(angular.isFunction(ac.hasActions)).toBe(true);
            }]);
        });

        describe("Testing madeasy.actions.actionChecker restrictions not defined:",
            function () {
                var action_restrictions, injector;

                beforeEach(
                    inject(["APP_ACTION_RESTRICT", "$injector",
                        function (aar, $injector) {
                        action_restrictions = aar;
                        injector = $injector;
                    }
                    ]));

                it("should return true if restrictions are not defined",
                    function () {
                        spyOn(injector, "has").and.returnValue(false);

                        inject(["madeasy.actions.actionChecker", function (ac) {
                            expect(ac.canPerform("A")).toBe(true);
                            expect(injector.has).toHaveBeenCalledWith(
                                action_restrictions);
                        }]);
                    });
            });

        describe("Testing madeasy.actions.actionChecker restrictions defined:",
            function () {
                var action_restrictions, restriction_values, injector;

                beforeEach(function () {
                    restriction_values = ["view_visits", "eligibility",
                        "create_visits"];
                    angular.module("kkkl", []).constant("ACTIONS.RESTRICT",
                        restriction_values);
                    module("kkkl");
                    inject([function () {}]);
                });

                beforeEach(
                    inject(["APP_ACTION_RESTRICT", "$injector",
                        function (aar, $injector) {
                        action_restrictions = aar;
                        injector = $injector;
                    }
                ]));

                it("should return", function () {
                    spyOn(injector, "has").and.callThrough();
                    spyOn(injector, "get").and.callThrough();
                    inject(["madeasy.actions.actionChecker", function (ac) {
                        expect(ac.canPerform("view_visits")).toBe(false);
                        expect(ac.canPerform("viewvisits")).toBe(true);
                        expect(injector.has).toHaveBeenCalledWith(
                            action_restrictions);
                        expect(injector.get).toHaveBeenCalledWith(
                            action_restrictions);
                    }]);
                });
            });

        describe("Testing madeasy.actions.actionChecker fail :", function () {
            beforeEach(function () {
                angular.module("kkkl", []).constant("ACTIONS.RESTRICT", null);
                module("kkkl");
                inject([function () {}]);
            });

            it("should raise error if actionChecker is" +
                " wrongly configured", function () {
                inject(["$injector", function ($injector) {
                    var fxn = function () {
                        $injector.get("madeasy.actions.actionChecker");
                    };
                    expect(fxn).toThrow(new Error(
                        "[madeasy.actions:actionChecker] ImproperlyConfigured : " +
                        "ACTIONS.RESTRICT should be an array"
                        )
                    );
                }]);
            });
        });

        describe("Testing madeasy.actions.hasAction checkers not defined :",
            function () {
                var action_checkers, injector;

                beforeEach(
                    inject(["APP_ACTION_CHECKERS", "$injector",
                        function (aac, $injector) {
                        action_checkers = aac;
                        injector = $injector;
                    }
                ]));

                it("should return true if checkers not defined", function () {
                    spyOn(injector, "has").and.returnValue(false);

                    inject(["madeasy.actions.hasAction", function (ac) {
                        expect(ac.hasActions("A")).toBe(true);
                        expect(injector.has).toHaveBeenCalledWith(
                            action_checkers);
                    }]);
                });
            });

        describe("Testing madeasy.actions.pageChecker checkers not defined :",
            function () {
                var page_checkers, injector;

                beforeEach(
                    inject(["APP_PAGE_CHECKERS", "$injector",
                        function (apc, $injector) {
                        page_checkers = apc;
                        injector = $injector;
                    }
                ]));

                it("should return true if checkers not defined", function () {
                    spyOn(injector, "has").and.returnValue(false);

                    inject(["madeasy.actions.pageChecker", function (pc) {
                        var ans = pc.canViewPage();
                        expect(ans.can_view).toBe(true);
                        expect(ans.callback).toBe(undefined);
                        expect(injector.has).toHaveBeenCalledWith(
                            page_checkers);
                    }]);
                });
            });

        describe("Testing madeasy.actions.hasAction checkers defined :",
            function () {
                var action_checkers, checkers, injector, a_check = true,
                    b_check = true;

                beforeEach(function () {
                    checkers = ["a", "b"];
                    angular.module("kkkl", [])
                    .constant("ACTIONS.CHECKERS", checkers)
                    .service("a", function () {
                        this.canPerform = function () {
                            return a_check;
                        };
                    })
                    .service("b", function () {
                        this.canPerform = function () {
                            return b_check;
                        };
                    });
                    module("kkkl");
                    inject([function () {}]);
                });

                beforeEach(
                    inject(["APP_ACTION_CHECKERS", "$injector",
                        function (aac, $injector) {
                        action_checkers = aac;
                        injector = $injector;
                    }
                ]));

                it("should return true", function () {
                    spyOn(injector, "has").and.callThrough();
                    spyOn(injector, "get").and.callThrough();
                    a_check = true;
                    b_check = true;
                    inject(["madeasy.actions.hasAction", function (ac) {
                        expect(ac.hasActions("view_visits")).toBe(true);
                        expect(ac.hasActions("viewvisits")).toBe(true);
                        expect(injector.has).toHaveBeenCalledWith(
                            action_checkers);
                        expect(injector.get).toHaveBeenCalledWith(
                            action_checkers);
                    }]);
                });

                it("should return false", function () {
                    spyOn(injector, "has").and.callThrough();
                    spyOn(injector, "get").and.callThrough();
                    a_check = true;
                    b_check = false;
                    inject(["madeasy.actions.hasAction", function (ac) {
                        expect(ac.hasActions("view_visits")).toBe(false);
                        expect(ac.hasActions("viewvisits")).toBe(false);
                        expect(injector.has).toHaveBeenCalledWith(
                            action_checkers);
                        expect(injector.get).toHaveBeenCalledWith(
                            action_checkers);
                    }]);
                });
            });

        describe("Testing madeasy.actions.pageChecker checkers defined :",
            function () {
                var page_checkers, checkers, injector, a_check = true,
                    b_check = true;

                beforeEach(function () {
                    checkers = ["a", "b"];
                    angular.module("kkkl", [])
                    .constant("PAGE.CHECKERS", checkers)
                    .service("a", function () {
                        this.canView = function () {
                            return a_check;
                        };
                    })
                    .service("b", function () {
                        this.canView = function () {
                            return b_check;
                        };
                    });
                    module("kkkl");
                    inject([function () {}]);
                });

                beforeEach(
                    inject(["APP_PAGE_CHECKERS", "$injector",
                        function (apc, $injector) {
                        page_checkers = apc;
                        injector = $injector;
                    }
                ]));

                it("should return true for page checkers search", function () {
                    spyOn(injector, "has").and.callThrough();
                    spyOn(injector, "get").and.callThrough();
                    a_check = true;
                    b_check = true;
                    inject(["madeasy.actions.pageChecker", function (ac) {
                        var ans = ac.canViewPage({}, {});
                        expect(ans.can_view).toBe(true);
                        expect(ans.callback).toBe(undefined);
                        expect(injector.has).toHaveBeenCalledWith(
                            page_checkers);
                        expect(injector.get).toHaveBeenCalledWith(
                            page_checkers);
                    }]);
                });

                it("should return false for page checkers search", function () {
                    spyOn(injector, "has").and.callThrough();
                    spyOn(injector, "get").and.callThrough();
                    a_check = true;
                    b_check = false;
                    inject(["madeasy.actions.pageChecker", function (ac) {
                        var ans = ac.canViewPage({}, {});
                        expect(ans.can_view).toBe(false);
                        expect(angular.isFunction(ans.callback)).toBe(true);
                        expect(injector.has).toHaveBeenCalledWith(
                            page_checkers);
                        expect(injector.get).toHaveBeenCalledWith(
                            page_checkers);
                    }]);
                });
            });

        describe("Testing madeasy.actions.hasAction fail :", function () {
            beforeEach(function () {
                angular.module("kkkl", []).constant("ACTIONS.CHECKERS", null);
                module("kkkl");
                inject([function () {}]);
            });

            it("should raise if improperly configured", function () {
                inject(["$injector", function ($injector) {
                    var fxn = function () {
                        $injector.get("madeasy.actions.hasAction");
                    };
                    expect(fxn).toThrow(new Error(
                        "[madeasy.actions:hasAction] ImproperlyConfigured : " +
                        "ACTIONS.CHECKERS " +
                        "should be an array"
                        )
                    );
                }]);
            });
        });

        describe("Testing madeasy.actions.pageChecker fail :", function () {
            beforeEach(function () {
                angular.module("kkkl", []).constant("PAGE.CHECKERS", null);
                module("kkkl");
                inject([function () {}]);
            });

            it("should raise if improperly configured", function () {
                inject(["$injector", function ($injector) {
                    var fxn = function () {
                        $injector.get("madeasy.actions.pageChecker");
                    };
                    expect(fxn).toThrow(new Error(
                        "[madeasy.actions:pageChecker] ImproperlyConfigured :" +
                        " PAGE.CHECKERS " +
                        "should be an array"
                        )
                    );
                }]);
            });
        });

        describe("Testing madeasy.actions.pageActions", function () {
            var hasAction, state;
            beforeEach(function () {
                module("ui.router");
                module("madeasy.common");
                inject(["madeasy.actions.hasAction","$state", function (ha, $state) {
                    hasAction = ha;
                    state = $state;
                }]);
            });

            it("should allow with defined actions", function () {
                spyOn(hasAction, "hasActions").and.returnValue(true);
                inject(["madeasy.actions.pageActions", function (pa) {
                    var params = {
                        data: {
                            actions: "hehe"
                        }
                    };
                    var val = pa.canView(null, params);
                    expect(val).toBe(true);
                    expect(hasAction.hasActions).toHaveBeenCalledWith("hehe");
                }]);
            });

            it("should allow when data object is not defined", function () {
                inject(["madeasy.actions.pageActions", function (pa) {
                    var params = {};
                    var val = pa.canView(null, params);
                    expect(val).toBe(true);
                }]);
            });

            it("should allow with undefined actions", function () {
                spyOn(hasAction, "hasActions").and.callThrough();
                inject(["madeasy.actions.pageActions", function (pa) {
                    var params = {
                        data: {}
                    };
                    var val = pa.canView(null, params);
                    expect(val).toBe(true);
                    expect(hasAction.hasActions).toHaveBeenCalledWith(
                        undefined);
                }]);
            });

            it("should deny", function () {
                spyOn(hasAction, "hasActions").and.returnValue(false);
                inject(["madeasy.actions.pageActions", function (pa) {
                    var params = {
                        data: {
                            actions: "hehe"
                        }
                    };
                    var val = pa.canView(null, params);
                    expect(val).toBe(false);
                    expect(hasAction.hasActions).toHaveBeenCalledWith("hehe");
                }]);
            });
            it("test checkFailed", function () {
                spyOn(state, "go");
                inject(["madeasy.actions.pageActions", function (fail) {
                    fail.checkFailed();
                    expect(state.go).toHaveBeenCalled();
                    expect(state.go).toHaveBeenCalledWith("auth_403");
                }]);
            });
        });

        describe("Testing actions directive :", function () {
            var compile, rootscope;
            beforeEach(module("ui.router"));
            beforeEach(module(function ($stateProvider) {
                $stateProvider.state("testState", {
                    data: {
                        actions: "some.action"
                    },
                    url: "/test/"
                });
            }));
            beforeEach(inject(["$compile", "$rootScope", function (c, r) {
                compile = c;
                rootscope = r;
            }]));

            it("should compile", function () {
                var element = angular.element(
                    "<div id='r'><p madeasy-app-actions='nav.visits'>asd</p></div>"
                );
                compile(element)(rootscope);
                var test = angular.element(angular.element(element.html()));

                expect(angular.element(test[1]).html()).toEqual("asd");
            });

            it("should infer actions from state when no actions are defined" +
                "and an uiSref exists", function () {
                    inject(["madeasy.actions.hasAction", function (hasAction) {
                        spyOn(hasAction, "hasActions");
                        var element = angular.element(
                            "<div id='r'><p " +
                            "madeasy-app-actions ui-sref='testState'>asd</p></div>"
                        );
                        compile(element)(rootscope);
                        expect(hasAction.hasActions).toHaveBeenCalledWith(
                                "some.action");

                    }]);

                });

            it("should prefer explicit over useing action defined in the state",
                function () {
                    inject(["madeasy.actions.hasAction", function (hasAction) {
                        spyOn(hasAction, "hasActions");
                        var element = angular.element(
                            "<div id='r'><p " +
                            "madeasy-app-actions='nav.visits' " +
                            " ui-sref='testState'>asd</p></div>"
                        );
                        compile(element)(rootscope);
                        expect(hasAction.hasActions).toHaveBeenCalledWith(
                                "nav.visits");

                    }]);

                });

            it("should not do anything without actions", function () {
                var element = angular.element(
                    "<div id='r'><p madeasy-app-actions=''>asd</p></div>"
                );
                compile(element)(rootscope);
                var test = angular.element(angular.element(element.html()));
                expect(angular.element(test[1]).html()).toEqual("asd");

                element = angular.element(
                    "<div id='r'><p madeasy-app-actions>asd</p></div>"
                );
                compile(element)(rootscope);
                test = angular.element(angular.element(element.html()));

                expect(angular.element(test[1]).html()).toEqual("asd");

                element = angular.element(
                    "<div><div id='r'><p>asd</p></div></div>"
                );

                compile(element)(rootscope);
                expect(element.html()).toEqual(
                    "<div id=\"r\"><p>asd</p></div>"
                );
            });

            it("should remove element", function () {
                inject(["madeasy.actions.hasAction", function (hasAction) {
                    spyOn(hasAction, "hasActions").and.returnValue(false);
                    var tags = ["madeasy-app-actions", "x-madeasy-app-actions",
                        "data-madeasy-app-actions"];
                    tags.forEach(function (tag) {
                        var element = angular.element(
                            "<div><div id='r'><p " + tag +
                            "='visits'>asd</p></div></div>"
                        );
                        compile(element)(rootscope);
                        expect(element.html()).toEqual(
                            "<div id=\"r\"><!-- madeasyAppActions: " +
                            "visits --></div>");
                    });
                }]);
            });
        });

        describe("Testing madeasy.actions.pageChecker listeners :", function () {
            var rootScope;

            beforeEach(
                inject(["$rootScope", function (rs) {
                    rootScope = rs;
                }])
            );

            it("should start listening to changes", function () {
                spyOn(rootScope, "$on").and.callThrough();
                inject(["madeasy.actions.pageChecker", function (ac) {
                    expect(ac.startListening()).toBe(undefined);
                    expect(rootScope.$on).toHaveBeenCalled();
                    expect(rootScope.$on.calls.count()).toEqual(1);
                    expect(rootScope.$on.calls.argsFor(0)[0]).toEqual(
                        "$stateChangeStart");
                    expect(angular.isFunction(rootScope.$on.calls.argsFor(0
                        )[1])).toBe(true);
                }]);
            });

            it("should not do anything in stop listening if " +
                "evtlistener isn't defined", function () {
                inject(["madeasy.actions.pageChecker", function (ac) {
                    expect(ac.stopListening()).toBe(undefined);
                }]);
            });

            it("should stop listening to changes", function () {
                var listener = {
                    fxn: function () {}
                };
                spyOn(rootScope, "$on").and.returnValue(listener.fxn);
                spyOn(listener, "fxn").and.callThrough();

                inject(["madeasy.actions.pageChecker", function (ac) {
                    expect(ac.startListening()).toBe(undefined);
                    expect(rootScope.$on).toHaveBeenCalled();
                    expect(ac.stopListening()).toBe(undefined);
                    // Expect(listener.fxn).toHaveBeenCalled();
                }]);
            });
        });

        describe("Testing page checkers on state change", function () {
            var rootScope;
            var evt = {name: "event", preventDefault: null};
            var toParams = {name: "toparams"};
            var fromParams = {name: "fromparams"};
            var toState = {name: "tostate"};
            var fromState = {name: "fromstate"};

            beforeEach(
                inject(["$rootScope", function (rs) {
                    rootScope = rs;
                }])
            );

            it("should reject if view page is false", function () {
                spyOn(rootScope, "$on").and.callThrough();
                inject(["madeasy.actions.pageChecker", function (pc) {
                    spyOn(pc, "canViewPage").and.returnValue({
                        callback: angular.noop,
                        can_view: false});
                    spyOn(evt, "preventDefault");
                    expect(pc.startListening()).toBe(undefined);

                    var listener = rootScope.$on.calls.argsFor(0)[1];
                    expect(angular.isFunction(listener)).toBe(true);
                    listener(evt, toParams, toState,fromParams, fromState);

                    expect(pc.canViewPage).toHaveBeenCalledWith(
                        fromParams, toParams);
                    expect(evt.preventDefault).toHaveBeenCalled();
                }]);
            });

            it("should allow if view page is true", function () {
                spyOn(rootScope, "$on").and.callThrough();
                inject(["madeasy.actions.pageChecker", function (pc) {
                    spyOn(pc, "canViewPage").and.returnValue({can_view: true});
                    spyOn(evt, "preventDefault");
                    expect(pc.startListening()).toBe(undefined);

                    var listener = rootScope.$on.calls.argsFor(0)[1];
                    expect(angular.isFunction(listener)).toBe(true);
                    listener(evt, toParams, toState,fromParams, fromState);

                    expect(pc.canViewPage).toHaveBeenCalledWith(
                        fromParams, toParams);
                    expect(evt.preventDefault).not.toHaveBeenCalled();
                }]);
            });
        });
        describe("Test madeasy.actions.hasAction", function () {
            var action_checkers, injector, ha, actChecker1, actChecker2;
            beforeEach(function () {
                module("madeasy.actions");
                module("madeasy.authorization");
                module("madeasy.config");

                inject(["APP_ACTION_CHECKERS", "$injector",
                    "madeasy.actions.hasAction", "madeasy.actions.actionChecker",
                    "madeasy.authorization.actionChecker",
                        function (aac, $injector, hasAction, aC1, aC2) {
                            action_checkers = aac;
                            injector = $injector;
                            ha = hasAction;
                            actChecker1 = aC1;
                            actChecker2 = aC2;
                        }
                ]);
            });

            it("should check `or` pemissions: one success: fail", function () {
                spyOn(injector,"has").and.returnValue(true);
                spyOn(actChecker1, "canPerform").and.returnValue(true);
                spyOn(actChecker2, "canPerform").and.returnValue(false);

                var actions = "view_patients;create_patients";
                var res = ha.hasActions(actions);
                expect(res).toBe(false);

            });

            it("should check `or` pemissions: both success: pass", function () {
                spyOn(injector,"has").and.returnValue(true);
                spyOn(actChecker1, "canPerform").and.returnValue(true);
                spyOn(actChecker2, "canPerform").and.returnValue(true);

                var actions = "view_patients;create_patients";
                var res = ha.hasActions(actions);
                expect(res).toBe(true);

            });

            it("should check `or` pemissions: both fail:  false", function () {
                spyOn(injector,"has").and.returnValue(true);
                spyOn(actChecker1, "canPerform").and.returnValue(false);
                spyOn(actChecker2, "canPerform").and.returnValue(false);

                var actions = "view_patients;create_patients";
                var res = ha.hasActions(actions);
                expect(res).toBe(false);

            });

            it("should check `and` pemissions: fail", function () {
                spyOn(injector,"has").and.returnValue(true);
                spyOn(actChecker1, "canPerform").and.returnValue(true);
                spyOn(actChecker2, "canPerform").and.returnValue(false);

                var actions = "view_patients:create_patients";
                var res = ha.hasActions(actions);
                expect(res).toBe(false);

            });

            it("should check `and` pemissions: success", function () {
                spyOn(injector,"has").and.returnValue(true);
                spyOn(actChecker1, "canPerform").and.returnValue(true);
                spyOn(actChecker2, "canPerform").and.returnValue(true);

                var actions = "view_patients:create_patients";
                var res = ha.hasActions(actions);
                expect(res).toBe(true);

            });

            it("should throw an error if both splitters are used",
                function () {
                    spyOn(injector,"has").and.returnValue(true);
                    spyOn(actChecker1, "canPerform").and.returnValue(true);
                    spyOn(actChecker2, "canPerform").and.returnValue(true);

                    var actions = "view_patients:create_patients;some_perm";
                    var fxn = function () {
                        ha.hasActions(actions);
                    };
                    expect(fxn)
                        .toThrow(new Error(
                            "You can only use one type of action splitter"));

                });
        });
    });
})();
