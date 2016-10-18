/// <reference path="../../typings/tsd.d.ts" />

class PopupService {
  public $inject = ['$ionicPopup']

  constructor(public $ionicPopup) {

  }

  timeError() {
    let alertPopup = this.$ionicPopup.alert({
      title: 'Erro',
      template: '\'Horário Fim\' deve ser maior que o \'Horário Início\'',
      okText: 'Confirmar'
    })
    return alertPopup
  }

  deleteProperty(type, title) {
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Remover ' + type,
      template: 'Tem certeza que deseja remover \"' + title + '\" ?',
      cancelText: 'Cancelar',
      okText: 'Sim',
      okType: 'button-assertive',
    })
    return confirmPopup
  }

  deleteOwner(type, title) {
    let confirmPopup = this.$ionicPopup.confirm({
      title: 'Remover ' + type,
      template: 'Tem certeza que deseja remover ' + title + ' ?',
      cancelText: 'Cancelar',
      okText: 'Sim',
      okType: 'button-assertive',
    })
    return confirmPopup
  }
}


angular.module('app.services')
  .service('PopupService', PopupService)