/// <reference path="../../typings/tsd.d.ts" />

class NotificationService {
  private $inject = ['$cordovaLocalNotification']

  private schedule
  private update

  constructor(public $cordovaLocalNotification) {
    let service = this
    ionic.Platform.ready(function() {
      service.schedule = function (notification) {
        if (ionic.Platform.isWebView())
          $cordovaLocalNotification.schedule(notification)
      }
      service.update = function (notification) {
        if (ionic.Platform.isWebView())
          $cordovaLocalNotification.update(notification)
      }
    })
  }

  createNotification(input, subject, inputTypeLabel) {
    let notification = this.getNotification(input, subject, inputTypeLabel, true)
    let notificationWeekBefore = this.getNotification(input, subject, inputTypeLabel, false)
    let today = new Date()
    let weekbeforeEvent = new Date(input.date)
    weekbeforeEvent.setDate(weekbeforeEvent.getDate() - 7)
    if (weekbeforeEvent > today) this.schedule(notificationWeekBefore)
    if(input.date > today) this.schedule(notification)
  }

  updateNotification(input, subject, inputTypeLabel) {
  }

  getNotification(input, subject, inputTypeLabel, today) {
    if (today) {
      return {
        id: subject.id + ":" + input.type + ":" + input.id + ":today",
        title: inputTypeLabel + " hoje!",
        text: input.title + " - " + subject.name 
          + " é hoje às " + input.startTime.getHours()
          + ":" + input.startTime.getMinutes(),
        at: new Date(input.date.getTime())
      }
    } else {
      let today = new Date()
      let weekbefore = new Date(input.date)
      weekbefore.setDate(weekbefore.getDate() - 7)
      weekbefore.setHours(input.startTime.getHours())
      weekbefore.setMinutes(input.startTime.getMinutes())
      return {
        id: subject.id + ":" + input.type + ":" + input.id + ":weekbefore",
        title: inputTypeLabel + " semana que vem!",
        text: input.title + " - " + subject.name 
          + " é semana que vem no dia" + input.startTime.getDate()
          + "/" + input.startTime.getMonth(),
        at: new Date(weekbefore.getTime())
      }
    }
  }
}

angular.module('app.services')
  .service('NotificationService', NotificationService)
