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
          if ($scope.campaignModif.$valid) {
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
          }else{
            sweetAlert("Oops...", "Veyez vérifier votre formulaire!", "error");
          }
        }
  }])
.directive('ensureUniqueCamp', ['$http','$timeout','$window',function($http,$timeout,$window) {
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
                        url: '/api/titleCampagneUnique/'+newValue,
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