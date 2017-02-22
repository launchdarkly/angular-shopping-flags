'use strict';

// the storeController contains three objects:
// - store: contains the product list
// - cart: the shopping cart object
// - discount: the current discount applied to every item in the store, served by LaunchDarkly feature flags
function storeController($scope, $rootScope, $routeParams, DataService, LaunchDarklyService, ngDialog) {
    // get store and cart from service
    $scope.store = DataService.store;
    $scope.cart = DataService.cart;

    // initialize the LaunchDarkly client  
    if($rootScope.ldclient===undefined) {
        LaunchDarklyService.initLD().then(ldclient => {
            $rootScope.ldclient = ldclient
            $scope.discount = $rootScope.ldclient.variation('store-discount')
            // listen for changes in the store-discount feature flag, and update the discount accordingly
            $rootScope.ldclient.on('change', function () {
                ngDialog.open({ template: 'modal.html', className: 'ngdialog-theme-default', scope: $scope})
                $scope.discount = $rootScope.ldclient.variation('store-discount')
                $scope.$apply()
            })
        })
    }
    else {
        $scope.discount = $rootScope.ldclient.variation('store-discount')
    }
    // use routing to pick the selected product
    if ($routeParams.productSku != null) {
        $scope.product = $scope.store.getProduct($routeParams.productSku);
    }
}