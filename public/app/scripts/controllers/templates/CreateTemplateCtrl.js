'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:createTemplateCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
  .controller('CreateTemplateCtrl', function ($scope, $http, $location, $routeParams, SweetAlert) {
    $scope.dataTemplate = {};
    $scope.isUpdated = false;

    // when submitting the add form, send the text to the node API
    $scope.createTemplate = function() {
      if ($scope.templateCreate.$valid) {
        $http.post('/api/templates', $scope.dataTemplate)

          .success(function(data) {
            $scope.dataTemplate= {}; // clear the form so our user is ready to enter another
            $scope.templates = data;
          })

          .error(function(data) {
              console.log('Error: ' + data);
          });
          
          SweetAlert.swal("Great !", "Votre template a bien été créé !", "success");
          $location.path("/manage-template");
      }else{
        sweetAlert("Oops...", "Veyez vérifier votre formulaire!", "error");
      }
    };

    // Check if URL is not create-template, so it's update url
    if ($location.path() != '/create-template') {
      $scope.isUpdated = true;

      // Get template by id
      $http.get('/api/templates/details/' + $routeParams.id)

        .success(function(data) {
          $scope.dataTemplate = data[0];
        })

        .error(function(data) {
          console.log('Error: ' + data);
        });

      $scope.updateTemplate = function() {

        SweetAlert.swal({
          title: "Sûr de vous ?",
          text: "Vous êtes sur le point de mettre votre template à jour",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",confirmButtonText: "Oui !",
          cancelButtonText: "Non !",
          closeOnConfirm: false,
          closeOnCancel: false },

            function(isConfirm){
               if (isConfirm) {
                 $http.put('/api/templates/details/' + $routeParams.id, $scope.dataTemplate)

                   .success(function(data) {
                     console.log("Success !");
                   })

                   .error(function(data) {
                       console.log('Error: ' + data);
                   });

                  $location.path("/manage-template");
                  SweetAlert.swal("Génial", "Votre template a été mis à jour", "success");

               } else {
                  SweetAlert.swal("Annulé", "Ouufffff :)", "error");
               }
           });
      };
    }
  })
.directive('ensureUniqueTemp', ['$http','$timeout','$window',function($http,$timeout,$window) {
    return {
        restrict:"A",
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModelController) {
            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                if (!newValue) return;
                $timeout.cancel($window.timer);
                if(newValue!=oldValue && oldValue!=undefined){
                $window.timer = $timeout(function(){
                    $http({
                        method: 'get',
                        url: '/api/titleTemplateUnique/'+newValue,
                    }).success(function(data) {

                        ngModelController.$setValidity('unique', data); 
                    }).error(function(data) {
                        ngModelController.$setValidity('unique', false);
                    });
                },500);
              }
            });
        }
    }
 }]);