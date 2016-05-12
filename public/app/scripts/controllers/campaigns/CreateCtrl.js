'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
  .controller('CreateCtrl', function ($scope, $http,$location,SweetAlert) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.dataCampaign = {};

    $http.get('/api/campaigns')
      .success(function(data) {
        $scope.campaigns = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    // when submitting the add form, send the text to the node API
    $scope.createCampaign = function() {
      if ($scope.campaignCreate.$valid) {
        // Submit as normal
        $http.post('/api/campaigns', $scope.dataCampaign)
          .success(function(data) {
            $scope.dataCampaign = {}; // clear the form so our user is ready to enter another
            $scope.campaigns = data;
            console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
          SweetAlert.swal("Great !", "Votre campagne a bien été créé !", "s");
          $location.path("/manage-campaign");
      }else{
        sweetAlert("Oops...", "Veyez vérifier votre formulaire!", "error");
      }
    };

    //Get templates
    $http.get('/api/templates')

      .success(function(data) {
        $scope.templates = data;
        console.log(data);
      })

      .error(function(data) {
        console.log('Error: ' + data);
      });

    //Get broadcastList
    $http.get('/api/broadcast-lists')

      .success( function(data) {
        $scope.broadcastLists = data;
        console.log(data);
      })

      .error( function(data) {
        console.log('Error: ' + data);
      });
    
  });