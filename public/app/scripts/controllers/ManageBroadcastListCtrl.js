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
    
    $scope.broadcastLists = {};
    
    
    $scope.broadcastList = function() {
        
        $scope.broadcastList.title = $routeParams.title;
        
        // modification
        
        if ($routeParams.title !== null) {
            
            $scope.broadcastList = function() {
                    
                    $http.get('/api/broadcast-lists/title/' + $routeParams.title)
            
                        .success( function(data) {
                          $scope.broadcastLists = data;
                          console.log(data);
                          return data;
                        })

                        .error( function(data) {
                          console.log('Error: ' + data);
                          return {};
                        })
                    };
        }
        
        // creation
        
        else {
            $scope.broadcastList = {};
        }
        
    };
    
    
    function getFromId($id) {
        
    }
    
    /**
     * 
     * Load the broadcast id in the view 
     * 
     * @param {type} bl
     * 
     */
    
    $scope.modify = function(data) {
        console.log(data);
        
        $scope.dlId = data._id;
        $scope.broadcastList = data;
        
        $location.path('/liste-de-diffusion-creation');
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
    
    // modify a broadcast list
    
    $scope.edit = function(id, emails) {
      $http.put('/api/broadcast-lists/update/' + id + '/' + emails)
      
        .success( function(data) {
            
            updateAll(data);
            
            console.log(data);
        })
        
        .error( function(data) {
            console.log('Error: ' + data);
        });
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

