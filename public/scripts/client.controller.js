'use strict';

angular.module('ngShopList', [])
    .controller('mainCtrl', ['$scope', '$http', 'clientService',
        function($scope, $http, clientService) {

            $scope.userInput = {};

            $http.get('/api/items')
                .success(function(data) {
                    $scope.items = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

            $scope.addItem = function() {
                $http.post('/api/items', $scope.userInput)
                    .success(function(data) {
                        $scope.userInput = {};
                        $scope.items = data;
                    })
                    .error(function(data) {
                        console.log('Error ' + data);
                    });
            };

            $scope.deleteItem = function(id) {
                $http.delete('/api/items/' + id)
                    .success(function(data) {
                        $scope.items = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            };
        }
    ]);
