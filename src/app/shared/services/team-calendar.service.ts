import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import { Constants } from "./constants";


@Injectable()
export class MyTeamCalendarEvent {


    //@ team calendar object
    public calendarObject(_this) {
        let _ths = this;
        return {
            editable: true,
            scrollTime: '00:00',
            schedulerLicenseKey: Constants.SCHEDULER_LICENSE_KEY,
            header: _ths.getHeader(),
            defaultView: 'timelineDay',
            height: 640,
            views: _ths.getViews(),
            refetchResourcesOnNavigate: true,
            resourceAreaWidth: "15%",
            groupByResource: false,
            resourceLabelText: "Resources",
            resourceOrder: '-title',
            events(start, end, timezone, callback) {
                callback(_ths.getTeamEvents(_this.filterEvn));
            },
            resources(callback) {
                callback(_ths.getTeamResourceData(_this.filterRes));
            },
            resourceRender(resource, cellEls) {
                cellEls.on('click', () => {
                    alert(resource.title);
                });
            },
            viewRender(view) {
                _this.calendarTitle = view.title;
            },
            eventClick(calEvent, jsEvent, view) {
                _this.editEvent(calEvent);
            },
            eventResize(event, delta, revertFunc) {
                _this.resizeEvent(event);
            },
            eventDrop(event, delta, revertFunc) {
                _this.eventDrop(event);
            },
            dayClick(date, jsEvent, view) {
                _this.addEvent(date);
            }
        }
    }

    public getTeamEvents(filter) {

        //@ fetch data from localstorage
        //@ In real scenario this will come from API
        let data = JSON.parse(localStorage.getItem('teamEventData'));

        //@ convert timestamp to date object
        data.forEach((o, i, obj) => {

            if (typeof o.start == 'number') {
                o.start = new Date(o.start)
            }

            if (typeof o.end == 'number') {
                o.end = new Date(o.end)
            }

        });

        //@ filter events
        if (filter) {
            let regEx = new RegExp(filter, 'i');
            data = data.filter(r =>  r.title.match(regEx));
        }

        return data;
    }

    public getTeamResourceData(filter) {

        //@ fetch data from localstorage
        //@ In real scenario this will come from API
        var data = JSON.parse(localStorage.getItem('teamResourceData'));

        //@ filter resources
        if (filter) {
            let regEx = new RegExp(filter, 'i');
            data = JSON.parse(localStorage.getItem('teamResourceData'));
            data = data.filter(r =>  r.title.match(regEx));
        }

        return data;
    }


    public getViews() {

        //@ customize views
        let data = {
            timelineThreeDays: {
              type: 'agenda',
              duration: { days: 3 },
              groupByResource: true
            },
            timelineThreeDaysH: {
              type: 'timeline',
              duration: { days: 3 },
              groupByResource: true
            },
              month: {
                displayEventTime: false,
              }                
          };
      return data;
    }

    public getHeader() {

        //@ header for calendar 
        //@ we have added custom header 
        //@ so passing blank empty
        let data = {
                left: '',
                right: ''
              };
        return data;
    }
    //@ common method to get current date
    public newDate () {
        let dateObj = new Date();
        return dateObj;
    }

    public saveLocalStorage() {

        //@ save events data
        //@ In real scenario this will come from API        
        if (!localStorage.getItem('teamEventData')) {
            localStorage.setItem('teamEventData', JSON.stringify(this.eventData()));
        }

        //@ save resource data
        //@ In real scenario this will come from API        
        if (!localStorage.getItem('teamResourceData')) {
            localStorage.setItem('teamResourceData', JSON.stringify(this.resourceData()));
        }
    }

    public eventData () {

        //@ demo event data 
        //@ In real scenario this will come from API        
        let data: any = [{
                id: '1',
                resourceId: 'b',
                start: this.newDate().setMinutes(this.newDate().getMinutes()),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+700),
                title: 'event 1'
            },
            {
                id: '2',
                resourceId: 'c',
                start: this.newDate().setMinutes(this.newDate().getMinutes()+120),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+600),
                title: 'event 2'
            },
            {
                id: '3',
                resourceId: 'd',
                start: this.newDate().setMinutes(this.newDate().getMinutes()+10),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+500),
                title: 'event 3'
            },
            {
                id: '4',
                resourceId: 'e',
                start: this.newDate().setMinutes(this.newDate().getMinutes()+10),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+200),
                title: 'event 4'
            },
            {
                id: '5',
                resourceId: 'e',
                start: this.newDate().setMinutes(this.newDate().getMinutes()+10),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+200),
                title: 'event 4'
            },
            {
                id: '6',
                resourceId: 'a',
                start: this.newDate().getTime(),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+90),
                title: 'Today Event'
            }
        ];
        return data;
    }

    private resourceData () {

        //@ demo resource data 
        //@ In real scenario this will come from API 
                
        let data: any = [{
                id: 'a',
                title: 'Jitendra Rajput'
            },
            {
                id: 'b',
                title: 'Ashish John',
                
            },
            {
                id: 'c',
                title: 'Raj Kumar',
                
            },
            {
                id: 'd',
                title: 'Ashish Gupta'
            },
            {
                id: 'e',
                title: 'Ankit Sharma'
            },
            {
                id: 'f',
                title: 'Sunil Kharbash'
            },
            {
                id: 'G',
                title: 'Mohd Monis'
            },
            {
                id: 'h',
                title: 'Renil'
            },
            {
                id: 'i',
                title: 'Nitin Pathak'
            },    
            {
                id: 'j',
                title: 'Shubhan Singh'
            }                                                                                   
        ];

        return data;
    }
};