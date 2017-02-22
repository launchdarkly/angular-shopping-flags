'use strict';

// App Module: the name AngularStore matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var storeApp = angular.module('AngularStore', ['ngRoute', 'ngAnimate', 'ngDialog']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/store', {
        templateUrl: 'partials/store.htm',
        controller: storeController 
      }).
      when('/products/:productSku', {
        templateUrl: 'partials/product.htm',
        controller: storeController
      }).
      when('/cart', {
        templateUrl: 'partials/shoppingCart.htm',
        controller: storeController
      }).
      otherwise({
        redirectTo: '/store'
      });
}]);

// create a data service that provides a store and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
storeApp.factory('DataService', function () {

    // create store
    var myStore = new store();

    // create shopping cart
    var myCart = new shoppingCart('AngularStore');

    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart
    };
});

// create a service which initializes the LaunchDarkly client
storeApp.factory('LaunchDarklyService', ['$q', '$rootScope', function($q, $rootScope) {
  var initLD = function () {
    var deferred = $q.defer();
    var ldclient = LDClient.initialize(
      'YOUR-ENVIRONMENT-KEY', 
      {key:'test', anonymous:true})
    ldclient.on('ready', function () {
      deferred.resolve(ldclient)
    })
    return deferred.promise
  }
  return {initLD: initLD }
}])
