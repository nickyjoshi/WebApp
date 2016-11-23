angular.module('App.Config',['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('landing', {
        url : '',
        templateUrl : 'pages/landing.html'
    })
    $stateProvider.state('home', {
        url : '/home',
        templateUrl : 'pages/home.html'
    })
    $stateProvider.state('login', {
        url : '/login',
        templateUrl : 'pages/login.html'
    })
    $stateProvider.state('list', {
        url : '/list',
        templateUrl : 'pages/list.html'
    })
}]);