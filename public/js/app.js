var dhcpApp = angular.module('dhcpApp', [
  'ngRoute',
  'dhcpAppControllers',
  'dhcpAppServices'
]);

dhcpApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
      templateUrl: '../partials/overview.html',
      controller: 'OverviewCtrl'
    }).
      otherwise({
      redirectTo: '/'
    });
  }]);
