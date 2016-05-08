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
            controller: 'subjectListCtrl'
          }
        }
      })

      .state('root.subject', {
        url: '/subject',
        views: {
          'subjectList': {
            templateUrl: 'templates/subject.html',
            controller: 'subjectCtrl'
          }
        }
      })

      .state('root.subjectAdd', {
        url: '/subject-add',
        views: {
          'subjectList': {
            templateUrl: 'templates/subject-add.html',
            controller: 'subjectAddCtrl'
          }
        }
      })

      .state('root.subjectAddExam', {
        url: '/subeject-add-exam',
        views: {
          'subjectList': {
            templateUrl: 'templates/subject-add-exam.html',
            controller: 'subjectAddExamCtrl'
          }
        }
      })

      .state('root.subjectAddHomework', {
        url: '/subject-add-homework',
        views: {
          'subjectList': {
            templateUrl: 'templates/subject-add-homework.html',
            controller: 'subjectAddHomeworkCtrl'
          }
        }
      })

      .state('activities', {
        url: '/activities',
        templateUrl: 'templates/activities.html',
        controller: 'activitiesCtrl'
      })

    $urlRouterProvider.otherwise('/root/calendar')
  });