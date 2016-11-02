angular.module('app',['App.Service', 'ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home', {
        url : '',
        templateUrl : 'pages/home.html'
    })
    $stateProvider.state('list', {
        url : '/list',
        templateUrl : 'pages/list.html'
    })
}])
.controller('Main', ["userService", "authService", "exerciseService", "$scope", function(user, auth, exercise, $scope){

   var self = this;

    function handleRequest(res){
        var token = res.data ? res.data.token : null;
        if(token){
            console.log('JWT:', token);
            //Persist the token to LocalStorage
            auth.saveToken(token);
        }
        self.message = res.data.message;
    }

    self.login = function(){
        user.login(self.username, self.password)
            .then(handleRequest, handleRequest);
    }
    
    self.register = function() {
        user.register(self.username, self.password)
            .then(handleRequest, handleRequest)
     }

    self.getQuote = function() {
        user.getQuote()
        .then(handleRequest, handleRequest)
    }

    /*self.getExercises = function() {
        exercise.getExercises()
        .then(handleRequest, handleRequest)
    }*/
    self.getExercises = function() {
        exercise.getExercises()
        .then(function(result){
            //$scope.states = result.data;
            console.log('output is:' + result.data);
            var exercise1 = result.data[0];
            console.log('exercise1 is ' + JSON.stringify(exercise1));
            $scope.exercises = result.data;
        });
        
        
        console.log('output is:' + handleRequest.data);
    }

    self.logout = function() {
        auth.logout && auth.logout()
    }

    self.isAuthed= function(){
           return auth.isAuthed ? auth.isAuthed() : false
    }
}]);

