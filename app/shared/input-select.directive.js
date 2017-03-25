angular.module('app')
    .directive('inputSelect', function ($compile) {
        return {
            restrict: "E",
            require: ['^form', '?ngModel'],
            scope: {
                label: '=label',
                fieldName: '@',
                options: '=options'
            },
            replace: true,
            templateUrl: 'app/shared/input-select.html',
            link: function (scope, element, attrs, controllers) {
                var formController = controllers[0];
                var ngModel = controllers[1];

                if (!ngModel) {
                    return;
                }

                var input = element.find('select');
                var hasAttrs = false;
                if (attrs.required) {
                    input.attr('required', true);
                    hasAttrs = true;
                }

                if (hasAttrs) {
                    $compile(input)(scope);
                }
 
                var modelCtrl = element.find('select').controller('ngModel');    // get the NgModelController for the input element
                formController.$removeControl(modelCtrl);                       // remove the ModelController from the FormController
                modelCtrl.$name = scope.fieldName;                              // set the right name
                formController.$addControl(modelCtrl);                          // add the namend ModelController to the FormController
                scope.form = formController;                                    // publish the FormController to the scope - so we don't need to mess around with the parent scope.;
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
