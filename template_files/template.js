app.controller("MenuCtrl", function($scope, $location) {
  $scope.menuClass = function(page) {
    var current = $location.path().substring(0); 
    return page === current ? "hovered-category" : "";
  };
});