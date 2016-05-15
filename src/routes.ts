/// <reference path="../typings/tsd.d.ts" />

angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('root', {
        url: '/root',
        templateUrl: 'templates/app.html',
        abstract:true
      })

      .state('root.calendar', {
        url: '/calendar',
        views: {
          'calendar': {
            templateUrl: 'templates/calendar.html',
            controller: 'scheduleCtrl'
          }
        }
      })

      .state('root.subjectList', {
        url: '/subject-list',
        views: {
          'subjectList': {
            templateUrl: 'templates/subject-list.html',
            controller: 'subjectsCtrl as vm'
          }
        }
      })

      .state('root.subjectAdd', {
        url: '/subject-add',
        views: {
          'subjectList': {
            templateUrl: 'templates/subject-add.html',
            controller: 'subjectAddCtrl as vm'
          }
        }
      })

      .state('subject', {
        url: '/subject/:subjectId',
        template: '<ion-view id="subjetcInfo"> <ion-nav-view></ion-nav-view> </ion-view>',
        abstract: true
      })

      .state('subject.info', {
        url: '/',
        templateUrl: 'templates/subject.html',
        controller: 'subjectCtrl as vm'
      })

      .state('subject.addClass', {
        url: '/add-class',
        templateUrl: 'templates/subject-add-class.html',
        controller: 'subjectAddClassCtrl as vm'
      })

      .state('subject.addExam', {
        url: '/add-exam',
        templateUrl: 'templates/subject-add-exam.html',
        controller: 'subjectAddExamCtrl as vm'
      })

      .state('subject.addHomework', {
        url: '/add-homework',
        templateUrl: 'templates/subject-add-homework.html',
        controller: 'subjectAddHomeworkCtrl as vm'
      })

      .state('activities', {
        url: '/activities',
        templateUrl: 'templates/activities.html',
        controller: 'activitiesCtrl as vm'
      })

    $urlRouterProvider.otherwise('/root/calendar')
  });