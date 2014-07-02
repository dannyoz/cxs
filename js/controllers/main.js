.controller('main', ['$scope', '$http', 'mainPage', function ($scope, $http, mainPage) {

	// Check to see if feed has loaded
    $scope.$watch(function(){
        $scope.isLoading  = mainPage.isLoading
        $scope.percentage = mainPage.dataAverage
        $scope.figure = Math.round($scope.percentage/2)
    })


    console.log('main controller')

}])
