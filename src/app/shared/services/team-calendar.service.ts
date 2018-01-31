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

        console.log(data);
        return data;
    }

    public getTeamResourceData() {
        let data = JSON.parse(localStorage.getItem('teamResourceData'));
        return data;
    }

    public getHeader() {
        let data = {
                left: '',
                center: 'title',
                right: ''
              };
        return data;
    }

    public getViews() {
        let data = {
        timelineThreeDays: {
          type: 'timeline',
          duration: { days: 3 }
        },
        month: {
            // eventLimit: 3
        }
      };

      return data;
    }

    public newDate () {
        let dateObj = new Date();
        dateObj.setMinutes(dateObj.getMinutes()+ 330);
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
                start: new Date(this.newDate().setMinutes(this.newDate().getMinutes())),
                end: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+700)),
                title: 'event 1'
            },
            {
                id: '2',
                resourceId: 'c',
                start: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+120)),
                end: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+600)),
                title: 'event 2'
            },
            {
                id: '3',
                resourceId: 'd',
                start: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+10)),
                end: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+500)),
                title: 'event 3'
            },
            {
                id: '4',
                resourceId: 'e',
                start: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+10)),
                end: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+200)),
                title: 'event 4'
            },
            {
                id: '5',
                resourceId: 'f',
                start: this.newDate(),
                end: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+120)),
                title: 'event 5'
            },
            {
                id: '6',
                resourceId: 'a',
                start: this.newDate(),
                end: new Date(this.newDate().setMinutes(this.newDate().getMinutes()+90)),
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
                eventColor: 'green'
            },
            {
                id: 'c',
                title: 'Raj Kumar',
                eventColor: 'orange'
            },
            {
                id: 'd',
                title: 'Ashish Gupta',
                eventColor: '#9C6649'
            },
            {
                id: 'e',
                title: 'Ankit Sharma'
            },
            {
                id: 'f',
                title: 'Sunil Kharbash',
                eventColor: 'red'
            },
            {
                id: 'G',
                title: 'Monis',
                eventColor: 'red'
            },
            {
                id: 'h',
                title: 'Renil',
                eventColor: 'red'
            }                        
        ];

        return data;
    }
};