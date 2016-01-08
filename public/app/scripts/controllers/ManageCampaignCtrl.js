'use strict';

/**
 * @ngdoc function
 * @name newsletterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsletterApp
 */
angular.module('newsletterApp')
  .controller('ManageCampaignCtrl', function ($scope, $http) {
     $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/compaigns')
        .success(function(data) {
            $scope.compaigns = data;
            //$scope.todos = data;
            console.log(data);
            if(data.length!=0){
                console.log(data);
                angular.forEach(data, function(value) {
                    angular.element(document.getElementById('campaigne_list')).append($compile("<tr><td>"+value.status+"</td><td><table><tr><td>"+value.title+"</td><td>"+value.description+"</td></tr></table></td><td><a href='#' class='btn btn-info'>Detail</a><a href='#' class='btn btn-info'>Send</a></td></tr>"));  
                }, log);
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
  });
