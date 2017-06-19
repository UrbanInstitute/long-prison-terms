var page = window.location.pathname.split("/").pop(-1)
var category = page.slice(0,-5)

var app = angular.module('navList', ["ngRoute"]);


app.controller('navLeftCtrl', ['$scope', function ($scope) {
    $scope.navClassMobile = function (page) {
        var currentRoute = category || 'intro'; 
        return page === currentRoute ? 'hovered-category-mobile' : ''; console.log(page);
    }; 

}]);

app.controller('navCtrl', ['$scope', function ($scope) {
    $scope.navClass = function (page) {
        var currentRoute = category || 'intro';
        return page === currentRoute ? 'hovered-category' : '';
    }; 

}]);


app.controller('navRightCtrl', ['$scope', function ($scope) {
    $scope.pageName = category;
    return $scope.pageName;
    // function () {
    //     var currentRoute = category || 'intro';
    //     return currentRoute;
    // };        
}]);



// app.config(function($routeProvider) {
//   $routeProvider
//     .when('/demographics.html', {template: 'demographics.html', controller: DemographicsCtrl})
//     .when('/consequences.html', {template: 'consequences.html', controller: ConsequencesCtrl});
// });

