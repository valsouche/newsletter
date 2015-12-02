'use strict';

/**
 * @ngdoc overview
 * @name newsletterApp
 * @description
 * # newsletterApp
 *
 * Main module of the application.
 */
angular
  .module('newsletterApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
      })
      .when('/create-campaign', {
        templateUrl: 'views/create_campaign.html',
        controller: 'CreateCtrl',
      })
      .when('/manage-campaign', {
        templateUrl: 'views/manage_campaign.html',
        controller: 'ManageCampaignCtrl',
      })
      .when('/manage-group', {
        templateUrl: 'views/manage_group.html',
        controller: 'ManageGroupCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
