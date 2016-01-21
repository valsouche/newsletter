'use strict';
/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */


 

  angular.module('newsletterApp')
    .controller('DetailCampaignCtrl',['$scope','$routeParams','$http','$location',
        function ($scope,$routeParams, $http, $location) {
          $scope.detailCampaign = {};
          var id = $routeParams.campaign_id;
          $http.get('/api/campaignsDetail/' + id)
            .success(function(data) {
              $scope.detailCampaign = data[0];
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
        

       
         $scope.updateCampaign = function(){
                  $http.put('/api/updateCampaigns/' + $routeParams.campaign_id, $scope.detailCampaign)
                    .success(function(data) {
                      $scope.detailCampaign = {}; 
                      $scope.campaigns = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                    $location.path("/manage-campaign");
                }




  }]);