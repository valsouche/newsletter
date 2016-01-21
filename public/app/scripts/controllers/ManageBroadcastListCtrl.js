/* global angular */

'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp').controller('ManageBroadcastListCtrl', function ($scope, $http, $location, $routeParams) {
      
    // Broadcast List Object
    
    $scope.broadcastList = {};
    $scope.broadcastLists = {};
    $scope.broadcastListCurrentlyUpdating = false;
    
    //
    
    $scope.init = function() {
        
        var title = $routeParams.title;
        
        // update the current item with the title
        
        if (title !== undefined) {
            
            setByTitle( title );

            $scope.broadcastListCurrentlyUpdating = true;
        }
        else {
            $scope.broadcastListCurrentlyUpdating = false;
        }
        
    };
    
    $scope.init();
    
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
    
    /**
     * 
     * @param {type} data
     *      the object to update the entities
     * 
     * @returns
     *      nothing
     */
    
    function updateAll(data) {
        
        // clean the entity
            
        //$scope.broadcastList = {};
          
        // update the results
          
        $scope.broadcastLists.push( data );
        $scope.$apply();
    }
    
    // get all broadcast lists
    
    $http.get('/api/broadcast-lists')
    
      .success( function(data) {
        $scope.broadcastLists = data;
        console.log(data);
      })
      
      .error( function(data) {
        console.log('Error: ' + data);
      });
    
    // Create a new broadcast list
    
    $scope.create = function() {
      $http.post('/api/broadcast-lists', $scope.broadcastList)
      
        .success( function(data) {
            
            updateAll(data);
    
            console.log(data);
        })
        
        .error( function(data) {
            console.log('Error: ' + data);
        });
    };
    
    /**
     * 
     * @param {type} id
     * @param {type} emails
     * @returns {undefined}
     */
    
    $scope.update = function(id) {
      $http.put('/api/broadcast-lists/update/' + id, $scope.broadcastList)
      
        .success( function(data) {
            
            updateAll(data);
            
            console.log(data);
        })
        
        .error( function(data) {
            console.log('Error: ' + data);
        });
        
        $location.path('/liste-de-diffusion');
    };
    
    // remove a broadcast list
    
    $scope.remove = function(id) {
      $http.delete('/api/broadcast-lists/remove/' + id)
      
        .success( function(data) {
            
            updateAll(data);
            
            console.log(data);
        })
        
        .error( function(data) {
            console.log('Error: ' + data);
        });
    };

});

