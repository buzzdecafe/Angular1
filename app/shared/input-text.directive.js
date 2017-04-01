var app = app || {};

(function () {
    angular.module('app')
        .directive('inputText', function ($compile) {
            return {
                restrict: "E",
                require: ['^form', '?ngModel'],
                transclude: true,
                scope: {
                    meta: '=',
                    fieldName: '@'
                },
                replace: true,
                templateUrl: 'app/shared/input-text.html',
                link: function (scope, element, attrs, controllers) {
                    if (!scope.meta){
                        return false;
                    }

                    var formController = controllers[0];
                    var ngModel = controllers[1];

                    if (!ngModel) {
                        return;
                    }

                    scope.label = scope.meta.label;
                    scope.isDisabled = scope.meta.disabled === "true";
                    scope.isRequired = scope.meta.required === "true";

                    //TODO: need beter attr override mechanism
                    var input = element.find('input');
                    var hasAttrs = false;
                    if (attrs.required || scope.isRequired) {
                        input.attr('required', true);
                        hasAttrs = true;
                    }

                    if (attrs.minlength) {
                        input.attr('minlength', attrs.minlength);
                        hasAttrs = true;
                    }

                    if (attrs.minlength) {
                        input.attr('maxlength', attrs.maxlength);
                        hasAttrs = true;
                    }

                    if (attrs.pattern) {
                        input.attr('pattern', attrs.pattern);
                        hasAttrs = true;
                    }

                    if (scope.meta.placeholder || attrs.placeholder) {
                        input.attr('placeholder', scope.meta.placeholder || attrs.placeholder);
                        hasAttrs = true;
                    }

                    // if (attrs.mask) {
                    //     input.attr('ui-mask', attrs.mask);
                    //     input.attr('ui-mask-placeholder', true);
                    //     input.attr('ui-mask-placeholder-char', '_');
                    //     hasAttrs = true;
                    // }

                    if (hasAttrs) {
                        $compile(input)(scope);
                    }

                    //set correct name on the control
                    var modelCtrl = element.find('input').controller('ngModel');
                    
                    formController.$removeControl(modelCtrl);
                    modelCtrl.$name = scope.fieldName;
                    formController.$addControl(modelCtrl);
                    scope.form = formController;
                    scope.field = formController[scope.fieldName];
                
                    scope.showif = function () {
                        if (scope.meta.showif) {
                            return app.inputHelper.test(scope.$parent.$ctrl, scope.meta.showif);
                        }
                        return true;
                    };

                    scope.disabledif = function () {
                        if (scope.meta.disabledif) {
                            return app.inputHelper.test(scope.$parent.$ctrl, scope.meta.disabledif);
                        }
                        return false;
                    };

                    scope.requiredIf = function () {
                        return false;
                    };

                    scope.onChange = function () {
                        ngModel.$setViewValue(scope.value);
                    };

                    ngModel.$render = function () {
                        scope.value = ngModel.$modelValue;
                    };
                }
            };
        });
})();
