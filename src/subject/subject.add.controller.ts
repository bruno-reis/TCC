/// <reference path="../../typings/tsd.d.ts" />

class SubjectAddCtrl {
  public $inject = ['$state', 'SubjectService', 'StorageService']
  private input

  constructor(public $state,
              public SubjectService,
              public StorageService) {
  }

  addSubject() {
    if (this.SubjectService.validateDate(this.input) == false) return
    this.SubjectService.addSubject(this.input)
    this.$state.go('subjects.list')
  }
}

angular.module('app.controllers')
  .controller('subjectAddCtrl', SubjectAddCtrl)
