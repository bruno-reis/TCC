/// <reference path="../../typings/tsd.d.ts" />

class ModalService {
  private $inject = ['$ionicModal']
  private modals


  constructor(public $ionicModal) {
    this.modals = {}
  }

  createModal($scope, templateUrl, modalName) {
    let modals = this.modals
    this.$ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      modals[modalName] = modal;
    });
  }

  showModal(modalName) {
    this.modals[modalName].show();
  }

  closeModal(modalName) {
    this.modals[modalName].hide();
  }
}

angular.module('app.services')
  .service('ModalService', ModalService)