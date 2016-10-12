/// <reference path="../../typings/tsd.d.ts" />

class ActivityService {
  private $inject = ['StorageService']

  private activityList = []
  private activities = []

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService) {
    let list = this.StorageService.get('activityList')
    if (list) this.activityList = list
    let data = this.StorageService.get('activities')
    if (data) this.activities = data
  }

  update() {
    let data = this.StorageService.get('activities')
    if (data) this.activities = data
  }

  getActivities() {
    return this.activities
  }

  storeActivities() {
    this.StorageService.add('activities', this.activities)
    this.update()
  }

  getActivity(activityId) {
    //Using filter instead of array index bc indexes would change after delete
    let activity =  this.activities.filter( ac => ac.id == activityId)
    return activity[0]
  }

  addActivity(activity) {
    //Adding 1000 to differentiate activities IDs from subjects ones
    activity.id = (this.activities.length) + 1000
    this.activityList.push(activity)
    this.StorageService.add('activitiesList', this.activityList)
    activity.days = [{}]
    activity.startDate = new Date()
    this.activities.push(activity)
    this.storeActivities()
  }

  addDay(activityId, input) {
    let activity = this.getActivity(activityId)
    input.id = activity.days.length
    activity.days.push(input)
    this.storeActivities()
  }
  
}

angular.module('app.services')
  .service('ActivityService', ActivityService)
