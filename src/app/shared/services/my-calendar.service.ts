import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
@Injectable()
export class MyCalendarEvent {

    public getEvents() {
        let eventData = JSON.parse(localStorage.getItem('eventData'));
        eventData.forEach((o, i) => {
            o.color = this.eventColor(o.type)
            o.start = new Date(o.start);
            o.end = new Date(o.end);
        });
        return eventData;
    }

    public newDate () {
        let dateObj = new Date();
        return dateObj;
    }

    public eventColor(type) {
        let color = type == 'Followup' ? '#5FA4DC' : type == 'Task' ? '#00BD9B' : type == 'Event' ? '#FCC938' : '';                     
        return color;
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
              month: {
                displayEventTime: false
              }
      };
      return data;
    }    

    public saveLocalStorage(){

        let data: any = [{
                id: '1',
                start: this.newDate().setMinutes(this.newDate().getMinutes()),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+700),
                title: 'event 1'
            },
            {
                id: '2',
                start: this.newDate().setMinutes(this.newDate().getMinutes()+120),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+600),
                title: 'event 2'
            },
            {
                id: '3',
                start: this.newDate().setMinutes(this.newDate().getMinutes()+10),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+500),
                title: 'event 3'
            },
            {
                id: '4',
                start: this.newDate().setMinutes(this.newDate().getMinutes()+10),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+200),
                title: 'event 4'
            },
            {
                id: '5',
                start: this.newDate().setMinutes(this.newDate().getMinutes()+10),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+200),
                title: 'event 4'
            },
            {
                id: '6',
                start: this.newDate().getTime(),
                end: this.newDate().setMinutes(this.newDate().getMinutes()+90),
                title: 'Today Event'
            }];


        let eventData = localStorage.getItem('eventData');
        if (!eventData) {
            localStorage.setItem('eventData', JSON.stringify(data));        
        }
    }
};
