import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Injectable()
export class MyTeamCalendarEvent {

    public getTeamEvents() {
        let data = JSON.parse(localStorage.getItem('teamEventData'));
        data.forEach((o) => {
            if (typeof o.start == 'number') {
                o.start = new Date(o.start)
            }

            if (typeof o.end == 'number') {
                o.end = new Date(o.end)
            }
        });

        return data;
    }

    public getTeamResourceData() {
        let data = JSON.parse(localStorage.getItem('teamResourceData'));
        return data;
    }

    public getHeader() {
        let data = {
                left: '',
                center: '',
                right: ''
              };
        return data;
    }

    public getViews() {
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
            // groupByResource: true
          }                
      };
      return data;
    }

    public newDate () {
        let dateObj = new Date();
        // dateObj.setMinutes(dateObj.getMinutes()+ 330);
        return dateObj;
    }

    public saveLocalStorage() {

        if (!localStorage.getItem('teamEventData')) {
            localStorage.setItem('teamEventData', JSON.stringify(this.eventData()));
        }

        if (!localStorage.getItem('teamResourceData')) {
            localStorage.setItem('teamResourceData', JSON.stringify(this.resourceData()));
        }
    }

    public eventData () {
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