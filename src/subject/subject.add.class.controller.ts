/// <reference path="../../typings/tsd.d.ts" />

class subjectAddClassCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService']
  private input
  private subject

  constructor(public $state,
              public $stateParams,
              public SubjectService,
              public CalendarService) {
    this.subject = this.SubjectService.getSubject(this.$state.params['subjectId'])
    this.input = {}
    this.input.day = '1'
  }

  submit() {
    if (this.SubjectService.validateTime(this.input) == false) return
    if (this.SubjectService.checkSubjectClassTime(this.subject.id, this.input)) return
    this.SubjectService.addSubjectProperty(this.$state.params['subjectId'], "classes", this.input)
    this.CalendarService.createMultipleEvents(this.input, this.subject)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectAddClassCtrl', subjectAddClassCtrl)
