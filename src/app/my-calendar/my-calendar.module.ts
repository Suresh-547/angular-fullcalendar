import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatCheckboxModule 
} from '@angular/material';
import { CalendarModule } from 'primeng/primeng';
import { MyCalendarCRoutingModule } from './my-calendar-routing.module';
import { MyCalendarComponent } from './my-calendar.component';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';



@NgModule({
    imports: [
        CommonModule,
        MyCalendarCRoutingModule,
        FormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,   
        MatButtonModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        CalendarModule     
    ],
    declarations: [
        MyCalendarComponent, 
        CalendarDialogComponent
    ],
    entryComponents: [
        CalendarDialogComponent
    ]
})
export class MyCalendarModule {
}
