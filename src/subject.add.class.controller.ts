/// <reference path="../typings/tsd.d.ts" />

class subjectAddClassCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService']

  private input
  private subject

  constructor(public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService) {
  }

  submit() {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
    this.CalendarService.createClassEvents(this.input, this.subject.startDate, this.subject.endDate, this.subject.name)
    this.SubjectService.addClass(this.$state.params['subjectId'], this.input)
    this.SubjectService.update()
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectAddClassCtrl', subjectAddClassCtrl)
