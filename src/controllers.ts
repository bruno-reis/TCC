/// <reference path="../typings/tsd.d.ts" />

class SubjectCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService']

  subject: any

  constructor(public $state,
              public $stateParams,
              public SubjectService) {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
  }

  addClass() {
    this.$state.go('root.subjectAddClass')
  }

  addExam() {
    this.$state.go('root.subjectAddExam')
  }

  addHomework() {
    this.$state.go('root.subjectAddHomework')
  }
}

class SubjectListCtrl {
  public $inject = ['$state', 'SubjectService']
  private subjects: Array<string>

  constructor(public $state,
              public SubjectService) {
    this.subjects = this.SubjectService.getSubjects()
  }

  selectSubject(subjectId) {
    this.$state.go('root.subject', {subjectId: subjectId})
  }

  addSubject() {
    this.$state.go('root.subjectAdd')
  }
}

class SubjectAddCtrl {
  public $inject = ['$state', 'SubjectService']
  private input

  constructor(public $state,
              public SubjectService) {
  }

  addSubject() {
    this.SubjectService.addSubject(this.input)
    this.$state.go('root.subjectList')
  }
}

angular.module('app.controllers', [])
  .controller('subjectCtrl', SubjectCtrl)

  .controller('subjectListCtrl', SubjectListCtrl)

  .controller('subjectAddCtrl', SubjectAddCtrl)

  .controller('subjectAddExamCtrl', function($scope) {

  })

  .controller('subjectAddHomeworkCtrl', function($scope) {

  })

  .controller('subjectAddClassCtrl', function($scope) {

  })
  
  .controller('activitiesCtrl', function($scope) {

  })

  .controller('scheduleCtrl',function($scope, Events){

    Events.loadEvents()

    var getToday=function(){
      var today=new Date()
      var year=today.getFullYear()
      var month=today.getMonth()+1
      var date=today.getDate()
      return month>10? year+'-'+month+'-'+date:year+'-0'+month+'-'+date
    }

    $scope.select_date=getToday()
    var getColorByTitle=function(title){
      if(title==='medicine'){
        return 'red'
      }
      else if(title==='cost'){
        return 'yellow'
      }
      else if(title==='examination'){
        return 'green'
      }
      else{
        return 'blue'
      }
    }
    $scope.events_in_select_date=Events.getEventsByDate($scope.select_date)

    $scope.eventSources={
      events:Events.getAllEvents().map(function(e){
        var temp={
          title:e.title,
          start:e.start,
          color:getColorByTitle(e.title)
        }
        return temp
      }),
      textColor: 'black'
    }

    $scope.alertEventOnClick=function(date,jsEvent,view){
      $scope.select_date=date.format()
      $scope.events_in_select_date=Events.getEventsByDate($scope.select_date)
    }

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'agendaDay',
          center: 'title',
          right: 'prev,next'
        },
        dayClick: $scope.alertEventOnClick,
      }
    }
  })
 