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
        activetab: 'home'
      })
      .when('/create-campaign', {
        templateUrl: 'views/create_campaign.html',
        controller: 'CreateCtrl',
      })
      .when('/manage-campaign', {
        templateUrl: 'views/manage_campaign.html',
        controller: 'ManageCampaignCtrl',
        activetab: 'manage-campagn'
      })
      
      // Liste de diffusion
      
      .when('/liste-de-diffusion', {
        templateUrl: 'views/broadcast-list/manage.html',
        controller: 'ManageBroadcastListCtrl'
      })
      .when('/liste-de-diffusion-creation', {
        templateUrl: 'views/broadcast-list/create.html',
        controller: 'ManageBroadcastListCtrl'
      })
      .when('/liste-de-diffusion-modification/:title', {
        templateUrl: 'views/broadcast-list/create.html',
        controller: 'ManageBroadcastListCtrl'
      })
      // .when('/manage-template', {
      //   templateUrl: 'views/manage_template.html',
      //   controller: 'ManageTemplateCtrl',
      //   activetab: 'manage-template'
      // })
      // .when('/create-template', {
      //   templateUrl: 'views/create_template.html',
      //   controller: 'CreateTemplateCtrl',
      //   activetab: 'create-template'
      // })
      .otherwise({
        redirectTo: '/'
      });
  });
