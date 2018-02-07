import { Component, OnInit, ViewChild, Inject,  ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { TeamCalendarDialogComponent } from '../team-calendar-dialog/team-calendar-dialog.component';
import { MyTeamCalendarEvent } from '../shared/services/team-calendar.service';
import * as $ from 'jquery';
import 'fullcalendar-scheduler'

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
   public calendarTitle;
   public filterRes:any;
   public filterEvn:any;

  constructor(
    protected teamEventService: MyTeamCalendarEvent, 
    public dialog: MatDialog, 
    private elRef: ElementRef
    ) { }
  
  ngOnInit() {

    const _this = this;
    const calendar = (<any>$('#calendar'));
    this.teamEventService.saveLocalStorage();
    calendar.fullCalendar(this.teamEventService.calendarObject(this));  
 
  }    

  //@ go to today view
  todayView () {
    this.changeView(new Date());
  }

  //@ change view from dropdown menu
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
          fullcalendar.fullCalendar('changeView', 'timelineWeek', date);           
        break;        

      case "m":
        fullcalendar.fullCalendar('changeView', 'timelineMonth', date);              
      break;     

      default:
        alert("Please select view type");
        break;
    }
  }

  //@ move calendar to next and previous date
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

  //@ open dialog and pass object
  openDialog(o) {
    this.openedDialog =  this.dialog.open(TeamCalendarDialogComponent, o);
  }

  //@ add new event 
  addEvent(date) {
    setTimeout(() => {
        let isOpened = document.getElementsByClassName('mat-dialog-container');
        if (isOpened.length == 0) {
            var obj = {
              data: {
                new: true,
                title: "",
                type: '',
                start: new Date(date.format()),
                end: '',
                resources: this.teamEventService.getTeamResourceData(0),
                resourceId:""
              }
            };
            this.openDialog(obj,);     
        }
    }, 50);
  } 

  //@ edit event 
  editEvent(calEvent) {
    calEvent.edit = true;
    calEvent.new = false;
    calEvent.start = new Date(calEvent.start);
    calEvent.end = calEvent.allDay ? '' : new Date(calEvent.end);
    calEvent.resources = this.teamEventService.getTeamResourceData(0);

    let obj = {
      data: calEvent
    };
    this.openDialog(obj);
  }

  //@ resize event
  resizeEvent(e) {
     let teamEventData = this.getTeamEventData();
     teamEventData.forEach((o) => {
       if (o.id == e.id) {
         o.end = Date.parse(e.end.format())
       }
     });
     this.setTeamEventData(teamEventData);
  }

  //@ drag and drop event
  eventDrop(e) {
     let teamEventData = this.getTeamEventData();
     teamEventData.forEach((o) => {
       if (o.id == e.id) {
         o.resourceId = e.resourceId;
         o.start = Date.parse(e.start.format());
         o.end = Date.parse(e.end.format());
       }
     });
     this.setTeamEventData(teamEventData);
  }

  //@ fetch local events data from localstorage
  private getTeamEventData() {
    let data = JSON.parse(localStorage.getItem('teamEventData'));
    return data;
  }

  //@ update local events data from localstorage
  private setTeamEventData(data) {
    localStorage.setItem('teamEventData', JSON.stringify(data));
  }

  //@ fetch local resource data from localstorage
  private getResourceData () {
    let data = JSON.parse(localStorage.getItem('teamResourceData'));
    return data;
  }

  //@ update local resource data from localstorage
  private setResourceData(data) {
    localStorage.setItem('teamResourceData', JSON.stringify(data));
  }

  //@ change view mode
  verticleResource () {
    this.horizontal = false;
    this.changeView('');
  }

  //@ change view mode
  horizontalResource() {
    this.horizontal = true;
    this.changeView('');
  }

  //@ filter/serach resource
  filterResource(filter) {
    let fullcalendar = (<any>$('#calendar'));
    this.filterRes = filter;
    fullcalendar.fullCalendar( 'refetchResources');
  }

  //@ filter/serach event
  filterEvent(filter) {
    let fullcalendar = (<any>$('#calendar'));
    this.filterEvn = filter;
    fullcalendar.fullCalendar( 'refetchEvents');
  }
 }