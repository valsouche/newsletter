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
  .config(function ($routeProvider, $locationProvider) {
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
      .when('/manage-template', {
        templateUrl: 'views/templates/manage_template.html',
        controller: 'ManageTemplateCtrl',
      })
      .when('/create-template', {
        templateUrl: 'views/templates/create_template.html',
        controller: 'CreateTemplateCtrl',
      })
      .when('/update-template/:id', {
        templateUrl: 'views/templates/create_template.html',
        controller: 'CreateTemplateCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
