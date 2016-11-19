/// <reference path="../../typings/tsd.d.ts" />

class NotificationService {
  private $inject = ['StorageService', '$cordovaLocalNotification', '$rootScope']

  private schedule
  private edit
  private cancel
  private notifications

  constructor(public StorageService,
              public $cordovaLocalNotification,
              public $rootScope) {
    let service = this
    this.update()
    console.log($cordovaLocalNotification)
    ionic.Platform.ready(function() {
      service.schedule = function (notification) {
        if (ionic.Platform.isWebView()) {
          service.addNotification(notification)
          $cordovaLocalNotification.schedule(notification)
        }
      }
      service.edit = function (notification) {
        if (ionic.Platform.isWebView())
          $cordovaLocalNotification.update(notification)
      }

      service.cancel = function (notification) {
        if (ionic.Platform.isWebView())
          $cordovaLocalNotification.cancel(notification)
      }
      if (ionic.Platform.isWebView()) {
        $rootScope.$on("$cordovaLocalNotification:schedule", function(ev, notification, st) {
          console.log("Notificação criada")
        })

        $rootScope.$on("$cordovaLocalNotification:update", function(ev, notification, st) {
          console.log("Notificacao alterada")
        })

        $rootScope.$on("$cordovaLocalNotification:cancel", function(ev, notification, st) {
          console.log("Notificacao cancelada")
        })
      }
    })
  }

  update() {
    let data = this.StorageService.get("notifications")
    this.notifications = data ? data : []
  }

  getNextId() {
    return this.notifications.length + 1
  }

  addNotification(notification) {
    this.notifications.push(notification)
    this.StorageService.add("notifications", this.notifications)
    this.update()
  }

  createNotifications(input, subject, taskType) {
    let taskDate = this.getDateWithOffset(input.date, 0)
    taskDate.setHours(input.startTime.getHours())
    taskDate.setMinutes(input.startTime.getMinutes())
    let notificationAtTaskDate = this.getNotification(
      this.getNextId(),
      this.formatTitle(input, subject, taskType),
      this.formatText(input, subject, taskDate, false),
      input.date)
    this.schedule(notificationAtTaskDate)
    let oneWeekBeforeTaskDate = this.getDateWithOffset(taskDate, -7)
    let today = new Date()
    if (today < oneWeekBeforeTaskDate) {
      let notificationOneWeekBeforeTaskDate = this.getNotification(
        this.getNextId(),
        this.formatTitle(input, subject, taskType),
        this.formatText(input, subject, taskDate, true),
        oneWeekBeforeTaskDate)
      this.schedule(notificationOneWeekBeforeTaskDate)
    }
  }

  updateNotifications(input, subject, taskType) {
  }

  cancelNotifications(input, subject) {
  }

  getNotification(id, title, text, at) {
    return {
      id: id,
      title: title,
      text: text,
      at: at
    }
  }

  getDateWithOffset(date, offset) {
    let d = new Date(date)
    d.setDate(d.getDate() + offset)
    return d
  }

  formatText(input, subject, date, isNextWeek) {
    let text = input.title + " de " + subject.name + " é"
    text += isNextWeek ? " na próxima semana " : " hoje "
    text += "(" + this.formatDate(date, isNextWeek) + ")"
    return text
  }

  formatTitle(input, subject, taskType) {
    return taskType + " " + input.title + " de " + subject.name
  }

  formatDate(date, showDate) {
    let strDate
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? "0" + minutes : minutes
    strDate = showDate ?
                date.getDate() + "/" + date.getMonth()
                : date.getHours() + ":" + minutes
    return strDate
  }
}

angular.module('app.services')
  .service('NotificationService', NotificationService)
