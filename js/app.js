angular.module('app',['App.Service'])
.controller('Main', ["userService", "authService", function(user, auth){

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

    self.logout = function() {
        auth.logout && auth.logout()
    }

    self.isAuthed= function(){
           return auth.isAuthed ? auth.isAuthed() : false
    }
}]);

