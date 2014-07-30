angular.module("store")
    .constant("userSessionUrl", "http://localhost:8080/api/user/session")
    .constant("userLoginUrl", "http://localhost:8080/api/user/login")
    .constant("userExitUrl", "http://localhost:8080/api/user/exit")
    .constant("getProductUrl", "http://localhost:8080/api/get/products")
    .constant("orderUrl", "http://localhost:8080/products")
    .controller("storeController", function($scope, $http, $location, userSessionUrl, userExitUrl, getProductUrl, orderUrl, userLoginUrl) {

        //
        // Product
        //
        $scope.product = {};

        $scope.product.loading = true;

        $scope.product.get = function(id) {
            for (var i = 0; i < $scope.product.data.length; ++i) {
                if ($scope.product.data[i].id == id) {
                    return $scope.product.data[i];
                }
            }

            return null;
        };

        $scope.product.fetch = function() {
            $http.get(getProductUrl)
            .success(function(data) {
                $scope.product.data = data;
            }).error(function(error) {
                $scope.product.error = error;
            }).finally(function() {
                $scope.product.loading = false;
            });
        };

        $scope.product.fetch();
/*
        $scope.data = {
            products: [
                {id: 1, name: "DKNY钻石圈女表", description: "世界一流的品牌手表，只要998，你值得拥有！", category: "手表&首饰", price: 998, previewImageUrl: "res/img/1.gif"},
                {id: 2, name: "LV经典印花购物袋", description: "名牌包包，你懂的！", category: "手袋&包包", price: 2870, previewImageUrl: "res/img/2.gif"},
                {id: 3, name: "SWAROVSKI可爱手链", description: "小巧精致的手链", category: "手表&首饰", price: 110, previewImageUrl: "res/img/3.gif"},
                {id: 4, name: "简约电脑包", description: "简约、时尚的电脑包，男人的低调追求！", category: "手袋&包包", price: 130, previewImageUrl: "res/img/4.gif"}
            ]
        };
*/
        //
        // Register
        //
        $scope.register = {};
        $scope.register.loading = false;

        $scope.register.step = [
            "填写登陆信息",
            "完善个人资料",
            "注册成功"
        ];


        $scope.register.register = function() {
            if (!$("#register").form("validate form")) {
                return;
            }

            $scope.register.loading = true;

            console.log($scope.register);

            // finally
            $scope.register.loading = false;

            delete $scope.register.password;

            $scope.user.username = $scope.register.username;
            $scope.user.email = $scope.register.email;

            $location.path("/personalInformation")
        };

        //
        // Login
        //
        $scope.user = {};
        $scope.user.exist = false;
        $scope.user.loading = false;

        $scope.user.fromData = function(data) {
            $scope.user.exist = true;

            $scope.user.id = data.id;
            $scope.user.username = data.username;
            $scope.user.email = data.email;
            $scope.user.shipping = data.shipping;
            $scope.user.orders = data.orders;
            $scope.cart.items = data.cart.items;

            console.log($scope.user);
        };

        $scope.user.erase = function() {
            $scope.user.exist = false;
            delete $scope.user.id;
            delete $scope.user.username;
            delete $scope.user.password;
            delete $scope.user.email;
            delete $scope.user.shipping;
            delete $scope.user.orders;
            delete $scope.user.cart;
        };

        $scope.user.session = function() {
            $http.get(userSessionUrl)
            .success(function(data) {
                $scope.user.fromData(data);
            });
        };
        $scope.user.session();

        $scope.user.login = function() {
            if (!$("#login").form("validate form")) {
                return;
            }

            $scope.user.loading = true;

            delete $scope.user.error;

            var userInfo = {
                username: $scope.user.username,
                password: $scope.user.password
            };

            $scope.user.erase();

            $scope.user.username = userInfo.username;

            $http.get(userLoginUrl, {
                params: userInfo
            }).success(function(data) {
                $scope.user.fromData(data);

                $scope.order.data = data.order;

                $location.path("/products");
            }).error(function(error) {
                $scope.user.exist = false;
                $scope.user.error = error;
            }).finally(function() {
                $scope.user.loading = false;
            });
        };

        $scope.user.exit = function() {
            $http.post(userExitUrl);
            $scope.user.erase();
            $location.path("/products");
        };

        //
        // Cart
        //
        $scope.cart = {};

        $scope.cart.items = [];

        $scope.cart.addProduct = function(id) {
            var addedToExistingItem = false;
            var items = $scope.cart.items;
            for (var i = 0; i < $scope.cart.items.length; ++i) {
                if (items[i].product.id == id) {
                    items[i].count++;
                    addedToExistingItem = true;
                    break;
                }
            }
            if (!addedToExistingItem) {
                items.push({
                    product: $scope.product.get(id),
                    count: 1
                });
            }
        };

        $scope.cart.subProduct = function(id) {
            var items = $scope.cart.items;
            for (var i = 0; i < items.length; ++i) {
                if (items[i].product.id == id) {
                    items[i].count--;
                    if (items[i].count <= 0) {
                        items.splice(i, 1);
                    }
                    break;
                }
            }
        };

        $scope.cart.removeProduct = function(id) {
            var items = $scope.cart.items;
            for (var i = 0; i < items.length; ++i) {
                if (items[i].product.id == id) {
                    items.splice(i, 1);
                    break;
                }
            }
        };

        $scope.cart.total = function() {
            var items = $scope.cart.items;
            var total = 0;
            for (var i = 0; i < items.length; ++i) {
                total += (items[i].product.price * items[i].count);
            }
            return total;
        };

        //
        // Order
        //
        $scope.order = {};

        $scope.order.step = [
            "我的购物车",
            "确认订单信息",
            "提交订单"
        ];

        $scope.order.send = function(shippingDetails) {
            if (!$("#placeorder").form("validate form")) {
                return;
            }

            var order = angular.copy(shippingDetails);

            $http.post(orderUrl, order)
                .success(function(data) {
                    $scope.order.id = data.id;
                    $scope.cart.items.length = 0;
                })
                .error(function(error) {
                    $scope.order.error = error;
                })
                .finally(function() {
                    $location.path("/complete");
                });
        };
});