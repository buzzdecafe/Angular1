angular.module('app').component('pluto', {
    bindings: {
        planet: '<'
    },
    templateUrl: 'app/components/pluto.html',
    controller: function ($scope, NavigationService) {
        var ctrl = this;
        ctrl.greeting = 'Hello pluto !!';

        $scope.submit = function(form,model){
            if (!form.$valid ){
                return false;
            }

            var result = NavigationService.submit(model);
            console.log(result);
        }
    }
});
