import { Component, OnInit, ViewChild, Inject,  ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MyCalendarEvent } from '../shared/services/my-calendar.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.css']
})

export class CalendarDialogComponent implements OnInit {

   edit: boolean;
   calendarOptions;   
   time = {};  
   myCalendar = $('#calendar');

  constructor(    
    public dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    protected eventService: MyCalendarEvent ) {
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
          start: addEvent.startDate.getTime(),
          end: addEvent.endDate ? addEvent.endDate.getTime() : null,
          type: addEvent.type,
          allDay: addEvent.allDay,
          color:  this.eventService.eventColor(addEvent.type)
        };    

        console.log(obj);
        let obj2 = Object.assign({}, obj);        
        eventData.push(obj);
        this.adMyEvent(obj2); 
      }else{
        eventData.forEach((obj) => {
          if (obj.id == this.data.id) {

             let startDate = this.data.startDate.value,
              endDate = this.data.endDate.value;
              obj.title = this.data.title; 
              obj.color = this.eventService.eventColor(this.data.type); 
              obj.start = this.data.startDate.getTime(); 
              obj.end = this.data.endDate ? this.data.endDate.getTime() : '';
              obj.type = this.data.type;
              obj.allDay = this.data.allDay;    
              let obj2 = Object.assign({}, obj);  
              this.updateEvent(obj2);
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

  addEvent (e) {
    (<any>this.myCalendar).fullCalendar( 'renderEvent', e);
  }

  adMyEvent(e) {
    e.start = new Date(e.start);
    e.end = new Date(e.end);
    this.addEvent(e);
  }

  dltEvent(id){
    (<any>this.myCalendar).fullCalendar('removeEvents', id);
  }

  updateEvent(e) {
        this.dltEvent(e.id);
        this.adMyEvent(e);
  }

  checkAllDay() {
    this.data.endDate = '';
  }
}
