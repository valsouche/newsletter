'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */


 

  angular.module('newsletterApp')
    .controller('DetailCampaignCtrl',['$scope', '$routeParams','$http',
        function($scope, $routeParams, $http) {
          $scope.detailCampaign = {};
          var id = $routeParams.campaign_id;
          $http.get('/api/campaignsDetail/' + id)
            .success(function(data) {
              $scope.camps = data[0];
              $scope.detailCampaign = {
                title: $scope.camps.title,
                describe: $scope.camps.describe,
                templete: $scope.camps.templete,
                diffusionList : $scope.camps.diffusionList
              }
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
        

        $scope.updateCampaign = function(){
          $http.put('/api/updateCampaigns/' + $routeParams.campaign_id, $scope.detailCampaign)
            .success(function(data) {
              $scope.detailCampaign = {}; 
              console.log(data);
              $scope.campaigns = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        }





  }]);