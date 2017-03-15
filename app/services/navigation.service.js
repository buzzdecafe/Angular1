'use strict';

angular.module('app')
  .service('NavigationService', function ($http, $state) {
    this.submit = function (data) {

      console.log('saving:', data);

      $http.post('api/save', data)
                .then(function (success) {
                    $state.go(success.data.view);
                },function (failure) {
                    console.log('Error: ', failure);
                });
      };
    });
