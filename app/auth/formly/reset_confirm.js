(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.formly.reset_confirm", [])

    .factory("madeasy.auth.formly.reset_confirm", reset_confirm);
    function reset_confirm () {
        /*
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function getFieldsFunction () {
            var fields = [
                {
                    "key": "new_password1",
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "New password",
                        "reqValidationMsg": "Please provide a password here",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                },
                {
                    "expressionProperties": {
                        "templateOptions.pwCheckerVal": "model.new_password1"
                    },
                    "extras": {
                        "validateOnModelChange": true
                    },
                    "key": "new_password2",
                    "ngModelAttrs": {
                        "pwCheckerVal": {
                            "attribute": "sil-pw-checker"
                        }
                    },
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "Confirm password",
                        "reqValidationMsg": "Please provide a password here",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }
})(angular);
