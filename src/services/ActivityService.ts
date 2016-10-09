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
    return this.activities
  }

  getActivity(activityId) {
    return this.activities[activityId]
  }

  addActivity(activity) {
    //Adding 1000 to differentiate activities IDs from subjects ones
    activity.id = (this.activities.length + 1) + 1000
    this.activityList.push(activity)
    this.StorageService.add('activitiesList', this.activityList)
    activity.days = [{}]
    activity.startDate = new Date()
    console.log("a: ", activity)
    this.activities.push(activity)
    this.StorageService.add('activities', this.activities)
    this.update()
  }

  addDay(activityId, input) {
    input.id = this.activities[activityId].days.length
    this.activities[activityId].days.push(input)
    this.StorageService.add('activities', this.activities)
    this.update()
  }
  
}

angular.module('app.services')
  .service('ActivityService', ActivityService)
