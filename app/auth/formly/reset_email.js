(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.formly.reset_email", [])

    .factory("madeasy.auth.formly.reset_email", reset_email);
    function reset_email () {
        /*
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function getFields () {
            var fields = [
                {
                   "key": "email",
                   "templateOptions": {
                       "addonLeft": {
                           "class": "fa fa-envelope"
                       },
                       "emailValidationMsg": "Please provide a valid" +
                       " email address",
                       "label": "Email",
                       "reqValidationMsg": "Please provide an email" +
                       " address here",
                       "required": true,
                       "type": "email"
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
