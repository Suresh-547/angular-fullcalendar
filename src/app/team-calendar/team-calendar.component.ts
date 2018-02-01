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
   private horizontal: boolean = false;

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
      // eventLimit: true,
      scrollTime: '00:00',
      header: this.teamEventService.getHeader(),
      // defaultView: 'agendaDay',
      defaultView: 'timelineDay',
      views: this.teamEventService.getViews(),
      resources: this.teamEventService.getTeamResourceData(),
      events: this.teamEventService.getTeamEvents(),
      resourceAreaWidth: "15%",
      groupByResource: false,
      resourceRender: function(resource, cellEls) {
        cellEls.on('click', function() {
        });
      },
      eventClick: function(calEvent, jsEvent, view) {
          _this.editEvent(calEvent);
      },
      eventResize: function(event, delta, revertFunc) {
          _this.resizeEvent(event)
      },
      eventDrop: function(event, delta, revertFunc) {
          _this.eventDrop(event);
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

        if (this.horizontal) {
            fullcalendar.fullCalendar('changeView', 'agendaDay', date);      
        }else{
            fullcalendar.fullCalendar('changeView', 'timelineDay', date);      
        }
        break;

      case "tltd":
        if (this.horizontal) {
            fullcalendar.fullCalendar('changeView', 'timelineThreeDays', date);      
        }else{
            fullcalendar.fullCalendar('changeView', 'timelineThreeDaysH', date);      
        }      
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
    var obj = {
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
    setTimeout(() => {
        let isOpened = document.getElementsByClassName('mat-dialog-container');
        if (isOpened.length == 0) {
            this.openDialog(obj,);     
        }
    }, 50);
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

  resizeEvent(e) {
     let teamEventData = JSON.parse(localStorage.getItem('teamEventData'));
     teamEventData.forEach((o) => {
       if (o.id == e.id) {
         o.end = Date.parse(e.end.format())
       }
     });
     localStorage.setItem('teamEventData', JSON.stringify(teamEventData));
  }

  eventDrop(e) {
     let teamEventData = JSON.parse(localStorage.getItem('teamEventData'));
     teamEventData.forEach((o) => {
       if (o.id == e.id) {
         o.resourceId = e.resourceId;
         o.start = Date.parse(e.start.format());
         o.end = Date.parse(e.end.format());
       }
     });
     localStorage.setItem('teamEventData', JSON.stringify(teamEventData));
  }

  verticleResource () {
    this.horizontal = false;
    this.changeView('');
  }

  horizontalResource() {
    this.horizontal = true;
    this.changeView('');
  }


 }