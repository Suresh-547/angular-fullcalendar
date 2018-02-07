import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';
import { MyCalendarEvent } from '../shared/services/my-calendar.service';
import { MyTeamCalendarEvent } from '../shared/services/team-calendar.service';
import * as $ from 'jquery';
import 'fullcalendar-scheduler'

@Component({
    selector: 'app-my-calendar',
    templateUrl: './my-calendar.component.html',
    styleUrls: ['./my-calendar.component.css']
})
export class MyCalendarComponent implements OnInit {

    data = {};
    selectedView = "m";
    calendarOptions;
    displayEvent: any;
    public calendarTitle: string;
    // private pickStartDate: Date;

    constructor(
        protected eventService: MyCalendarEvent,
        protected teamEventService: MyTeamCalendarEvent,
        public dialog: MatDialog,
        private elRef: ElementRef) {}

    ngOnInit() {


        const _ths = this;

        const calendar = ( < any > $('#calendar'));

        this.eventService.saveLocalStorage();

        calendar.fullCalendar(this.eventService.calendarObject(this));
    }

    addEvent(date) {
        let isOpened = document.getElementsByClassName('mat-dialog-container');
        if (isOpened.length == 0) {
            let data = {
                title: "",
                new: true,
                startDate: new Date(date.format()),
                endDate: "",
                allDay: true
            }
            this.openDialog(data);
        }
    }

    todayView() {
        this.changeView(new Date());
    }

    changeView(date) {

        let fullcalendar = ( < any > $('#calendar'));
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
        let fullcalendar = ( < any > $('#calendar'));
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

        if (model.start) {_startDate = model.start._d; }

        if (model.end) {
            _endDate = model.end._d;
        } else {
            _endDate = _startDate.getTime();
        }

        model = {
            id: model.id,
            start: model.start,
            startDate: _startDate,
            end: model.end,
            endDate: model.end ? _endDate : '',
            title: model.title,
            allDay: model.allDay,
            type: model.type
        };
        console.log(model);
        this.openDialog(model);

    }


    eventResize(model: any, type: string) {
        model = this.initModel(model);
        let eventData = JSON.parse(localStorage.getItem('eventData'));
        eventData.forEach((o) => {
            if (o.id == model.event.id) {
                let start, end;
                start = o.start;
                end = model.event.end.format();
                o.title = model.event.title;
                o.start = start;
                o.end = end;
            }
        });
        localStorage.setItem('eventData', JSON.stringify(eventData));
    }

    eventDrop(e) {
        let eventData = JSON.parse(localStorage.getItem('eventData'));
        eventData.forEach((o) => {
            if (o.id == e.id) {
                o.resourceId = e.resourceId;
                o.start = Date.parse(e.start.format());
                o.end = e.end ? Date.parse(e.end.format()) : null;
            }
        });
        localStorage.setItem('eventData', JSON.stringify(eventData));
    }
    initModel(model) {
        model = {
            event: {
                id: model.id,
                start: model.start,
                end: model.end,
                title: model.title
            }
        };
        return model
    }

    openDialog(model) {
        this.dialog.open(CalendarDialogComponent, {
            data: model
        });
    }

}