"use strict";

describe("Testing the auth login controller: ", function () {
    var controller, data, root, scope, SERVER_URL, httpBackend, state;
    var loadFormly;
    var token = {
        "access_token": "CDk0CcaeRPWh417pU25zllQSnoraQy",
        "expires_in": 3600,
        "refresh_token":"jAvaPRygIAvvSaC31JcKiOkuCFfEIF",
        "scope": "claim_read claim_write preauth_read preauth_write",
        "token_type": "Bearer"
    };

    beforeEach(function () {
        module("ui.router");
        module("madeasy.config");
        module("madeasy.common.services.query_adapter");
        module("madeasy.auth.services");
        module("madeasy.auth.controllers");
        module("madeasy.common.errorMessages");
        module("madeasyApp");

        inject(["$rootScope", "$controller", "$httpBackend", "SERVER_URL",
            "madeasy.auth.services.login", "$state",
            "madeasy.auth.formly.login",
            function ($rootScope, $controller, $httpBackend, url, loginService,
                $state, _loadFormly_) {
                root = $rootScope;
                scope = root.$new();
                SERVER_URL = url;
                state = $state;
                httpBackend = $httpBackend;
                loginService = loginService;
                loadFormly = _loadFormly_;
                data = {
                    $scope : scope,
                    $state : $state,
                    "$window": {
                        "$location":{
                            "href":""
                        },
                        "madeasy.auth.formly.login": loadFormly
                    },
                    SERVER_URL : url,
                    loginService : loginService
                };
                controller = function () {
                    return $controller("madeasy.auth.controllers.loginAuth",
                        data);
                };
            }
        ]);
    });

    it("should test auth login controller",
        inject(["$state", function ($state) {
            controller("madeasy.auth.controllers.loginAuth");
            spyOn($state, "go");
        }]
    ));

    it("should load formly fields", function () {
        var expectedData = {
            "key": "username",
            "templateOptions": {
                "addonLeft": {
                    "class": "fa fa-envelope"
                },
                "emailValidationMsg": "Please provide a valid email " +
                                      "address",
                "label": "Email",
                "reqValidationMsg": "Please provide an email " +
                                    "address here",
                "required": true,
                "type": "email"
            },
            "type": "input"
        };
        controller();
        expect(scope.fields).toContain(expectedData);
    });

    it("should prompt user to correct an invalid form", function () {
        controller();

        scope.loginForm.$valid = false;
        scope.submitUser();
        var err = "Please correct the errors on the form before logging In";
        expect(scope.alert.msg[0].Error).toEqual(err);
    });

    it("should call backend and login and save user credentials: success",
        inject(["$httpBackend", "$controller", "$rootScope", "$state",
            "madeasy.auth.services.login",
            function ($httpBackend, $controller, $rootScope, $state, srvc) {
                var s = $rootScope.$new();

                spyOn(srvc, "login").and.callThrough();

                $controller("madeasy.auth.controllers.loginAuth", {
                    "$scope": s,
                    "$state": $state,
                    "$window": {
                        "location":{
                            "href":""
                        }
                    },
                    "madeasy.auth.controllers.loginAuth": srvc,
                    "madeasy.auth.formly.login": loadFormly
                });

                $httpBackend.expectPOST(SERVER_URL + "/o/token/")
                    .respond(200, token);
                $httpBackend.expectGET(SERVER_URL + "/me/")
                    .respond(200, {email: ""});

                s.loginForm.$valid = true;
                s.loginForm.model = {password: "owaga",
                username : "owagaantony@gmail.com"};

                s.submitUser();

                expect(srvc.login).toHaveBeenCalledWith(s.loginForm.model);
                $httpBackend.flush();
            }
        ])
    );
    it("should call backend and login and save user credentials: success, " +
    "and resume to a previously stored state",
        inject(["$httpBackend", "$controller", "$rootScope", "$state",
            "madeasy.auth.services.login",
            function ($httpBackend, $controller, $rootScope, $state, srvc) {
                var s = $rootScope.$new();

                spyOn(srvc, "login").and.callThrough();
                spyOn(srvc, "loadState").and.returnValue({"name": "next"});
                spyOn(srvc, "clearState");
                spyOn($state, "go");

                $controller("madeasy.auth.controllers.loginAuth", {
                    "$scope": s,
                    "$state": $state,
                    "$window": {
                        "location":{
                            "href":""
                        }
                    },
                    "madeasy.auth.controllers.loginAuth": srvc,
                    "madeasy.auth.formly.login": loadFormly
                });

                $httpBackend.expectPOST(SERVER_URL + "/o/token/")
                    .respond(200, token);
                $httpBackend.expectGET(SERVER_URL + "/me/")
                    .respond(200, {email: ""});

                s.loginForm.$valid = true;
                s.loginForm.model = {password: "owaga",
                username : "owagaantony@gmail.com"};

                s.submitUser();

                expect(srvc.login).toHaveBeenCalledWith(s.loginForm.model);
                $httpBackend.flush();
                expect(srvc.clearState).toHaveBeenCalled();
            }
        ])
    );
    it("should call backend and login and save user credentials: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller();
            scope.loginForm.$valid = true;
            scope.loginForm.model = {
                password: "owaga",
                username : "owagaantony@gmail.com"
            };
            scope.submitUser();
            $httpBackend.expectPOST(SERVER_URL + "/o/token/").respond(200,
                scope.loginForm.model);
            $httpBackend.expectGET(SERVER_URL + "/me/").respond(400,
                {email: ""});
            $httpBackend.flush();
            expect(scope.alert.msg[0].Error).not.toEqual("");
        }])
    );
});
