"use strict";

var abstractHomePageTests = function (state_name, action_name, loginServ) {

    spyOn(loginServ, "getUser").and.returnValue({
        "actions": [action_name]
    });
    spyOn(loginServ, "isLoggedIn").and.returnValue(true);
    inject(["madeasy.auth.services.homePage",
        function (hpg) {
            var res = hpg.determineHomePage();
            expect(res).toEqual(state_name);
        }
    ]);
};
describe("Unit Test: madeasy.auth.homePage",function () {
    var loginService;
    beforeEach(function () {
        module("madeasy.auth.services");
        inject(["madeasy.auth.services.login", function (loginServ) {
            loginService = loginServ;
        }]);
    });
    it("should change state to `scheduling` if a user has `view_schedule` acts",
        function () {
            abstractHomePageTests("scheduling", "view_appointment", loginService);
        });
    it("should change state to `patients` if a user has `view_patient` acts",
        function () {
            abstractHomePageTests("patients", "view_patient", loginService);
        });
    it("should change state to `visits` if a user has `view_visit` acts",
        function () {
            abstractHomePageTests("visits", "view_visit", loginService);
        });
    it("should change state to `admin` if a user has `edit_user` acts",
        function () {
            abstractHomePageTests("admin", "edit_user", loginService);
        });
    it("should change state to `403` if a user has no acts",
        function () {
            spyOn(loginService, "getUser").and.returnValue({
                "actions": [{}]
            });
            spyOn(loginService, "isLoggedIn").and.returnValue(true);
            inject(["madeasy.auth.services.homePage",
                function (hpg) {
                    var res = hpg.determineHomePage();
                    expect(res).toEqual("auth_403");
                }
            ]);
        });
    it("should redirect non-logged in users to the login page",
        function () {
            spyOn(loginService, "isLoggedIn").and.returnValue(false);
            inject(["madeasy.auth.services.homePage",
                function (hpg) {
                    var res = hpg.determineHomePage();
                    expect(res).toEqual("auth_login");
                }
            ]);
        });
});
