
var app = (function(){
    'use strict';
    var myApp = angular.module('app', ['ui.router', 'ngMessages']);

    myApp.config(function ($stateProvider, $locationProvider) {

        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        var states = [{
                name: 'earth',
                url: '/',
                component: 'earth'
            },
            {
                name: 'pluto',
                url: '/pluto',
                component: 'pluto',
                resolve: {
                    planet: function (PlanetService) {
                        return PlanetService.fetch('pluto');
                    }
                }
            },
            {
                name: 'mars',
                url: '/mars',
                component: 'mars'
            },
            {
                name: 'address',
                url: '/address',
                component: 'address',
                resolve: app.address.resolver
            }
        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });

    });

    myApp.run(['$rootScope','$transitions','$state', function ($rootScope, $transitions,$state) {

        $transitions.onSuccess({}, function () {
            console.log('success to: ' + $state.current.name);
            $rootscope.title = "ng-learn " + $state.current.name;
        });

    }]);

    return{
        myApp:myApp
    }

})();