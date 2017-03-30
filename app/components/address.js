angular.module('app').component('address', {
    bindings: {
        address: '<'
    },
    templateUrl: 'app/components/address.html',
    controller: function ($scope, NavigationService) {
        var ctrl = this;
        ctrl.greeting = 'Address Entry';

        $scope.submit = function(form, model){
            if (!form.$valid ){
                return false;
            }

            var result = NavigationService.submit(model);
            console.log(result);
        }
    }
});

