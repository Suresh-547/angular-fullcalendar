import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { CalendarComponent } from 'ng-fullcalendar';
import { EventSesrvice } from './event.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    data = {};
    calendarOptions;
    displayEvent: any;    

    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

    constructor(protected eventService: EventSesrvice, public dialog: MatDialog) { }

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
          new: true,
          startDate: {value: new Date()}, 
          endDate: {value: new Date()}}
      });
    }



  eventClick(model: any) {
    
    let _startDate, _endDate;

    if (model.event.start) {_startDate = new FormControl(model.event.start._d)}

    if (model.event.end) {
      _endDate = new FormControl(model.event.end._d); 
    }else{
      _endDate = new FormControl(new Date(_startDate.value.getTime()));
    }

    model = {
      event: {
        id: model.event.id, 
        start: model.event.start, 
        startDate: _startDate, 
        end: model.event.end, 
        endDate: _endDate, 
        title: model.event.title, 
        allDay: model.event.allDay, 
        type: model.event.type 
      }, 
        duration: {} 
      }

    this.displayEvent = model;
    this.dialog.open(DialogDataExampleDialog, {
      data: model.event
    });    
  }


  eventResize(model: any, type: string) {

      model = this.initModel(model);
      this.displayEvent = model;
      let eventData = JSON.parse(localStorage.getItem('eventData'));

      eventData.forEach((o) => {
          if (o.id == model.event.id) {
              let start, end, _duration = model.duration._data;
                  start = o.start;
                  end = this.updateDate(o.end, _duration);
                  o.title = model.event.title;
                  o.start = start;
                  o.end = end;
          }
      });
      localStorage.setItem('eventData', JSON.stringify(eventData));
  }

  updateEvent(model: any, type: string) {

      model = this.initModel(model);

      this.displayEvent = model;
      let eventData = JSON.parse(localStorage.getItem('eventData'));

      eventData.forEach((o) => {

          if (o.id == model.event.id) {

              let start, end, _duration = model.duration._data, _event = model.event;
              if (!_event.end || _event.start._d.getTime() == _event.end._d.getTime()) {
                  end = _event.start._d.setMinutes(_event.start._d.getMinutes()+30)
              }
                  start = this.updateDate(o.start, _duration);              
                  end = this.updateDate(o.end, _duration);
                  o.title = model.event.title;
                  o.start = start;
                  o.end = end;
          }
      });
      localStorage.setItem('eventData', JSON.stringify(eventData));
  }

  updateDate(date, duration) {
    let _date = new Date(date);
    if (duration.milliseconds) _date.setMilliseconds(_date.getMilliseconds() + duration.milliseconds);
    if (duration.seconds) _date.setSeconds(_date.getSeconds() + duration.seconds);
    if (duration.minutes) _date.setMinutes(_date.getMinutes() + duration.minutes);
    if (duration.hours) _date.setHours(_date.getHours() + duration.hours);
    if (duration.days) _date.setDate(_date.getDate() + duration.days);
    if (duration.months) _date.setMonth(_date.getMonth() + duration.months);

    return _date;
  }

  initModel(model) {
    model = {
      event: {
        id: model.event.id, 
        start: model.event.start, 
        end: model.event.end, 
        title: model.event.title 
      }, 
      duration: {
        _data: model.duration._data 
      } 
    };
    return model
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

   calendarOptions;   
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
          end: addEvent.endDate.value.getTime(),
          color:  this.eventService.eventColor(addEvent.type)
        };
        window['addEvent'] =  obj;     
        eventData.push(obj)
      }else{
        eventData.forEach((obj) => {
          if (obj.id == this.data.id) {

             let startDate = this.data.startDate.value,
              endDate = this.data.endDate.value;

              obj.title = this.data.title; 
              obj.color = this.eventService.eventColor(this.data.type); 
              obj.start = this.data.startDate.value.getTime(); 
              obj.end = this.data.endDate.value.getTime();
              obj.type = this.data.type;
              window['updatedEvent'] =  obj;     
          }
        });        
      }

      localStorage.setItem('eventData', JSON.stringify(eventData));
      window['_customUpdate'] = 1;
      let cal = new CalendarComponent(window['element'], window['zone']);
      cal.ngAfterViewInit();         
  } 

  deleteEvent(id) {
    if(confirm("Are you sure to delete")) {
      let eventData = JSON.parse(localStorage.getItem('eventData'));
      eventData.forEach((o, i)=> {
        if (o.id == this.data.id) {
            window['deleteObjById'] =  o.id;  
            eventData.splice(i, 1);
        }
      });
      localStorage.setItem('eventData', JSON.stringify(eventData));
      window['_customUpdate'] = 1;
      let cal = new CalendarComponent(window['element'], window['zone']);
      cal.ngAfterViewInit();  
      this.closeDialog();   
    }
  }
}