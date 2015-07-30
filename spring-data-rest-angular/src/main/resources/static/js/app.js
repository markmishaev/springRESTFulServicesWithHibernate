var userManagerModule = angular.module('userManagerApp', ['ngAnimate']);

userManagerModule.controller('userManagerController', function ($scope,$http) {
	
	var urlBase="";
	$scope.ShowUsersList=true;
	$scope.AddUserToggle=false;
	$scope.UpdateUserToggle=false;
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
                
                $scope.AddUserToggle=false;
                $scope.UpdateUserToggle=false;;
                $scope.ShowUsersList=true;
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
	
   //update user
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
          alert("User Updated");
          getAllUsers();
   };
   
   //ShowAddUserPanel
   $scope.showAddUserPanel = function showAddUserPanel() 
   {        
		$scope.AddUserToggle=true;
		$scope.UpdateUserToggle=false;
		$scope.ShowUsersList = false;
   };
   
 //ShowUpdateUserPanel
   $scope.showUpdateUserPanel = function showUpdateUserPanel() 
   {        

		$scope.UpdateUserToggle=true;
		$scope.AddUserToggle=false;
		$scope.ShowUsersList = false;
   };
   
   //ShowAllUsersPanel
   $scope.showAllUsersPanel = function showAllUsersPanel() 
   {        

	   	$scope.ShowUsersList = true;
		$scope.UpdateUserToggle=false;
		$scope.AddUserToggle=false;
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