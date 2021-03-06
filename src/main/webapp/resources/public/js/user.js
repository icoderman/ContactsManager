(function() {
    var app = angular.module('userApp', ['common', 'spring-security-csrf-token-interceptor']);

    app.controller('RegisterUserCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.registerUser = function () {
            console.log('Registering user with email: ' + $scope.vm.email + ' and password: ' + $scope.vm.password);

            $scope.vm.submitted = true;

            if ($scope.form.$invalid) {
                return;
            }

            var postData = {
                email: $scope.vm.email,
                plainTextPassword: $scope.vm.password
            };

            $http({
                method: 'POST',
                url: '/user',
                data: postData,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain"
                }
            })
            .then(function (response) {
                if (response.status == 200) {
                    $scope.login($scope.vm.email, $scope.vm.password);
                }
                else {
                    $scope.vm.errorMessages = [];
                    $scope.vm.errorMessages.push({description: response.data});
                    console.log("failed user creation: " + response.data);
                }
            });
        }
    }]);

    app.controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.onLogin = function () {
            console.log('Attempting login with email ' + $scope.vm.email + ' and password ' + $scope.vm.password);

            $scope.vm.submitted = true;

            if ($scope.form.$invalid) {
                return;
            }

            $scope.login($scope.vm.email, $scope.vm.password);
        };
    }]);

})();