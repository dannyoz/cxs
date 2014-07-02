.controller('header', ['$scope', '$http', 'mainPage', function ($scope, $http, mainPage) {

	// Check to see if feed has loaded
    $scope.$watch(function(){
        $scope.isLoading = mainPage.isLoading
    })

    $scope.navItems = ['Your Score','User View','Data View','Expert View','About','Tips']

}])
