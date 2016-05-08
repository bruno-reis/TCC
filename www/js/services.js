/// <reference path="../typings/tsd.d.ts" />
angular.module('app.services', [])
    .factory('BlankFactory', [function () {
    }])
    .service('BlankService', [function () {
    }])
    .service('Events', function ($rootScope) {
    var events = [];
    return {
        loadEvents: function () {
            events = [{
                    title: 'medicine',
                    start: '2016-05-20'
                }, {
                    title: 'examination',
                    start: '2016-05-08'
                }, {
                    title: 'cost',
                    start: '2016-05-16'
                }, {
                    title: 'examination',
                    start: '2016-05-17'
                }];
            $rootScope.$broadcast('events_get');
        },
        getAllEvents: function () {
            return events;
        },
        getEventsByDate: function (date) {
            return events.filter(function (e) {
                return e.start === date;
            });
        }
    };
});
