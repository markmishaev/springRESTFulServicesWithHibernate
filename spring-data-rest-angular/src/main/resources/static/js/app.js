var userManagerModule = angular.module('userManagerApp', ['ngAnimate']);

userManagerModule.controller('userManagerController', function ($scope,$http) {
	
	var urlBase="";
	$scope.ShowUsersList=true;
	$scope.AddUserToggle=false;
	$scope.UpdateUserToggle=false;
	$scope.DeleteUserToggle=false;
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
                for (var i = 0; i < $scope.users.length; i++) 
                {
                	console.log($scope.users[i]._links.self.href);
                	$scope.selection.push($scope.users[i]._links.self.href);
                }
                $scope.firstName="";
                $scope.lastName="";
                $scope.userId="";
                $scope.isActive=false;
                
                
                $scope.AddUserToggle=false;
                $scope.UpdateUserToggle=false;
                $scope.DeleteUserToggle=false;
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
          $scope.selection.forEach(function(userUri) 
		  {
              if (userUri != undefined) 
              {
            	  checkedUserId = userUri.substr(userUri.lastIndexOf('/') + 1);
            	  //console.log(userUri);
            	  //console.log("Checked User Id: " +  checkedUserId);
            	  //console.log("Selected User Id: " + $scope.userId);
            	  
            	  if(checkedUserId == $scope.userId)
            	  {
            		  console.log("Found the updated user." + checkedUserId + " " + $scope.userId);
	            	  
            		  $http.patch(userUri, { 
	                	  firstName: $scope.firstName,
	                      lastName: $scope.lastName,
	                      isActive: $scope.isActive});
            	  }
              }
          });
          alert("User Updated");
          getAllUsers();
   };
   
   //delete user
   $scope.deleteUser = function deleteUser() {
          $scope.selection.forEach(function(userUri) 
		  {
              if (userUri != undefined) 
              {
            	  checkedUserId = userUri.substr(userUri.lastIndexOf('/') + 1);
            	  
            	  if(checkedUserId == $scope.userId)
            	  {
            		  var idx = $scope.selection.indexOf(userUri);
            		  $scope.selection.splice(idx, 1);
            		  
            		  console.log("Found the deleted user." + checkedUserId + " " + $scope.userId);
	            	  
            		  $http.delete(userUri);
            	  }
              }
          });
          alert("User Deleted");
          getAllUsers();
   };
   
   
   //ShowAddUserPanel
   $scope.showAddUserPanel = function showAddUserPanel() 
   {        
		$scope.AddUserToggle=true;
		$scope.UpdateUserToggle=false;
		$scope.DeleteUserToggle=false;
		$scope.ShowUsersList = false;
   };
   
 //ShowUpdateUserPanel
   $scope.showUpdateUserPanel = function showUpdateUserPanel() 
   {        

		$scope.UpdateUserToggle=true;
		$scope.AddUserToggle=false;
		$scope.DeleteUserToggle=false;
		$scope.ShowUsersList = false;
   };
   
 //ShowDeleteUserPanel
   $scope.showDeleteUserPanel = function showDeleteUserPanel() 
   {        
	   $scope.DeleteUserToggle=true;
		$scope.UpdateUserToggle=false;
		$scope.AddUserToggle=false;
		$scope.ShowUsersList = false;
   };
   
   //ShowAllUsersPanel
   $scope.showAllUsersPanel = function showAllUsersPanel() 
   {        

	   	$scope.ShowUsersList = true;
		$scope.UpdateUserToggle=false;
		$scope.DeleteUserToggle=false;
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