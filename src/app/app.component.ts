import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    data = {};
    calendarOptions: Options;
    displayEvent: any;    

    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    constructor(  
      protected eventService: EventSesrvice, 
      public dialog: MatDialog) { }

    ngOnInit() {   
      this.eventService.saveLocalStorage();
      this.eventService.getEvents().subscribe(data => {
        this.calendarOptions = {
          editable: true,
          eventLimit: false,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          events: data
        };
      });
    }

    addEvent() {

      this.dialog.open(DialogDataExampleDialog, {
        data: {
          title: "", 
          new:true,
          startDate:{value: new Date()}, 
          endDate: {value: new Date()}}
      });
    }



  eventClick(model: any) {
    
    let _endDate, _startDate;

    if (model.event.start) {_startDate = new FormControl(model.event.start._d); }
    if (model.event.end) {_endDate = new FormControl(model.event.end._d); }

    model = {event: {
      id: model.event.id, 
      start: model.event.start, 
      startDate: _startDate, 
      end: model.event.end, 
      endDate: _endDate ? _endDate : _startDate, 
      title: model.event.title, 
      allDay: model.event.allDay,
      type: model.event.type
    }, duration: {} }

    this.displayEvent = model;

    this.dialog.open(DialogDataExampleDialog, {
      data: model.event
    });    
  }


  eventResize(model: any, type: string) {
      model = {event: {id: model.event.id, start: model.event.start, end: model.event.end, title: model.event.title }, duration: {_data: model.duration._data } };

      this.displayEvent = model;
      let eventData = JSON.parse(localStorage.getItem('eventData'));

      
      eventData.forEach((o) => {

          if (o.id == model.event.id) {

              let start, end, _duration = model.duration._data, _event = model.event;
              let seconds = _duration.seconds, 
                  milliseconds = _duration.milliseconds,
                  minutes = _duration.minutes, 
                  hours = _duration.hours,
                  days = _duration.days;

                  start = o.start;
                  end = new Date(o.end);
                  end.setMilliseconds(end.getMilliseconds() + _duration.milliseconds);
                  end.setSeconds(end.getSeconds() + _duration.seconds);
                  end.setMinutes(end.getMinutes() + _duration.minutes);
                  end.setHours(end.getHours() + _duration.hours);

                  o.title = model.event.title;
                  o.start = start;
                  o.end = end;
          }
      });

      localStorage.setItem('eventData', JSON.stringify(eventData));
  }

  updateEvent(model: any, type: string) {

      model = {event: {id: model.event.id, start: model.event.start, end: model.event.end, title: model.event.title }, duration: {_data: model.duration._data } };

      this.displayEvent = model;
      let eventData = JSON.parse(localStorage.getItem('eventData'));

      
      eventData.forEach((o) => {

          if (o.id == model.event.id) {

              let start, end, _duration = model.duration._data, _event = model.event;
              let seconds = _duration.seconds, 
                  milliseconds = _duration.milliseconds,
                  minutes = _duration.minutes, 
                  hours = _duration.hours,
                  days = _duration.days,
                  months = _duration.months;

              if (!_event.end || _event.start._d.getTime() == _event.end._d.getTime()) {
                  end = _event.start._d.setMinutes(_event.start._d.getMinutes()+30)
              }
                  start = new Date(o.start);
                  start.setMilliseconds(start.getMilliseconds() + _duration.milliseconds);
                  start.setSeconds(start.getSeconds() + _duration.seconds);
                  start.setMinutes(start.getMinutes() + _duration.minutes);
                  start.setHours(start.getHours() + _duration.hours);
                  start.setDate(start.getDate() + _duration.days);
                  start.setMonth(start.getMonth() + _duration.months);

                  end = new Date(o.end);
                  end.setMilliseconds(end.getMilliseconds() + _duration.milliseconds);
                  end.setSeconds(end.getSeconds() + _duration.seconds);
                  end.setMinutes(end.getMinutes() + _duration.minutes);
                  end.setHours(end.getHours() + _duration.hours);
                  end.setDate(end.getDate() + _duration.days);
                  end.setMonth(end.getMonth() + _duration.months);                  

                  o.title = model.event.title;
                  o.start = start;
                  o.end = end;
          }
      });

      localStorage.setItem('eventData', JSON.stringify(eventData));

  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
}




@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./app.component.css']
})
export class DialogDataExampleDialog implements OnInit {

   calendarOptions: Options;   
   time = {};   

  constructor(    
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    protected eventService: EventSesrvice ) {}

    ngOnInit(){
    }

    closeDialog(): void {
      this.dialogRef.close();
    }    

    addUpdateEvent(addEvent) {

      let eventData = JSON.parse(localStorage.getItem('eventData'));

      if (addEvent) {
        let obj = {
          id: Date.now().toString(36)+"-"+Math.random().toString(36),
          title: addEvent.title,
          start: addEvent.startDate.value.getTime(),
          end: addEvent.endDate.value.getTime()
        };
        eventData.push(obj)
      }else{
        eventData.forEach((obj) => {
          if (obj.id == this.data.id) {

             let startDate = this.data.startDate.value,
              endDate = this.data.endDate.value;

              obj.title = this.data.title; 
              obj.start = this.data.startDate.value.getTime(); 
              obj.end = this.data.endDate.value.getTime();
              obj.type = this.data.type      
          }
        });        
      }

      localStorage.setItem('eventData', JSON.stringify(eventData));
      window.location.reload();    
  } 

  deleteEvent(id) {
    if(confirm("Are you sure to delete")) {
      let eventData = JSON.parse(localStorage.getItem('eventData'));
      eventData.forEach((o, i)=> {
        if (o.id == this.data.id) {
            eventData.splice(i, 1);
        }
      });
      localStorage.setItem('eventData', JSON.stringify(eventData));
      window.location.reload();      
    }
  }
}
