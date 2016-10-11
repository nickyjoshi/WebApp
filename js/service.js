angular.module('App.Service',['App.Factory'])
.constant('API', 'http://test-routes.herokuapp.com')
.constant('headerContent',{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'})
.service('authService', ["$window", function($window){
    
    this.parseJWT = function(token){
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_','/');
        return JSON.parse($window.atob(base64));
    }

    this.saveToken = function(token){
            $window.localStorage['jwtToken'] = token;
        }

    this.getToken = function(token){
            return $window.localStorage['jwtToken'];
        }

    this.isAuthed = function() {
            var token = this.getToken();
            if (token){
                var params = this.parseJWT(token);
                console.log('CurrentTime:'+Math.round(new Date().getTime() / 1000));
                console.log('JWT expiry:' + params.exp);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            }else{
                return false;
            }
        }

        this.logout = function(){
            $window.localStorage.removeItem('jwtToken');
        }

}])
.service('userService', ["$http", "API", "headerContent", function($http, API, headerContent){

    this.getQuote = function(){
        return $http.get(API + '/auth/quote')
    }
    this.register = function(username, password){

        var data = "username="+username + "&password=" + password;
        var config = {headers : headerContent}
        var promiseObject = $http.post((API + '/auth/register'), data, config)
        return promiseObject;
    }
    this.login = function(username, password){
        var data = "username="+username + "&password=" + password;
        var config = {headers : headerContent}
        var promiseObject = $http.post((API + '/auth/login'), data, config)
        return promiseObject;
    }
}]);
