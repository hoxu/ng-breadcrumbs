/**
 * ng-breadcrumb.js - v0.0.5 - A better AngularJS service to help with breadcrumb-style navigation between views
 * Based on https://github.com/angular-app/angular-app/blob/master/client/src/common/services/breadcrumbs.js
 *
 * @author Ian Kennington Walter (http://www.ianvonwalter.com)
 */
angular
  .module('ng-breadcrumbs', [])
  .factory('breadcrumbs', ['$rootScope', '$location', '$route', function ($rootScope, $location, $route) {
    var BreadcrumbService = {
      breadcrumbs: [],
      get: function() {
        if (this.options) {
          var self = this;
          for (var key in this.options) {
            if (this.options.hasOwnProperty(key)) {
              angular.forEach(self.breadcrumbs, function(breadcrumb) {
                if (breadcrumb.label === key) {
                  breadcrumb.label = self.options[key];
                }
              });
            }
          }
        }
        return this.breadcrumbs;
      },
      generateBreadcrumbs: function() {
        var routes = $route.routes,
          pathElements = $location.path().split('/'),
          path = '',
          self = this;

        var getRoute = function(route) {
          var param;
          angular.forEach($route.current.params, function(value, key) {
            var re = new RegExp(value);
            if (re.test(route)) {
              param = value;
            }
            route = route.replace(re, ':' + key);
          });
          return { path: route, param: param };
        };

        if (pathElements[1] === '') {
          delete pathElements[1];
        }

        this.breadcrumbs = [];
        angular.forEach(pathElements, function(el) {
          path += path === '/' ? el : '/' + el;
          var route = getRoute(path);
          if (routes[route.path]) {
            var label = routes[route.path].label || route.param;
            self.breadcrumbs.push({ label: label, path: path });
          }
        });
      }
    };

    // We want to update breadcrumbs only when a route is actually changed
    // as $location.path() will get updated immediately (even if route change fails!)
    $rootScope.$on('$routeChangeSuccess', function() {
      BreadcrumbService.generateBreadcrumbs();
    });

    return BreadcrumbService;
  }]);