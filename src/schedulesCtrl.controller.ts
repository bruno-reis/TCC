/// <reference path="../typings/tsd.d.ts" />

class schedulesCtrl {
  public $inject = ['$stateParams', '$state', 'ScheduleService', 'PopupService']
  private input

    constructor(public $state,
                public $stateParams,
                public ScheduleService,
                public PopupService) {
      this.input = this.ScheduleService.getCriteria()
    }

    submit() {
      if (this.input.minStudyTime > this.input.maxStudyTime) {
        this.PopupService.customError('\'Horário Máximo\' deve ser maior que \'Horário Mínimo\'')
        return
      }
      this.ScheduleService.saveCriteria(this.input)
    }
}

angular.module('app.controllers')
  .controller('schedulesCtrl', schedulesCtrl)
