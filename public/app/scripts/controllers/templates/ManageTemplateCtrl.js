'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
  .controller('ManageTemplateCtrl', function ($scope, $http, $location, SweetAlert) {

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
               $http.delete('/api/templates/remove/' + id)

                   .success(function(data) {
                       $scope.templates = data;
                       console.log(data);
                   })

                   .error(function(data) {
                       console.log('Error: ' + data);
                   });

               SweetAlert.swal("Supprimé !", "Votre template à bien été supprimé", "success");

             } else {
                SweetAlert.swal("Suppression annulée", "Oufff :)", "error");
             }
          });
    };
  });
