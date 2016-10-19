/// <reference path="../typings/tsd.d.ts" />

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ui.calendar', 'ui.rCalendar'])

  angular.module('app.directives', [])

  angular.module('app.services', [])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.tabs.position('top');
  })