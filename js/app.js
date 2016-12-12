angular.module('wraf', ['ngResource', 'ngSanitize', 'wraf.controllers', 'wraf.directive', 'wraf.services','ui.router','ngTouch'])

.constant('siteInfo', {
    wpApiUrl: 'http://ottawazine.com/?json=',
    siteTitle: 'Ottawazine',
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  $stateProvider

  .state('main', {
    url: "/",
    templateUrl: 'tpl/main.html',
    controller: 'mainCtrl'
  })
  .state('services', {
    url: "/services",
    templateUrl: 'tpl/news.html',
    controller: 'tagCtrl'
  })  
  .state('news', {
    url: "/news",
    templateUrl: 'tpl/news.html',
    controller: 'tagCtrl'

  })
  .state('content', {
    url: "/news/:id/:theQquery/:page",
    templateUrl: 'tpl/content.html',
    controller: 'contentCtrl'

  })
  .state('mainContent', {
    url: "/news/:id/:page",
    templateUrl: 'tpl/content.html',
    controller: 'main_contentCtrl'

  })
  .state('about', {
    url: "/about",
    templateUrl: 'tpl/news.html',
    controller: 'tagCtrl'

  })
  .state('contact', {
    url: "/contact",
    templateUrl: 'tpl/news.html',
    controller: 'tagCtrl'

  })
  .state('origin', {
    url: "/origin",
    templateUrl: 'tpl/news.html',
    controller: 'tagCtrl'

  })
  .state('search', {
    url: "/search",
    templateUrl: 'tpl/search.html',
    controller: 'searchCtrl'

  })
  .state('searchContent', {
    url: "/search/:id/:keyword/:page",
    templateUrl: 'tpl/content.html',
    controller: 'search_contentCtrl'

  })
  ;

  $urlRouterProvider.otherwise('/');
/*
  $routeProvider
  .when('/',{
    templateUrl:'tpl/main.html',
    controller:'mainCtrl',
    activetab: 'main'
  })
  .when('/services',{
    templateUrl:'tpl/news.html',
    controller:'servicesCtrl',
    activetab: 'services'
  })
  .when('/news',{
    templateUrl:'tpl/news.html',
    controller:'newsCtrl',
    activetab: 'news'
  })

  .when('/news/:id/:theQquery/:page',{
    templateUrl:'tpl/content.html',
    controller:'contentCtrl'
  })
  .when('/news/:id/:page',{
    templateUrl:'tpl/content.html',
    controller:'main_contentCtrl'
  })
  .when('/about',{
    templateUrl:'tpl/news.html',
    controller:'aboutCtrl',
    activetab: 'about'
  })
  .when('/contact',{
    templateUrl:'tpl/news.html',
    controller:'contactCtrl',
    activetab: 'contact'
  })
  .when('/origin',{
    templateUrl:'tpl/news.html',
    controller:'originCtrl',
    activetab: 'origin'
  })

  .when('/search',{
    templateUrl:'tpl/search.html',
    controller:'searchCtrl',
    activetab: 'search'
  })
  .when('/search/:id/:keyword/:page',{
    templateUrl:'tpl/content.html',
    controller:'search_contentCtrl'
  })
  .otherwise({
    redirectTo:'/'
  })*/


})
