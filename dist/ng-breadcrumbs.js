/**
<<<<<<< HEAD
 * ng-breadcrumb.js - v0.4.1 - A better AngularJS service to help with breadcrumb-style navigation between views
 * Based on https://github.com/angular-app/angular-app/blob/master/client/src/common/services/breadcrumbs.js
=======
 * ng-breadcrumb.js - v0.3.0 - A better AngularJS service to help with
 * breadcrumb-style navigation between views
>>>>>>> 271ce2e0106589f2f4e6e2faa38aa04810823252
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
(function(angular) {
  'use strict';

  angular
    .module('ng-breadcrumbs', [])
    .factory('breadcrumbs', [
      '$rootScope',
      '$location',
      '$route',
      function ($rootScope, $location, $route) {
        var BreadcrumbService = {
          breadcrumbs: [],
          get: function(options) {
            this.options = options || this.options;
            if (this.options) {
              for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                  for (var index in this.breadcrumbs) {
                    if (this.breadcrumbs.hasOwnProperty(index)) {
                      var breadcrumb = this.breadcrumbs[index];
                      if (breadcrumb.label === key) {
                        breadcrumb.label = this.options[key];
                      }
                    }
                  }
                }
              }
            }
            return this.breadcrumbs;
          },
          generateBreadcrumbs: function() {
            var routes = $route.routes,
                _this = this,
                params,
                pathElements,
                pathObj = {},
                path = '',
                originalPath = '',
                param;

            if ($route && $route.current && $route.current.originalPath) {
              this.breadcrumbs = [];
              params = $route.current.params;
              pathElements = $route.current.originalPath.trim().split('/');

              // Necessary to get rid of of duplicate empty string on root path
              if (pathElements[1] === '') {
                delete pathElements[1];
              }

              angular.forEach(pathElements, function(pathElement, index) {
                param = pathElement[0] === ':' &&
                        typeof params[pathElement
                          .slice(1, pathElement.length)] !== 'undefined' ?
                        params[pathElement.slice(1, pathElement.length)] :
                        false;

                pathObj[index] = {
                  path: param || pathElement,
                  originalPath: pathElement
                };

                path = Object
                  .keys(pathObj)
                  .map(function(k) { return pathObj[k].path;  })
                  .join('/') || '/';

                originalPath = Object
                  .keys(pathObj)
                  .map(function(k) { return pathObj[k].originalPath;  })
                  .join('/') || '/';

                if (routes[originalPath] &&
                    (routes[originalPath].label || param) &&
                    !routes[originalPath].excludeBreadcrumb) {
                  _this.breadcrumbs.push({
                    path: path,
                    originalPath: originalPath,
                    label: routes[originalPath].label || param,
                    param: param
                  });
                }
              });
            }
          }
        };

<<<<<<< HEAD
        if (pathElements[1] === '') {
          pathElements.splice(1, 1);
        }

        this.breadcrumbs = [];
        angular.forEach(pathElements, function(el) {
          path += path === '/' ? el : '/' + el;
          var route = getRoute(path);
          if (route) {
            self.breadcrumbs.push(route);
          }
=======
        // We want to update breadcrumbs only when a route is actually changed
        // as $location.path() will get updated immediately (even if route
        // change fails!)
        $rootScope.$on('$routeChangeSuccess', function() {
          BreadcrumbService.generateBreadcrumbs();
>>>>>>> 271ce2e0106589f2f4e6e2faa38aa04810823252
        });

        $rootScope.$watch(
          function() { return BreadcrumbService.options; },
          function() {
            BreadcrumbService.generateBreadcrumbs();
          }
        );

        BreadcrumbService.generateBreadcrumbs();

        return BreadcrumbService;
      }
    ]);
})(angular);
