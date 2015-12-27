	'use strict';
	var alert, prompt;
	
	angular.module('myApp', ["ngRoute"])
    	.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/home", {
				templateUrl: "home.html",
				controller:"home"
			})
			.when("/buy", {
				templateUrl: "buy.html",
				controller:"buy"
			})
			.when("/edit", {
				templateUrl: "edit.html",
				controller:"edit"
			})
			.when("/confirm", {
				templateUrl: "confirm.html",
				controller:"confirm"
			})
			.otherwise({
				redirectTo: "home.html" 
			});
		}])
		.factory("dataFactory",["$http", function( $http ){ 
			var products = [];
			var purchase = [];
			var id;
			var dataFactory = {};
			
			$http.get('list.json').success(function(data) {
			products = data;
			console.log(data);
		    }).error(function (err) {
			console.log("there is an error:" + err);
			});
		
		dataFactory.getProducts =  function(){
		 	return products;
		};
		dataFactory.setPurchase = function(pro){
			purchase.push(pro);
		};
		dataFactory.getPurchase = function(){
			return purchase;
		};
		dataFactory.getId = function(){
			id = Math.floor((Math.random() * 10000000) + 1);
			return id;
		};
		dataFactory.resetProducts = function(){
			
		angular.forEach(products, function(item) {
            item.quantity  =0;
        });
		
		}; 
		return dataFactory;
		
		
		}])
		.controller('Ctrl',["$scope", "dataFactory", function ($scope, dataFactory){
		$scope.products = dataFactory.getProducts();
		$scope.purchase = dataFactory.getPurchase();
		$scope.reset = function(){
			$scope.purchase=[];
			dataFactory.resetProducts();
		};
		}])
		.controller('home', ["$scope", "dataFactory", function ($scope, dataFactory){
		$scope.products = dataFactory.getProducts();
		$scope.addCart = function($index){
		var n = $scope.products[$index].name;
		var p = $scope.products[$index].price;
		var q = $scope.products[$index].quantity;
	    var pro={ "name":n, "quantity":q, "price":p};	
		if ( pro.quantity!==0){
			dataFactory.setPurchase(pro);
	      }
		 $scope.purchase = dataFactory.getPurchase();
		};
		
	}])
		.controller('buy', ["$scope", "dataFactory", function ($scope, dataFactory){
		$scope.purchase = dataFactory.getPurchase();
		$scope.removeItem = function(index) {
        $scope.purchase.splice(index, 1);
      };
	   
       $scope.total = function() {
        var total = 0;
        angular.forEach($scope.purchase, function(item) {
            total += item.quantity * item.price;
        });

        return total;
      };
	 	
	$scope.purchaseItem = function() {
		
		if ($scope.purchase.length ===0){
			
			alert("Make a purchase first");
			var x=prompt("you wanna make purchase, type 'Yes'");
			if (angular.lowercase(x) === "yes")
			{
				window.location = "index.html";
			} 
			else {
				alert("Thank you for visit");
			}
		} else{
			   $scope.id = dataFactory.getId();
		}
     
	    
	};
		}])
		.controller('edit', ["$scope", "dataFactory", function ($scope, dataFactory){
		$scope.purchase = dataFactory.getPurchase();
		$scope.removeItem = function(index) {
        $scope.purchase.splice(index, 1);
      };
	   
       $scope.total = function() {
        var total = 0;
        angular.forEach($scope.purchase, function(item) {
            total += item.quantity * item.price;
        });

        return total;
      };
		}])
		.controller('confirm', ["$scope", "dataFactory", function ($scope, dataFactory){
		$scope.purchase = dataFactory.getPurchase();
		$scope.id = dataFactory.getId();
		}]);