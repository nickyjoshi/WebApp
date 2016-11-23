angular.module('app',['App.Config','App.Service'])
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
    
    /*self.register = function() {
        user.register(self.username, self.password)
            .then(handleRequest, handleRequest)
     }*/

     self.register = function() {
        user.register(self.username, self.password)
            .then(function(result){
                self.message = "User registered successfully";
            })
            .catch(function(result){
                self.message = "User not registered successfully";
            })
     }


    self.getExercises = function() {
        exercise.getExercises()
        .then(function(result){
            //console.log('output is:' + result.data);
            var exercise1 = result.data[0];
            //console.log('exercise1 is ' + JSON.stringify(exercise1));
            $scope.exercises = result.data;
        })
        .catch(function(result){
            $scope.exercises = {};
        });
    }

    self.logout = function() {
        auth.logout && auth.logout()
    }

    self.isAuthed= function(){
           return auth.isAuthed ? auth.isAuthed() : false
    }
}]);

