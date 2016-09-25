/// <reference path="../../typings/tsd.d.ts" />

class StorageService {

  constructor() {}

  add(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data))
  }

  get(key) {
    let data = JSON.parse( window.localStorage.getItem(key))
    return data
  }
}

angular.module('app.services')
  .service('StorageService', StorageService)