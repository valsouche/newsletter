'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
        .controller('ManageCampaignCtrl', function ($scope, $http,SweetAlert,$timeout) {
            $scope.formData = {};

            var campaignData;
            var timer;
            var campaign, campaignEmails, campaignTpl, emails;

    // when landing on the page, get all todos and show them
    $http.get('/api/campaigns')
      .success(function(data) {
          $scope.campaigns = data;
        console.log(data);
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
    
    /**
     * 
     * @param {type} a
     * @param {type} b
     * @returns {undefined}
     */
    
    function dateDiffInSeconds(a, b) {
        var dif = a.getTime() - b.getTime();
        return Math.abs(dif / 1000);
    }

    /**
     *
     * @param {type} email
     * @returns {undefined}
     */

    function sendEmail(email) {
      $http.post("/api/send-campaign", campaignData)
       .success(function(data) {

       });
      console.log('Envoi à '+ email + ' effectué !')
    }
    
    /**
     * 
     * @param {type} campain
     * @returns {undefined}
     */
    
    var broadcastList = "none";
    

    $scope.sendCampain = function(campaign_id) {
        
      // declaration

      var d = new Date();

      $http.get('/api/campaignsDetail/' + campaign_id)
        .success(function(data) {
            console.log('Lancement de la campagne');
            campaign = data[0];

            $http.get('/api/templates/details/' + campaign.template)
              .success(function(tpl) {

                campaignTpl = tpl[0].content;


                $http.get('/api/broadcast-lists/title/' + campaign.broadcastList)
                  .success(function(data) {

                    var x;
                    campaignEmails = data[0];
                    emails = campaignEmails.emails;
                    // starting code

                      emails.forEach(function(email){

                        if (!email.deleted) {
                          // calculate random number between 5-15 seconds
                          x = Math.floor((Math.random() * 15) + 5);
                          // recalculate the new date
                          x = parseInt(d.getSeconds()) + parseInt(x);
                          d.setSeconds(x);
                          timer = 100 * x;

                          $timeout(function () {
                            campaignData = {
                              to: email.address,
                              subject: campaign.describe,
                              content: campaignTpl
                            };
                            // testing purpose
                            console.log("Date : " + dateDiffInSeconds(d, new Date()) + "s");
                            sendEmail(campaignData.to);
                          }, timer);

                          SweetAlert.swal("Bon voyage !", "Votre campagne vient d'être envoyée", "success");
                        }
                      })
                  });
              });
        });
    };

});
