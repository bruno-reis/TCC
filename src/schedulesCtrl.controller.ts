/// <reference path="../typings/tsd.d.ts" />

class schedulesCtrl {
  public $inject = ['$stateParams', '$state', 'ScheduleService', 'PopupService']
  private input

    constructor(public $state,
                public $stateParams,
                public ScheduleService,
                public PopupService) {
      this.input = this.ScheduleService.getCriteria()
      if (typeof this.input == "object") {
        this.input.weeklyStudyTime = this.input.weeklyStudyTime / 60
      }
    }

    submit() {
      if (this.input.minStudyTime > this.input.maxStudyTime) {
        this.PopupService.customError('\'Horário Máximo\' deve ser maior que \'Horário Mínimo\'')
        return
      }
      // convert weeklyStudyTime from hours to minutes
      this.input.weeklyStudyTime = this.input.weeklyStudyTime * 60
      this.ScheduleService.saveCriteria(this.input)
      this.ScheduleService.createSchedule(0)
      this.$state.go(".^.calendar")
    }
}

angular.module('app.controllers')
  .controller('schedulesCtrl', schedulesCtrl)
