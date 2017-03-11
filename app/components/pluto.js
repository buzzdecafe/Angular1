angular.module('app').component('pluto', {
    bindings: {
        planet: '<'
    },
    templateUrl: 'app/components/pluto.html',
    controller: function ($scope) {
        var ctrl = this;
        ctrl.greeting = 'Hello pluto !!';
        
        $scope.submit = function(form,model){
            if(!form.$valid){
                return false;
            }

            console.log(model);
        }
    }
});
