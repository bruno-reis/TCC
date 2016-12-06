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

  dateError() {
    let alertPopup = this.$ionicPopup.alert({
      title: 'Erro',
      template: '\'Data Fim\' deve ser maior que a \'Data Início\'',
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

  duplicateNameError(name) {
    let alertPopup = this.$ionicPopup.alert({
      title: 'Erro',
      template: 'Nome \"' + name +  '\" já existe.',
      okText: 'Confirmar'
    })
    return alertPopup
  }

  duplicateDateError() {
    let alertPopup = this.$ionicPopup.alert({
      title: 'Erro',
      template: 'Já existe um evento nesse dia e horário.',
      okText: 'Confirmar'
    })
    return alertPopup
  }
}


angular.module('app.services')
  .service('PopupService', PopupService)