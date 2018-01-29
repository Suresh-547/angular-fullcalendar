import { Component, OnInit, ViewChild, Inject,  ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { CalendarComponent } from 'ng-fullcalendar';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';
import { MyTeamCalendarEvent } from '../shared/services/team-calendar.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-team-calendar',
  templateUrl: './team-calendar.component.html',
  styleUrls: ['./team-calendar.component.css']
})
export class TeamCalendarComponent implements OnInit {

   public selectedView = 'td';

  constructor(protected teamEventService: MyTeamCalendarEvent, public dialog: MatDialog, private elRef: ElementRef) { }
  
  ngOnInit() {

    const _this = this;
    const calendar = (<any>$('#calendar'));

    this.teamEventService.saveLocalStorage();

    calendar.fullCalendar({
      now: '2017-12-07',
      editable: true,
      // aspectRatio: 1.8,
      scrollTime: '00:00',
      header: {
        left: '',
        center: 'title',
        right: ''
      },

      defaultView: 'timelineDay',
      views: {
        timelineThreeDays: {
          type: 'timeline',
          duration: { days: 3 }
        }
      },
      resourceRender: function(resource, cellEls) {
        cellEls.on('click', function() {
          _this.deleteResource(resource);
        });
      },
      resources: this.teamEventService.getTeamResourceData(),
      events: this.teamEventService.getTeamEvents()
    }); 
   setTimeout(() => {
       calendar.fullCalendar('option', 'height', 600);
   }, 10);
  }    

  todayView() {
    this.changeView(new Date());
  }

  changeView(date) {

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
  }

  nextPre(a) {
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

  addResource() {
      var title = prompt('Room name');
      if (title) {
        (<any>$('#calendar')).fullCalendar(
          'addResource',
          { 
            title: title
           },
          true // scroll to the new resource?
        );
      }    
  } 

  deleteResource(resource) {
        if (confirm('Are you sure you want to delete ' + resource.title + '?')) {
         (<any>$('#calendar')).fullCalendar('removeResource', resource);
        }
  }
 }