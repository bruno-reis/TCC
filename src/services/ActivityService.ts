/// <reference path="../../typings/tsd.d.ts" />

class ActivityService {
  private $inject = ['StorageService']

  private activityList: Array<any> = []
  private activitys: Array<any> = []

  //Creating a dummy empty object because we are using the index as an index
  constructor(public StorageService) {
    let list = this.StorageService.get('activitysList')
    if (list) this.activityList = list
    let data = this.StorageService.get('activitys')
    if (data) this.activitys = data
    console.log(this.StorageService.get('activitys'))
  }

  update() {
    let data = this.StorageService.get('activitys')
    if (data) this.activitys = data
  }