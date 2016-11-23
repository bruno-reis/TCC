/// <reference path="../../typings/tsd.d.ts" />

class NotificationService {
  private $inject = ['StorageService', '$cordovaLocalNotification', '$rootScope']

  private schedule
  private edit
  private cancel
  private notifications
  private nextId

  constructor(public StorageService,
              public $cordovaLocalNotification,
              public $rootScope) {
    let service = this
    this.update()
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

      service.cancel = function (notifications) {
        if (ionic.Platform.isWebView())
          $cordovaLocalNotification.cancel(notifications)
      }
      if (ionic.Platform.isWebView()) {
        console.log($cordovaLocalNotification.getAll())
        $rootScope.$on("$cordovaLocalNotification:schedule", function(ev, notification, st) {
          console.log("Notificação criada")
          console.log($cordovaLocalNotification.getAll())
        })

        $rootScope.$on("$cordovaLocalNotification:update", function(ev, notification, st) {
          console.log("Notificacao alterada")
          console.log($cordovaLocalNotification.getAll())
        })

        $rootScope.$on("$cordovaLocalNotification:cancel", function(ev, notification, st) {
          console.log("Notificacao cancelada")
          console.log($cordovaLocalNotification.getAll())
        })
      }
    })
  }

  update() {
    let data = this.StorageService.get("notifications")
    this.notifications = data ? data : []
    data = parseInt(this.StorageService.get("notifications.nextId"))
    this.nextId = data ? data : 0
  }

  getNextId() {
    this.nextId += 1
    return this.nextId
  }

  addNotification(notification) {
    this.notifications.push(notification.data)
    this.storeNotifications()
  }

  storeNotifications() {
    this.StorageService.add("notifications", this.notifications)
    this.StorageService.add("notifications.nextId", this.nextId)
    this.update()
  }

  createNotifications(input, subject, taskType) {
    let today = new Date()
    let taskDate = this.getDateWithOffset(input.date, 0)
    taskDate.setHours(input.startTime.getHours())
    taskDate.setMinutes(input.startTime.getMinutes())
    if (today > taskDate) return
    let notificationAtTaskDate = this.getNotification(
      this.getNextId(),
      this.formatTitle(input, subject, taskType),
      this.formatText(input, subject, taskDate, false),
      input.date,
      input,
      subject)
    this.schedule(notificationAtTaskDate)
    let oneWeekBeforeTaskDate = this.getDateWithOffset(taskDate, -7)
    if (today < oneWeekBeforeTaskDate) {
      let notificationOneWeekBeforeTaskDate = this.getNotification(
        this.getNextId(),
        this.formatTitle(input, subject, taskType),
        this.formatText(input, subject, taskDate, true),
        oneWeekBeforeTaskDate,
        input,
        subject)
      this.schedule(notificationOneWeekBeforeTaskDate)
    }
  }

  updateNotifications(input, subject, taskType) {
    this.cancelNotifications(input, subject)
    this.createNotifications(input, subject, taskType)
  }


  cancelNotifications(input, subject) {
    let notificationIds = this.searchNotifications(input, subject)
    this.notifications = this.notifications.filter(n => {
      return notificationIds.indexOf(n.notificationId) < 0
    })
    this.storeNotifications()
    this.cancel(notificationIds)
  }

  searchNotifications(input, subject) {
    let notifications = this.notifications.filter(n => {
      return n.ownerId == subject.id
              && n.taskType == input.type
              && n.taskId == input.id
    })
    notifications = notifications.map(n => {
      return n.notificationId
    })
    return notifications
  }

  getNotification(id, title, text, at, input, subject) {
    return {
      id: id,
      title: title,
      text: text,
      at: at,
      icon: 'file://img/icon_notify.png',
      data: {
        notificationId: id,
        ownerId: subject.id,
        taskType: input.type,
        taskId: input.id
      }
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
