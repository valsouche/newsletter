'use strict';
/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */




  angular.module('newsletterApp')
    .controller('DetailCampaignCtrl',['$scope','$routeParams','$http','$location','SweetAlert',
        function ($scope,$routeParams, $http, $location,SweetAlert) {
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
            SweetAlert.swal({
              title: "Sûr de vous ?",
              text: "Vous êtes sur le point de mettre votre campagne à jour",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Oui !",
              cancelButtonText: "Non !",
              closeOnConfirm: false,
              closeOnCancel: false },

              function(isConfirm){
                if (isConfirm) {
                  $http.put('/api/updateCampaigns/' + $routeParams.campaign_id, $scope.detailCampaign)
                    .success(function(data) {
                      $scope.detailCampaign = {};
                      $scope.campaigns = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                    $location.path("/manage-campaign");
                    SweetAlert.swal("Génial", "Votre campagne a été mise à jour", "success");
                } else {
                  SweetAlert.swal("Annulé", "Ouufffff :)", "error");
                }
            });
          }





  }]);
