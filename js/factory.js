angular.module('App.Factory',[])
.factory("authInterceptor", ["API", "authService", function(API, auth){
        return {
            request: function(config){

                var token = auth.getToken();
                if(config.url.indexOf(API)===0 && token){
             
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },

            response: function(res){
                if(res.config.url.indexOf(API) === 0 && res.data.token){
                    auth.saveToken(res.data.token);
                }
                return res;
            }
        }
}])
.config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
});


