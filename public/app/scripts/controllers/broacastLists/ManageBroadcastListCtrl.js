/* global angular */

'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp').controller('ManageBroadcastListCtrl', function ($scope, $http, $location, $routeParams, SweetAlert) {
      
    // Broadcast List Object
    $scope.broadcastList = {
      emails: []
    };
    $scope.broadcastLists = {};
    $scope.broadcastListCurrentlyUpdating = false;
    $scope.email = []; // Use to stock all manual added and csv emails address
    $scope.csv = {
      content: null,
      header: true,
      headerVisible: true,
      separator: ',',
      separatorVisible: true,
      result: null,
      encoding: 'ISO-8859-1',
      encodingVisible: true
    }; // CSV import directive config

    //
    var _init = function() {
        
        var title = $routeParams.title;
        
        // update the current item with the title
        
        if (title !== undefined) {
            
            setByTitle( title );

            $scope.broadcastListCurrentlyUpdating = true;
        }
        else {
            $scope.broadcastListCurrentlyUpdating = false;
        }


        // get all broadcast lists

        $http.get('/api/broadcast-lists')
          .success( function(data) {
            $scope.broadcastLists = data;
          })

          .error( function(data) {
            console.log('Error: ' + data);
          });
    };

    /**
     * @param title
     *      
     * 
     * @returns {undefined}
     */
        
    function setByTitle(title) {
        $http.get('/api/broadcast-lists/title/' + title)
            .success( function(data) {
                console.log(data);
                $scope.broadcastList = data[0];
            })

            .error( function(data) {
                console.log('Error: ' + data);
            });
    }

  // BROADCAST LIST MANAGE
    // Create a new broadcast list
    $scope.create = function() {

        $http.post('/api/broadcast-lists', $scope.broadcastList)

          .success(function (data) {

            updateAll(data);

            console.log(data);
          })

          .error(function (data) {
            console.log('Error: ' + data);
          });
        SweetAlert.swal("Great !", "Votre liste de diffusion a bien été créé !", "success");
        $location.path('/liste-de-diffusion');
    };

    /**
     * 
     * @param {type} id
     * @param {type} emails
     * @returns {undefined}
     */
    
    $scope.update = function(id) {
      SweetAlert.swal({
          title: "Sûr de vous ?",
          text: "Vous allez enregister vos modifications.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55", confirmButtonText: "Oui !",
          cancelButtonText: "Non !",
          closeOnConfirm: false,
          closeOnCancel: false
        },

        function (isConfirm) {
          if (isConfirm) {
            $http.put('/api/broadcast-lists/update/' + id, $scope.broadcastList)

              .success( function(data) {

                  updateAll(data);

                  console.log(data);
              })

              .error( function(data) {
                  console.log('Error: ' + data);
              });

              $location.path('/liste-de-diffusion');
              SweetAlert.swal("Génial", "Votre liste de diffusion est à jour", "success");

          } else {
            SweetAlert.swal("Annulé", "Je garde l'ancienne :)", "error");
          }
        });
    };
    
    // remove a broadcast list
    $scope.remove = function(id) {
      SweetAlert.swal({
          title: "Sûr de vous ?",
          text: "Vous êtes sur le point de supprimer votre liste de diffusion",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55", confirmButtonText: "Oui !",
          cancelButtonText: "Non !",
          closeOnConfirm: false,
          closeOnCancel: false
        },

        function (isConfirm) {
          if (isConfirm) {
            $http.delete('/api/broadcast-lists/remove/' + id)

              .success( function(data) {

                  updateAll(data);

                  console.log(data);
              })

              .error( function(data) {
                  console.log('Error: ' + data);
              });
            SweetAlert.swal("C'est fait", "Votre liste de diffusion est supprimée", "success");

          } else {
            SweetAlert.swal("Annulé", "Je la conserve :)", "error");
          }
        });
    };




  // MANAGE EACH BROADCAST LIST EMAIL
  // Add all CSV emails address in email tab
  $scope.addCsvEmails = function() {
    var test;
    $scope.csv.result.forEach(function(value){
      $scope.email.push({
        address: value.email,
        deleted: false
      });
      test = $scope.email;
    });
    $scope.broadcastList.emails = test;
  };

  // Add emails address manually
  $scope.addManualEmails = function() {
    if ($scope.address != null && $scope.address != '' && $scope.address.length > 0) {
      $scope.email.push({
        address: $scope.address,
        deleted: false
      });
      $scope.address = '';
      var test = $scope.email;
    } else {
      console.log('Champ vide !');
    }
    $scope.broadcastList.emails = test;
  };

  $scope.checkAll = function() {
    $scope.mailChecked = !$scope.mailChecked;
  };
  // Remove email
  $scope.deleteEmail = function(mail) {
    mail.deleted = !mail.deleted;
  };
  $scope.deleteAllEmails = function() {
    $scope.email.forEach(function(value) {
      value.deleted = true;
    })
  };

  _init();
});

