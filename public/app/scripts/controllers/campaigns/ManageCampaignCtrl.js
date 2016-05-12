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
        console.log("Email sent : " + email + " " + new Date());
    }
    
    /**
     * 
     * @param {type} campain
     * @returns {undefined}
     */
    
    var broadcastList = "none";
    
    var emailToSend = "";
    
    $scope.sendCampain = function(campaign_id) {
        
        // declaration
        
        var d = new Date();
        var tmp, emails;
                
        $http.get('/api/campaignsDetail/' + campaign_id).success(
                
                function(data) {
                    
                    tmp = data[0];
                    
                    $http.get('/api/broadcast-lists/title/' + tmp.broadcastList).success(function(data) {
                                
                                tmp = data[0];

                                emails = tmp.emails;

                                // starting code
                                
                                var x;

                                for (var i = 0; i < emails.length; i++) {

                                    //
                                    
                                    var e = emails[i].address;

                                    console.log("Current mail to send : " + e);
                                    
                                    emailToSend = e;

                                    // calculate random number between 5-15 seconds

                                    x = Math.floor((Math.random() * 15) + 5);

                                    // recalculate the new date

                                    x = parseInt(d.getSeconds()) + parseInt(x);

                                    d.setSeconds(x);

                                    // testing purpose

                                    console.log("Date : " + dateDiffInSeconds(d, new Date()) + "s");
                                    
                                    $timeout(function(e) {
                                         
                                         var b = e;
                                         console.log("cannot récupérer : " + emailToSend);
                                        sendEmail(b);
                                        
                                    }, 1000);
                                    
                                    console.log("ok");
                                }

                    }); 
                
                }
        ); 
        
        
        
        
        
        
    };

});
