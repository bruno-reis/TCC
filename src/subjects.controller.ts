/// <reference path="../typings/tsd.d.ts" />

class SubjectsCtrl {
  public $inject = ['$state', 'SubjectService', 'CalendarService']
  private subjects: Array<string>

  constructor(public $state,
              public CalendarService,
              public SubjectService) {
    this.subjects = this.SubjectService.getSubjects()
  }

  selectSubject(subjectId) {
    this.$state.go('subject.info', {subjectId: subjectId})
  }

  addSubject() {
    this.$state.go('subjects.add')
  }
  
  deleteSubject(subjectId) {
    this.SubjectService.deleteSubject(subjectId)
    this.CalendarService.deleteEvent(subjectId)
    this.$state.go('.^.list', {reload: true, inherit: false});
  }
}

angular.module('app.controllers')
  .controller('subjectsCtrl', SubjectsCtrl)

