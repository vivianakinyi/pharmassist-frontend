"use strict";

describe("Unit Test: madeasy.auth.controllers.authBase", function () {
    var state, createController;

    beforeEach(function () {
        module("madeasy.common.services.query_adapter");
        module("madeasy.auth.controllers");

        inject(["$controller", "$state",
            function ($controller, $state) {
                state = $state;
                state.params = {"key": "val"};

                createController = function () {
                    var ctrlData = {
                        "$state": state
                    };

                    return $controller("madeasy.auth.controllers.authBase",
                        ctrlData);
                };
            }
        ]);
    });
    it("should have the state params defined in the scope", function () {
        var vm = createController();
        expect(vm.params).toEqual(state.params);
    });
    it("should have the year equal the current year", function () {
        var vm = createController();
        var year = new Date().getFullYear();
        expect(vm.year).toEqual(year);
    });
});
