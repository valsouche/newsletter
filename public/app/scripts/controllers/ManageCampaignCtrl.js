'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
  .controller('ManageCampaignCtrl', function ($scope, $http,SweetAlert) {
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
        SweetAlert.swal({
          title: "Etes vous sur ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",confirmButtonText: "Oui, supprimer !",
          cancelButtonText: "Nooon !",
          closeOnConfirm: false,
          closeOnCancel: false },

          function(isConfirm){
           if (isConfirm) {
              $http.delete('/api/deleteCampaigns/' + id)
                .success(function(data) {
                  $scope.campaigns = data;
                })
                .error(function(data) {
                  console.log('Error: ' + data);
                });
                SweetAlert.swal("Supprimé !", "Votre campagne a bien été supprimée", "success");
           } else {
              SweetAlert.swal("Annulé !", "Oufff :)", "error");
           }
        });
    };

  });
