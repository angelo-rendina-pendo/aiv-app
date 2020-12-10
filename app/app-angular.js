const AngularComponentA = {
    template: `
    <div>
        <div>This is an Angular page!</div>
        <ng-foo-button />
    </div>`
};

const AngularComponentB = {
    template: `
    <div>
        Another Angular page.
    </div>`
};

angular
.module(
    "aivApp",
    [ "ngRoute" ]
)
.config(
    [
        '$routeProvider',
        '$locationProvider',
        function config($routeProvider, $locationProvider) {
            $routeProvider
            .when('/angularA', AngularComponentA)
            .when('/angularB', AngularComponentB);

            $locationProvider.html5Mode(true);
        }
    ]
)
.component(
    "ngFooButton",
    {
        template: 'Angular component: <button ng-click="onClick()">Foo is {{ foo }}</button>',
        controller: function($scope) {
            this.$onInit = function() {
                this.fooWatch = $scope.$watch(
                    () => vuexStore.getters['foo'],
                    (value) => { $scope.foo = value; }
                );

                $scope.onClick = function() {
                    vuexStore.dispatch('increment');
                }
            }

            this.$onDestroy = function() {
                this.fooWatch();
            }
        }
    }
);
