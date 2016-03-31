(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.directives.madeasyAppActions", [
        "madeasy.actions"
    ])

    .directive("madeasyAppActions", madeasyAppActions);
    madeasyAppActions.$inject = ["$log", "madeasy.actions.hasAction", "$injector"];
    function madeasyAppActions ($log, hasAction, $injector) {
        return {
            link: function linkFunction (scope, element, attrs, controller,
                transclude) {
                transclude(scope, function actionFunction (clone) {
                    var actions;

                    /**
                     * To have one source of truth in terms of actions
                     * required to view a particular state below is an
                     * implementation that allows for action to be inferred
                     * from the state's configuration when the actions
                     * are not explicitly defined. Where the actions are
                     * explicitly defined we prefer those over the ones
                     * defined in the state.
                     *
                     */
                    if (!_.isEmpty(attrs.madeasyAppActions)) {
                        actions = attrs.madeasyAppActions;
                    }
                    else if (_.has(attrs, "uiSref")) {
                        // Infer from the state.
                        var $state = $injector.get("$state");
                        var stateConf = $state.get(attrs.uiSref);

                        if (_.has(stateConf, "data")) {
                            actions = stateConf.data.actions;
                        }

                    }

                    if (hasAction.hasActions(actions)) {
                        // Element.replaceWith(clone);
                        element.after(clone);
                    }
                });
            },
            // Highest yet : higher than ng-switch (1200)
            priority: 1500,
            restrict: "A",
            transclude: "element"
        };
    }
})(angular);
