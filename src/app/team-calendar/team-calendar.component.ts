import { Component, OnInit, ViewChild, Inject,  ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { CalendarComponent } from 'ng-fullcalendar';
import { TeamCalendarDialogComponent } from '../team-calendar-dialog/team-calendar-dialog.component';
import { MyTeamCalendarEvent } from '../shared/services/team-calendar.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-team-calendar',
  templateUrl: './team-calendar.component.html',
  styleUrls: ['./team-calendar.component.css']
})
export class TeamCalendarComponent implements OnInit {

   public selectedView = 'td';
   dialogRef: MatDialogRef<any>;
   private openedDialog;

  constructor(
    protected teamEventService: MyTeamCalendarEvent, 
    public dialog: MatDialog, 
    private elRef: ElementRef
    ) { }
  
  ngOnInit() {

    const _this = this;
    const calendar = (<any>$('#calendar'));

    this.teamEventService.saveLocalStorage();

    calendar.fullCalendar({
      editable: true,
      eventLimit: true,
      scrollTime: '00:00',
      header: this.teamEventService.getHeader(),
      defaultView: 'timelineDay',
      views: this.teamEventService.getViews(),
      resources: this.teamEventService.getTeamResourceData(),
      events: this.teamEventService.getTeamEvents(),
      resourceRender: function(resource, cellEls) {
        cellEls.on('click', function() {
          _this.deleteResource(resource);
        });
      },
      eventClick: function(calEvent, jsEvent, view) {
          _this.editEvent(calEvent);
      }     
    }); 

   setTimeout(() => {
       calendar.fullCalendar('option', 'height', 600);
       _this.addEventListener();
   }, 10);
 
  }    

  addEventListener () {
        let classname = document.getElementsByClassName('fc-scroller');
            classname[classname.length-1].addEventListener('click', this.addEvent.bind(this));
  }

  todayView () {
    this.changeView(new Date());
  }

  changeView (date) {

    let fullcalendar = (<any>$('#calendar'));

    switch (this.selectedView) {
      case "td":
        fullcalendar.fullCalendar('changeView', 'timelineDay', date);      
        break;

      case "tltd":
        fullcalendar.fullCalendar('changeView', 'timelineThreeDays', date);      
        break;  

      case "aw":
        fullcalendar.fullCalendar('changeView', 'agendaWeek', date);      
        break;        

      case "m":
        fullcalendar.fullCalendar('changeView', 'month', date);      
        break;  

      default:
        alert("Please select view type");
        break;
    }
    this.addEventListener();
  }

  nextPre (a) {
    let fullcalendar = (<any>$('#calendar'));
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

  openDialog(o) {
    this.openedDialog =  this.dialog.open(TeamCalendarDialogComponent, o);
  }

  addEvent(model) {
    // setTimeout(() => {

      console.log(this.openedDialog)
      // console.log(this.dialogRef.getDialogById('mat-dialog-container'))
    // }, 1000);
    // let isOpened = document.getElementsByClassName('mat-dialog-container');
    // if (isOpened.length == 0) {
      // code...
        let obj = {
          data: {
            new: true,
            title: "",
            type: '',
            start: new Date(),
            end: new Date(),
            resources: this.teamEventService.getTeamResourceData(),
            resourceId:""
          }
        };
        this.openDialog(obj);     
    // }
  } 

  editEvent(calEvent) {
    calEvent.edit = true;
    calEvent.new = false;
    calEvent.start = new Date(calEvent.start);
    calEvent.end = new Date(calEvent.end);
    calEvent.resources = this.teamEventService.getTeamResourceData();

    let obj = {
      data: calEvent
    };
    this.openDialog(obj);
  }

  addResource () {

  }

  deleteResource(resource) {
        if (confirm('Are you sure you want to delete ' + resource.title + '?')) {
         (<any>$('#calendar')).fullCalendar('removeResource', resource);
        }
  }



 }