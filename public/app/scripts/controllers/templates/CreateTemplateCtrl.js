'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
  .controller('CreateTemplateCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.dataTemplate = {};
    $scope.isUpdated = false;

    // when submitting the add form, send the text to the node API
    $scope.createTemplate = function() {
      $http.post('/api/templates', $scope.dataTemplate)
        .success(function(data) {
          $scope.dataTemplate= {}; // clear the form so our user is ready to enter another
          $scope.templates = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        $location.path("/manage-template");
    };

    // Check if URL is not create-template, so it's update url
    if ($location.path() != '/create-template') {
      $scope.isUpdated = true;

      // Get template by id
      $http.get('/api/templates/details/' + $routeParams.id)
        .success(function(data) {
          $scope.templates = data[0];
          $scope.dataTemplate = {
            title: $scope.templates.title,
            describe: $scope.templates.describe,
            content: $scope.templates.content
          };
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

      $scope.updateTemplate = function() {
        $http.put('/api/templates/details/' + $routeParams.id, $scope.dataTemplate)
          .success(function(data) {
            console.log("Success !");
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
          $location.path("/manage-template");
        };
    }

  });
