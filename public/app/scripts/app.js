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
  ]);

  app.config(function ($routeProvider) {
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
      .when('/manage-group', {
        templateUrl: 'views/manage_group.html',
        controller: 'ManageGroupCtrl',
        activetab: 'manage-group'
      })
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
      .otherwise({
        redirectTo: '/'
      });
  });
