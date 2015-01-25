angular.module('dhcpAppServices').service('Leases', ['$resource',
  function($resource) {
    return $resource('/api/leases');
  }]);
