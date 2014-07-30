angular.module("store")
    .constant("productListActiveClass", "active")
    .constant("productListPageCount", 3)
    .controller("productListController", function($scope, $filter,
                                                  productListActiveClass,
                                                  productListPageCount) {
        //
        // Category
        //
        var selectedCategory = null;

        $scope.selectCategory = function(newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        };

        $scope.categoryFilterFn = function(product) {
            return selectedCategory == null || product.category == selectedCategory;
        };

        $scope.getCategoryActiveClass = function(category) {
            return category == selectedCategory ? productListActiveClass : "";
        };

        //
        // Page
        //
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

        $scope.pageCount = function() {
            var products = $scope.product.data;
            var data = [];
            for (var i = 0; i < products.length; ++i) {
                var product = products[i];
                if ($scope.categoryFilterFn(product)) {
                    data.push(product);
                }
            }
            return $filter("pageCount")(data, $scope.pageSize).length;
        };

        $scope.selectPage = function(newPage) {
            $scope.selectedPage = newPage;
        };

        $scope.prevPage = function() {
            if ($scope.selectedPage > 1) {
                $scope.selectPage($scope.selectedPage - 1);
            }
        };

        $scope.nextPage = function() {
            if ($scope.pageCount() > $scope.selectedPage) {
                $scope.selectPage($scope.selectedPage + 1);
            }
        };

        $scope.getPageActiveClass = function(page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        };

        //
        // Add to Cart
        //
        $scope.addProductToCart = function(product) {
            $scope.cart.addProduct(product.id);
        };
     });