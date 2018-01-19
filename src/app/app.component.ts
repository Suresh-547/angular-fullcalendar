import { Component, OnInit, ViewChild, Inject,  ElementRef } from '@angular/core';
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
    selectedView = "m";
    calendarOptions;
    displayEvent: any;  
 

    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

    constructor(
      protected eventService: EventSesrvice,
      public dialog: MatDialog,
      private elRef:ElementRef) { }

    ngOnInit() {   

      this.eventService.saveLocalStorage();
      this.eventService.getEvents().subscribe(data => {
        this.calendarOptions = {
          editable: true,
          eventLimit: false,
          header: {
            left: '',
            center: 'title',
            right: ''
          },
          events: data,
          views: {
              month: {
                displayEventTime: false
              }
          }
        };
      });

      setTimeout(()=> {
        document.querySelector('tbody').addEventListener('click', this.addEvent.bind(this));
      }, 500)
    }

    addEvent(){

      let isOpened = document.getElementsByClassName('mat-dialog-container');
      if (isOpened.length == 0) {
        let data  = {
            title: "", 
            new: true,
            startDate: {value: new Date()}, 
            endDate: {value: new Date()}        
        }
        this.openDialog(data);
      }
    }


  todayView() {
    this.changeView(new Date());
  }

  changeView(date) {

    let fullcalendar = (<any>$('ng-fullcalendar'));
    switch (this.selectedView) {
      case "d":
        fullcalendar.fullCalendar('changeView', 'agendaDay', date);      
        break;

      case "w":
        fullcalendar.fullCalendar('changeView', 'agendaWeek', date);      
        break;  

      case "m":
        fullcalendar.fullCalendar('changeView', 'month', date);      
        break;  

      default:
        alert("Please select view type")
        break;
    }
  }

  nextPre(a) {
    let fullcalendar = (<any>$('ng-fullcalendar'));
    switch (a) {
      case "n":
        fullcalendar.fullCalendar('next');
        break;

      case "p":
        fullcalendar.fullCalendar('prev');
        break;

      default:
        alert("Please select next or previous")
        break;
    }
  }

  eventClick(model: any) {

      let _startDate, _endDate;

      if (model.event.start) {_startDate = new FormControl(model.event.start._d)}

      if (model.event.end) {
        _endDate = new FormControl(model.event.end._d); 
      }else{
        _endDate = new FormControl(new Date(_startDate.value.getTime()));
      }

      model = {event: {id: model.event.id, start: model.event.start, startDate: _startDate, end: model.event.end, endDate: _endDate, title: model.event.title, allDay: model.event.allDay, type: model.event.type }, duration: {} }

      this.displayEvent = model;
      this.openDialog(model.event);

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

  openDialog(model){
    this.dialog.open(DialogDataExampleDialog, {
      data: model
    });      
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
   myCalendar = $('ng-fullcalendar');

  constructor(    
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    protected eventService: EventSesrvice ) {
  }

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
        eventData.push(obj);
        this.adEvent(obj); 
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
              obj.allDay = false;    
              this.updateEvent(obj); 
          }
        });        
      }

      localStorage.setItem('eventData', JSON.stringify(eventData));        
  } 

  deleteEvent(id) {
    if(confirm("Are you sure to delete")) {
      let eventData = JSON.parse(localStorage.getItem('eventData'));
      eventData.forEach((o, i)=> {
        if (o.id == this.data.id) {
            this.dltEvent(o.id); 
            eventData.splice(i, 1);
        }
      });
      localStorage.setItem('eventData', JSON.stringify(eventData));
      this.closeDialog();   
    }
  }

  adEvent(e) {
    (<any>this.myCalendar).fullCalendar( 'renderEvent', e);
  }

  dltEvent(id){
    (<any>this.myCalendar).fullCalendar('removeEvents', id);
  }

  updateEvent(e) {
        this.dltEvent(e.id);
        this.adEvent(e);
  }
  
}