console.log('hi')
console.log(window.location.pathname.slice(1, -5))

var app = angular.module('navList', []);

// app.controller("NavCtrl", function($scope, $location) {
//   $scope.menuClass = function(page) {
//     var current = $location.path().substring(0); 
//     return page === current ? "hovered-category" : "";
//   };
// });

app.controller('navCtrl', ['$scope', function ($scope) {
    $scope.navClass = function (page) {
        var currentRoute = window.location.pathname.slice(1, -5) || 'intro';
        return page === currentRoute ? 'hovered-category' : '';
    };        
}]);