(function (angular) {
    "use strict";

    describe("Test networking.interceptors :", function () {
        var rootScope, q;

        beforeEach(module("madeasy.networking.interceptors"));

        beforeEach(function () {
            inject(["$rootScope", "$q", function (rs, $q) {
                rootScope = rs;
                q = $q;
            }]);
        });

        describe("test httpactivity interceptor :", function () {

            it("should define functions", function () {
                inject(["madeasy.networking.interceptors.httpactivity",
                    function (ha) {
                        expect(angular.isFunction(ha.request)).toBeTruthy();
                        expect(angular.isFunction(ha.response)).toBeTruthy();
                        expect(angular.isFunction(ha.requestError))
                            .toBeTruthy();
                        expect(angular.isFunction(ha.responseError))
                            .toBeTruthy();
                    }]);
            });

            describe("request :", function () {

                it ("should detect new requests", function () {
                    spyOn(rootScope, "$broadcast");
                    inject(["madeasy.networking.interceptors.httpactivity",
                        function (ha) {
                            var p = ha.request("a");
                            expect(rootScope.$broadcast)
                                .toHaveBeenCalledWith("http.active");
                            expect(p).toEqual("a");
                        }]);
                });
                it ("should detect multiple active requests", function () {
                    spyOn(rootScope, "$broadcast");
                    inject(["madeasy.networking.interceptors.httpactivity",
                        function (ha) {
                            var p = ha.request("a");
                            expect(p).toEqual("a");
                            expect(rootScope.$broadcast)
                                .toHaveBeenCalledWith("http.active");
                            p = ha.request("b");
                            expect(p).toEqual("b");
                            expect(rootScope.$broadcast.calls.count())
                                .toEqual(1);
                        }]);
                });
            });

            describe("response :", function () {

                it ("should detect all responded requests", function () {
                    spyOn(rootScope, "$broadcast");
                    inject(["madeasy.networking.interceptors.httpactivity",
                        function (ha) {
                            var p = ha.response("b");
                            expect(rootScope.$broadcast)
                                .toHaveBeenCalledWith("http.inactive");
                            expect(p).toEqual("b");

                            p = ha.request("a");
                            expect(rootScope.$broadcast)
                                .toHaveBeenCalledWith("http.active");
                            expect(p).toEqual("a");

                            p = ha.response("b");
                            expect(rootScope.$broadcast
                                .calls.mostRecent().args[0]).toEqual(
                                "http.inactive");
                            expect(p).toEqual("b");
                        }]);
                });

                it ("should detect partially responded requests",
                    function () {
                        spyOn(rootScope, "$broadcast");
                        inject(["madeasy.networking.interceptors.httpactivity",
                            function (ha) {
                                var p = ha.request("a");
                                expect(p).toEqual("a");
                                expect(rootScope.$broadcast)
                                    .toHaveBeenCalledWith("http.active");
                                p = ha.request("b");
                                expect(p).toEqual("b");

                                p = ha.response("b");
                                expect(p).toEqual("b");
                                expect(rootScope.$broadcast.calls.count())
                                    .toEqual(1);
                            }]);
                    });
            });

            describe("requestError :", function () {

                it ("should detect all request errors", function () {
                    spyOn(rootScope, "$broadcast");
                    inject(["madeasy.networking.interceptors.httpactivity",
                        function (ha) {
                            var p = ha.requestError("b");
                            expect(rootScope.$broadcast)
                                .toHaveBeenCalledWith("http.inactive");
                            expect(p).toEqual("b");

                            p = ha.request("a");
                            expect(rootScope.$broadcast)
                                .toHaveBeenCalledWith("http.active");
                            expect(p).toEqual("a");

                            p = ha.requestError("b");
                            expect(rootScope.$broadcast.calls.mostRecent().args[0])
                                .toEqual("http.inactive");
                            expect(p).toEqual("b");
                        }]);
                });

                it ("should detect partially failed requests", function () {
                    spyOn(rootScope, "$broadcast");
                    inject(["madeasy.networking.interceptors.httpactivity",
                        function (ha) {
                            var p = ha.request("a");
                            expect(p).toEqual("a");
                            expect(rootScope.$broadcast)
                                .toHaveBeenCalledWith("http.active");
                            p = ha.request("b");
                            expect(p).toEqual("b");

                            p = ha.requestError("b");
                            expect(p).toEqual("b");
                            expect(rootScope.$broadcast.calls.count())
                                .toEqual(1);
                        }]);
                });
            });

            describe("responseError :", function () {

                it ("should detect all response errors", function () {
                    spyOn(rootScope, "$broadcast");
                    spyOn(q, "reject").and.returnValue("b");
                    inject(["madeasy.networking.interceptors.httpactivity",
                        function (ha) {
                            var p = ha.responseError("b");
                            expect(rootScope.$broadcast).toHaveBeenCalledWith(
                                "http.inactive");
                            expect(p).toEqual("b");

                            p = ha.request("a");
                            expect(rootScope.$broadcast).toHaveBeenCalledWith(
                                "http.active");
                            expect(p).toEqual("a");

                            p = ha.responseError("b");
                            expect(rootScope.$broadcast.calls.mostRecent().args[0])
                                .toEqual("http.inactive");
                            expect(p).toEqual("b");
                        }]);
                });

                it ("should detect partially failed responses", function () {
                    spyOn(rootScope, "$broadcast");
                    spyOn(q, "reject").and.returnValue("b");
                    inject(["madeasy.networking.interceptors.httpactivity",
                        function (ha) {
                            var p = ha.request("a");
                            expect(p).toEqual("a");
                            expect(rootScope.$broadcast).toHaveBeenCalledWith(
                                "http.active");
                            p = ha.request("b");
                            expect(p).toEqual("b");

                            p = ha.responseError("b");
                            expect(p).toEqual("b");
                            expect(rootScope.$broadcast.calls.count())
                                .toEqual(1);
                        }]);
                });
            });

        });

        describe("test http interceptor :", function () {

            it("should define functions", function () {
                inject(["madeasy.networking.interceptors.http", function (ht) {
                    expect(angular.isFunction(ht.responseError)).toBeTruthy();
                    expect(angular.isFunction(ht.response)).toBeTruthy();
                    expect(ht.request).toBeUndefined();
                    expect(ht.requestError).toBeUndefined();
                }]);
            });

            it("should respond to http responses", function () {
                inject(["madeasy.networking.interceptors.http", function (ht) {
                    ht.response();

                    ht.responseError({status: 500});
                    ht.response();
                }]);
            });

            it("should broadcast forbidden", function () {
                inject(["madeasy.networking.interceptors.http", function (ht) {
                    spyOn(rootScope, "$broadcast");
                    spyOn(q, "reject").and.returnValue("l");
                    var p = ht.responseError({status: 403});
                    expect(p).toEqual("l");
                    expect(rootScope.$broadcast).toHaveBeenCalledWith(
                        "http.auth.forbidden");
                    expect(q.reject).toHaveBeenCalledWith({status: 403});
                }]);
            });

            it("should broadcast unauthorized", function () {
                inject(["madeasy.networking.interceptors.http", function (ht) {
                    spyOn(rootScope, "$broadcast");
                    spyOn(q, "reject").and.returnValue("l");
                    var p = ht.responseError({status: 401});
                    expect(p).toEqual("l");
                    expect(rootScope.$broadcast).toHaveBeenCalledWith(
                        "http.auth.unauthorized");
                    expect(q.reject).toHaveBeenCalledWith({status: 401});
                }]);
            });

            it("should broadcast server error (500)", function () {
                inject(["madeasy.networking.interceptors.http", function (ht) {
                    spyOn(rootScope, "$broadcast");
                    spyOn(q, "reject").and.returnValue("l");
                    var p = ht.responseError({status: 500});
                    expect(p).toEqual("l");
                    expect(rootScope.$broadcast).toHaveBeenCalledWith(
                        "http.server.error");
                    expect(q.reject).toHaveBeenCalledWith({status: 500});
                }]);
            });

            it("should broadcast server error (503)", function () {
                inject(["madeasy.networking.interceptors.http", function (ht) {
                    spyOn(rootScope, "$broadcast");
                    spyOn(q, "reject").and.returnValue("l");
                    var p = ht.responseError({status: 503});
                    expect(p).toEqual("l");
                    expect(rootScope.$broadcast).toHaveBeenCalledWith(
                        "http.server.error");
                    expect(q.reject).toHaveBeenCalledWith({status: 503});
                }]);
            });

            it("should not broadcast 404", function () {
                inject(["madeasy.networking.interceptors.http", function (ht) {
                    spyOn(rootScope, "$broadcast");
                    spyOn(q, "reject").and.returnValue("l");
                    [404, 302, 200, 204].forEach(function (code) {
                        var p = ht.responseError({status: code});
                        expect(p).toEqual("l");
                        expect(rootScope.$broadcast).not.toHaveBeenCalled();
                        expect(q.reject).toHaveBeenCalled();
                    });
                }]);
            });
        });

        describe("test connection interceptor :", function () {
            it("should define functions", function () {
                inject(["madeasy.networking.interceptors.connection",
                    function (co) {
                        expect(angular.isFunction(co.response)).toBeTruthy();
                        expect(angular.isFunction(co.responseError))
                            .toBeTruthy();
                        expect(co.request).toBeUndefined();
                        expect(co.requestError).toBeUndefined();
                    }]);
            });

            it("should not cry wolf", function () {
                inject(["madeasy.networking.interceptors.connection",
                    function (co) {
                        spyOn(rootScope, "$broadcast");
                        spyOn(q, "reject").and.returnValue("a");
                        [
                            {data: "", status: 500},
                            {data: "AS", status: 0, statusText: ""},
                            {data: "", status: 0, statusText: "ASD"}
                        ].forEach(function (a) {
                            co.responseError(a);
                            expect(q.reject).toHaveBeenCalledWith(a);
                            expect(rootScope.$broadcast)
                                .not.toHaveBeenCalledWith(
                                "http.connection.fail");
                        });
                        expect(rootScope.$broadcast.calls.count()).toEqual(0);
                    }]);
            });

            it("should detect connection down", function () {
                inject(["madeasy.networking.interceptors.connection",
                    function (co) {
                        spyOn(rootScope, "$broadcast");
                        spyOn(q, "reject").and.returnValue("a");
                        var p = co.responseError({data: "",
                            status: 0, statusText: ""});
                        expect(p).toEqual("a");
                        expect(q.reject).toHaveBeenCalledWith({data: "",
                            status: 0, statusText: ""});
                        expect(rootScope.$broadcast)
                            .toHaveBeenCalledWith("http.connection.fail");
                    }]);
            });

            it("should detect connection resumption", function () {
                inject(["madeasy.networking.interceptors.connection",
                    function (co) {
                        spyOn(rootScope, "$broadcast");
                        spyOn(q, "reject").and.returnValue("a");
                        var p = co.responseError({data: "",
                            status: 0, statusText: ""});
                        expect(p).toEqual("a");
                        expect(q.reject).toHaveBeenCalledWith({data: "",
                            status: 0, statusText: ""});
                        expect(rootScope.$broadcast)
                            .toHaveBeenCalledWith("http.connection.fail");

                        p = co.response("b");
                        expect(p).toEqual("b");
                        expect(q.reject.calls.count()).toEqual(1);
                        expect(rootScope.$broadcast.calls.mostRecent().args[0])
                            .toEqual("http.connection.resumed");
                        expect(rootScope.$broadcast.calls.count()).toEqual(2);
                    }]);
            });

            it("should broadcast connection down once", function () {
                inject(["madeasy.networking.interceptors.connection",
                    function (co) {
                        spyOn(rootScope, "$broadcast");
                        spyOn(q, "reject").and.returnValue("a");

                        var p = co.responseError({data: "", status: 0,
                            statusText: ""});
                        expect(p).toEqual("a");
                        expect(q.reject).toHaveBeenCalledWith({data: "",
                            status: 0, statusText: ""});
                        expect(rootScope.$broadcast)
                            .toHaveBeenCalledWith("http.connection.fail");

                        p = co.responseError({data: "",
                            status: 0, statusText: ""});
                        expect(q.reject.calls.count()).toEqual(2);
                        expect(rootScope.$broadcast.calls.count()).toEqual(1);
                    }]);
            });

            it("should broadcast connection resumed once", function () {
                inject(["madeasy.networking.interceptors.connection",
                    function (co) {
                        spyOn(rootScope, "$broadcast");
                        spyOn(q, "reject").and.returnValue("a");

                        var p = co.responseError({data: "", status: 0,
                            statusText: ""});
                        expect(p).toEqual("a");
                        expect(q.reject).toHaveBeenCalledWith({data: "",
                            status: 0, statusText: ""});
                        expect(rootScope.$broadcast).toHaveBeenCalledWith(
                            "http.connection.fail");

                        p = co.response("q");
                        expect(p).toEqual("q");
                        expect(rootScope.$broadcast).toHaveBeenCalledWith(
                            "http.connection.resumed");

                        co.response("q");
                        expect(q.reject.calls.count()).toEqual(1);
                        expect(rootScope.$broadcast.calls.count()).toEqual(2);
                    }]);
            });

        });
    });
})(angular);
