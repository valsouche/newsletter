'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
  .controller('ManageCampaignCtrl', function ($scope, $http) {
     $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/campaigns')
        .success(function(data) {
            $scope.campaigns = data;
            //$scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // delete a todo after checking it
    $scope.deleteCampaigns = function(id) {
        $http.delete('/api/deleteCampaigns/' + id)
            .success(function(data) {
                $scope.campaigns = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
  });
