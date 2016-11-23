/// <reference path="../../typings/tsd.d.ts" />

class subjectEditHomeworkCtrl {
  public $inject = ['$stateParams', '$state', 'SubjectService', 'PopupService', 'NotificationService']
  private input
  private subject
  private subjectId
  private homeworkId

  constructor(public $state,
              public $stateParams,
              public SubjectService,
              public PopupService,
              public CalendarService,
              public NotificationService) {
    this.homeworkId = this.$state.params['homeworkId']
    this.subjectId = this.$state.params['subjectId']
    this.subject = this.SubjectService.getSubject(this.subjectId)
    this.input = this.SubjectService
                  .getSubjectProperty(this.subjectId, this.homeworkId, 'homeworks')
    this.input.date = new Date(this.input.date)
    this.input.startTime = new Date(this.input.startTime)
    this.input.endTime = new Date(this.input.endTime)
  }

  submit() {
    if (this.SubjectService.validateTime(this.input) == false) return
    this.SubjectService.editSubjectProperty(this.subjectId, "homeworks", this.input)
    this.CalendarService.editChildEvent(this.subjectId, this.homeworkId, this.input)
    this.NotificationService.updateNotifications(this.input, this.subject, "Trabalho")
    this.$state.go('.^.info.homework')
  }

  delete() {
    this.SubjectService.deleteSubjectProperty(this.subjectId, "homeworks", this.homeworkId)
    this.CalendarService.deleteChildEvent(this.subjectId, this.homeworkId)
    this.NotificationService.cancelNotifications(this.input, this.subject)
    this.$state.go('.^.info.homework', this.$stateParams, {reload: true, inherit: false});
  }

  showConfirm() {
    this.PopupService.deleteProperty('Trabalho', this.input.title)
      .then( (res) => {if (res) this.delete() })
  }

}

angular.module('app.controllers')
  .controller('subjectEditHomeworkCtrl', subjectEditHomeworkCtrl)

