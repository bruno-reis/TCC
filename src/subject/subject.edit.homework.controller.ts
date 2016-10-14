/// <reference path="../../typings/tsd.d.ts" />

class subjectEditHomeworkCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'CalendarService']
  private input
  private subjectId
  private homeworkId

  constructor(public $state,
              public $stateParams,
              private CalendarService,
              public SubjectService) {
    this.subjectId = this.$state.params['subjectId']
    this.homeworkId = this.$state.params['homeworkId']
    this.input = this.SubjectService.getSubjectProperty(this.subjectId, this.homeworkId, "homeworks")
    this.input.date = new Date(this.input.date)
    this.input.startTime = new Date(this.input.startTime)
    this.input.endTime = new Date(this.input.endTime)
  }

  submit() {
    this.SubjectService.editSubjectProperty(this.subjectId, "homeworks", this.input)
    this.CalendarService.editChildEvent(this.subjectId, this.homeworkId, this.input)
    this.$state.go('.^.info')
  }
}

angular.module('app.controllers')
  .controller('subjectEditHomeworkCtrl', subjectEditHomeworkCtrl)

