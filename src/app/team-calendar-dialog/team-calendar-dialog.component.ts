import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MyCalendarEvent } from '../shared/services/my-calendar.service';

import * as $ from 'jquery';

@Component({
    selector: 'app-calendar-dialog',
    templateUrl: './team-calendar-dialog.component.html',
    styleUrls: ['./team-calendar-dialog.component.css']
})

export class TeamCalendarDialogComponent implements OnInit {

    edit: boolean;
    calendarOptions;
    time = {};
    myCalendar = $('#calendar');

    constructor(
        public dialogRef: MatDialogRef < TeamCalendarDialogComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,
        protected eventService: MyCalendarEvent) {}

    ngOnInit() {

    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    addUpdateEvent(addEvent) {
        let teamEventData = JSON.parse(localStorage.getItem('teamEventData'));
        let localObj;
        if (addEvent) {
            let end = addEvent.start.getTime() !== addEvent.end.getTime() ? Date.parse(addEvent.end) : addEvent.end.setMinutes(addEvent.end.getMinutes() + 30);
            addEvent.id = Math.random().toString(36);
            addEvent.color = this.eventService.eventColor(addEvent.type);
            addEvent.start = Date.parse(addEvent.start);
            addEvent.end = Date.parse(addEvent.end);

            localObj = {
                id: addEvent.id,
                title: addEvent.title,
                resourceId: addEvent.resourceId,
                start: addEvent.start,
                end: addEvent.end,
                type: addEvent.type,
                color: this.eventService.eventColor(addEvent.type)
            };

            teamEventData.push(localObj);
            this.addNewEvent(addEvent);
        } else {

            teamEventData.forEach((obj) => {
                if (obj.id == this.data.id) {
                    obj.title = this.data.title;
                    obj.resourceId = this.data.resourceId;
                    obj.color = this.eventService.eventColor(this.data.type);
                    obj.start = Date.parse(this.data.start);
                    obj.end = Date.parse(this.data.end);
                    obj.type = this.data.type;

                    localObj = {
                        id: this.data.id,
                        title: this.data.title,
                        resourceId: this.data.resourceId,
                        start: this.data.start,
                        end: this.data.end,
                        type: this.data.type,
                        color: this.eventService.eventColor(this.data.type)
                    };
                    this.updateEvent(localObj);
                }
            });
        }
        localStorage.setItem('teamEventData', JSON.stringify(teamEventData));
    }

    deleteEvent(id) {
        if (confirm("Are you sure to delete")) {
            let teamEventData = JSON.parse(localStorage.getItem('teamEventData'));
            teamEventData.forEach((o, i) => {
                if (o.id == this.data.id) {
                    this.dltEvent(o.id);
                    teamEventData.splice(i, 1);
                }
            });
            localStorage.setItem('teamEventData', JSON.stringify(teamEventData));
            this.closeDialog();
        }
    }

    addNewEvent(e) {
        e.start = new Date(e.start);
        e.end = new Date(e.end);
        ( < any > this.myCalendar).fullCalendar('renderEvent', e);
    }

    dltEvent(id) {
        // console.log(id);
        ( < any > this.myCalendar).fullCalendar('removeEvents', id);
    }

    updateEvent(e) {
        console.log(e);
        this.dltEvent(e.id);
        this.addNewEvent(e);
    }
}