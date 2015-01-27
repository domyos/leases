angular.module('dhcpAppControllers').controller('OverviewCtrl',
  ['$scope', 'Leases', function($scope, Leases) {
    $scope.leases = ['asdf', 'qwer', 'zvcv', 'ente'];
    Leases.query(function(res) {
      $scope.leases = res;
    });

    $scope.predicate = 'hardwareEthernet';
    $scope.reverse = false;

    $scope.sort = function(column) {
      if ($scope.predicate === column) {
        $scope.reverse = !$scope.reverse;
      } else {
        $scope.predicate = column;
        $scope.reverse = false;
      }
    };

    $scope.activeLeases = function() {
      return $scope.leases.filter(function(lease) {
        return lease.bindingState === 'active';
      }).length;
    };

    $scope.selected = function(column) {
      return $scope.predicate === column;
    };
  }]);
