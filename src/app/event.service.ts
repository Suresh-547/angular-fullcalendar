import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
@Injectable()
export class EventSesrvice {

    public getEvents(): Observable<any> {
        let eventData = JSON.parse(localStorage.getItem('eventData'));
        eventData.forEach((o, i) => {
            o.color = this.eventColor(o.type)
            o.start = new Date(o.start);
            o.end = new Date(o.end);
        });
        return Observable.of(eventData);
    }

    public newDate () {
        let dateObj = new Date();
        return dateObj;
    }

    public eventColor(type) {
        let color = type == 'Followup' ? '#5FA4DC' : type == 'Task' ? '#00BD9B' : type == 'Event' ? '#FCC938' : '';                     
        return color;
    }

    public saveLocalStorage(){
        var dateObj = new Date();
        let data: any = [{
            id:1,
            title: 'All Day Event',
            start: this.newDate().setDate(this.newDate().getDate()),
            end: this.newDate().setDate(this.newDate().getDate()+1)
        },
        {
            id:2,
            title: 'Long Event',
            start: this.newDate().setDate(this.newDate().getDate()+2),
            end: this.newDate().setDate(this.newDate().getDate()+3)
        },
        {
            id: 3,
            title: 'Repeating Event',
            start: this.newDate().setDate(this.newDate().getDate()+3),
            end: this.newDate().setDate(this.newDate().getDate()+3)
        },
       
        {
            id: 4,
            title: 'Repeating Event',
            start: this.newDate().setDate(this.newDate().getDate()+5),
            end: this.newDate().setDate(this.newDate().getDate()+9)
        },
        {
            id:5,
            title: 'Conference',
            start: this.newDate().setDate(this.newDate().getDate()-2),
            end: this.newDate().setDate(this.newDate().getDate()-1)
        },
        {
            id: 6,
            title: 'Repeating Event',
            start: this.newDate().setDate(this.newDate().getDate()+4),
            end: this.newDate().setDate(this.newDate().getDate()+4)
        }];


        let eventData = localStorage.getItem('eventData');
        if (!eventData) {
            localStorage.setItem('eventData', JSON.stringify(data));        
        }
    }
};
