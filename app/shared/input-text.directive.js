angular.module('app')
    .directive('inputText', function ($compile) {
        return {
            restrict: "E",
            require: ['^form', '?ngModel'],
            scope: {
                label: '=label',
                fieldName: '@'
            },
            replace: true,
            templateUrl: 'app/shared/input-text.html',
            link: function (scope, element, attrs, controllers) {
                var formController = controllers[0];
                var ngModel = controllers[1];

                if (!ngModel) {
                    return;
                }

                var input = element.find('input');
                var hasAttrs = false;
                if (attrs.required) {
                    input.attr('required', true);
                    hasAttrs = true;
                }

                if (attrs.minlength) {
                    input.attr('minlength', attrs.minlength);
                    hasAttrs = true;
                }

                if (hasAttrs) {
                    $compile(input)(scope);
                }
 
                var modelCtrl = element.find('input').controller('ngModel');    // get the NgModelController for the input element
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
