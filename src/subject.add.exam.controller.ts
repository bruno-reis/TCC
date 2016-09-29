/// <reference path="../typings/tsd.d.ts" />

class subjectAddExamCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService']

  private input

  constructor(public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService) {
    this.input = {}
    this.input.weight = 1
  }

  submit() {
    this.CalendarService.createEvent(this.input)
    this.SubjectService.addExam(this.$state.params['subjectId'], this.input)
    this.SubjectService.update()
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectAddExamCtrl', subjectAddExamCtrl)

