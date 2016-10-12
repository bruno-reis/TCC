/// <reference path="../../typings/tsd.d.ts" />

class ActivityService {
  private $inject = ['StorageService']
  private activities = []

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService) {
    this.update()
  }

  update() {
    let data = this.StorageService.get('activities')
    if (data) this.activities = data
  }

  getActivities() {
    return this.activities
  }

  setActivities() {
    this.StorageService.add('activities', this.activities)
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
    activity.id = this.getNextId(this.activities, 1000)
    activity.days = []
    activity.startDate = new Date()
    this.activities.push(activity)
    this.StorageService.add('activities', this.activities)
    this.update()
  }

  addDay(activityId, input) {
    let activity = this.getActivity(activityId)
    input.id = this.getNextId(activity.days, 1)
    activity.days.push(input)
    this.StorageService.add('activities', this.activities)
    this.update()
  }
  
  deleteActivity(activityId) {
    let activities = this.activities.filter( ac => ac.id != activityId)
    this.StorageService.add('activities', activities)
    this.update()
  }
  
  deleteDay(activityId, dayId) {
    let activity = this.getActivity(activityId)
    activity.days = activity.days.filter( day => day.id != dayId)
    this.StorageService.add('activities', this.activities)
    this.update()
  }
}

angular.module('app.services')
  .service('ActivityService', ActivityService)
