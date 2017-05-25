console.log('hi')
var page = window.location.pathname.split("/").pop(-1)
var category = page.slice(0,-5)

var app = angular.module('navList', []);

// app.controller("NavCtrl", function($scope, $location) {
//   $scope.menuClass = function(page) {
//     var current = $location.path().substring(0); 
//     return page === current ? "hovered-category" : "";
//   };
// });

app.controller('navCtrl', ['$scope', function ($scope) {
    $scope.navClass = function (page) {
        var currentRoute = category || 'intro';
        return page === currentRoute ? 'hovered-category' : '';
    };        
}]);