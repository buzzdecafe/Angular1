var app = app || {};
app.address = (function(){

    var resolver = {
            address: function (PersonService) {
                return PersonService.fetch();
            }
    }

    var controller = function ($scope, NavigationService) {
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

    angular.module('app').component('address', {
        bindings: {
            address: '<'
        },
        templateUrl: 'app/components/address.html',
        controller: controller
    });

    return{
        resolver:resolver
    }

})();