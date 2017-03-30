angular.module('app')
    .directive('inputSelect', function ($compile) {
        return {
            restrict: "E",
            require: ['^form', '?ngModel'],
            scope: {
                meta: '=',
                fieldName: '@'
            },
            replace: true,
            templateUrl: 'app/shared/input-select.html',
            link: function (scope, element, attrs, controllers) {
                if (!scope.meta) {
                    return false;
                }

                var formController = controllers[0];
                var ngModel = controllers[1];

                if (!ngModel) {
                    return;
                }

                //TODO: need beter attr override mechanism
                if (attrs.required){
                    scope.isRequired = true;
                }

                if (attrs.placeholder) {
                    scope.placeholder = attrs.placeholder;
                }

                //allow meta data to override inline behavior
                scope.label = scope.meta.label;
                scope.isDisabled = scope.meta.disabled === "true";
                scope.isRequired = scope.isRequired || scope.meta.required === "true";
                scope.placeholder = scope.placeholder || scope.meta.placeholder || ' - select -';
                scope.options = scope.meta.options;

                //NOTE: can't compile select element due to doubling of the options list

                //set correct name on the control
                var modelCtrl = element.find('select').controller('ngModel');
                formController.$removeControl(modelCtrl);
                modelCtrl.$name = scope.fieldName;
                formController.$addControl(modelCtrl);
                scope.form = formController;
                scope.field = formController[scope.fieldName];

                scope.onChange = function() {
                    ngModel.$setViewValue(scope.value);
                };

                ngModel.$render = function(){
                    scope.value = ngModel.$modelValue;
                };
            }
        };
    });
