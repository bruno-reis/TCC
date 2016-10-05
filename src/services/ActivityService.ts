/// <reference path="../../typings/tsd.d.ts" />

class ActivityService {
  private $inject = ['StorageService']

  private activityList:Array<any> = []
  private activities:Array<any> = []

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService) {
    let list = this.StorageService.get('activityList')
    if (list) this.activityList = list
    let data = this.StorageService.get('activities')
    if (data) this.activities = data
    console.log(this.StorageService.get('activities'))
  }

  update() {
    let data = this.StorageService.get('activities')
    if (data) this.activities = data
  }

  getActivities() {
    return this.activityList
  }

  addActivity(activity) {
    activity.id = this.activities.length + 1
    this.activityList.push(activity)
    this.StorageService.add('activitiesList', this.activityList)
    this.activities.push(activity)
    this.StorageService.add('activities', this.activities)
    this.update()
  }

  addClass(activityId, input) {
    input.id = this.activities[activityId].classes.length
    this.activities[activityId].classes.push(input)
    this.StorageService.add('activities', this.activities)
    this.update()
  }
}

angular.module('app.services')
  .service('ActivityService', ActivityService)
