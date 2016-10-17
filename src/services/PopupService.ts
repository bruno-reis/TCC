/// <reference path="../../typings/tsd.d.ts" />

class PopupService {
  public $inject = ['$ionicPopup']

  constructor(public $ionicPopup) {

  }
  
  timeErrorPopup() {
    let alertPopup = this.$ionicPopup.alert({
      title: 'Erro',
      template: '\'Horário Fim\' deve ser maior que o \'Horário Início\'',
      okText: 'Confirmar'
    })
    return alertPopup
  }
}

angular.module('app.services')
  .service('PopupService', PopupService)