/* global angular */

'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp').service('ManageEmailsServ', function ($timeout) {

    /**
     *  Generate date for sending
     */
    
    this.generateEmailSending = function() {
        
        // declaration
        
        var d = new Date(), x;
        
        // starting code
        
        for (var i = 0; i < 10; i++) {
            
            // calculate random number between 5-15 seconds
            
            x = Math.floor((Math.random() * 15) + 5);
            
            // recalculate the new date
            
            x = parseInt(d.getSeconds()) + parseInt(x);
            
            d.setSeconds(x);
            
            // testing purpose
            
            console.log(i + ") " + d + " -> " + x);
        }
        
    };
    
});