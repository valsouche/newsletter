'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
  .controller('ManageTemplateCtrl', function ($scope, $http, $location) {

    // Get all templates
    $http.get('/api/templates')
      .success(function(data) {
        $scope.templates = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    // delete a todo after checking it
    $scope.deleteTemplate = function(id) {
        $http.delete('/api/templates/remove/' + id)
            .success(function(data) {
                $scope.templates = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
  });
