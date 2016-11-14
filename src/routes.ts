/// <reference path="../typings/tsd.d.ts" />

angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('root', {
        url: '/root',
        templateUrl: 'templates/app.html',
        abstract:true
      })

      .state('calendar', {
        url: '/calendar',
        templateUrl: 'templates/calendar.html',
        controller: 'CalendarDemoCtrl'
      })

      .state('subjects', {
        url: '/subjects',
        template: '<ion-view id="subjectsList"> <ion-nav-view></ion-nav-view> </ion-view>',
        abstract: true
      })

      .state('subjects.list', {
        url: '/list',
        templateUrl: 'templates/subject-list.html',
        controller: 'subjectsCtrl as vm'
      })

      .state('subjects.add', {
        url: '/add',
        templateUrl: 'templates/subject-add.html',
        controller: 'subjectAddCtrl as vm'
      })

      .state('subject', {
        url: '/subject/:subjectId',
        template: '<ion-view id="subjetcInfo"> <ion-nav-view></ion-nav-view> </ion-view>',
        abstract: true
      })

      .state('subject.info', {
        url: '/info',
        templateUrl: 'templates/subject.html',
        controller: 'subjectCtrl as vm'
      })

      .state('subject.info.class', {
        url: "/class",
        views: {
          'class': {
            templateUrl: "templates/subject-class.html",
            controller: 'subjectCtrl as vm'
          }
        }
      })

      .state('subject.addClass', {
        url: '/add-class',
        templateUrl: 'templates/subject-add-class.html',
        controller: 'subjectAddClassCtrl as vm'
      })
      
      .state('subject.info.exams', {
        url: "/exams",
        views: {
          'exams': {
            templateUrl: "templates/subject-exams.html",
            controller: 'subjectCtrl as vm'
          }
        }
      })

      .state('subject.info.homework', {
        url: "/homework",
        views: {
          'homework': {
            templateUrl: "templates/subject-homework.html",
            controller: 'subjectCtrl as vm'
          }
        }
      })

      .state('subject.info.grades', {
        url: "/grades",
        views: {
          'grades': {
            templateUrl: "templates/subject-grades.html",
            controller: 'subjectCtrl as vm'
          }
        }
      })

      .state('subject.addExam', {
        url: '/add-exam',
        templateUrl: 'templates/subject-add-exam.html',
        controller: 'subjectAddExamCtrl as vm'
      })

      .state('subject.editExam', {
        url: '/exam/:examId',
        templateUrl: 'templates/subject-edit-exam.html',
        controller: 'subjectEditExamCtrl as vm'
      })

      .state('subject.addHomework', {
        url: '/add-homework',
        templateUrl: 'templates/subject-add-homework.html',
        controller: 'subjectAddHomeworkCtrl as vm'
      })

      .state('subject.editHomework', {
        url: '/homework/:homeworkId',
        templateUrl: 'templates/subject-edit-homework.html',
        controller: 'subjectEditHomeworkCtrl as vm'
      })

      .state('subject.editFinalGrade', {
        url: '/edit-finalGrade',
        templateUrl: 'templates/subject-edit-finalgrade.html',
        controller: 'subjectEditFinalGradeCtrl as vm'
      })

      .state('activities', {
        url: '/activities',
        template: '<ion-view id="activitiesList"> <ion-nav-view></ion-nav-view> </ion-view>',
        abstract: true
      })

      .state('activities.list', {
        url: '/list',
        templateUrl: 'templates/activity-list.html',
        controller: 'activitiesCtrl as vm'
      })

      .state('activities.add', {
        url: '/add',
        templateUrl: 'templates/activity-add.html',
        controller: 'activitiesAddCtrl as vm'
      })

      .state('activity', {
        url: 'activity/:activityId',
        template: '<ion-view id="activity"> <ion-nav-view></ion-nav-view> </ion-view>',
        abstract: true
      })

      .state('activity.info', {
        url: '/info',
        templateUrl: 'templates/activity-info.html',
        controller: 'activitiesInfoCtrl as vm'
      })

      .state('activity.addDay', {
        url: '/day/',
        templateUrl: 'templates/activity-add-day.html',
        controller: 'activitiesAddDayCtrl as vm'
      })

      .state('nextEvents', {
        url: '/nextEvents',
        templateUrl: 'templates/nextEvents.html',
        controller: 'nextEventsCtrl as vm'
      })

      .state('grades', {
        url: '/grades',
        templateUrl: 'templates/grades.html',
        controller: 'gradesCtrl as vm'
      })

    $urlRouterProvider.otherwise('/subjects/list')
  });