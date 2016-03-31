
(function () {
    "use strict";

    describe("Test exceptions module", function () {
        beforeEach(module("madeasy.exceptions"));

        describe("test Errors :", function () {
            it("should define properties", function () {
                inject(["madeasy.exceptions.Errors", function(errs) {
                    expect(angular.isFunction(errs.createError)).toBe(true);
                    expect(angular.isString(errs.ImproperlyConfigured))
                        .toBe(true);
                }]);
            });

            it("should avail errors which can be thrown", function () {
                inject(["madeasy.exceptions.Errors", function (errs) {
                    var err;
                    var fxn = function () {
                        throw err("dimaga", "mawe imetupwa bwana!!");
                    };
                    err = errs.createError();
                    expect(fxn).toThrow(new Error("[dimaga]" +
                        " Error : mawe imetupwa bwana!!"));

                    err = errs.createError("module");
                    expect(fxn).toThrow(new Error("[module:dimaga]" +
                        " Error : mawe imetupwa bwana!!"));

                    err = errs.createError("module", errs.ImproperlyConfigured);
                    expect(fxn).toThrow(new Error("[module:dimaga]" +
                        " ImproperlyConfigured : mawe imetupwa bwana!!"));

                    err = errs.createError("module", "kumenuka");
                    expect(fxn).toThrow(new Error("[module:dimaga]" +
                        " kumenuka : mawe imetupwa bwana!!"));
                }]);
            });
        });
    });

})();
