var userManagerModule = angular.module('userManagerApp', ['ngAnimate']);

userManagerModule.controller('userManagerController', function ($scope,$http) {
	
	var urlBase="";
	$scope.toggle=true;
	$scope.selection = [];
	$http.defaults.headers.post["Content-Type"] = "application/json";

    function getAllUsers() {
        //get all tasks and display initially
        $http.get(urlBase + '/users').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.users = data._embedded.users;
                } else {
                    $scope.users = [];
                }
                for (var i = 0; i < $scope.users.length; i++) {
                	$scope.selection.push($scope.users[i].id);
                }
                $scope.firstName="";
                $scope.lastName="";
                $scope.isActive=false;
                $scope.toggle='!toggle';
            });
    }

    getAllUsers();

	//add a new user
	$scope.addUser = function addUser() {
		if($scope.firstName=="" || $scope.lastName==""){
			alert("Insufficient Data! Please provide user details");
		}
		else{
		 $http.post(urlBase + '/users', {
             firstName: $scope.firstName,
             lastName: $scope.lastName,
             isActive: $scope.isActive
         }).
		  success(function(data, status, headers) {
			 alert("User added");
             var newUserUri = headers()["location"];
             console.log("GET " + newUserUri);
             getAllUsers();
		    });
		}
	};	
	
	// update user
	   $scope.updateUser = function updateUser() {
	          $scope.selection.forEach(function(userUri) {
	              if (userUri != undefined) {
	            	  console.log(userUri);
	                  $http.patch(userUri, { 
	                	  firstName: $scope.firstName,
	                      lastName: $scope.lastName,
	                      isActive: $scope.isActive});
	              }
	          });
	          alert("Successfully Archived");
	          getAllUsers();
	   };
	
});

userManagerModule.directive('ngConfirmClick', [
	function(){
         return {
             link: function (scope, element, attr) {
                 var msg = attr.ngConfirmClick || "Are you sure?";
                 var clickAction = attr.confirmedClick;
                 element.bind('click',function (event) {
                     if ( window.confirm(msg) ) {
                         scope.$eval(clickAction);
                     }
                 });
             }
         };
 }]);