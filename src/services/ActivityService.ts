/// <reference path="../../typings/tsd.d.ts" />

class ActivityService {
  private $inject = ['StorageService']
  private activities

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService) {
    this.update()
  }

  update() {
    let data = this.StorageService.get('activities')
    this.activities = data ? data : []
    // console.log("activities", this.activities)
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

  getNextId(list, startValue) {
    //Get the id of the list last element and increase it by 1
    let nextId = (list.length > 0) ? list[list.length-1].id + 1 : startValue
    return nextId
  }

  addActivity(activity) {
    //Adding 1000 to differentiate activities IDs from subjects ones
    let today = new Date()
    activity.id = this.getNextId(this.activities, 1000)
    activity.days = []
    activity.startDate = today.getTime()
    activity.endDate = new Date().setMonth(today.getMonth() + parseInt(activity.duration, 10))
    this.activities.push(activity)
    this.storeActivities()
  }

  addDay(activityId, input) {
    let activity = this.getActivity(activityId)
    input.id = this.getNextId(activity.days, 1)
    input.type = "activity"
    activity.days.push(input)
    this.storeActivities()
  }
  
  addSingleActivity(activity, day, date) {
    activity.days = []
    day.type = "activity"
    day.id = this.getNextId(activity.days, 1)
    activity.days.push(day)

    activity.id = this.getNextId(this.activities, 1000)
    activity.type = "activity"
    activity.startDate = date.getTime()
    activity.endDate = date.getTime()
    this.activities.push(activity)
    this.storeActivities()
  }
  
  deleteActivity(activityId) {
    let activities = this.activities.filter( ac => ac.id != activityId)
    this.StorageService.add('activities', activities)
    this.update()
  }
  
  deleteDay(activityId, dayId) {
    let activity = this.getActivity(activityId)
    activity.days = activity.days.filter( day => day.id != dayId)
    this.storeActivities()
  }
}

angular.module('app.services')
  .service('ActivityService', ActivityService)
