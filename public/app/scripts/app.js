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
    'ngTouch',
    'oitozero.ngSweetAlert',
    'ngCsvImport',
    'hljs'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/create-campaign', {
        templateUrl: '../views/campaigns/create_campaign.html',
        controller: 'CreateCtrl'
      })
      .when('/manage-campaign', {
        templateUrl: '../views/campaigns/manage_campaign.html',
        controller: 'ManageCampaignCtrl'
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
      .when('/detail-campaign/:campaign_id',{
         templateUrl: '../views/campaigns/detail_campaign.html',
         controller: 'DetailCampaignCtrl'
       })
      .when('/manage-template', {
        templateUrl: 'views/templates/manage_template.html',
        controller: 'ManageTemplateCtrl'
      })
      .when('/create-template', {
        templateUrl: 'views/templates/create_template.html',
        controller: 'CreateTemplateCtrl'
      })
      .when('/update-template/:id', {
        templateUrl: 'views/templates/create_template.html',
        controller: 'CreateTemplateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
