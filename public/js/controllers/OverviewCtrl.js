angular.module('dhcpAppControllers').controller('OverviewCtrl',
  ['$scope', 'Leases', function($scope, Leases) {
    $scope.leases = ['asdf', 'qwer', 'zvcv', 'ente'];
    Leases.query(function(res) {
      $scope.leases = res;
    });

    $scope.predicate = 'bindingState';
    $scope.sort = function(column) {
      $scope.predicate = column;
      $scope.reverse = !$scope.reverse;
    };

    $scope.activeLeases = function() {
      return $scope.leases.filter(function(lease) {
        return lease.bindingState === 'active';
      }).length;
    };
  }]);
