'use strict';

/**
 * @ngdoc overview
 * @name newsletterApp
 * @description
 * # newsletterApp
 *
 * Main module of the application.
 */
 var app = angular
  .module('newsletterApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
<<<<<<< HEAD
  ]);

  app.config(function ($routeProvider) {
=======
  ])
  .config(function ($routeProvider, $locationProvider) {
>>>>>>> master
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
<<<<<<< HEAD
      .when('/detail-campaign/:campaign_id',{
         templateUrl: 'views/detail_campaign.html',
         controller: 'DetailCampaignCtrl'
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
=======
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
>>>>>>> master
      .otherwise({
        redirectTo: '/'
      });
  });
